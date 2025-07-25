'use client'; // 必须声明为客户端组件

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { VariableSizeList as List } from 'react-window';
import AutoSizer from 'react-virtualized-auto-sizer';
import MessageType from '@/components/messageType';
import { Message } from '@/types/chat';
import { useRouter,useParams } from 'next/navigation';

// --- 模拟 API 函数，直接写在文件里 ---
const mockApiSendMessage = async (
  chatId: string | null,
  userMessage: string
): Promise<{ conversationId: string; message: Message }> => {
  console.log(`[Mock API] Sending: "${userMessage}" for chatId: ${chatId}`);
  // 模拟网络延迟和 AI思考时间
  await new Promise(resolve => setTimeout(resolve, 1500)); 

  const newConversationId = chatId || `conv-${Date.now()}`;
  const aiResponse: Message = {
    id: `ai-${Date.now()}`,
    role: 'assistant',
    content: `这是对您消息“${userMessage}”的模拟回复。\n当前会话ID是: ${newConversationId}\n\n换行和 *Markdown* 格式都可以通过 \`whitespace-pre-wrap\` 来保留。`,
  };

  console.log(`[Mock API] Responding with:`, aiResponse);
  return {
    conversationId: newConversationId,
    message: aiResponse,
  };
};

// --- 主页面组件 ---
export default function ChatSessionPage() {
  const params = useParams();
  const router = useRouter();

  // --- 状态管理 ---
  const chatId = Array.isArray(params.chatId) ? params.chatId[0] : params.chatId;
  const [messages, setMessages] = useState<Message[]>([]);
  const [userInput, setUserInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isHistoryLoading, setIsHistoryLoading] = useState(true);

  const listRef = useRef<List>(null);

  // --- 模拟加载历史记录 ---
  useEffect(() => {
    if (!chatId) return;
    console.log(`[Effect] Loading history for chatId: ${chatId}`);
    setIsHistoryLoading(true);
    // 模拟异步获取历史数据
    setTimeout(() => {
      // 如果是新对话 (例如 chatId 是 'new' 或特定标识符)
      if (chatId === 'new') {
        setMessages([{ id: 'sys-start', role: 'system', content: '开始一个新的对话' }]);
      } else {
        // 否则，加载一些模拟的历史消息
        setMessages([
          { id: 'sys-1', role: 'system', content: `会话 #${chatId} 的历史记录` },
          { id: 'ai-1', role: 'assistant', content: '您好！我们继续上次的讨论吧。' },
        ]);
      }
      setIsHistoryLoading(false);
    }, 500);
  }, [chatId]); // 当 chatId 变化时，重新加载历史记录


  // --- 发送消息的核心逻辑 ---
  const handleSendMessage = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userInput.trim() || isLoading) return;

    const userMessage: Message = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: userInput,
    };
    
    // 立即更新UI，显示用户消息和AI加载状态
    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);
    const currentInput = userInput;
    setUserInput('');

    try {
      const response = await mockApiSendMessage(chatId === 'new' ? null : chatId || '', currentInput);

      // 如果是新对话，API会返回新ID，我们需要跳转到新URL
      if (chatId === 'new') {
        // 使用 router.replace 可以避免在浏览器历史中留下 /new 的记录
        router.replace(`/chat/${response.conversationId}`);
        // 因为重定向会触发useEffect重新加载，所以这里不需要手动设置AI消息
        // 但为了更好的即时性，我们也可以选择在这里更新，然后在useEffect中处理重复
      } else {
         // 在现有对话中，直接添加AI的回复
        setMessages(prev => [...prev, response.message]);
      }

    } catch (error) {
      console.error('Failed to send message:', error);
      const errorMessage: Message = {
        id: `error-${Date.now()}`,
        role: 'system',
        content: '抱歉，模拟 API 调用失败。',
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  }, [userInput, isLoading, chatId, router]);
  
  // --- react-window 相关的函数 ---
  const Row = ({ index, style }: { index: number; style: React.CSSProperties }) => (
    <div style={style}>
      <MessageType message={messages[index]} />
    </div>
  );

  const estimateRowHeight = (index: number) => {
    const message = messages[index];
    if (!message) return 50;
    if (message.role === 'system') return 40;
    const lines = (message.content.match(/\n/g) || []).length + 1;
    return 40 + lines * 20; // 基础高度 + 行数高度
  };

  useEffect(() => {
    if (listRef.current) {
      listRef.current.scrollToItem(messages.length, 'end');
    }
  }, [messages]);
  
  // --- 骨架屏组件 ---
  const ChatSkeleton = () => (
    <div className="p-4 space-y-4">
      <div className="flex justify-start"><div className="w-3/5 h-16 bg-gray-200 rounded-lg animate-pulse"></div></div>
      <div className="flex justify-end"><div className="w-1/2 h-12 bg-gray-300 rounded-lg animate-pulse"></div></div>
    </div>
  );

  // --- 渲染 JSX ---
  return (
    <div className="flex flex-col h-screen bg-gray-100">
      <header className="bg-white border-b border-gray-200 p-4 text-center sticky top-0 z-10">
        <h1 className="text-xl font-bold text-gray-800">
          {chatId === 'new' ? '新对话' : `会话 #${chatId?.substring(0, 8)}...`}
        </h1>
      </header>

      <main className="flex-1 overflow-y-auto">
        {isHistoryLoading ? (
          <ChatSkeleton />
        ) : (
          <AutoSizer>
            {({ height, width }) => (
              <List
                ref={listRef}
                height={height}
                width={width}
                itemCount={messages.length}
                itemSize={estimateRowHeight}
              >
                {Row}
              </List>
            )}
          </AutoSizer>
        )}
      </main>

      <footer className="bg-white p-4 border-t border-gray-200">
        <form onSubmit={handleSendMessage} className="flex items-center space-x-4">
          <input
            type="text"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            placeholder="输入您的问题..."
            className="flex-1 p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
            disabled={isLoading}
          />
          <button
            type="submit"
            className="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 disabled:bg-blue-300 disabled:cursor-not-allowed transition"
            disabled={isLoading || !userInput.trim()}
          >
            {isLoading ? '发送中...' : '发送'}
          </button>
        </form>
      </footer>
    </div>
  );
}