# app/api/v1/endpoints/llm.py

import httpx
from fastapi import APIRouter, HTTPException

from app.schemas.llm import LLMRequest, LLMResponse
from app.services.deepseek_client import get_deepseek_completion

router = APIRouter()

@router.post("/completion", response_model=LLMResponse)
async def create_completion(request_data: LLMRequest):
    """
    接收用户 prompt,调用 DeepSeek API,并返回模型的补全结果。(必填,不然return 422)
    """
    try:
        # 封装的deepseek api
        completion_text = await get_deepseek_completion(prompt=request_data.prompt)
        
        # 返回响应
        return LLMResponse(prompt=request_data.prompt, response=completion_text)

    except httpx.HTTPStatusError as e:
        # 如果 DeepSeek API 报错，转义一下，返回给前端
        raise HTTPException(
            status_code=e.response.status_code,
            detail=f"Error from DeepSeek API: {e.response.text}"
        )
    except Exception as e:
        # 捕获其他未知错误
        raise HTTPException(
            status_code=500,
            detail=f"An unexpected internal error occurred: {str(e)}"
        )