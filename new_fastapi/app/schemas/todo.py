# app/schemas/todo.py
from pydantic import BaseModel,ConfigDict
from typing import Optional

# 基础模型
class TodoBase(BaseModel):
    title: str
    description: Optional[str] = None

# 创建时需要的模型 (继承基础模型)
class TodoCreate(TodoBase):
    pass

# 更新时需要的模型 (所有字段可选)
class TodoUpdate(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = None
    completed: Optional[bool] = None

# 数据库模型或响应模型
class Todo(TodoBase):
    id: int
    completed: bool

    model_config = ConfigDict(from_attributes=True)