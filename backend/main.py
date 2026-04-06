from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from sqlmodel import SQLModel
from db.database import engine
from api.api import api_router

# Ensure tables are created for SQLite locally (using Alembic is better for production)
def create_db_and_tables():
    from db import models # Import models to ensure they are registered
    SQLModel.metadata.create_all(engine)

app = FastAPI(title="Claim360 API", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # In production, restrict to frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.on_event("startup")
def on_startup():
    create_db_and_tables()

app.include_router(api_router, prefix="/api")

@app.get("/")
def read_root():
    return {"message": "Welcome to Claim360 API"}
