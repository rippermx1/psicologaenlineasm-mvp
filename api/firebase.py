import firebase_admin
from firebase_admin import credentials
from firebase_admin import db
from payment import KhipuPayment

class FirebaseDatabase:
    def __init__(self):
        firebase_admin.initialize_app(credentials.Certificate("./psicologaenlineasm-firebase.json"))
        self.ref = db.reference("/")

    def add_payment(self, payment: KhipuPayment):
        print(payment.__dict__)
        print(self.ref.set(payment.__dict__))
    