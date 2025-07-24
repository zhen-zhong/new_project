// components/chat/ChatPanel.tsx
'use client';

// 1. 从 'ai/react' 导入 useAssistant
import { useAssistant } from 'ai/react';
import { useEffect } from 'react';

// Message 类型可以保持不变，或者从 'ai' 库导入
interface Message {
  id: string;
  role: 'user' | 'assistant' | 'system' | 'function' | 'data' | 'tool';
  content: string;
}

// 模拟根据 ID 获取历史消息
async function getChatHistory(chatId: string): Promise<Message[]> {
  console.log(`正在为 chat ID: ${chatId} 获取历史记录...`);
  if (chatId === '1a2b') {
    return [
      { id: '1', role: 'assistant', content: '你好！这是第一次对话。' },
      { id: '2', role: 'user', content: '是的，你好！' },
    ];
  }
  return [];
}

// 定义 props 类型
interface ChatPanelProps {
  chatId: string;
}

export function ChatPanel({ chatId }: ChatPanelProps) {
  // 2. 使用 useAssistant hook
  const { status, messages, setMessages, input, handleInputChange, submitMessage, error } = useAssistant({
    api: '/api/assistant', // 注意：useAssistant 推荐使用它自己的后端格式，我们稍后会创建这个新API
  });

  // 当 chatId 变化时，加载新的历史记录
  useEffect(() => {
    if (chatId) {
      getChatHistory(chatId).then(historyMessages => {
        setMessages(historyMessages);
      });
    }
  }, [chatId, setMessages]);

  return (
    <div className="flex flex-1 flex-col h-full">
      {/* 聊天消息区 */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4">
        {messages.map(m => (
          <div key={m.id} className={`flex items-start gap-3 ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            {m.role === 'assistant' && (
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground shrink-0">AI</div>
            )}
            <div className={`rounded-lg p-3 max-w-[75%] ${m.role === 'user' ? 'bg-primary text-primary-foreground' : 'bg-muted'}`}>
              <p className="text-sm" style={{ whiteSpace: 'pre-wrap' }}>{m.content}</p>
            </div>
            {m.role === 'user' && (
               <div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted-foreground text-background shrink-0">我</div>
            )}
          </div>
        ))}
        {/* 加载状态现在通过 status 判断 */}
        {status === 'in_progress' && (
            <div className="flex items-start gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground shrink-0">AI</div>
                <div className="rounded-lg bg-muted p-3"><p className="text-sm animate-pulse">...</p></div>
            </div>
        )}
      </div>

      {/* 错误提示 */}
      {error && (
        <div className="border-t bg-red-100 text-red-700 p-4">
          <p>错误: {error.message}</p>
        </div>
      )}

      {/* 输入框区域 */}
      <div className="border-t bg-background p-4">
        {/* 3. 使用 submitMessage 来代替 handleSubmit */}
        <form onSubmit={submitMessage} className="relative">
          <textarea
            value={input}
            onChange={handleInputChange}
            placeholder="在这里输入消息..."
            className="w-full resize-none rounded-lg border border-input p-3 pr-20 text-sm focus:ring-2 focus:ring-primary/50 outline-none"
            rows={1}
            disabled={status === 'in_progress'} // 在AI思考时禁用输入框
          />
          <button type="submit" className="absolute right-3 top-1/2 -translate-y-1/2 rounded-md bg-primary p-2 text-sm font-medium text-primary-foreground disabled:opacity-50" disabled={status === 'in_progress' || !input}>
            发送
          </button>
        </form>
      </div>
    </div>
  );
}