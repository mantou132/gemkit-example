import { adoptedStyle, css, GemElement, html, property, template } from '@mantou/gem';
import { page } from '@mantou/gemkit';

import { i18n } from '$gemkit/i18n';
import { getPost, type Post, postList } from '../../posts';

import '@mantou/gem/elements/link';

const style = css`
  h1 {
    margin-bottom: 0.25em;
    line-height: 1.2;
  }
  time {
    color: var(--muted);
  }
  pre {
    overflow: auto;
    padding: 1em;
    border-radius: 8px;
    background: var(--card);
    border: 1px solid var(--border);
  }
`;

@page<{ slug: string }, Post | undefined>({
  load: ({ slug }) => getPost(slug),
  title: (_, post) => post?.title || i18n.get('notFound'),
  paths: () => postList.map(({ slug }) => ({ slug })),
})
@adoptedStyle(style)
export default class PostPage extends GemElement {
  @property data?: Post;

  @template()
  #content = () => html`
    <article>
      <h1>${this.data!.title}</h1>
      <time>${this.data!.date}</time>
      ${this.data!.content}
    </article>
  `;

  @template((i) => !i.data)
  #notFound = () => html`
    <h1>${i18n.get('notFound')}</h1>
    <gem-link path="/blog">${i18n.get('allPosts')}</gem-link>
  `;
}
