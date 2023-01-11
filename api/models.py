from pydantic import BaseModel

class PacientPaymentRequest(BaseModel):
    firstName: str
    lastName: str
    email: str
    cellphone: str
    age: str    


class PaymentTrxId(BaseModel):
    trx_id: str


# 
class Specialist(BaseModel):
    id: int
    firstName: str
    lastName: str
    age: str
    email: str
    cellphone: str
    password: str
    bio: str # specialist description info
    avatar: str # url to public resource
    specialty: str # specialist specialty
    price: int # specialist price per hour
    rating: int # specialist rating
    available: bool
    schedule: list # specialist schedule


class SpecialistSchedule(BaseModel):
    id: int
    specialist_id: int
    day: str
    start: str
    end: str
    available: bool

