from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import RedirectResponse
from fastapi import Request
from models import PacientPaymentRequest, PaymentTrxId, BlockCreateRequest, BlockUpdateRequest
from payment import KhipuPayment
from exceptions import ConfirmationPaymentException, SpecialistException, SetDefaultScheduleDaysException, GetSpecialistScheduleException
from uuid import uuid4
from firebase import FirebaseAuth, FirebaseDatabase
from datetime import datetime


payment = KhipuPayment()
auth = FirebaseAuth()
db = FirebaseDatabase()
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
    user_email = None
    user_uid = None
    transaction_id = str(uuid4())
    transaction_body = {
        'subject': 'plan name',
        'amount': 10500,
        'transaction_id': transaction_id,
        'body': 'Descripción de la compra'
    }
    try:
        user = db.get_user_by_email(request.email)
        print(user)
        
        if not user:
            user = auth.create_user(request.email, 'password')
            db.add_user(user)
            print(user)
            user_email = user.email
            user_uid = user.uid
        else:
            user_email = user['email']
            user_uid = user['uid']
        
        transaction_body['user_email'] = user_email
        transaction_body['user_id'] = user_uid

        payment_url = payment.create_payment(transaction_body)
        print(payment_url)
        return {'payment_url': payment_url}
    except ConfirmationPaymentException as e:
        print(e)
        return RedirectResponse('http://localhost:4200/schedule-meet/payment/error', status_code=302)


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
    trx_id = request.query_params.get('trx_id')
    print(await request.body())
    return RedirectResponse(f'http://localhost:4200/schedule-meet/payment/error?trx_id={trx_id}', status_code=302)


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
@app.get("/schedule/specialist/")
async def get_specialist_schedule(uuid: str, date: str):
    ''' Get the schedule by a given specialist UUID '''
    try:
        return {'status': 'success', 'schedule': db.get_specialist_schedule(uuid, date)}
    except GetSpecialistScheduleException as e:
        return {'status': 'error', 'status_detail': 'pending'}


@app.post("/schedule/specialist/block/create")
async def set_specialist_schedule_block(request: BlockCreateRequest):
    ''' Create the schedule block by default for a specific specialist by a given UUID and Date '''
    print(request)
    try:
        return {'status': 'success', 'schedule': db.set_specialist_schedule_block(request.uuid, request.date)}
    except GetSpecialistScheduleException as e:
        return {'status': 'error', 'status_detail': 'error'}


@app.post("/schedule/specialist/block/update")
async def update_specialist_schedule_block(request: BlockUpdateRequest):
    ''' Update the schedule block for a specific specialist by a given schedule_uuid and block_id '''
    try:
        return {'status': 'success', 'schedule': db.update_specialist_schedule_block(request.schedule_uuid, request.block_id, request.status)}
    except GetSpecialistScheduleException as e:
        return {'status': 'error', 'status_detail': 'error'}


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