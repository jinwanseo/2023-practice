from apscheduler.schedulers.background import BackgroundScheduler
from reddit_.config.connection import channel, queue_name

channel.queue_declare(
    queue=queue_name,
)

# 정해진 날짜/시/분/초에 스케쥴 실행
sched = BackgroundScheduler(
    timezone="Asia/Seoul",
)


def start_task(
    task_id: int,
    job_id: str,
    interval: int,
    start_date: str = None,
    end_date: str = None,
):
    def send_message():
        channel.basic_publish(
            exchange="",
            routing_key=queue_name,
            body=str(task_id),
        )

    sched.add_job(
        send_message,
        "interval",
        seconds=int(interval),
        id=job_id,
    )
    sched.start()


def remove_task(job_id: str):
    sched.remove_job(job_id=job_id)


def start_scheduler(schedule_func, job_id: str):
    sched.add_job(schedule_func, "interval", seconds=2, id=job_id)
    sched.start()


def pause_scheduler(pause_func, job_id: str):
    pause_func()
    sched.pause_job(job_id)


def remove_scheduler(remove_func, job_id: str):
    remove_func()
    sched.remove_job(job_id)
