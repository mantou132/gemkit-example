import { redirect, type ServerLoadContext } from '@mantou/gemkit';

export interface Entry {
  name: string;
  message: string;
  date: string;
}

export interface GuestbookData {
  entries: Entry[];
  page: number;
  pages: number;
  /** 上次留言使用的名字，保存在 cookie 中 */
  name: string;
}

const PAGE_SIZE = 5;
const NAME_COOKIE = 'guestbook-name';

// 保存在服务端内存中，重启后清空
const entries: Entry[] = [];

// 读取了 cookie，每个请求的结果不同，不能预渲染，静态托管时不可用
export const prerender = false;

// 只改变查询参数（`?page=2`）的客户端导航也会重新执行
export function load({ url, cookies }: ServerLoadContext): GuestbookData {
  const pages = Math.max(1, Math.ceil(entries.length / PAGE_SIZE));
  const page = Math.min(pages, Math.max(1, Number(url.searchParams.get('page')) || 1));
  return {
    entries: entries.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE),
    page,
    pages,
    name: cookies.get(NAME_COOKIE) || '',
  };
}

// 表单提交到 `?/sign`，返回值交给 `submitAction`，跳转回第一页
export const actions = {
  sign: async ({ request, cookies, url }: ServerLoadContext) => {
    const form = await request.formData();
    const name = String(form.get('name') || '').trim();
    const message = String(form.get('message') || '').trim();
    if (!name || !message) return { error: 'required' };
    entries.unshift({ name, message: message.slice(0, 200), date: new Date().toISOString().slice(0, 10) });
    cookies.set(NAME_COOKIE, name, { maxAge: 60 * 60 * 24 * 365 });
    redirect(303, url.pathname);
  },
};
