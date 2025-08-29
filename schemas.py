import datetime
from pydantic import BaseModel

class ClaimBase(BaseModel):
    text: str
    source: str
    label: str

class ClaimCreate(ClaimBase):
    pass

class Claim(ClaimBase):
    id: int
    timestamp: datetime.datetime

    class Config:
        orm_mode = True