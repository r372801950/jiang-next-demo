// src/app/layout.tsx
// import { Web3Provider } from "@/providers/Web3Provider";
import Header from "@components/common/Header";
import "./globals.css";

export default function RootLayout({
                                     children,
                                   }: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
    <body>
    {/*<Web3Provider>*/}
      <Header />
      <main className="mx-auto px-4">
        {children}
      </main>
    {/*</Web3Provider>*/}
    </body>
    </html>
  );
}