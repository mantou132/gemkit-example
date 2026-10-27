@page({ title: () => i18n.get('about') })
export default class AboutPage extends GemElement {
  @template()
  #content = () => html`
    <h1>${i18n.get('about')}</h1>
    <p>${i18n.get('aboutContent')}</p>
    <app-server-info></app-server-info>
  `;
}
