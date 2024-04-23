import pika

from common.config import MQ_HOST, MQ_PORT, MQ_USER, MQ_PASS

connectionParameters = pika.ConnectionParameters(
    host=MQ_HOST,
    port=MQ_PORT,
    virtual_host=MQ_USER,
    credentials=pika.PlainCredentials(username=MQ_USER, password=MQ_PASS),
)

connection = pika.BlockingConnection(connectionParameters)
queue_name = "rb_queue"
