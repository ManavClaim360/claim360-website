from datetime import timedelta
from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm
from sqlmodel import Session, select
from pydantic import BaseModel
from typing import Any

from core.security import verify_password, get_password_hash, create_access_token
from db.database import get_session
from db.models import User
from api.deps import get_current_user

router = APIRouter()

class UserCreate(BaseModel):
    name: str
    email: str
    password: str
    role: str = "user" # in a real app, restrict passing role

class UserResponse(BaseModel):
    id: int
    name: str
    email: str
    role: str

class Token(BaseModel):
    access_token: str
    token_type: str

@router.post("/register", response_model=UserResponse)
def register_user(user_in: UserCreate, session: Session = Depends(get_session)) -> Any:
    # Check if user already exists
    user = session.exec(select(User).where(User.email == user_in.email)).first()
    if user:
        raise HTTPException(
            status_code=400,
            detail="The user with this username already exists in the system.",
        )
    
    user_data = user_in.model_dump()
    password = user_data.pop("password")
    user_data["hashed_password"] = get_password_hash(password)
    
    db_user = User(**user_data)
    session.add(db_user)
    session.commit()
    session.refresh(db_user)
    return db_user

@router.post("/login", response_model=Token)
def login_access_token(session: Session = Depends(get_session), form_data: OAuth2PasswordRequestForm = Depends()) -> Any:
    """
    OAuth2 compatible token login, get an access token for future requests
    """
    user = session.exec(select(User).where(User.email == form_data.username)).first()
    if not user or not verify_password(form_data.password, user.hashed_password):
        raise HTTPException(status_code=400, detail="Incorrect email or password")
        
    access_token_expires = timedelta(minutes=1440) # 1 day
    return {
        "access_token": create_access_token(
            user.email, expires_delta=access_token_expires
        ),
        "token_type": "bearer",
    }

@router.get("/me", response_model=UserResponse)
def read_user_me(current_user: User = Depends(get_current_user)) -> Any:
    """
    Get current user.
    """
    return current_user
