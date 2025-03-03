// ui/post.tsx
import { PostType } from '@/lib/posts';

interface PostProps {
  post: PostType;
}

export function Post({ post }: PostProps) {
  return (
    <li className="mb-6 p-4 border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow">
      <article>
        <h2 className="text-xl font-bold mb-2">{post.title}</h2>
        <time className="text-sm text-gray-500 mb-3 block">{post.date}</time>
        <p className="text-gray-700">{post.content}</p>
      </article>
    </li>
  );
}