export interface PostMeta {
  slug: string;
  title: string;
  date: string;
  summary: string;
}

/** 文章内容在 `content/posts/<slug>.md`，由服务端读取 */
export const postList: PostMeta[] = [
  {
    slug: 'how-ssr-works',
    title: 'How gemkit renders a page',
    date: '2026-10-12',
    summary: 'From a request to a hydrated page: what happens on the server and in the browser.',
  },
  {
    slug: 'hello-gemkit',
    title: 'Hello gemkit',
    date: '2026-10-10',
    summary: 'A blog with markdown posts, rendered on the server and prerendered at build time.',
  },
];
