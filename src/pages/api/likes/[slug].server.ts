import { notFound, type ServerLoadContext } from '@mantou/gemkit';

import { postList } from '../../../posts';

type Context = ServerLoadContext<{ slug: string }>;

// 保存在服务端内存中，重启后清空
const likes = new Map<string, number>();

const getSlug = ({ params }: Context) => {
  if (!postList.some((post) => post.slug === params.slug)) notFound();
  return params.slug;
};

// API 路由：没有同名页面模块的 `*.server.ts`，`/api/likes/:slug`，返回值作为 JSON 响应
export const GET = (ctx: Context) => ({ likes: likes.get(getSlug(ctx)) || 0 });

export const POST = (ctx: Context) => {
  const slug = getSlug(ctx);
  likes.set(slug, (likes.get(slug) || 0) + 1);
  return { likes: likes.get(slug)! };
};
