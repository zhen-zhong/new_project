# app/api/v1/endpoints/llm.py

import httpx
from fastapi import APIRouter, HTTPException

from app.schemas.llm import LLMRequest, LLMResponse
from app.services.deepseek_client import get_deepseek_completion

router = APIRouter()

@router.post("/completion", response_model=LLMResponse)
async def create_completion(request_data: LLMRequest):
    """
    接收用户 prompt，调用 DeepSeek API，并返回模型的补全结果。
    """
    try:
        # 调用我们封装好的服务
        completion_text = await get_deepseek_completion(prompt=request_data.prompt)
        
        # 构建并返回成功的响应
        return LLMResponse(prompt=request_data.prompt, response=completion_text)

    except httpx.HTTPStatusError as e:
        # 如果 DeepSeek API 返回错误（如 401 密钥错误，429 请求频繁等）
        # 我们将它转换为一个对我们用户友好的 HTTPException
        raise HTTPException(
            status_code=e.response.status_code,
            detail=f"Error from DeepSeek API: {e.response.text}"
        )
    except Exception as e:
        # 捕获其他未知错误（如网络问题）
        raise HTTPException(
            status_code=500,
            detail=f"An unexpected internal error occurred: {str(e)}"
        )