from pydantic import BaseModel


class DeployTaskInput(BaseModel):
    deploy_yn: bool
