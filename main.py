from fastapi import FastAPI
from common.database.db import engine, Base
from users.user_controller import app as userRouter

Base.metadata.create_all(bind=engine)

app = FastAPI()

app.include_router(userRouter)
