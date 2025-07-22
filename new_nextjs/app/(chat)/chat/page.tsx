// app/(chat)/chat/page.tsx
import { MessageSquarePlus } from 'lucide-react'; // 引入一个图标，让页面更生动

export default function ChatWelcomePage() {
  return (
    // 使用 Flexbox 让内容在主区域内垂直和水平居中
    <div className="flex h-full flex-col items-center justify-center text-center bg-background p-8">
      
      {/* 一个视觉元素，可以是你的 Logo 或一个相关的图标 */}
      <div className="rounded-full bg-primary/10 p-4 text-primary">
        <MessageSquarePlus size={48} strokeWidth={1.5} />
      </div>

      {/* 欢迎标题 */}
      <h1 className="mt-6 text-2xl font-bold text-foreground">
        开始你的对话
      </h1>

      {/* 引导性文本 */}
      <p className="mt-2 max-w-sm text-muted-foreground">
        从左侧的列表中选择一个已有的会话继续聊天，或者点击 "+" 按钮开启一段全新的对话。
      </p>

    </div>
  );
}