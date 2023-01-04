from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import RedirectResponse
from fastapi import Request
from models import PacientPaymentRequest, PaymentTrxId
from payment import KhipuPayment
from exceptions import ConfirmationPaymentException
from uuid import uuid4


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
    transaction_id = str(uuid4())
    transaction_body = {
        'subject': 'plan name',
        'amount': 10500,
        'transaction_id': transaction_id,
        'body': 'Descripción de la compra'
    }
    try:
        payment_url = payment.create_payment(transaction_body)
        print(payment_url)
        return {'payment_url': payment_url}
    except ConfirmationPaymentException as e:
        print(e)
        return None


@app.get("/payment/confirm")
async def confirm_payment(request: Request):
    trx_id = request.query_params.get('trx_id')
    try:
        return RedirectResponse(f'http://localhost:4200/schedule-meet/payment/confirm?trx_id={trx_id}', status_code=302)
    except ConfirmationPaymentException as e:
        print(e)
        return RedirectResponse('http://localhost:4200/schedule-meet/payment/error', status_code=302)


@app.get("/payment/error")
async def confirm_payment(request: Request):
    print(await request.body())
    return RedirectResponse('http://localhost:4200/schedule-meet/payment/error', status_code=302)


@app.post("/payment/status")
async def payment_status(request: PaymentTrxId):
    try:
        _payment = payment.get_payment(request.trx_id)
        print(_payment)
        print(_payment.payment_id, _payment.status, _payment.status_detail)
        if _payment.status == 'done':
            print(_payment.payment_id, _payment.status, _payment.status_detail)
            payment.update_payment_status(_payment)
            return {'status': _payment.status, 'status_detail': _payment.status_detail}
        else:
            return {'status': 'pending', 'status_detail': 'pending'}
    except ConfirmationPaymentException as e:
        pass