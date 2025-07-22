// app/blog/page.tsx
export default function BlogPage() {
    return (
      <div className="container mx-auto py-10 px-4">
        <h1 className="text-4xl font-bold text-foreground">博客文章</h1>
        <p className="mt-4 text-lg text-foreground/80">
          欢迎来到我的博客！这里会分享关于技术、生活和思考的文章。
        </p>
        <div className="mt-8 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {/* 这是一个示例博客文章卡片 */}
          <div className="rounded-lg border bg-card p-6 text-card-foreground shadow-sm">
            <h2 className="text-2xl font-semibold tracking-tight">
              第一篇文章标题
            </h2>
            <p className="mt-2 text-muted-foreground">
              这是一篇示例文章的简介，简要描述了文章内容...
            </p>
            <button className="mt-4 inline-flex h-9 items-center justify-center rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground">
              阅读更多
            </button>
          </div>
          {/* 你可以复制粘贴更多卡片 */}
        </div>
      </div>
    );
  }