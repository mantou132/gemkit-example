import type { ServerLoadContext } from '@mantou/gemkit';
import { z } from 'zod';

import { postList } from '../../../posts';

type Context = ServerLoadContext<{ slug: string }>;

// 保存在服务端内存中，重启后清空
const likes = new Map<string, number>();

const getSlug = ({ params }: Context) => {
  if (!postList.some((post) => post.slug === params.slug)) notFound();
  return params.slug;
};

// API 路由：没有同名页面模块的 `*.server.ts`，`/api/likes/:slug`，返回值作为 JSON 响应，
// 客户端使用 `apis.api.likes(slug).GET()` 调用
export const GET = (ctx: Context) => ({ likes: likes.get(getSlug(ctx)) || 0 });

// `endpoint` 用 zod 校验 JSON 请求体，失败时响应 400；不传参数时请求体为空，使用默认值
const LikeInput = z.object({ count: z.number().int().min(1).max(10).default(1) }).default({ count: 1 });

export const POST = endpoint(LikeInput, (ctx: Context, { count }) => {
  const slug = getSlug(ctx);
  likes.set(slug, (likes.get(slug) || 0) + count);
  return { likes: likes.get(slug)! };
});
