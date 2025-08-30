from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import models, schemas, crud
from database import SessionLocal, engine

# Create the database tables
models.Base.metadata.create_all(bind=engine)

app = FastAPI()

# -----------------
# THE CORS FIX
# -----------------
origins = [
    "http://localhost",
    "http://localhost:3000",
    "http://127.0.0.1",
    "http://127.0.0.1:3000",
]

# In your main.py file, add a new endpoint after your CORS configuration
@app.get("/")
def read_root():
    return {"message": "API is running"}

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],  # This allows all HTTP methods (GET, POST, etc.)
    allow_headers=["*"],  # This allows all headers
)
# -----------------

# Your database dependency and API endpoints go here
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# Your API endpoints from the previous steps
# ...