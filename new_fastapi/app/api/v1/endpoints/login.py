# my_fastapi_project/app/api/v1/endpoints/login.py
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession

from app.schemas.auth import UserIn, Token, UserOut
from app.core.security import verify_password, create_access_token, get_current_user # 导入安全模块的函数
from app.core.database import get_db
from app.crud.user import get_user_by_username # 导入 CRUD 函数

login = APIRouter()

@login.post("/login", response_model=Token, summary="用户登录并获取 JWT Token")
async def login_for_access_token(user_in: UserIn, db: AsyncSession = Depends(get_db)):
    """
    **用户登录。**
    - 验证用户名和密码。
    - 成功则返回 JWT 访问令牌。
    """
    user = await get_user_by_username(db, user_in.username) # 从数据库获取用户
    if not user or not verify_password(user_in.password, user.password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    
    # 创建 JWT 时，sub 字段通常是用户的唯一标识，这里使用 username
    access_token = create_access_token(
        data={"sub": user.username}
    )
    return {"access_token": access_token, "token_type": "bearer"}

@login.get("/me", response_model=UserOut, summary="获取当前用户信息（需JWT认证）")
async def read_users_me(current_user: UserOut = Depends(get_current_user)): # get_current_user 返回的是 User ORM 对象
    """
    **一个受保护的路由，需要有效的 JWT token 才能访问。**
    通过 `Authorization: Bearer <your_token>` 头发送。
    """
    # 直接返回 current_user (它已经是一个 User ORM 对象)，Pydantic 会自动将其转换为 UserOut 模型
    # 如果 get_current_user 返回的是 ORM User 对象，FastAPI 会自动将其映射到 UserOut
    # 只要 UserOut 的字段是 User 对象的子集，并且名称匹配
    return current_user