import { pluginGemkit } from '@mantou/gemkit/plugin';
import { defineConfig } from '@rsbuild/core';

export default defineConfig({
  plugins: [
    pluginGemkit({
      title: 'Gemkit Blog',
      titleTemplate: '%s | Gemkit Blog',
    }),
  ],
});
