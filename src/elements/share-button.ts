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
@customElement('app-share-button')
@adoptedStyle(style)
@shadow()
@lazy()
export class AppShareButtonElement extends GemElement {
  #state = createState({ copied: false });

  #share = async () => {
    try {
      await navigator.clipboard.writeText(location.href);
      this.#state({ copied: true });
    } catch {
      // 没有剪贴板权限
    }
  };

  @template()
  #content = () => html`<button @click=${this.#share}>${i18n.get(this.#state.copied ? 'copied' : 'share')}</button>`;
}
