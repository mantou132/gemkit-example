import { z } from 'zod';

import type { Actions, ServerContext } from './guestbook.$types';

export interface Entry {
  name: string;
  message: string;
  date: string;
}

const PAGE_SIZE = 5;
const NAME_COOKIE = 'guestbook-name';

// `action` 用它校验表单数据，失败时返回 `fail(400, { issues })`
const SignInput = z.object({
  name: z.string().trim().min(1),
  message: z
    .string()
    .trim()
    .min(1)
    .transform((s) => s.slice(0, 200)),
});

// 保存在服务端内存中，重启后清空
const entries: Entry[] = [];

// 读取了 cookie，每个请求的结果不同，不能预渲染，静态托管时不可用
export const prerender = false;

// 只改变查询参数（`?page=2`）的客户端导航也会重新执行
export function load({ url, cookies }: ServerContext) {
  const pages = Math.max(1, Math.ceil(entries.length / PAGE_SIZE));
  const page = Math.min(pages, Math.max(1, Number(url.searchParams.get('page')) || 1));
  return {
    entries: entries.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE),
    page,
    pages,
    // 上次留言使用的名字，保存在 cookie 中
    name: cookies.get(NAME_COOKIE) || '',
  };
}

// 表单提交到 `?/sign`，返回值交给页面中 `formActions` 的回调，跳转回第一页；
// 校验失败时没有 JS 也不跳转，使用 400 渲染当前页面，页面从 `actionStore` 读取 `issues`
export const actions = {
  sign: action(SignInput, ({ cookies, path }, { name, message }) => {
    entries.unshift({ name, message, date: new Date().toISOString().slice(0, 10) });
    cookies.set(NAME_COOKIE, name, { maxAge: 60 * 60 * 24 * 365 });
    redirect(303, path);
  }),
} satisfies Actions;
