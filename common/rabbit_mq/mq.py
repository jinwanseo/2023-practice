import pika

from common.config import MQ_HOST, MQ_USER, MQ_PASS, MQ_PORT

# RabbitMQ 설정
connectionParameters = pika.ConnectionParameters(
    host=MQ_HOST,
    port=MQ_PORT,
    virtual_host=MQ_USER,
    credentials=pika.PlainCredentials(
        username=MQ_USER,
        password=MQ_PASS,
    ),
)

# RabbitMQ 연결
connection = pika.BlockingConnection(connectionParameters)
# channel = connection.channel()

# 큐 선언
# queue_name = "jw_queue"
