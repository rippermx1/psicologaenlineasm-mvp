from pykhipu.client import Client
from exceptions import KhipuGetBanksException
from constants import RETURN_URL, CANCEL_URL, CURRENCY_CLP
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

    def create_payment(self, payment):
        transaction_id = payment['transaction_id']
        try:
            print('create_payment')
            _payment = self.client.payments.post(
                subject=payment['subject'],
                currency=CURRENCY_CLP,
                amount=payment['amount'],
                transaction_id=transaction_id,
                return_url=f'http://127.0.0.1:8001/payment/confirm?trx_id={transaction_id}',
                cancel_url=f'http://127.0.0.1:8001/payment/error?trx_id={transaction_id}',
                picture_url='https://images.deepai.org/machine-learning-models/0c7ba850aa2443d7b40f9a45d9c86d3f/text2imgthumb.jpeg',
                body=payment['body']
            )
            payment['payment_id'] = _payment.payment_id
            payment['payment_url'] = _payment.payment_url
            payment['status'] = None
            payment['status_detail'] = None
            # TO DO: Insert Mongo DB
            # get plan by id
            # get price plan's
            # database.payment.insert(email, transaction_id, plan_id, date, amount,)
            self.db.add_payment(payment)
            return _payment.payment_url
        except Exception as e:
            print(e)
            return None

    def get_payment(self, trx_id):
        try:
            payment = self.db.get_payment(trx_id)[0]
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
