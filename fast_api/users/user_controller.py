from fastapi import APIRouter, Depends
from users import user_service as userService
from common.database.db import get_db
from users.dtos.create_user import CreateUserInput
from sqlalchemy.orm import Session
from users.dtos.read_users import ReadUsersInput
from users.dtos.update_user import UpdateUserInput
from users.dtos.delete_user import DeleteUserInput

app = APIRouter(
    prefix="/user",
    tags=["유저 관리"],
)


@app.post("/create", summary="유저 생성", description="유저 생성 API")
def create(
    user: CreateUserInput,
    db: Session = Depends(get_db),
):
    return userService.create(user, db)


@app.patch("/update/{uesrId}", summary="유저 수정", description="유저 수정 API")
def update(
    uesr_id: int,
    updateUserInput: UpdateUserInput,
    db: Session = Depends(get_db),
):
    return userService.update(uesr_id, updateUserInput, db)


@app.delete("/delete", summary="유저 삭제", description="유저 정보 삭제 API")
def delete(deleteUserInput: DeleteUserInput, db: Session = Depends(get_db)):
    return userService.delete(deleteUserInput, db)


@app.post("/list", summary="유저 리스트", description="유저 리스트 API")
def reads(readUsersInput: ReadUsersInput, db: Session = Depends(get_db)):
    return userService.filter_by(readUsersInput, db)
