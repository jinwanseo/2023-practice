from fastapi import FastAPI
from common.database.db import engine, Base
from users.user_controller import app as userRouter
from redis_.redis_controller import app as redisRouter
from reddit_.reddit_controller import app as reddisRouter
from schedules.schedule_controller import app as scheduleRouter

Base.metadata.create_all(bind=engine)
app = FastAPI()

app.include_router(userRouter)
app.include_router(redisRouter)
app.include_router(reddisRouter)
app.include_router(scheduleRouter)
