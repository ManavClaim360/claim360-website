from fastapi import APIRouter
from api.routers import auth, investors, contact

api_router = APIRouter()
api_router.include_router(auth.router, prefix="/auth", tags=["auth"])
api_router.include_router(investors.router, prefix="/investors", tags=["investors"])
api_router.include_router(contact.router, prefix="/contact", tags=["contact"])
