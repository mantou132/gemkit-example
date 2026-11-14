import type { Params, ServerData } from './[slug].$types';

const style = css`
  h1 {
    margin-bottom: 0.25em;
    line-height: 1.2;
  }
  time {
    color: var(--muted);
  }
  .actions {
    display: flex;
    gap: 0.75em;
  }
`;

type Post = ServerData & { minutes: number };

// 服务端数据来自同名的 `[slug].server.ts`，是 `load` 参数中的 `data`，类型参数依次是路由参数、`data` 和服务端数据
@page<Params, Post, ServerData>({
  load: ({ data: post }) => ({ ...post, minutes: Math.max(1, Math.round(post.words / 200)) }),
  title: ({ data }) => data.title,
})
@adoptedStyle(style)
export default class PostPage extends GemElement {
  @property params?: Params;
  @property data?: Post;

  @template()
  #content = () => html`
    <article>
      <h1>${this.data!.title}</h1>
      <time>${this.data!.date}</time> · ${this.data!.minutes} ${i18n.get('minRead')}
      <app-markdown slug=${this.params!.slug}></app-markdown>
      <div class="actions">
        <app-like-button slug=${this.params!.slug}></app-like-button>
        <app-share-button></app-share-button>
      </div>
    </article>
  `;
}
