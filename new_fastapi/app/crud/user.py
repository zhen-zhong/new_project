# my_fastapi_project/app/crud/user.py
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from typing import Optional
from app.models.user import User 

async def create_user(db: AsyncSession, username: str, email: str, password: str) -> User:
    """在数据库中创建新用户"""
    db_user = User(
        username=username,
        email=email,
        password=password,
    )
    
    db.add(db_user)
    await db.commit()
    await db.refresh(db_user)
    return db_user

async def get_user_by_username(db: AsyncSession, username: str) -> Optional[User]:
    """根据用户名从数据库获取用户"""
    result = await db.execute(
        select(User).where(User.username == username)
    )
    return result.scalars().first()

async def get_user_by_email(db: AsyncSession, email: str) -> Optional[User]:
    """根据邮箱从数据库获取用户"""
    result = await db.execute(
        select(User).where(User.email == email)
    )
    return result.scalars().first()