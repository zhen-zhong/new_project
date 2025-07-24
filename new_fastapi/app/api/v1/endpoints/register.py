# my_fastapi_project/app/api/v1/endpoints/register.py

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.exc import IntegrityError # 导入处理数据库唯一性约束的异常
from sqlalchemy.ext.asyncio import AsyncSession

from app.schemas.auth import UserIn, MessageOut # 导入 UserIn 和 MessageOut
from app.core.security import get_password_hash
from app.core.database import get_db
from app.crud.user import get_user_by_username, get_user_by_email, create_user # 导入 CRUD 函数

register = APIRouter()

@register.post("/register", response_model=MessageOut, status_code=status.HTTP_201_CREATED, summary="用户注册")
async def register_user(user_in: UserIn, db: AsyncSession = Depends(get_db)):
    """
    **注册新用户。**

    - 如果用户名或邮箱已存在，返回 400 错误。
    - 成功注册后，返回成功消息。
    """
    # 检查用户名是否已存在
    existing_user_by_username = await get_user_by_username(db, username=user_in.username)
    if existing_user_by_username:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Username already registered"
        )
    
    # 检查邮箱是否已存在
    existing_user_by_email = await get_user_by_email(db, email=user_in.email)
    if existing_user_by_email:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Email already registered"
        )

    password = get_password_hash(user_in.password)

    try:
        await create_user(
            db=db,
            username=user_in.username,
            email=user_in.email,
            password=password,
        )
        
    except IntegrityError:
        # 捕获数据库层面的唯一性约束错误（例如，如果用户名或邮箱的唯一性检查更晚发生）
        await db.rollback() # 发生错误时回滚事务
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Registration failed due to data integrity issue (e.g., duplicate username or email).")
    except Exception as e:
        # 捕获其他未知错误，并打印日志（在生产中应使用真正的日志系统）
        await db.rollback() # 确保回滚事务
        print(f"Database error during user registration: {e}")
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=f"Failed to register user due to an unexpected error.")

    # 注册成功，返回通用成功消息
    return MessageOut(message="用户注册成功！")