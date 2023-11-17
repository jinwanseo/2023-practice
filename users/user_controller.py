from fastapi import APIRouter, Depends
from users import user_service as userService
from common.database.db import get_db
from users.dtos.create_user_dto import CreateUserInput
from sqlalchemy.orm import Session


app = APIRouter(prefix='/user')

@app.post('/create')
def createUser(user: CreateUserInput, db: Session = Depends(get_db)):
    return userService.createUser(user, db)

@app.get('/profile')
def getProfileByUserName(username: str, db:Session = Depends(get_db)):
    return userService.getByUsername(username, db)

@app.get('/profile/{userId}')
def getProfile(userId: int, db:Session = Depends(get_db)):
    return userService.getById(userId, db)
