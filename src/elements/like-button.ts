import { server } from '@mantou/gemkit';

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
 * 延时视图：服务端渲染，客户端在第一次交互时才加载这个元素的代码，然后重放这次点击
 *
 * 客户端导航时直接加载
 */
@customElement('app-like-button')
@adoptedStyle(style)
@shadow()
@server({ lazy: true })
export class AppLikeButtonElement extends GemElement {
  #state = createState({ likes: 0 });

  #like = () => this.#state({ likes: this.#state.likes + 1 });

  @template()
  #content = () => html`<button @click=${this.#like}>♥ ${this.#state.likes}</button>`;
}
