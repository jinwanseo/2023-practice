from users.dtos.create_user_dto import CreateUserInput
from sqlalchemy.orm import Session
from sqlalchemy.exc import IntegrityError
from users.entities.user import User


# 유저 생성
def create_user(user: CreateUserInput, db: Session):
    try:
        newUser = User(
            username=user.username,
            age=user.age,
            email=user.email,
        )
        newUser.set_password(user.password)

        db.add(newUser)
        db.commit()
        db.refresh(newUser)

        return {"ok": True}
    except IntegrityError as e:
        db.rollback()
        return {"ok": False, "error": "username 이 같은 유저가 존재합니다"}
    except Exception as e:
        db.rollback()
        return {"ok": False, "error": str(e)}


# 유저 프로필 조회 (username)
def get_by_name(username: str, db: Session):
    try:
        user = db.query(User).filter(User.username.contains(username)).one()
        return {"ok": True, "result": user}
    except Exception as e:
        return {"ok": False, "error": str(e)}


# 유저 프로필 조회 (id)
def get_by_id(userId: int, db: Session):
    try:
        user = db.query(User).filter(User.id == userId).one()
        return {"ok": True, "result": user}
    except Exception as e:
        return {"ok": False, "error": str(e)}
