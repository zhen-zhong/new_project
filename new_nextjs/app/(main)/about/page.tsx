// app/about/page.tsx
export default function AboutPage() {
    return (
      <div className="container mx-auto max-w-3xl py-10 px-4">
        <h1 className="text-4xl font-bold text-foreground">关于我</h1>
        <div className="mt-8 space-y-6 text-lg text-foreground/80">
          <p>
            你好！我是一名充满热情的全栈开发者，对创造美观、实用且高性能的 Web 应用充满兴趣。
          </p>
          <p>
            我擅长使用现代前端技术栈，包括 React、Next.js 和 TypeScript。对于后端，我熟悉 Node.js 和数据库设计。我坚信代码不仅要能工作，更要优雅、可维护。
          </p>
          <p>
            这个网站是我展示技术、分享知识和记录成长的地方。希望你能喜欢！
          </p>
        </div>
      </div>
    );
  }