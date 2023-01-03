from pykhipu.client import Client
from exceptions import KhipuGetBanksException
from constants import PICTURE_URL, RETURN_URL, CANCEL_URL, CURRENCY_CLP


class PaymentMethod(object):
    pass

class CryptoPaymentMethod(PaymentMethod):
    pass

class BankPaymentMethod(PaymentMethod):
    pass

class KhipuPayment(object):
    def __init__(self):
        self.client = Client(receiver_id='433491', secret='86db469310a35b26a914514917915cf5db7fbd3c')
        
    def get_banks(self): 
        try:
            banks_list = []
            # BankItem = bank_id | name | message | min_amount | bank_type | parent 
            banks = self.client.banks.get().banks
            return [ banks_list.append({'id': b.bank_id, 'name': b.name}) for b in banks]
        except KhipuGetBanksException as e:
            print(e)
            return None

    def create_payment(self, subject, amount, transaction_id, body):
        try:
            print('create_payment')
            payment = self.client.payments.post(
                subject=subject,
                currency=CURRENCY_CLP, 
                amount=amount,
                transaction_id=transaction_id,
                return_url='http://127.0.0.1:8001/payment/confirm',
                cancel_url='http://127.0.0.1:8001/payment/error',
                picture_url='https://images.deepai.org/machine-learning-models/0c7ba850aa2443d7b40f9a45d9c86d3f/text2imgthumb.jpeg',
                body=body
                )
            return payment.payment_url
        except Exception as e:
            print(e)
            return None