// src/app/layout.tsx
// import { Web3Provider } from "@/providers/Web3Provider";
import Header from "@components/common/Header";
import "./globals.css";
import { Providers } from './providers';

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
      <main className="mx-auto px-4">
        {children}
      </main>
    </Providers>
    {/*</Web3Provider>*/}
    </body>
    </html>
  );
}