from pydantic import BaseModel

class PacientPaymentRequest(BaseModel):
    firstName: str
    lastName: str
    email: str
    cellphone: str
    age: str    
