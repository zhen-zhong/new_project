# app/main.py
from fastapi import FastAPI
from app.core.config import settings
from app.api.routers import api_router

# 创建 FastAPI 应用实例
app = FastAPI(title=settings.PROJECT_NAME)

# 2. 包含中央 API 路由器
# 我们将总前缀 /api 放在这里，所有子路由的前缀都会基于此
app.include_router(api_router, prefix="/api")

@app.get("/")
def read_root():
    return {"message": "Welcome to My Awesome API!"}