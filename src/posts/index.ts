import type { TemplateResult } from '@mantou/gem';

export interface PostMeta {
  slug: string;
  title: string;
  date: string;
  summary: string;
}

export interface Post extends PostMeta {
  content: TemplateResult;
}

// 文章内容按需加载，列表只需要元信息
const posts: (PostMeta & { load: () => Promise<{ default: TemplateResult }> })[] = [
  {
    slug: 'how-ssr-works',
    title: 'How gemkit renders a page',
    date: '2026-10-12',
    summary: 'From a request to a hydrated page: what happens on the server and in the browser.',
    load: () => import('./how-ssr-works'),
  },
  {
    slug: 'hello-gemkit',
    title: 'Hello gemkit',
    date: '2026-10-10',
    summary: 'A blog written with Gem templates, rendered on the server and prerendered at build time.',
    load: () => import('./hello-gemkit'),
  },
];

export const postList: PostMeta[] = posts.map(({ load: _, ...meta }) => meta);

export async function getPost(slug: string): Promise<Post | undefined> {
  const post = posts.find((e) => e.slug === slug);
  if (!post) return;
  const { load, ...meta } = post;
  return { ...meta, content: (await load()).default };
}
