from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import RedirectResponse
from fastapi import Request
from models import PacientPaymentRequest
from payment import KhipuPayment
from exceptions import ConfirmationPaymentException
from uuid import uuid4
import json
from firebase import FirebaseDatabase

db = FirebaseDatabase()
payment = KhipuPayment()
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
    transaction_id = uuid4()    
    try:
        payment_url = payment.create_payment(
            subject='plan name',
            amount=10500, # plan price
            transaction_id=transaction_id,
            body='Descripción de la compra' # plan description
        )
        # TO DO: Insert Mongo DB
        # get plan by id
        # get price plan's
        # database.payment.insert(email, transaction_id, plan_id, date, amount,)
        db.add_payment(payment)
        print(payment_url)
        return {'payment_url': payment_url}
    except ConfirmationPaymentException as e:
        print(e)
        return None


@app.get("/payment/confirm")
async def confirm_payment(request: Request):
    try:
        print(json.loads(await request.json()))
        return RedirectResponse('http://localhost:4200/schedule-meet/payment/confirm?trx_id=', status_code=302)
    except ConfirmationPaymentException as e:
        print(e)
        return RedirectResponse('http://localhost:4200/schedule-meet/payment/error', status_code=302)


@app.get("/payment/error")
async def confirm_payment(request: Request):
    print(await request.body())
    return RedirectResponse('http://localhost:4200/schedule-meet/payment/error', status_code=302)


@app.get("/payment/order/status")
async def payment_order_status(request: Request):
    try:
        pass
    except ConfirmationPaymentException as e:
        pass