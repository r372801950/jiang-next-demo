// lib/posts.ts
export interface PostType {
  id: string;
  title: string;
  content: string;
  date: string;
}

// 模拟获取博客文章的函数
export async function getPosts(): Promise<PostType[]> {
  // 在实际应用中，这里可能会从API或数据库获取数据
  // 这里我们返回一些模拟数据
  return [
    {
      id: '1',
      title: '开始使用 Next.js',
      content: 'Next.js 是一个用于构建现代 Web 应用程序的 React 框架...',
      date: '2025-02-28',
    },
    {
      id: '2',
      title: '理解 Next.js 的服务器组件',
      content: '服务器组件是 Next.js 应用程序中的默认组件类型...',
      date: '2025-03-01',
    },
    {
      id: '3',
      title: 'Next.js 中的路由系统',
      content: 'Next.js 通过文件系统进行路由，放在 app 目录下的每个文件夹都代表一个路由...',
      date: '2025-03-02',
    },
  ];
}

// 获取单个博客文章的函数
export async function getPostById(id: string): Promise<PostType | undefined> {
  const posts = await getPosts();
  return posts.find(post => post.id === id);
}