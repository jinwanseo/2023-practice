from fastapi import FastAPI
from common.database.db import engine, Base
from users.user_controller import app as userRouter
from boards.board_controller import app as boardRouter

Base.metadata.create_all(bind=engine)

app=FastAPI()

app.include_router(userRouter)
app.include_router(boardRouter)