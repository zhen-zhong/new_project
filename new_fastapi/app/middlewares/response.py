# app/middlewares/response.py

import json
from starlette.middleware.base import BaseHTTPMiddleware
from starlette.requests import Request
from starlette.responses import Response, JSONResponse
from typing import Callable, Awaitable

API_PREFIX = "/api"

class responseMiddleware(BaseHTTPMiddleware):
    async def dispatch(
        self, request: Request, call_next: Callable[[Request], Awaitable[Response]]
    ) -> Response:
        
        if not request.url.path.startswith(API_PREFIX):
            return await call_next(request)

        response = await call_next(request)

        if (200 <= response.status_code < 300 and
            "application/json" in response.headers.get("content-type", "")):
            
            response_body = b""
            async for chunk in response.body_iterator:
                response_body += chunk
            
            try:
                data = json.loads(response_body.decode())
            except (json.JSONDecodeError, UnicodeDecodeError):
                data = None

            unified_content = {
                "code": 0,
                "message": "操作成功",
                "data": data,
            }
            response_headers = dict(response.headers)
            response_headers.pop("content-length", None)
            response_headers.pop("content-type", None)
            return JSONResponse(
                status_code=response.status_code,
                content=unified_content,
                headers=response_headers
            )

        return response