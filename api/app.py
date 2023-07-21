from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import RedirectResponse
from fastapi import Request
from models import PatientPaymentRequest, PaymentTrxId, BlockCreateRequest, BlockUpdateRequest, SpecialistAvailableHoursRequest
from payment import KhipuPayment
from exceptions import ConfirmationPaymentException, SpecialistException, SetDefaultScheduleDaysException, GetSpecialistScheduleException
from uuid import uuid4
from firebase import FirebaseAuth, FirebaseDatabase
from datetime import datetime
from logger import Logger
from constants import FRONT_URL


payment = KhipuPayment()
auth = FirebaseAuth()
db = FirebaseDatabase()
app = FastAPI()
logger = Logger()

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
def comfirmation(request: PatientPaymentRequest):
    print(dict(request))

    id = None
    patient = None
    try:
        patient = db.get_patient_by_email(request.email)
        patient = patient[0] if patient else None
        print("41", patient)

        if not patient:
            # user = auth.create_user(request.email, 'password')
            # print(user)
            id = db.create_patient(request)
            print(id)

        payment_url = payment.create_payment({
            'subject': 'Terapia psicológica',
            'amount': 14990,
            'id': str(uuid4()),
            'body': 'Sesión de terapia psicológica online',
            'user_email': (id, request) if not patient else patient[1]['email'],
            'user_id': id if not patient else patient[0]
        })
        print(payment_url)
        return {'payment_url': payment_url}
    except ConfirmationPaymentException as e:
        print(e)
        return RedirectResponse(
            f'{FRONT_URL}schedule-meet/payment/error',
            status_code=302)


@app.get("/payment/confirm")
async def confirm_payment(request: Request):
    trx_id = request.query_params.get('trx_id')
    user_id = request.query_params.get('user_id')
    try:
        return RedirectResponse(
            f'{FRONT_URL}public/payment/confirm?trx_id={trx_id}',
            status_code=302)
    except ConfirmationPaymentException as e:
        print(e)
        return RedirectResponse(
            f'{FRONT_URL}public/payment/error',
            status_code=302)


@app.get("/payment/error")
async def error_payment(request: Request):
    trx_id = request.query_params.get('trx_id')
    user_id = request.query_params.get('user_id')
    trx = payment.get_payment(trx_id, user_id)
    print('trx', trx.status, trx.status_detail)
    return RedirectResponse(
        f'{FRONT_URL}public/payment/error?trx_id={trx_id}',
        status_code=302)


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


# Specialist Endpoints
@app.post("/specialist/hours/available")
async def get_specialist_available_hours(
        request: SpecialistAvailableHoursRequest):
    try:
        hours = db.get_specialist_available_hours(
            request.user_id,
            request.date
        )
        return {
            'status': 'success',
            'hours': hours
        }
    except GetSpecialistScheduleException as e:
        logger.log(e)
        return {
            'status': 'error',
            'hours': []
        }


# Admin Settings Endpoints
@app.get("/schedule/days/default")
async def set_default_schedule_days():
    try:
        uuid = db.set_default_schedule_days()
        return {
            'status': 'success',
            'uuid': uuid
        }
    except SetDefaultScheduleDaysException as e:
        pass
