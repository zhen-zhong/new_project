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
        
        print("\n--- [MIDDLEWARE] Request Intercepted ---")
        print(f"[DEBUG] Path: {request.url.path}")

        if not request.url.path.startswith(API_P_REFIX):
            print("[DEBUG] Path does not start with /api. Skipping middleware logic.")
            return await call_next(request)
        
        print("[DEBUG] Path matched. Proceeding to get response from route.")
        response = await call_next(request)

        print(f"[DEBUG] Got response. Status Code: {response.status_code}")
        print(f"[DEBUG] Response Type: {type(response)}")

        is_successful = 200 <= response.status_code < 300
        is_json = isinstance(response, JSONResponse)
        
        print(f"[DEBUG] Is successful (2xx)? -> {is_successful}")
        print(f"[DEBUG] Is JSONResponse? -> {is_json}")

        if is_successful and is_json:
            print("[DEBUG] All conditions met. Wrapping response...")
            # ... 包装逻辑 ...
            try:
                response_body = json.loads(response.body.decode())
                unified_content = { "code": 0, "message": "操作成功", "data": response_body }
                return JSONResponse(status_code=response.status_code, content=unified_content, headers=dict(response.headers))
            except json.JSONDecodeError:
                print("[DEBUG] JSONDecodeError! Body might be empty. Wrapping with data: null.")
                unified_content = { "code": 0, "message": "操作成功", "data": None }
                return JSONResponse(status_code=response.status_code, content=unified_content, headers=dict(response.headers))
        else:
            print("[DEBUG] Conditions not met. Returning original response.")

        return response
    async def dispatch(
        self, request: Request, call_next: Callable[[Request], Awaitable[Response]]
    ) -> Response:
        """
        中间件的核心处理逻辑。
        """
        if not request.url.path.startswith(API_PREFIX):
            return await call_next(request)

        response = await call_next(request)
        
        if 200 <= response.status_code < 300 and isinstance(response, JSONResponse):
            try:
                response_body = json.loads(response.body.decode())
            except json.JSONDecodeError:
                return response
            
            unified_content = {
                "code": 0,
                "message": "操作成功",
                "data": response_body,
            }

            return JSONResponse(
                status_code=response.status_code,
                content=unified_content,
                headers=dict(response.headers)
            )

        return response