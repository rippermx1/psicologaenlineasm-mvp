import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore
from firebase_admin import auth
import json


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