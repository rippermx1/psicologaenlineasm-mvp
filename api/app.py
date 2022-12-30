from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import RedirectResponse
from fastapi import Request
from models import PacientPaymentRequest
from payment import KhipuPayment
from exceptions import ConfirmationPaymentException
from uuid import uuid4

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


@app.post("/payment/create")
def comfirmation(request: PacientPaymentRequest):
    try:
        transaction_id = uuid4()
        # TO DO: Insert Mongo DB
        # get plan by id
        # get price plan's
        # database.payment.insert(email, transaction_id, plan_id, date, amount,)
        print(request)
        payment = KhipuPayment()
        payment_url = payment.create_payment(
            subject='plan name',
            amount=10500, # plan price
            transaction_id=uuid4(), # random
            body='Descripción de la compra' # plan description
        )
        print(payment_url)
        return {'payment_url': payment_url}
    except ConfirmationPaymentException as e:
        print(e)
        return None


@app.get("/payment/confirm")
def confirm_payment(request: Request):
    print(request)
    payment_id = request.query_params.get('payment_id')
    payment = KhipuPayment()
    return RedirectResponse('http://localhost:4200/schedule-meet/payment/confirm', status_code=302)