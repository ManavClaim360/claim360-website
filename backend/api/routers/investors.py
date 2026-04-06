from typing import List, Any
from fastapi import APIRouter, Depends, Query
from sqlmodel import Session, select, or_

from db.database import get_session
from db.models import Investor, User
from api.deps import get_current_user

router = APIRouter()

@router.get("/search", response_model=List[Investor])
def search_investors(
    q: str = Query("", description="Search term for name or address"),
    session: Session = Depends(get_session),
    current_user: User = Depends(get_current_user)
) -> Any:
    """
    Search investors with query. Requires authentication.
    """
    query = select(Investor)
    
    if q.strip():
        search_term = f"%{q.strip().lower()}%"
        # Since SQLModel uses SQLAlchemy under the hood, we can do ilike for case insensitivity if using Postgres,
        # but for sqlite 'like' is fine or we cast appropriately. Since sqlite like is mostly case insensitive:
        query = query.where(
            or_(
                Investor.name.like(search_term),
                Investor.address.like(search_term),
                Investor.father_name.like(search_term)
            )
        )
    
    results = session.exec(query).all()
    return results

@router.post("/", response_model=Investor)
def create_investor(
    investor: Investor,
    session: Session = Depends(get_session)
    # Require admin in production context, for now any user or maybe no protection for script seeding
) -> Any:
    session.add(investor)
    session.commit()
    session.refresh(investor)
    return investor
