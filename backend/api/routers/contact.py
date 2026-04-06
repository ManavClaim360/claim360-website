from fastapi import APIRouter, Depends
from sqlmodel import Session
from typing import Any
from pydantic import BaseModel

from db.database import get_session
from db.models import Contact, Newsletter

router = APIRouter()

class ContactCreate(BaseModel):
    name: str
    email: str
    message: str

class NewsletterCreate(BaseModel):
    email: str

@router.post("/message")
def submit_contact(contact: ContactCreate, session: Session = Depends(get_session)) -> Any:
    db_contact = Contact(**contact.model_dump())
    session.add(db_contact)
    session.commit()
    return {"message": "Message received"}

@router.post("/newsletter")
def submit_newsletter(newsletter: NewsletterCreate, session: Session = Depends(get_session)) -> Any:
    db_newsletter = Newsletter(**newsletter.model_dump())
    session.add(db_newsletter)
    session.commit()
    return {"message": "Subscribed"}
