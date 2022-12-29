from pydantic import BaseModel

class UserPaymentRequest(BaseModel):
    first_name: str
    midle_name: str
    last_name: str
    email: str
    age: int
    motivation: str
    plan_id: int
    payment_method: str
    payment_id: str
