from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from sqlmodel import SQLModel, Session, select
from db.database import engine
from api.api import api_router


def create_db_and_tables():
    from db import models  # Import models to ensure they are registered
    SQLModel.metadata.create_all(engine)


def seed_admin():
    """Create the admin user on startup if it doesn't already exist."""
    from db.models import User
    from core.security import get_password_hash
    ADMIN_EMAIL = "manav@claim360.in"
    ADMIN_PASSWORD = "Manav@360@"
    with Session(engine) as session:
        existing = session.exec(select(User).where(User.email == ADMIN_EMAIL)).first()
        if not existing:
            admin = User(
                name="Manav",
                email=ADMIN_EMAIL,
                hashed_password=get_password_hash(ADMIN_PASSWORD),
                role="admin",
            )
            session.add(admin)
            session.commit()


app = FastAPI(title="Claim360 API", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, restrict to frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.on_event("startup")
def on_startup():
    create_db_and_tables()
    seed_admin()


app.include_router(api_router, prefix="/api")


@app.get("/")
def read_root():
    return {"message": "Welcome to Claim360 API"}
