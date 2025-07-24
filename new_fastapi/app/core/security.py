# my_fastapi_project/app/core/security.py

import os
from datetime import datetime, timedelta
from typing import Optional, Dict, Any

from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from jose import JWTError, jwt
from passlib.context import CryptContext

from app.schemas.auth import TokenData
from app.core.config import settings # <-- 关键：从 config 导入 settings

# JWT 配置从 settings 加载
SECRET_KEY = settings.SECRET_KEY
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_DAYS = settings.ACCESS_TOKEN_EXPIRE_DAYS

# 密码哈希上下文
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

# OAuth2PasswordBearer 是一种 FastAPI 依赖，用于从请求头中提取 token
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/api/v1/login") # 指向登录接口的实际路径

# --- 密码哈希和验证 ---
def verify_password(plain_password: str, password: str) -> bool:
    return pwd_context.verify(plain_password, password)

def get_password_hash(password: str) -> str:
    return pwd_context.hash(password)

# --- JWT Token 的生成和验证 ---
def create_access_token(data: Dict[str, Any], expires_delta: Optional[timedelta] = None) -> str:
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(days=ACCESS_TOKEN_EXPIRE_DAYS)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt

def verify_token(token: str) -> TokenData:
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        username: str = payload.get("sub")
        if username is None:
            raise credentials_exception
        token_data = TokenData(username=username)
    except JWTError:
        raise credentials_exception
    return token_data

# --- JWT 依赖注入 (用于保护路由) ---
from sqlalchemy.ext.asyncio import AsyncSession
from app.core.database import get_db
from app.crud.user import get_user_by_username
from app.models.user import User # 导入 ORM 模型

async def get_current_username(token: str = Depends(oauth2_scheme)) -> str:
    """从 JWT 中获取当前用户名（不进行数据库查询）"""
    token_data = verify_token(token)
    return token_data.username

async def get_current_user(
    db: AsyncSession = Depends(get_db),
    username: str = Depends(get_current_username)
) -> User:
    """获取当前认证的用户对象（包含数据库查询）"""
    user = await get_user_by_username(db, username=username)
    if user is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="User not found")
    return user