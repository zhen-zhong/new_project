# my_fastapi_project/app/main.py

from fastapi import FastAPI, HTTPException
from pydantic import BaseModel

# ▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼ 添加这两个关键的导入 ▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼
from starlette.exceptions import HTTPException as StarletteHTTPException
from fastapi.exceptions import RequestValidationError
# ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲

# 导入你自己的模块
from app.core.config import settings
from app.core.database import init_db
from app.api.routers import api_router # 确保这个导入路径是正确的

from app.middlewares.cors import setup_cors_middleware
from app.middlewares.response import responseMiddleware 
from app.utils.error_response import http_exception_handler, validation_exception_handler

# --- FastAPI 应用实例化 ---
app = FastAPI(
    title=settings.PROJECT_NAME,
    description="test666",
    version="1.0.0",
    exception_handlers={
        StarletteHTTPException: http_exception_handler,
        RequestValidationError: validation_exception_handler,
    }
)

# --- 挂载中间件 ---
# 1. CORS 中间件 (通过辅助函数挂载)
setup_cors_middleware(app)

# 2. 统一响应中间件 (直接挂载类)
app.add_middleware(responseMiddleware)


# --- 注册启动事件 ---
@app.on_event("startup")
async def on_startup():
    print("Initializing database...")
    await init_db()
    print("Database initialized.")


# --- 注册 API 路由 ---
app.include_router(api_router, prefix="/api")


@app.get("/", tags=["Root"])
def read_root():
    return {"message": f"Welcome to {settings.PROJECT_NAME}!"}