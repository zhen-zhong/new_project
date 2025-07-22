// app/(chat)/chat/page.tsx

export default function ChatPage() {
  return (
    <div className="flex h-full overflow-hidden">
      {/* 侧边栏：会话列表 */}
      <aside className="w-1/4 min-w-[250px] max-w-[300px] border-r bg-muted/40 p-4">
        <h2 className="text-lg font-bold text-foreground">会话列表</h2>
        <div className="mt-4 space-y-2">
          {/* 示例会话项 */}
          <div className="cursor-pointer rounded-md bg-accent p-3 text-accent-foreground">
            <p className="font-semibold">与 AI 的第一次对话</p>
            <p className="text-sm text-muted-foreground truncate">好的，这是一个非常棒的进阶需求！...</p>
          </div>
          <div className="cursor-pointer rounded-md p-3 hover:bg-accent">
            <p className="font-semibold">关于 Next.js 路由</p>
            <p className="text-sm text-muted-foreground truncate">当然！让我们用一个清晰的比喻来解释...</p>
          </div>
        </div>
      </aside>

      {/* 主区域：聊天窗口 */}
      <div className="flex flex-1 flex-col">
        {/* 聊天消息区 */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {/* 示例消息：AI */}
          <div className="flex items-start gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground">
              AI
            </div>
            <div className="rounded-lg bg-muted p-3 max-w-[75%]">
              <p className="text-sm text-foreground">
                你好！有什么可以帮助你的吗？
              </p>
            </div>
          </div>
          {/* 示例消息：用户 */}
          <div className="flex items-start gap-3 justify-end">
            <div className="rounded-lg bg-primary p-3 max-w-[75%] text-primary-foreground">
              <p className="text-sm">
                我想了解一下 Next.js 的路由组功能。
              </p>
            </div>
             <div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted-foreground text-background">
              我
            </div>
          </div>
        </div>

        {/* 输入框区域 */}
        <div className="border-t bg-background p-4">
          <div className="relative">
            <textarea
              placeholder="在这里输入消息..."
              className="w-full resize-none rounded-lg border border-input p-3 pr-20 text-sm"
              rows={1}
            />
            <button className="absolute right-3 top-1/2 -translate-y-1/2 rounded-md bg-primary p-2 text-sm font-medium text-primary-foreground">
              发送
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}