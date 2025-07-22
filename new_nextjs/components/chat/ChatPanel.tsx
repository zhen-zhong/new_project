// components/chat/ChatPanel.tsx
'use client';

import { useChat, type Message } from 'ai/react';
import { useEffect } from 'react';

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
  const { messages, setMessages, input, handleInputChange, handleSubmit, isLoading } = useChat({
    api: 'http://localhost:8000/chat',
    initialMessages: [],
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
          // 根据消息角色决定气泡样式和位置
          <div key={m.id} className={`flex items-start gap-3 ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            {/* AI 头像 */}
            {m.role === 'assistant' && (
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground shrink-0">
                AI
              </div>
            )}

            {/* 消息气泡 */}
            <div className={`rounded-lg p-3 max-w-[75%] ${m.role === 'user' ? 'bg-primary text-primary-foreground' : 'bg-muted'}`}>
              <p className="text-sm">{m.content}</p>
            </div>
            
            {/* 用户头像 */}
            {m.role === 'user' && (
               <div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted-foreground text-background shrink-0">
                我
              </div>
            )}
          </div>
        ))}
        {/* 加载指示器 */}
        {isLoading && (
            <div className="flex items-start gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground shrink-0">
                    AI
                </div>
                <div className="rounded-lg bg-muted p-3">
                    <p className="text-sm animate-pulse">...</p>
                </div>
            </div>
        )}
      </div>

      {/* 输入框区域 */}
      <div className="border-t bg-background p-4">
        <form onSubmit={handleSubmit} className="relative">
          <textarea
            value={input}
            onChange={handleInputChange}
            placeholder="在这里输入消息..."
            className="w-full resize-none rounded-lg border border-input p-3 pr-20 text-sm focus:ring-2 focus:ring-primary/50 outline-none"
            rows={1}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSubmit(e as any);
              }
            }}
          />
          <button type="submit" className="absolute right-3 top-1/2 -translate-y-1/2 rounded-md bg-primary p-2 text-sm font-medium text-primary-foreground disabled:opacity-50" disabled={isLoading || !input}>
            发送
          </button>
        </form>
      </div>
    </div>
  );
}