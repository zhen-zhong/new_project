# app/api/routers.py
from fastapi import APIRouter

# 从各个模块导入子路由器
from app.api.v1.endpoints import items as v1_items
from app.api.v1.endpoints import users as v1_users
from app.api.v1.endpoints import llm as v1_llm

# 创建一个主 API 路由器
api_router = APIRouter()

# 使用 include_router 将 v1 的路由包含进来
# prefix 会添加到该 router 中所有路径的前面
# tags 会在 Swagger UI 中将这些端点分组，非常有用
api_router.include_router(v1_items.router, prefix="/v1/items", tags=["v1-items"])
api_router.include_router(v1_users.router, prefix="/v1/users", tags=["v1-users"])
api_router.include_router(v1_llm.router, prefix="/v1/llm", tags=["v1-llm"])
