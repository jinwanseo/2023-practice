from fastapi import APIRouter
from reddit_.config.connection import channel, queue_name

app = APIRouter(prefix="/reddit", tags=["redditMQ"])

# 요놈은 미리 실행 되어있어야함.
# (워커 서버가 원하는 queue가 없으면 서버가 열리지 않음)
channel.queue_declare(
    queue=queue_name,
)


# RedditMQ Send Message
@app.get("/send_message/{message}")
def send_message(message: str):
    channel.queue_declare(
        queue=queue_name,
    )
    channel.basic_publish(
        exchange="",
        routing_key=queue_name,
        body=message,
    )

    return {"ok": True, "message": f"Sent {message}"}
