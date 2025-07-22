// app/(auth)/layout.tsx
export default function AuthLayout({
    children,
  }: {
    children: React.ReactNode;
  }) {
    return (
      <main className="flex min-h-screen items-center justify-center p-4">
        {children}
      </main>
    );
  }