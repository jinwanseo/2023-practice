from fastapi import Depends
from fastapi.encoders import jsonable_encoder
from fastapi.responses import JSONResponse
from fastapi_utils.cbv import cbv
from fastapi_utils.inferring_router import InferringRouter
from starlette import status

from fast_config import get_user_service
from user.dto.create_user_input import CreateUserInput
from user.dto.delete_user_input import DeleteUserInput
from user.dto.filter_user_input import FilterUserInput
from user.dto.update_user_input import UpdateUserInput
from user.service.user_service import UserService

user_router = InferringRouter()


@cbv(user_router)
class UserController:
    def __init__(
        self,
        user_service: UserService = Depends(get_user_service),
    ):
        self.user_service = user_service

    @user_router.post(
        "/create",
        summary="유저 생성",
        description="유저 생성 요청 API",
    )
    async def create_user(
        self,
        create_user_input: CreateUserInput,
    ):
        user = self.user_service.create_user(create_user_input)
        return JSONResponse(
            status_code=status.HTTP_200_OK,
            content=jsonable_encoder(user),
        )

    @user_router.patch(
        "/update/{user_id}",
        summary="유저 수정",
        description="유저 수정 요청 API",
    )
    async def update_user(
        self,
        user_id: int,
        update_user_input: UpdateUserInput,
    ):
        user = self.user_service.update_user(user_id, update_user_input)
        return JSONResponse(
            status_code=status.HTTP_200_OK,
            content=jsonable_encoder(user),
        )

    @user_router.delete(
        "/delete",
        summary="유저 삭제",
        description="유저 삭제 요청 API",
    )
    async def delete_user(
        self,
        delete_user_input: DeleteUserInput,
    ):
        user = self.user_service.delete_user(delete_user_input)
        return JSONResponse(
            status_code=status.HTTP_200_OK,
            content=jsonable_encoder(user),
        )

    @user_router.get(
        "/profile/id/{user_id}",
        summary="유저 조회 (Id)",
        description="유저 'Id' 조회 요청 API",
    )
    async def get_user_profile_by_id(
        self,
        user_id: int,
    ):
        user = self.user_service.get_user_by_id(user_id)
        return JSONResponse(
            status_code=status.HTTP_200_OK,
            content=jsonable_encoder(user),
        )

    @user_router.get(
        "/profile/email/{user_email}",
        summary="유저 조회 (Email)",
        description="유저 'Email' 조회 요청 API",
    )
    async def get_user_profile_by_email(self, user_email: str):
        user = self.user_service.get_user_by_email(user_email)
        return JSONResponse(
            status_code=status.HTTP_200_OK,
            content=jsonable_encoder(user),
        )

    @user_router.post(
        "/list",
        summary="유저 리스트 조회",
        description="유저 (필터) 리스트 조회 요청 API",
    )
    async def get_user_filter_list(
        self,
        filter_user_input: FilterUserInput,
    ):
        user_list = self.user_service.get_filter_user_list(filter_user_input)
        return JSONResponse(
            status_code=status.HTTP_200_OK,
            content=jsonable_encoder(user_list),
        )
