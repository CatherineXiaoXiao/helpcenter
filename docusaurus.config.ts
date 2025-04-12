import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

const config: Config = {
  title: 'CoinByte Help Center',
  tagline: 'Find answers to your questions',
  favicon: 'img/favicon.ico',

  // GitHub Pages 配置
  url: 'https://catherinexiaoxiao.github.io',
  baseUrl: '/helpcenter/',
  organizationName: 'CatherineXiaoXiao',
  projectName: 'helpcenter',
  trailingSlash: true,

  onBrokenLinks: 'warn',
  onBrokenMarkdownLinks: 'warn',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'zh'],
    path: 'i18n',
    localeConfigs: {
      en: {
        label: 'English',
        htmlLang: 'en-US',
        direction: 'ltr',
      },
      zh: {
        label: '中文',
        htmlLang: 'zh-CN',
        direction: 'ltr',
      },
    },
  },

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl: 'https://github.com/CatherineXiaoXiao/helpcenter/edit/main/',
          showLastUpdateTime: true,
          showLastUpdateAuthor: true,
          routeBasePath: 'docs',
        },
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    // Replace with your project's social card
    image: 'img/docusaurus-social-card.jpg',
    navbar: {
      title: 'CoinByte Help Center',
      logo: {
        alt: 'CoinByte Help Center Logo',
        src: 'img/logo.svg',
      },
      items: [
        {
          type: 'localeDropdown',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      copyright: `CoinByte Help Center | Your trusted guide to cryptocurrency trading and investment | Copyright © ${new Date().getFullYear()}`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
    algolia: {
      appId: 'YOUR_APP_ID',  // 将在获得 Algolia 密钥后更新
      apiKey: 'YOUR_SEARCH_API_KEY',  // 将在获得 Algolia 密钥后更新
      indexName: 'help-center',
      contextualSearch: true,
      searchParameters: {},
      searchPagePath: 'search',
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
