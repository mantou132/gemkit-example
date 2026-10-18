import { lazy } from '@mantou/gemkit';

const style = css`
  button {
    padding: 0.4em 1em;
    border-radius: 999px;
    border: 1px solid var(--border);
    background: var(--card);
    color: inherit;
    font: inherit;
    cursor: pointer;
  }
`;

/**
 * 延时视图：进入视口时才加载这个元素的代码，然后在客户端获取最新的点赞数，
 * 点赞数由 API 路由 `/api/likes/:slug` 读写，文章页仍然预渲染
 *
 * `@mounted()` 不加 `@server()`，水合后在客户端执行
 */
@customElement('app-like-button')
@adoptedStyle(style)
@shadow()
@lazy({ on: 'visible' })
export class AppLikeButtonElement extends GemElement {
  @attribute slug: string;

  #state = createState({ likes: undefined as number | undefined });

  #request = async (method: 'GET' | 'POST') => {
    const res = await fetch(`/api/likes/${this.slug}`, { method });
    if (res.ok) this.#state({ likes: (await res.json()).likes });
  };

  // 在文章之间导航时页面元素会重新创建，这个元素也是新的，不用处理 `slug` 改变
  @mounted()
  #load = () => {
    this.#request('GET');
  };

  #like = () => this.#request('POST');

  @template()
  #content = () => html`<button @click=${this.#like}>♥ ${this.#state.likes ?? ''}</button>`;
}
