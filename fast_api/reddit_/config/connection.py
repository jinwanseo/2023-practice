from common.utils.env_data import REDDIT_HOST, REDDIT_PORT, REDDIT_USER, REDDIT_PW
import pika

# RabbitMQ 설정
connectionParameters = pika.ConnectionParameters(
    host=REDDIT_HOST,
    port=REDDIT_PORT,
    credentials=pika.PlainCredentials(
        username=REDDIT_USER,
        password=REDDIT_PW,
    ),
)

# RabbitMQ 연결
connection = pika.BlockingConnection(connectionParameters)
channel = connection.channel()

# 큐 선언
queue_name = "jw_queue"
