# my_fastapi_project/app/main.py

from fastapi import FastAPI
from app.core.config import settings # 导入 settings
from app.middlewares.cors import setup_cors_middleware
from app.core.database import init_db # 导入数据库初始化函数
from app.api.routers import api_router

app = FastAPI(title=settings.PROJECT_NAME) # 使用 settings.PROJECT_NAME

# ====== 注册中间件 ======
setup_cors_middleware(app)

# ====== 注册应用启动事件 ======
@app.on_event("startup")
async def on_startup():
    print("Initializing database...")
    await init_db() # 调用数据库初始化函数
    print("Database initialized.")

# ====== 注册 API 路由 ======
app.include_router(api_router, prefix="/api")

# ====== 根路由 ======
@app.get("/", tags=["Root"])
def read_root():
    return {"message": "Welcome to My Awesome API!"}