# my_fastapi_project/app/schemas/auth.py
from pydantic import BaseModel
from typing import Optional

class UserIn(BaseModel):
    """用于用户注册和登录的输入模型"""
    username: str
    password: str

class UserOut(BaseModel):
    """用于返回用户信息的输出模型"""
    id: int
    username: str
    email: str

class Token(BaseModel):
    """用于JWT认证的Token模型"""
    access_token: str
    token_type: str

class TokenData(BaseModel):
    """用于JWT Payload中存储的数据模型"""
    username: Optional[str] = None

class MessageOut(BaseModel):
    """用于返回成功或失败消息的通用模型"""
    message: str