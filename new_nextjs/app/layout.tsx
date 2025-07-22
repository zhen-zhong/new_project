import './globals.css';
import { Providers } from './providers';
import { ThemeScript } from '@/contexts/ThemeScript';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeScript />
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}