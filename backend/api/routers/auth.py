import random
import smtplib
from datetime import datetime, timedelta
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
from typing import Any, Literal

from fastapi import APIRouter, Depends, HTTPException
from fastapi.security import OAuth2PasswordRequestForm
from pydantic import BaseModel, model_validator
from sqlmodel import Session, select

from api.deps import get_current_user
from core.config import settings
from core.security import create_access_token, get_password_hash, verify_password
from db.database import get_session
from db.models import User

router = APIRouter()

# In-memory OTP store: email -> (code, expiry_datetime)
_otp_store: dict[str, tuple[str, datetime]] = {}
OTP_TTL_MINUTES = 10


def generate_otp() -> str:
    return str(random.randint(100000, 999999))


def store_otp(email: str, code: str) -> None:
    _otp_store[email] = (code, datetime.utcnow() + timedelta(minutes=OTP_TTL_MINUTES))


def pop_otp(email: str, code: str) -> bool:
    entry = _otp_store.get(email)
    if not entry:
        return False
    stored_code, expiry = entry
    if datetime.utcnow() > expiry:
        _otp_store.pop(email, None)
        return False
    if stored_code != code:
        return False
    _otp_store.pop(email, None)
    return True


def send_otp_email(to_email: str, code: str, purpose: str = "verification") -> None:
    if not settings.email_enabled:
        raise HTTPException(status_code=503, detail="Email service is not configured. Set SMTP_HOST, SMTP_USER, and SMTP_PASS in .env")

    subject = "Your Claim360 Password Reset Code" if purpose == "forgot" else "Your Claim360 Email Verification Code"
    action_label = "reset your password" if purpose == "forgot" else "verify your email"

    body = f"""
    <html><body style="font-family:sans-serif;max-width:480px;margin:0 auto;padding:32px 24px;color:#1e293b">
      <div style="margin-bottom:24px">
        <span style="font-size:22px;font-weight:700;color:#0A1628">Claim<span style="color:#C9A24A">360</span></span>
      </div>
      <p style="margin-bottom:8px">Use the code below to {action_label}:</p>
      <div style="font-size:40px;font-weight:bold;letter-spacing:10px;color:#C9A24A;margin:24px 0;padding:20px;background:#f8fafc;border-radius:12px;text-align:center">{code}</div>
      <p style="color:#64748b;font-size:13px">This code expires in {OTP_TTL_MINUTES} minutes. Do not share it with anyone.</p>
      <p style="color:#94a3b8;font-size:12px;margin-top:32px">If you did not request this, you can safely ignore this email.</p>
    </body></html>
    """

    msg = MIMEMultipart("alternative")
    msg["Subject"] = subject
    msg["From"] = settings.SMTP_FROM or settings.SMTP_USER
    msg["To"] = to_email
    msg.attach(MIMEText(body, "html"))

    try:
        with smtplib.SMTP(settings.SMTP_HOST, settings.SMTP_PORT) as server:
            server.ehlo()
            if settings.SMTP_TLS:
                server.starttls()
                server.ehlo()
            if settings.SMTP_USER and settings.SMTP_PASS:
                server.login(settings.SMTP_USER, settings.SMTP_PASS)
            server.sendmail(msg["From"], [to_email], msg.as_string())
    except Exception as exc:
        raise HTTPException(status_code=503, detail=f"Failed to send email: {exc}") from exc


def normalize_phone(phone: str) -> str:
    digits = "".join(ch for ch in phone if ch.isdigit())
    if phone.strip().startswith("+"):
        digits = f"+{digits}"
    elif len(digits) == 10:
        digits = f"+91{digits}"
    elif not digits.startswith("+"):
        digits = f"+{digits}"
    return digits


def build_auth_response(user: User) -> dict[str, Any]:
    access_token_expires = timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)
    return {
        "access_token": create_access_token(user.email, expires_delta=access_token_expires),
        "token_type": "bearer",
        "user": UserResponse.model_validate(user).model_dump(),
    }


class UserCreate(BaseModel):
    name: str
    email: str
    phone: str
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


class OtpResponse(BaseModel):
    detail: str


class EmailOtpRequest(BaseModel):
    mode: Literal["signup", "forgot"]
    email: str
    name: str | None = None
    phone: str | None = None
    password: str | None = None

    @model_validator(mode="after")
    def validate_signup_fields(self):
        if self.mode == "signup" and not all([self.name, self.phone, self.password]):
            raise ValueError("Name, phone, and password are required for signup")
        return self


class EmailOtpVerifyRequest(BaseModel):
    mode: Literal["signup", "forgot"]
    email: str
    code: str
    name: str | None = None
    phone: str | None = None
    password: str | None = None
    new_password: str | None = None

    @model_validator(mode="after")
    def validate_fields(self):
        if self.mode == "signup" and not all([self.name, self.phone, self.password]):
            raise ValueError("Name, phone, and password are required for signup")
        if self.mode == "forgot" and not self.new_password:
            raise ValueError("new_password is required for password reset")
        return self


@router.post("/register", response_model=UserResponse)
def register_user(user_in: UserCreate, session: Session = Depends(get_session)) -> Any:
    existing = session.exec(select(User).where(User.email == user_in.email)).first()
    if existing:
        raise HTTPException(status_code=400, detail="This email is already registered.")

    normalized_phone = normalize_phone(user_in.phone)
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
    user = session.exec(select(User).where(User.email == form_data.username)).first()
    if not user or not verify_password(form_data.password, user.hashed_password):
        raise HTTPException(status_code=400, detail="Incorrect email or password")

    access_token_expires = timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)
    return {
        "access_token": create_access_token(user.email, expires_delta=access_token_expires),
        "token_type": "bearer",
    }


@router.post("/otp/request", response_model=OtpResponse)
def request_email_otp(payload: EmailOtpRequest, session: Session = Depends(get_session)) -> OtpResponse:
    if payload.mode == "signup":
        existing = session.exec(select(User).where(User.email == payload.email)).first()
        if existing:
            raise HTTPException(status_code=400, detail="This email is already registered.")
        if payload.phone:
            normalized_phone = normalize_phone(payload.phone)
            existing_phone = session.exec(select(User).where(User.phone == normalized_phone)).first()
            if existing_phone:
                raise HTTPException(status_code=400, detail="This phone number is already registered.")
    else:
        user = session.exec(select(User).where(User.email == payload.email)).first()
        if not user:
            raise HTTPException(status_code=404, detail="No account found with this email.")

    code = generate_otp()
    store_otp(payload.email, code)
    send_otp_email(payload.email, code, purpose="forgot" if payload.mode == "forgot" else "verification")
    return OtpResponse(detail="OTP sent to your email")


@router.post("/otp/verify", response_model=AuthPayload)
def verify_email_otp(payload: EmailOtpVerifyRequest, session: Session = Depends(get_session)) -> AuthPayload:
    if not pop_otp(payload.email, payload.code):
        raise HTTPException(status_code=400, detail="Invalid or expired OTP")

    if payload.mode == "signup":
        existing = session.exec(select(User).where(User.email == payload.email)).first()
        if existing:
            raise HTTPException(status_code=400, detail="This email is already registered.")

        normalized_phone = normalize_phone(payload.phone)
        existing_phone = session.exec(select(User).where(User.phone == normalized_phone)).first()
        if existing_phone:
            raise HTTPException(status_code=400, detail="This phone number is already registered.")

        user = User(
            name=payload.name,
            email=payload.email,
            phone=normalized_phone,
            hashed_password=get_password_hash(payload.password),
            role="user",
        )
        session.add(user)
        session.commit()
        session.refresh(user)
    else:
        user = session.exec(select(User).where(User.email == payload.email)).first()
        if not user:
            raise HTTPException(status_code=404, detail="No account found with this email.")
        user.hashed_password = get_password_hash(payload.new_password)
        session.add(user)
        session.commit()
        session.refresh(user)

    return AuthPayload(**build_auth_response(user))


@router.get("/me", response_model=UserResponse)
def read_user_me(current_user: User = Depends(get_current_user)) -> Any:
    return current_user
