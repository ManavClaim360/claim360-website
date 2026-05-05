from datetime import timedelta
from typing import Any, Literal

from fastapi import APIRouter, Depends, HTTPException
from fastapi.security import OAuth2PasswordRequestForm
from pydantic import BaseModel, model_validator
from sqlmodel import Session, select
from twilio.base.exceptions import TwilioRestException
from twilio.rest import Client

from api.deps import get_current_user
from core.config import settings
from core.security import create_access_token, get_password_hash, verify_password
from db.database import get_session
from db.models import User

router = APIRouter()


def normalize_phone(phone: str) -> str:
    digits = "".join(ch for ch in phone if ch.isdigit())
    if phone.strip().startswith("+"):
        digits = f"+{digits}"
    elif len(digits) == 10:
        digits = f"+91{digits}"
    elif not digits.startswith("+"):
        digits = f"+{digits}"
    return digits


def get_twilio_client() -> Client:
    if not settings.otp_enabled:
        raise HTTPException(status_code=503, detail="OTP service is not configured")
    return Client(settings.TWILIO_ACCOUNT_SID, settings.TWILIO_AUTH_TOKEN)


def send_verification_code(phone: str) -> None:
    client = get_twilio_client()
    try:
        client.verify.v2.services(settings.TWILIO_VERIFY_SERVICE_SID).verifications.create(
            to=phone,
            channel="sms",
        )
    except TwilioRestException as exc:
        raise HTTPException(status_code=400, detail=exc.msg or "Failed to send OTP") from exc


def verify_code(phone: str, code: str) -> bool:
    client = get_twilio_client()
    try:
        result = client.verify.v2.services(settings.TWILIO_VERIFY_SERVICE_SID).verification_checks.create(
            to=phone,
            code=code,
        )
    except TwilioRestException as exc:
        raise HTTPException(status_code=400, detail=exc.msg or "Failed to verify OTP") from exc
    return result.status == "approved"


def build_auth_response(user: User) -> dict[str, Any]:
    access_token_expires = timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)
    return {
        "access_token": create_access_token(user.email, expires_delta=access_token_expires),
        "token_type": "bearer",
        "user": UserResponse.model_validate(user).model_dump(),
    }


def find_user_by_identifier(session: Session, identifier: str) -> User | None:
    normalized_identifier = identifier.strip()
    user = session.exec(select(User).where(User.email == normalized_identifier)).first()
    if user:
        return user
    normalized_phone = normalize_phone(normalized_identifier)
    return session.exec(select(User).where(User.phone == normalized_phone)).first()


class UserCreate(BaseModel):
    name: str
    email: str
    phone: str | None = None
    password: str
    role: str = "user"


class UserResponse(BaseModel):
    id: int
    name: str
    email: str
    phone: str | None = None
    role: str

    model_config = {"from_attributes": True}


class Token(BaseModel):
    access_token: str
    token_type: str


class AuthPayload(Token):
    user: UserResponse


class OtpRequest(BaseModel):
    mode: Literal["signup", "login"]
    phone: str
    name: str | None = None
    email: str | None = None
    password: str | None = None

    @model_validator(mode="after")
    def validate_signup_fields(self):
        if self.mode == "signup" and not all([self.name, self.email, self.password]):
            raise ValueError("Name, email, and password are required for signup")
        return self


class OtpVerifyRequest(BaseModel):
    mode: Literal["signup", "login"]
    phone: str
    code: str
    name: str | None = None
    email: str | None = None
    password: str | None = None

    @model_validator(mode="after")
    def validate_signup_fields(self):
        if self.mode == "signup" and not all([self.name, self.email, self.password]):
            raise ValueError("Name, email, and password are required for signup")
        return self


class OtpResponse(BaseModel):
    detail: str


@router.post("/register", response_model=UserResponse)
def register_user(user_in: UserCreate, session: Session = Depends(get_session)) -> Any:
    user = session.exec(select(User).where(User.email == user_in.email)).first()
    if user:
        raise HTTPException(status_code=400, detail="The user with this username already exists in the system.")

    normalized_phone = normalize_phone(user_in.phone) if user_in.phone else None
    if normalized_phone:
        existing_phone = session.exec(select(User).where(User.phone == normalized_phone)).first()
        if existing_phone:
            raise HTTPException(status_code=400, detail="This phone number is already linked to an account.")

    user_data = user_in.model_dump()
    password = user_data.pop("password")
    user_data["phone"] = normalized_phone
    user_data["hashed_password"] = get_password_hash(password)

    db_user = User(**user_data)
    session.add(db_user)
    session.commit()
    session.refresh(db_user)
    return db_user


@router.post("/login", response_model=Token)
def login_access_token(
    session: Session = Depends(get_session),
    form_data: OAuth2PasswordRequestForm = Depends(),
) -> Any:
    user = find_user_by_identifier(session, form_data.username)
    if not user or not verify_password(form_data.password, user.hashed_password):
        raise HTTPException(status_code=400, detail="Incorrect email, phone, or password")

    access_token_expires = timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)
    return {
        "access_token": create_access_token(user.email, expires_delta=access_token_expires),
        "token_type": "bearer",
    }


@router.post("/otp/request", response_model=OtpResponse)
def request_otp(payload: OtpRequest, session: Session = Depends(get_session)) -> OtpResponse:
    phone = normalize_phone(payload.phone)

    if payload.mode == "signup":
        existing_email = session.exec(select(User).where(User.email == payload.email)).first()
        if existing_email:
            raise HTTPException(status_code=400, detail="This email is already registered.")
        existing_phone = session.exec(select(User).where(User.phone == phone)).first()
        if existing_phone:
            raise HTTPException(status_code=400, detail="This phone number is already registered.")
    else:
        user = session.exec(select(User).where(User.phone == phone)).first()
        if not user:
            raise HTTPException(status_code=404, detail="No account found for this phone number.")

    send_verification_code(phone)
    return OtpResponse(detail="OTP sent successfully")


@router.post("/otp/verify", response_model=AuthPayload)
def verify_otp(payload: OtpVerifyRequest, session: Session = Depends(get_session)) -> AuthPayload:
    phone = normalize_phone(payload.phone)

    if not verify_code(phone, payload.code):
        raise HTTPException(status_code=400, detail="Invalid or expired OTP")

    if payload.mode == "signup":
        existing_email = session.exec(select(User).where(User.email == payload.email)).first()
        if existing_email:
            raise HTTPException(status_code=400, detail="This email is already registered.")
        existing_phone = session.exec(select(User).where(User.phone == phone)).first()
        if existing_phone:
            raise HTTPException(status_code=400, detail="This phone number is already registered.")

        user = User(
            name=payload.name,
            email=payload.email,
            phone=phone,
            hashed_password=get_password_hash(payload.password),
            role="user",
        )
        session.add(user)
        session.commit()
        session.refresh(user)
    else:
        user = session.exec(select(User).where(User.phone == phone)).first()
        if not user:
            raise HTTPException(status_code=404, detail="No account found for this phone number.")

    return AuthPayload(**build_auth_response(user))


@router.get("/me", response_model=UserResponse)
def read_user_me(current_user: User = Depends(get_current_user)) -> Any:
    return current_user
