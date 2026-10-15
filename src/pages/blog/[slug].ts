import { page } from '@mantou/gemkit';

import { i18n } from '$gemkit/i18n';
import type { PostData } from './[slug].server';

const style = css`
  h1 {
    margin-bottom: 0.25em;
    line-height: 1.2;
  }
  time {
    color: var(--muted);
  }
`;

type Post = PostData & { minutes: number };

// 服务端数据来自同名的 `[slug].server.ts`，`load` 的第二个参数是服务端数据
@page<{ slug: string }, Post | null>({
  load: (_, post: PostData | null) => post && { ...post, minutes: Math.max(1, Math.round(post.words / 200)) },
  title: (_, post) => post?.title || i18n.get('notFound'),
})
@adoptedStyle(style)
export default class PostPage extends GemElement {
  @property params?: { slug: string };
  @property data?: Post | null;

  @template()
  #content = () => html`
    <article>
      <h1>${this.data!.title}</h1>
      <time>${this.data!.date}</time> · ${this.data!.minutes} ${i18n.get('minRead')}
      <app-markdown slug=${this.params!.slug}></app-markdown>
      <app-like-button></app-like-button>
    </article>
  `;

  @template((i) => !i.data)
  #notFound = () => html`
    <h1>${i18n.get('notFound')}</h1>
    <gem-link path="/blog">${i18n.get('allPosts')}</gem-link>
  `;
}
