from fastapi import APIRouter
from reddit_.config.connection import channel, queue_name

app = APIRouter(prefix="/reddit", tags=["redditMQ"])


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
