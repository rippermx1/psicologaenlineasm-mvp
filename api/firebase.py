import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore
from firebase_admin import auth
from uuid import uuid4
from datetime import datetime

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


    def set_default_schedule_days(self,):
        uuid = str(uuid4())
        self.ref = self.db.collection(u'specialists').document(uuid)
        self.ref.set({
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
            "uuid": uuid,
            "created_at": datetime.now(),
            "updated_at": datetime.now(),
            "schedule": []
        })
        schedule = []
        for i in range(1, 365):
            schedule.append({
                "day_of_year": i,
                "first_block": { "label": '09:00', "is_available": True },
                "second_block": { "label": '09:00', "is_available": True },
                "third_block": { "label": '09:00', "is_available": True },
                "fourth_block": { "label": '09:00', "is_available": True },
                "fifth_block": { "label": '09:00', "is_available": True },
                "sixth_block": { "label": '09:00', "is_available": True },
                "seventh_block": { "label": '09:00', "is_available": True },
                "eighth_block": { "label": '09:00', "is_available": True },
                "ninth_block": { "label": '09:00', "is_available": True },
                "tenth_block": { "label": '09:00', "is_available": True },
                "eleventh_block": { "label": '09:00', "is_available": True }, 
                "twelfth_block": { "label": '09:00', "is_available": True },
            })
        self.ref.update({"schedule": schedule})
        

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