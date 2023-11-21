from pydantic import BaseModel, EmailStr, model_validator
from typing import Optional
from fastapi import HTTPException


class UpdateUserInput(BaseModel):
    username: Optional[str] = None
    password: Optional[str] = None
    confirm_password: Optional[str] = None
    age: Optional[int] = None
    email: Optional[EmailStr] = None

    @model_validator(mode="after")
    def validate_pw(cls, values):
        if values.password and values.confirm_password:
            if values.password != values.confirm_password:
                raise HTTPException(
                    status_code=400,
                    detail="password와 confirm_password 가 같지 않음",
                )
        elif values.password and not values.confirm_password:
            raise HTTPException(
                status_code=400,
                detail="비번 변경시 confirm_password 입력 필수",
            )
        elif values.confirm_password and not values.password:
            raise HTTPException(
                status_code=400,
                detail="비번 변경시 password 입력 필수",
            )
        return values
