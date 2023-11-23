from common.utils.env_data import REDDIT_HOST, REDDIT_PORT, REDDIT_USER, REDDIT_PW
import pika
from common.database.db import SessionLocal
from common.entities.task import Task
from common.crawler.crawler import play_to_crawler
from common.entities.scrap import Scrap

queue_name = "jw_queue"

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


# Recieve Method
def recieve_method(ch, method, properties, body):
    # Db에서 해당 과제 Read
    db = SessionLocal()
    task_id = int(body.decode("utf-8"))
    task = db.query(Task).filter(Task.id == task_id).one_or_none()
    # 에러 출력
    if task is None:
        print("[에러] job을 종료합니다")
        raise Exception("에러 출력")

    # 크롤링 전용 method
    scraps = play_to_crawler(query=task.keyword, count=task.count)

    # 기존 크롤링 데이터 일괄 삭제
    db.query(Scrap).filter(Scrap.task_id == task_id).delete()

    # 스크랩 리스트 데이터 SET
    scrap_list = []
    for scrap in scraps:
        scrap["task_id"] = task_id
        scrap_list.append(Scrap(**scrap))

    # 스크랩 리스트 전체 저장
    db.add_all(scrap_list)
    db.commit()


channel.basic_consume(
    auto_ack=True,
    queue=queue_name,
    on_message_callback=recieve_method,
)

channel.start_consuming()
