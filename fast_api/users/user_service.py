from users.dtos.create_user import CreateUserInput
from sqlalchemy import or_, and_
from sqlalchemy.orm import Session, undefer
from users.entities.user import User
from fastapi import HTTPException, Response
from users.dtos.read_users import ReadUsersInput
from users.dtos.update_user import UpdateUserInput
from users.dtos.delete_user import DeleteUserInput


# 유저 생성
def create(createUserInput: CreateUserInput, db: Session):
    exist = get_or_none_by_arr(
        db,
        createUserInput,
        ["email", "username"],
    )

    if exist != None:
        raise HTTPException(status_code=400, detail="유저 이름 / 이메일 중복")

    new_user = User(
        **createUserInput.dict(exclude_unset=True, exclude={"confirm_password"})
        # username=createUserInput.username,
        # age=createUserInput.age,
        # email=createUserInput.email,
    )

    new_user.hashPw(createUserInput.password)

    # db.add(new_user)
    # db.commit()
    # db.refresh(new_user)

    return {"ok": True}


def update(user_id: int, updateUserInput: UpdateUserInput, db: Session):
    user: User = get_by_id(user_id, db, True)

    if user is None:
        raise HTTPException(status_code=404, detail="유저 정보가 없음")

    data = {
        "username": updateUserInput.username,
        "age": updateUserInput.age,
        "email": updateUserInput.email,
        "password": updateUserInput.password,
    }

    for key, value in data.items():
        if value != None and key != "password":
            setattr(user, key, value)

    if data["password"]:
        user.hashPw(data["password"])

    db.commit()
    db.refresh(user)

    return {"ok": True}


def delete(deleteUserInput: DeleteUserInput, db: Session):
    user = get_by_id(deleteUserInput.user_id, db)
    if user is None:
        raise HTTPException(
            status_code=404,
            detail="삭제할 유저 조회 실패",
        )
    try:
        db.delete(user)
        db.commit()
        return {
            "ok": True,
        }
    except:
        raise HTTPException(
            status_code=500,
            detail="삭제 실패",
        )


def filter_by(readUsersInput: ReadUsersInput, db: Session):
    query = db.query(User)

    # 키워드
    if readUsersInput.keyword:
        query = query.filter(
            or_(
                User.username.ilike(f"%{readUsersInput.keyword}%"),
                User.email.ilike(f"%{readUsersInput.keyword}%"),
            )
        )

    # 날짜
    if readUsersInput.start_date and readUsersInput.end_date:
        query = query.filter(
            and_(
                User.updated_at >= readUsersInput.start_date,
                User.updated_at <= readUsersInput.end_date,
            )
        )

    results = query.all()
    return {"ok": True, "reuslts": results}


# attrs 를 입력 받고 해당 항목 중복 체크
def get_or_none_by_arr(db, input_data, attrs):
    filters = [getattr(User, attr) == getattr(input_data, attr) for attr in attrs]
    return db.query(User).filter(or_(*filters)).one_or_none()


def get_by_name(username: str, db: Session):
    return db.query(User).filter(User.username.ilike(f"%{username}%")).one_or_none()


# id 로 유저를 검색하되 password 포함 포함 여부
def get_by_id(user_id: int, db: Session, importPw: bool = False):
    query = db.query(User)
    if importPw:
        query = query.options(undefer(User.password))
    return (
        query.options(undefer(User.password)).filter(User.id == user_id).one_or_none()
    )
