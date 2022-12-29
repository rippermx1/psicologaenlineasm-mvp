from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import RedirectResponse
from models import UserPaymentRequest
from payment import KhipuPayment
from exceptions import ConfirmationPaymentException

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def read_root():
    return {"Hello": "World"}


@app.get("/confirmation") # request: UserPaymentRequest
def comfirmation():
    try:
        payment = KhipuPayment()
        payment_url = payment.create_payment(
            subject='test',
            currency='CLP',
            amount=10500,
            transaction_id='FACT2001',
            body='Descripción de la compra'
        )
        print(payment_url)
        return {'payment_url': payment_url}
    except ConfirmationPaymentException as e:
        print(e)
        return None