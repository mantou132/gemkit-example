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

// 数据来自同名的 `[slug].server.ts`
@page<{ slug: string }, PostData | null>({
  title: (_, post) => post?.title || i18n.get('notFound'),
})
@adoptedStyle(style)
export default class PostPage extends GemElement {
  @property data?: PostData | null;

  @template()
  #content = () => html`
    <article>
      <h1>${this.data!.title}</h1>
      <time>${this.data!.date}</time>
      <app-markdown .html=${this.data!.html}></app-markdown>
    </article>
  `;

  @template((i) => !i.data)
  #notFound = () => html`
    <h1>${i18n.get('notFound')}</h1>
    <gem-link path="/blog">${i18n.get('allPosts')}</gem-link>
  `;
}
