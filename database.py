from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

# The connection string for our PostgreSQL database
SQLALCHEMY_DATABASE_URL = "postgresql://user:password@localhost/sentinel_db"

# The core engine that handles communication with the database
engine = create_engine(SQLALCHEMY_DATABASE_URL)

# A factory for creating database sessions (i.e., conversations)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# A base class that our database table models will inherit from
Base = declarative_base()