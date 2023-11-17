from fastapi import APIRouter, Depends
from boards import board_service as boardService
from boards.dtos.create_board_dto import CreateBoardInput
from sqlalchemy.orm import Session
from common.database.db import get_db

app = APIRouter(prefix="/board")

@app.post('/create')
def createBoard(board: CreateBoardInput, db: Session = Depends(get_db)):
    return boardService.createBoard(board, db)