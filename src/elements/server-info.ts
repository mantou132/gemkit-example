import { server } from '@mantou/gemkit';

import { i18n } from '$gemkit/i18n';
import { postList } from '../posts';

const style = css`
  :scope {
    display: block;
    padding: 1em 1.5em;
    border-radius: 12px;
    background: var(--card);
    border: 1px solid var(--border);
  }
`;

/**
 * 模拟慢的接口，服务端渲染时先输出页面的其他部分，这个元素完成后再流式输出
 *
 * 服务端执行后的状态会输出到页面中，水合时恢复，不会再次执行
 */
@customElement('app-server-info')
@adoptedStyle(style)
export class AppServerInfoElement extends GemElement {
  #state = createState({ loadedIn: 0, posts: 0 });

  // 服务端渲染时执行并等待完成，客户端导航时在挂载后执行
  @server()
  @mounted()
  #load = async () => {
    const start = Date.now();
    await new Promise((resolve) => setTimeout(resolve, 800));
    this.#state({ loadedIn: Date.now() - start, posts: postList.length });
  };

  @template()
  #content = () =>
    this.#state.loadedIn
      ? html`${i18n.get('serverInfo')} ${this.#state.posts} · ${this.#state.loadedIn}ms`
      : html`${i18n.get('loading')}`;
}
