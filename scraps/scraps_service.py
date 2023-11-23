from scraps.dtos.create_scrap import CreateScrapInput
from sqlalchemy.orm import Session
from scraps.entities.scrap import Scrap
from scraps.dtos.delete_scrap import DeleteScrapInput
from fastapi import HTTPException


def create(createScrapInput: CreateScrapInput, db: Session):
    try:
        new_scrap = Scrap(
            **createScrapInput.dict(
                exclude_unset=None,
            ),
        )

        db.add(new_scrap)
        db.commit()
        db.refresh(new_scrap)
        return {"ok": True}

    except Exception as err:
        print(err)
        raise HTTPException(
            status_code=404,
            detail="스크랩 저장 도중 에러 발생",
        )


def delete(deleteScrapInput: DeleteScrapInput, db: Session):
    try:
        delete_scrap = (
            db.query(Scrap).filter(Scrap.id == deleteScrapInput.id).one_or_none()
        )
        db.delete(delete_scrap)
        db.commit()

        return {"ok": True}
    except Exception as err:
        print(err)
        raise HTTPException(status_code=400, detail="스크랩 삭제 도중 에러 발생")
