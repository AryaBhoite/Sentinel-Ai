from fastapi import FastAPI, Depends
from sqlalchemy.orm import Session
import crud
import models
import schemas
from database import SessionLocal, engine

models.Base.metadata.create_all(bind=engine)

app = FastAPI()

# Dependency to get a DB session for each request
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@app.post("/claims/", response_model=schemas.Claim)
def create_new_claim(claim: schemas.ClaimCreate, db: Session = Depends(get_db)):
    return crud.create_claim(db=db, claim=claim)

@app.get("/claims/", response_model=list[schemas.Claim])
def read_all_claims(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    claims = crud.get_claims(db, skip=skip, limit=limit)
    return claims