from typing import List

from common.database.db import Session
from user.dto.filter_user_input import FilterUserInput
from user.dto.update_user_input import UpdateUserInput
from user.entity.user import User


class UserRepository:
    def __init__(self, db: Session) -> None:
        self.db = db

    def create(self, user: User) -> User:
        self.db.add(user)
        self.db.commit()
        self.db.refresh(user)
        return user

    def update(self, user_id: int, update_user_input: UpdateUserInput) -> User:
        user = self.get_by_id(user_id)
        update_user_dict = update_user_input.dict(exclude_unset=True)

        for key, value in update_user_dict.items():
            setattr(user, key, value)

        self.db.commit()
        self.db.refresh(user)

        return user

    def delete(self, user_id: int) -> User:
        user = self.get_by_id(user_id)
        self.db.delete(user)
        self.db.commit()
        return user

    def get_by_id(self, user_id: int) -> User:
        user = self.db.query(User).get(user_id)
        return user

    def get_by_email(self, user_email: str) -> User:
        user = self.db.query(User).filter(User.email == user_email).first()
        return user

    def get_filter_list(self, filter_user_input: FilterUserInput) -> List[User]:
        query = self.db.query(User)
        if filter_user_input.email:
            query.filter(User.email == filter_user_input.email)
        if filter_user_input.name:
            query.filter(User.name == filter_user_input.name)

        users = query.all()
        return users
