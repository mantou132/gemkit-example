import { adoptedStyle, css, customElement, GemElement, property, shadow, template } from '@mantou/gem';

const style = css`
  :host {
    display: block;
  }
  h2 {
    margin-top: 2em;
  }
  code {
    font-size: 0.9em;
  }
  pre {
    overflow: auto;
    padding: 1em;
    border-radius: 8px;
    background: var(--card);
    border: 1px solid var(--border);
  }
  a {
    color: var(--accent);
  }
`;

/**
 * 渲染服务端生成的 HTML
 *
 * 水合时内容已经在服务端渲染的 ShadowDOM 中，不需要再次设置
 */
@customElement('app-markdown')
@adoptedStyle(style)
@shadow()
export class AppMarkdownElement extends GemElement {
  @property html?: string;

  #rendered?: string;

  @template()
  #content = () => {
    const root = this.shadowRoot!;
    if (this.#rendered === undefined && root.querySelector(':not(style)')) {
      this.#rendered = this.html;
    } else if (this.#rendered !== this.html) {
      this.#rendered = this.html;
      root.innerHTML = this.html || '';
    }
    // 不更新内容
    return undefined;
  };
}
