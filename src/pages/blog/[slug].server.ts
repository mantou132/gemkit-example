import { readFile } from 'node:fs/promises';
import path from 'node:path';

import type { ServerLoadContext } from '@mantou/gemkit';
import { marked } from 'marked';

import { postList } from '../../posts';

export interface PostData {
  title: string;
  date: string;
  html: string;
}

// 只在服务端执行，`fs` 和 `marked` 不会打包到客户端
export async function load({ params }: ServerLoadContext<{ slug: string }>): Promise<PostData | null> {
  const post = postList.find((e) => e.slug === params.slug);
  if (!post) return null;
  const markdown = await readFile(path.resolve('content/posts', `${post.slug}.md`), 'utf8');
  return { title: post.title, date: post.date, html: await marked.parse(markdown) };
}

export const paths = () => postList.map(({ slug }) => ({ slug }));
