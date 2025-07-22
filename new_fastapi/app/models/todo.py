# app/models/todo.py
from pydantic import BaseModel
from typing import Optional

# from sqlalchemy import Column, Integer, String, Boolean
# from your_database_setup import Base
#
# class Todo(Base):
#     id = Column(Integer, primary_key=True, index=True)
#     title = Column(String, index=True)
#     description = Column(String, index=True)
#     completed = Column(Boolean, default=False)


class TodoInDB(BaseModel):
    id: int
    title: str
    description: Optional[str] = None
    completed: bool = False