import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore

class FirebaseDatabase:
    def __init__(self):
        self.app = firebase_admin.initialize_app(credentials.Certificate("./psicologaenlineasm-firebase.json"))
        self.db = firestore.client(self.app)
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