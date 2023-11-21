from pydantic_partial import create_partial_model
from users.dtos.create_user import CreateUserInput


class UpdateUserInput(create_partial_model(CreateUserInput)):
    pass
