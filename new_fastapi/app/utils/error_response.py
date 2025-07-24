# app/utils/error_response.py

from fastapi import Request, status
from fastapi.responses import JSONResponse
from fastapi.exceptions import RequestValidationError
from starlette.exceptions import HTTPException as StarletteHTTPException

async def http_exception_handler(request: Request, exc: StarletteHTTPException) -> JSONResponse:
    """
    全局异常处理器：处理 FastAPI 的 HTTPException
    这会捕获所有在代码中手动 `raise HTTPException(...)` 的情况。
    """
    return JSONResponse(
        status_code=exc.status_code,
        content={
            "code": exc.status_code,
            "message": exc.detail,
            "data": None
        }
    )

async def validation_exception_handler(request: Request, exc: RequestValidationError) -> JSONResponse:
    """
    全局异常处理器：处理 Pydantic 的数据验证错误 (FastAPI 自动抛出的 422 错误)
    这会在客户端发送的数据不符合 Pydantic 模型时触发。
    """
    # 从 Pydantic 的原始错误信息中提取更友好的消息
    error_messages = []
    for error in exc.errors():
        # 'loc' 是一个元组，例如 ('body', 'username')，我们通常取最后一个元素
        field = error['loc'][-1]
        message = error['msg']
        error_messages.append(f"{field}: {message}")
    
    detailed_message = "; ".join(error_messages)
    
    return JSONResponse(
        status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
        content={
            "code": status.HTTP_422_UNPROCESSABLE_ENTITY,
            "message": f"请求参数验证失败: {detailed_message}",
            "data": None
        }
    )