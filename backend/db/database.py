from sqlmodel import SQLModel, create_engine, Session
from core.config import settings

connect_args = {"check_same_thread": False} if "sqlite" in settings.DB_URL else {}
engine = create_engine(settings.DB_URL, echo=True, connect_args=connect_args)

def get_session():
    with Session(engine) as session:
        yield session
