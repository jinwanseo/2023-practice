from fastapi import APIRouter
from common.utils.env_data import REDIS_DB, REDIS_HOST, REDIS_PORT, REDIS_PW
import redis

client = redis.StrictRedis(
    host=REDIS_HOST,
    port=REDIS_PORT,
    db=REDIS_DB,
    password=REDIS_PW,
)
app = APIRouter(prefix="/redis", tags=["Redis"])


@app.get("/set")
def redis_set(key: str, value: str):
    client.set(key, value)
    return {"ok": True}


@app.get("/get")
def redis_get(key: str):
    value: str = client.get(key)
    return {"ok": True, "result": value}


@app.get("/del")
def redis_del(key: str):
    client.delete(key)
    return {"ok": True}


@app.get("/del/all")
def redis_all():
    client.flushall()
    return {"ok": True}
