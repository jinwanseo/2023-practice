import re
from pydantic import BaseModel, validator, EmailStr, model_validator
from fastapi import HTTPException


class CreateUserInput(BaseModel):
    username: str = "jinwanseo"
    password: str = "12345#"
    confirm_password: str = "12345#"
    age: int = 37
    email: EmailStr = "jinwanseo@gmail.com"

    @validator("username", "password")
    def validate_length(cls, value: str):
        if len(value) < 3 or len(value) > 10:
            raise HTTPException(
                status_code=400,
                detail="3글자 이상 10글자 미만",
            )
        return value

    @validator("password")
    def validate_password(cls, value: str):
        if not value:
            return value
        # 비밀번호에 최소 1개 이상의 특수 문자를 포함하는지 확인
        if not re.search(r"[!@#$%^&*(),.?\":{}|<>]", value):
            raise HTTPException(
                status_code=400,
                detail="비밀번호는 최소 1개 이상의 특수 문자를 포함해야 합니다.",
            )
        return value

    @validator("age")
    def validate_age(cls, value: int):
        if value < 0 or value > 130:
            raise HTTPException(
                status_code=400,
                detail="유효한 age 값 입력 요망",
            )
        return value

    @model_validator(mode="after")
    def validate_model(cls, values):
        if values.password != values.confirm_password:
            raise HTTPException(
                status_code=400,
                detail="password, confirm_password 다름",
            )

        return values
