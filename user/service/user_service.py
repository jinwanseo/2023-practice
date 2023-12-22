from typing import List

from user.dto.create_user_input import CreateUserInput
from user.dto.delete_user_input import DeleteUserInput
from user.dto.filter_user_input import FilterUserInput
from user.dto.update_user_input import UpdateUserInput
from user.entity.user import User
from user.repository.user_repository import UserRepository


class UserService:
    def __init__(self, user_repository: UserRepository) -> None:
        self.user_repository = user_repository

    def get_user_by_id(self, user_id: int) -> User:
        user = self.user_repository.get_by_id(user_id)
        return user

    def get_user_by_email(self, user_email: str) -> User:
        user = self.user_repository.get_by_email(user_email)
        return user

    def create_user(self, create_user_input: CreateUserInput) -> User:
        create_user = User(**create_user_input.dict())
        user = self.user_repository.create(create_user)
        return user

    def update_user(self, user_id: int, update_user_input: UpdateUserInput) -> User:
        user = self.user_repository.update(user_id, update_user_input)
        return user

    def delete_user(self, delete_user_input: DeleteUserInput) -> User:
        user = self.user_repository.delete(delete_user_input.user_id)
        return user

    def get_filter_user_list(self, filter_user_input: FilterUserInput) -> List[User]:
        filter_list = self.user_repository.get_filter_list(filter_user_input)
        return filter_list
