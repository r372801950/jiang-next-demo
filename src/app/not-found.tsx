// src/app/not-found.tsx
// 对应原来的PageNotFoundView
export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh]">
      <h2 className="text-3xl font-bold mb-4">404 - 页面未找到</h2>
      <p className="text-lg mb-6">抱歉，我们找不到您要查找的页面。</p>
    </div>
  );
}