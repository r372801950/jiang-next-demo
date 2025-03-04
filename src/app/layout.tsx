// src/app/layout.tsx
// import { Web3Provider } from "@/providers/Web3Provider";
import Header from "@components/common/Header";
import "./globals.css";
import { Providers } from './providers';
// 在你的页面布局中（比如 layout.tsx 或 page.tsx 的顶层）
import { Toaster } from 'sonner';

// 然后在 JSX 中添加


export default function RootLayout({
                                     children,
                                   }: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
    <body>
    {/*<Web3Provider>*/}
    <Providers>
      <Header />
      <Toaster />
      <main className="mx-auto px-4">
        {children}
      </main>
    </Providers>
    {/*</Web3Provider>*/}
    </body>
    </html>
  );
}