import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore
from firebase_admin import auth
from uuid import uuid4
from datetime import datetime, date

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


    def get_specialist_schedule(self, uuid: str, date: str):
        print('get_specialist_schedule', uuid)
        print('get_specialist_schedule', date)
        try:
            self.ref = self.db.collection(u'schedules') #.document(uuid)
            return [doc.to_dict() for doc in self.ref.where("specialist_uuid", "==", uuid).where("date", "==", date).stream()]
        except Exception as e:
            print(e)
            return [] # TODO: Control this exception with a class that return [{'msg': 'User not exist'}]


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
            "blocks": [
                { "id": 1, "time": "09:00", "value": "09:00 AM", "selected": False, "status": "DISPONIBLE", "active": True },
                { "id": 2, "time": "10:00", "value": "10:00 AM", "selected": False, "status": "DISPONIBLE", "active": True },
                { "id": 3, "time": "11:00", "value": "11:00 AM", "selected": False, "status": "DISPONIBLE", "active": True },
                { "id": 4, "time": "12:00", "value": "12:00 PM", "selected": False, "status": "DISPONIBLE", "active": True },
                { "id": 5, "time": "13:00", "value": "13:00 PM", "selected": False, "status": "DISPONIBLE", "active": True },
                { "id": 6, "time": "14:00", "value": "14:00 PM", "selected": False, "status": "DISPONIBLE", "active": True },
                { "id": 7, "time": "15:00", "value": "15:00 PM", "selected": False, "status": "DISPONIBLE", "active": True },
                { "id": 8, "time": "16:00", "value": "16:00 PM", "selected": False, "status": "DISPONIBLE", "active": True },
                { "id": 9, "time": "17:00", "value": "17:00 PM", "selected": False, "status": "DISPONIBLE", "active": True },
                { "id": 10, "time": "18:00", "value": "18:00 PM", "selected": False, "status": "DISPONIBLE", "active": True },
                { "id": 11, "time": "19:00", "value": "19:00 PM", "selected": False, "status": "DISPONIBLE", "active": True },
                { "id": 12, "time": "20:00", "value": "20:00 PM", "selected": False, "status": "DISPONIBLE", "active": True }
            ]
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