import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore
from firebase_admin import auth
from uuid import uuid4
from datetime import datetime, date
from utils import BLOCK_0, BLOCK_1, BLOCK_2, BLOCK_3, BLOCK_4, BLOCK_5, BLOCK_6, BLOCK_7, BLOCK_8, BLOCK_9, BLOCK_10, BLOCK_11

app = firebase_admin.initialize_app(credentials.Certificate("./psicologaenlineasm-firebase.json"))

class FirebaseDatabase:
    def __init__(self):
        self.db = firestore.client(app)
        self.ref = None

    def add_payment(self, payment):
        print('add_payment', payment)
        self.ref = self.db.collection(u'payments').document(payment['payment_id'])
        self.ref.set(payment)


    def get_payment(self, trx_id):
        print('get_payment', trx_id)
        self.ref = self.db.collection(u'payments')
        query = self.ref.where("transaction_id", "==", trx_id)    
        return [doc.to_dict() for doc in query.stream()] if query else None


    def update_payment_status(self, payment_id, status, status_detail):
        print('update_payment_status', payment_id, status)
        self.ref = self.db.collection(u'payments').document(payment_id)
        return self.ref.update({'status': status, 'status_detail': status_detail})


    def add_user(self, user):
        print('add_user', user.uid)
        self.ref = self.db.collection(u'users').document(user.uid)
        self.ref.set({
            "uid": user.uid,
            "email": user.email,
            "display_name": user.display_name,
            "phone_number": user.phone_number,
            "email_verified": user.email_verified,
            "disabled": user.disabled,       
        })


    def get_user_by_email(self, email):
        print('get_user', email)
        self.ref = self.db.collection(u'users')
        query = self.ref.where("email", "==", email)
        return [doc.to_dict() for doc in query.stream()] if query else None


    def set_specialist_schedule_block(self, specialist_uuid: str, date: str):
        print('set_specialist_schedule_block', specialist_uuid)
        print('set_specialist_schedule_block', date)
        uuid = str(uuid4())
        try:
            self.ref = self.db.collection(u'schedules').document(uuid)
            self.ref.set({
                "uuid": uuid,
                "specialist_uuid": specialist_uuid,
                "date": date,
                "block_0": BLOCK_0,
                "block_1": BLOCK_1,
                "block_2": BLOCK_2,
                "block_3": BLOCK_3,
                "block_4": BLOCK_4,
                "block_5": BLOCK_5,
                "block_6": BLOCK_6,
                "block_7": BLOCK_7,
                "block_8": BLOCK_8,
                "block_9": BLOCK_9,
                "block_10": BLOCK_10,
                "block_11": BLOCK_11
            })
            return self.ref.get().to_dict()
        except Exception as e:
            print(e)
            return [] # TODO: Control this exception with a class that return


    def update_specialist_schedule_block(self, uuid: str, block_id: str, status: str):
        print('update_specialist_schedule_block', uuid)
        print('update_specialist_schedule_block', block_id)
        print('update_specialist_schedule_block', status)
        try:
            self.ref = self.db.collection(u'schedules').document(uuid)
            self.ref.update({ f'block_{block_id}.status': status })
            return self.ref.get().to_dict()
        except Exception as e:
            print(e)
            return []


    ''' Use only for URGENCY.  Specialist can't be restored'''
    def delete_specialist(self, uuid: str):
        self.ref = self.db.collection(u'specialists').document(uuid)
        self.ref.delete()


    def set_default_schedule_days(self,):
        specialist_uuid = str(uuid4())
        self.ref_specialist = self.db.collection(u'specialists').document(specialist_uuid)
        self.ref_specialist.set({
            "first_name": "Admin",
            "last_name": "Admin",
            "email": "admin@admin.cl",
            "phone_number": "56912345678",
            "password": "admin",
            "is_admin": True,
            "is_specialist": True,
            "is_client": False,
            "is_active": True,
            "is_verified": True,
            "is_available": True,
            "is_online": False,
            "is_busy": False,
            "address": "Av. Siempre Viva 742",
            "city": "Santiago",
            "country": "Chile",
            "postal_code": "123456",
            "specialty": "Psicología",
            "sub_specialty": "Psicología Clínica",
            "bio": "",
            "photo_url": "",
            "price": 10000,
            "currency": "CLP",
            "uuid": specialist_uuid,
            "created_at": datetime.now(),
            "updated_at": datetime.now()
        })

        schedule_uuid = str(uuid4())
        self.ref_schedule = self.db.collection(u'schedules').document(schedule_uuid)
        self.ref_schedule.set({
            "uuid": schedule_uuid,
            "specialist_uuid": specialist_uuid,
            "date": date.today().strftime("%Y-%m-%d"),
            "block_0": BLOCK_0,
            "block_1": BLOCK_1,
            "block_2": BLOCK_2,
            "block_3": BLOCK_3,
            "block_4": BLOCK_4,
            "block_5": BLOCK_5,
            "block_6": BLOCK_6,
            "block_7": BLOCK_7,
            "block_8": BLOCK_8,
            "block_9": BLOCK_9,
            "block_10": BLOCK_10,
            "block_11": BLOCK_11
        })

        return specialist_uuid
        

class FirebaseAuth:
    def create_user(self, email, password):
        password = 'password'

        try:
            user = auth.create_user(
                email=email,
                password=password,
                app=app
            )
            print('Successfully created new user:', user.uid)
            return user
        except Exception as error:
            print('Error creating new user:', error)