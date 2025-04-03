import tailwindcss from '@tailwindcss/vite';

export default defineNuxtConfig({
  modules: [
    '@nuxt/fonts',
    '@nuxt/eslint',
    '@nuxt/ui',
    '@nuxtjs/color-mode',
    '@vueuse/nuxt',
  ],
  devtools: {
    enabled: true,
  },
  css: ['~/assets/css/tailwind.css'],
  compatibilityDate: '2024-11-01',
  vite: {
    plugins: [tailwindcss()],
  },
  eslint: {
    config: {
      stylistic: {
        semi: true,
      },
    },
  },
});
