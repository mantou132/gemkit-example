import { page } from '@mantou/gemkit';

import { i18n } from '$gemkit/i18n';

@page({ title: () => i18n.get('notFound') })
export default class NotFoundPage extends GemElement {
  @template()
  #content = () => html`
    <h1>${i18n.get('notFound')}</h1>
    <gem-link path="/">${i18n.get('backHome')}</gem-link>
  `;
}
