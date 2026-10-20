import { type ErrorData, page } from '@mantou/gemkit';

import { i18n } from '$gemkit/i18n';

// 出错时渲染，也是未匹配路径的 404 页面，错误信息是 `data`
@page<{}, ErrorData>({ title: ({ data }) => (data.status === 404 ? i18n.get('notFound') : `Error ${data.status}`) })
export default class ErrorPage extends GemElement {
  @property data?: ErrorData;

  @template()
  #content = () => html`
    <h1>${this.data?.status === 404 ? i18n.get('notFound') : this.data?.message}</h1>
    <gem-link path="/">${i18n.get('backHome')}</gem-link>
  `;
}
