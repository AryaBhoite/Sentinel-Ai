from sqlalchemy.orm import Session
import models
import schemas

def get_claims(db: Session, skip: int = 0, limit: int = 100):
    return db.query(models.Claim).offset(skip).limit(limit).all()

def create_claim(db: Session, claim: schemas.ClaimCreate):
    db_claim = models.Claim(
        text=claim.text,
        source=claim.source,
        label=claim.label
    )
    db.add(db_claim)
    db.commit()
    db.refresh(db_claim)
    return db_claim
