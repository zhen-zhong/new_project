// components/MessageType.tsx
import React from 'react';
import { Message } from '../types/chat';

// 一个简单的加载动画组件
const LoadingDots = () => (
  <div className="flex space-x-1">
    <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0s' }}></div>
    <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
    <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
  </div>
);

// 主消息组件的 Props 定义
interface MessageTypeProps {
  message: Message;
}

const MessageType: React.FC<MessageTypeProps> = ({ message }) => {
  const { role, content, isLoading } = message;

  // 根据角色确定消息的对齐方式和颜色
  const isUser = role === 'user';
  const wrapperClass = isUser ? 'flex justify-end' : 'flex justify-start';
  const bubbleClass = isUser
    ? 'bg-blue-500 text-white'
    : 'bg-gray-200 text-gray-800';

  // 系统消息的特殊样式
  if (role === 'system') {
    return (
      <div className="text-center text-xs text-gray-500 my-2">
        {content}
      </div>
    );
  }

  return (
    <div className={`w-full px-4 py-2 ${wrapperClass}`}>
      <div className={`max-w-xl lg:max-w-2xl px-4 py-2 rounded-lg shadow ${bubbleClass}`}>
        {isLoading ? <LoadingDots /> : (
          // 使用 pre-wrap 来保留换行和空格，这对于代码块很重要
          <p className="text-sm" style={{ whiteSpace: 'pre-wrap' }}>{content}</p>
        )}
      </div>
    </div>
  );
};

export default MessageType;