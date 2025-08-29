import datetime
from sqlalchemy import Column, Integer, String, DateTime
from database import Base

class Claim(Base):
    __tablename__ = "claims"

    id = Column(Integer, primary_key=True)
    text = Column(String, index=True)
    source = Column(String)
    timestamp = Column(DateTime, default=datetime.datetime.now)
    label = Column(String)