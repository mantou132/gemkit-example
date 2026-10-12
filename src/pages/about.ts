import { GemElement, html, template } from '@mantou/gem';
import { page } from '@mantou/gemkit';

import { i18n } from '$gemkit/i18n';

@page({ title: () => i18n.get('about') })
export default class AboutPage extends GemElement {
  @template()
  #content = () => html`
    <h1>${i18n.get('about')}</h1>
    <p>${i18n.get('aboutContent')}</p>
  `;
}
