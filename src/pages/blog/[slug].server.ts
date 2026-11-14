import { readFile } from 'node:fs/promises';
import path from 'node:path';

import { postList } from '../../posts';
import type { Paths, ServerContext } from './[slug].$types';

// 只在服务端执行，`fs` 不会打包到客户端，文章内容由 `<app-markdown>` 在服务端渲染，
// 文章不存在时渲染 `_error.ts`，响应状态为 404
export async function load({ params }: ServerContext) {
  const post = postList.find((e) => e.slug === params.slug);
  if (!post) notFound();
  const markdown = await readFile(path.resolve('content/posts', `${post.slug}.md`), 'utf8');
  return { title: post.title, date: post.date, words: markdown.split(/\s+/).length };
}

export const paths = (() => postList.map(({ slug }) => ({ slug }))) satisfies Paths;
