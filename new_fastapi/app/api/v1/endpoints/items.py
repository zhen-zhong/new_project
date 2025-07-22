# app/api/v1/endpoints/todos.py
from fastapi import APIRouter, HTTPException
from typing import List
from app.schemas.todo import Todo, TodoCreate, TodoUpdate
from app.models.todo import TodoInDB

router = APIRouter()

# 模拟数据库存储
fake_todos_db = {
    1: {"id": 1, "title": "Learn FastAPI", "description": "Study the official docs", "completed": False},
    2: {"id": 2, "title": "Build an App", "description": "Use the standard project structure", "completed": True},
}

@router.get("/", response_model=List[Todo])
def read_todos():
    """
    获取所有待办事项
    """
    return list(fake_todos_db.values())

@router.post("/", response_model=Todo, status_code=201)
def create_todo(todo: TodoCreate):
    """
    创建一个新的待办事项
    """
    new_id = max(fake_todos_db.keys() or [0]) + 1
    new_todo = TodoInDB(id=new_id, **todo.model_dump())
    fake_todos_db[new_id] = new_todo.model_dump()
    return new_todo

@router.get("/{todo_id}", response_model=Todo)
def read_todo(todo_id: int):
    """
    根据 ID 获取单个待办事项
    """
    if todo_id not in fake_todos_db:
        raise HTTPException(status_code=404, detail="Todo not found")
    return fake_todos_db[todo_id]

@router.put("/{todo_id}", response_model=Todo)
def update_todo(todo_id: int, todo: TodoUpdate):
    """
    更新一个待办事项
    """
    if todo_id not in fake_todos_db:
        raise HTTPException(status_code=404, detail="Todo not found")
    
    stored_todo_data = fake_todos_db[todo_id]
    update_data = todo.model_dump(exclude_unset=True)
    updated_todo = stored_todo_data.copy()
    updated_todo.update(update_data)
    fake_todos_db[todo_id] = updated_todo
    return updated_todo