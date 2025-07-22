// app/(chat)/chat/[chatId]/page.tsx
import { ChatPanel } from '@/components/chat/ChatPanel'; // 导入我们新封装的组件

export default function ChatSessionPage({ params }: { params: { chatId: string } }) {
  return <ChatPanel chatId={params.chatId} />;
}