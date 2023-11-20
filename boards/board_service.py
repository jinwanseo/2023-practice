from boards.dtos.create_board_dto import CreateBoardInput
from sqlalchemy.orm import Session
from boards.entities.board import Board


def create_board(board: CreateBoardInput, db: Session):
    try:
        newBoard = Board(
            title=board.title,
            content=board.content,
            author_id=board.author_id,
        )

        db.add(newBoard)
        db.commit()
        db.refresh(newBoard)

        return {"ok": True}
    except Exception as e:
        db.rollback()
        return {"ok": False, "error": str(e)}
