from pykhipu.client import Client
from exceptions import KhipuGetBanksException
from constants import RETURN_URL, CANCEL_URL, CURRENCY_CLP, API_URL
from firebase import FirebaseDatabase


class PaymentMethod(object):
    pass


class CryptoPaymentMethod(PaymentMethod):
    pass


class BankPaymentMethod(PaymentMethod):
    pass


class KhipuPayment(object):
    def __init__(self):
        self.client = Client(receiver_id='433491',
                             secret='86db469310a35b26a914514917915cf5db7fbd3c')
        self.db = FirebaseDatabase()

    def get_banks(self):
        try:
            banks_list = []
            # BankItem = bank_id | name | message | min_amount | bank_type | parent
            banks = self.client.banks.get().banks
            return [banks_list.append({'id': b.bank_id, 'name': b.name}) for b in banks]
        except KhipuGetBanksException as e:
            print(e)
            return None

    def get_status(self, trx_id):
        return self.client.payments.get_id(trx_id)

    def create_payment(self, trx):
        print(trx)
        try:
            print('create_payment')
            id = self.db.create_patient_payment(trx)
            payment = self.client.payments.post(
                subject=trx['subject'],
                currency=CURRENCY_CLP,
                amount=trx['amount'],
                transaction_id=id,
                return_url=f'{API_URL}/payment/confirm?trx_id={id}&user_id={trx["user_id"]}',
                cancel_url=f'{API_URL}/payment/error?trx_id={id}&user_id={trx["user_id"]}',
                picture_url='https://images.deepai.org/machine-learning-models/0c7ba850aa2443d7b40f9a45d9c86d3f/text2imgthumb.jpeg',
                body=trx['body']
            )
            trx['payment_id'] = payment.payment_id
            trx['payment_url'] = payment.payment_url
            trx['status'] = None
            trx['status_detail'] = None
            self.db.update_payment(id, trx)

            return payment.payment_url
        except Exception as e:
            print(e)
            return None

    def get_payment(self, trx_id, user_id):
        try:
            payment = self.db.get_payment(trx_id, user_id)
            print('get_payment', payment)
            return self.client.payments.get_id(payment['payment_id'])
        except Exception as e:
            print(e)
            return None

    def update_payment_status(self, payment):
        try:
            self.db.update_payment_status(
                payment.payment_id, payment.status, payment.status_detail)
        except Exception as e:
            pass
