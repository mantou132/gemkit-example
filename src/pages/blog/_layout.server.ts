import { readFile } from 'node:fs/promises';
import path from 'node:path';

import { postList } from '../../posts';

export interface BlogLayoutData {
  words: number;
  archive: { year: string; count: number }[];
}

// 只在服务端执行，读取所有文章统计字数，按年份归档
export async function load(): Promise<BlogLayoutData> {
  const contents = await Promise.all(
    postList.map(({ slug }) => readFile(path.resolve('content/posts', `${slug}.md`), 'utf8')),
  );
  const years = Map.groupBy(postList, (post) => post.date.slice(0, 4));
  return {
    words: contents.reduce((count, content) => count + content.split(/\s+/).length, 0),
    archive: [...years].map(([year, posts]) => ({ year, count: posts.length })),
  };
}
