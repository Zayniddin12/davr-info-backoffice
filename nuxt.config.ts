// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: true,

  app: {
    head: {
      title: 'Nuxt3 project',
      link: [
        {
          rel: 'icon',
          type: 'image/x-icon',
          href: `/favicon.svg`,
        },
        {
          rel: 'canonical',
          href: '',
        },
      ],
    },
  },

  css: ['~/assets/tailwind.css'],

  modules: [
    '@nuxtjs/tailwindcss',
    'nuxt-gtag',
    '@nuxtjs/i18n',
    //   Enable if your Yandex Metrica with real credentials
    // [
    //   'yandex-metrika-module-nuxt3',
    //   {
    //     id: 0000000,
    //     webvisor: true,
    //   },
    // ],
    [
      '@pinia/nuxt',
      {
        autoImports: [
          // automatically imports `defineStore`
          'defineStore', // import { defineStore } from 'pinia'
          ['defineStore', 'definePiniaStore'], // import { defineStore as definePiniaStore } from 'pinia'
        ],
      },
    ],
  ],

  i18n: {
    langDir: 'locales',
    locales: [
      { code: 'en', iso: 'en-US', file: 'en.json' },
      { code: 'uz', iso: 'uz-UZ', file: 'uz.json' },
      { code: 'ru', iso: 'ru-RU', file: 'ru.json' },
    ],
    lazy: true,
    useCookie: true,
    cookieKey: 'locale',
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'locale',
      onlyOnRoot: true, // recommended
      fallbackLocale: 'en',
    },
    defaultLocale: 'en',
    strategy: 'prefix_and_default',
  },

  nitro: {
    serveStatic: true,
  },

  devServerHandlers: [],

  runtimeConfig: {
    public: {
      baseURL: 'localhost',
    },
  },

  gtag: {
    id: process.env.GOOGLE_TAG_ID,
  },

  compatibilityDate: '2025-02-11',
})
