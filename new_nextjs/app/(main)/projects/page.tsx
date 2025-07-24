// app/projects/page.tsx
export default function ProjectsPage() {
    return (
      <div className="container mx-auto py-10 px-4">
        <h1 className="text-4xl font-bold text-foreground">我的项目</h1>
        <p className="mt-4 text-lg text-foreground/80">
          这里展示了我的个人项目和开源贡献。
        </p>
        <div className="mt-8 grid gap-8 md:grid-cols-2">
          {/* 这是一个示例项目卡片 */}
          <div className="rounded-lg border bg-card p-6 text-card-foreground shadow-sm">
            <h2 className="text-2xl font-semibold tracking-tight">
              项目 A: 主题切换器网站
            </h2>
            <p className="mt-2 text-muted-foreground">
              一个使用 Next.js 和 Tailwind CSS 构建的，功能完善的网站，实现了优雅的主题切换功能。
            </p>
            <div className="mt-4 flex space-x-2">
              <span className="inline-block rounded-full bg-primary/20 px-3 py-1 text-sm font-semibold text-primary">
                Next.js
              </span>
              <span className="inline-block rounded-full bg-primary/20 px-3 py-1 text-sm font-semibold text-primary">
                Tailwind CSS
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  }