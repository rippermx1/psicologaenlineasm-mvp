from pykhipu.client import Client

client = Client(receiver_id='433491', secret='86db469310a35b26a914514917915cf5db7fbd3c')
payment = client.payments.post(
    'test', 
    'CLP', 
    10500,
    transaction_id='FACT2001',
    body='Descripción de la compra',
    picture_url='http://mi-ecomerce.com/pictures/foto-producto.jp',
    return_url='http://mi-ecomerce.com/backend/return',
    cancel_url='http://mi-ecomerce.com/backend/cancel',
    )
print(payment.payment_url)

banks = client.banks.get().banks
for bank in banks:
    print(bank.name)
    print(bank.min_amount)