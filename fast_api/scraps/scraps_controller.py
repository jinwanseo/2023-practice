from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from common.database.db import get_db
from scraps import scraps_service
from scraps.dtos.create_scrap import CreateScrapInput
from scraps.dtos.delete_scrap import DeleteScrapInput

app = APIRouter(prefix="/scraps", tags=["스크랩 관리"])


@app.get("/create")
def create(createScrapInput: CreateScrapInput, db: Session = Depends(get_db)):
    return scraps_service.create(createScrapInput, db)


@app.delete("/delete")
def delete(deleteScrapInput: DeleteScrapInput, db: Session = Depends(get_db)):
    return scraps_service.delete(deleteScrapInput, db)
