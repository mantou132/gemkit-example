import { readFile } from 'node:fs/promises';
import path from 'node:path';

import { server } from '@mantou/gemkit';
import { marked } from 'marked';

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
 * 纯服务端元素：在服务端读取文章并转换成 HTML
 *
 * 客户端不加载这个元素，`node:fs` 和 `marked` 不会打包到客户端，
 * 客户端导航时从服务端获取渲染好的 HTML
 */
@customElement('app-markdown')
@adoptedStyle(style)
@shadow()
@server()
export class AppMarkdownElement extends GemElement {
  @attribute slug: string;

  #state = createState({ html: '' });

  @server()
  #load = async () => {
    const markdown = await readFile(path.resolve('content/posts', `${this.slug}.md`), 'utf8');
    this.#state({ html: await marked.parse(markdown) });
  };

  @template()
  #content = () => {
    this.shadowRoot!.innerHTML = this.#state.html;
    // 内容是 HTML 字符串，不使用模版
    return undefined;
  };
}
