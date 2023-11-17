from fastapi import FastAPI, Depends
from sqlalchemy.orm import Session
from common.database.db import engine, get_db, Base
from boards import board_service as boardService
from boards.dtos.create_board_dto import CreateBoardInput

Base.metadata.create_all(bind=engine)

app=FastAPI()

app.include_router(userRouter)
app.include_router(boardRouter)



@app.get('/user/profile/{userId}')
def getProfile(userId: int, db:Session = Depends(get_db)):
    return userService.getById(userId, db)

@app.post('/board/create')
def createBoard(board: CreateBoardInput, db: Session = Depends(get_db)):
    return boardService.createBoard(board, db)