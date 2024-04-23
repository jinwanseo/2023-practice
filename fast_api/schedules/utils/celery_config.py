from celery import Celery
from kombu import Queue

# Celery 설정 / 추가
celery_config = Celery(
    __name__,
    broker="pyamqp://guest@localhost//",
    backend="rpc://",
)

celery_config.conf.update(
    CELERY_TASK_TRACK_STARTED=True,
    broker_connection_retry_on_startup=True,
    task_queues=(Queue("celery_task"),),
)


## 이곳에 스케쥴러 작성


@celery_config.task
def schedule_task_item(x, y):
    return x + y
