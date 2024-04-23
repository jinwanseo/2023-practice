import json
import sys

from common.database.db import Base, engine, Session
from common.rabbit_mq.mq import connection, queue_name
from log.entity.log import Log

channel = connection.channel()
channel.basic_qos(prefetch_count=1)

Base.metadata.create_all(bind=engine)


from fastapi import FastAPI

app = FastAPI()


@app.get("/")
async def root():
    return {"message": "Worker Server"}


def job(ch, method, properties, body):
    loads = json.loads(body)
    db = Session()
    try:
        log = Log()
        log.title = loads.pop("title", None)
        log.task_id = loads.pop("id", None)
        log.keyword = loads.pop("keyword", None)
        log.count = loads.pop("count", None)

        db.add(log)
        db.commit()
        db.refresh(log)

        print(f"title: {log.title}")
    except Exception as e:
        print(e)
    finally:
        db.close()


channel.basic_consume(
    queue=queue_name,
    auto_ack=True,
    on_message_callback=job,
)

try:
    print("hello")
    channel.start_consuming()
except KeyboardInterrupt:
    pass


channel.stop_consuming()
connection.close()
sys.exit(0)
