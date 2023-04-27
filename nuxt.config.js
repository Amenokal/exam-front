// https://nuxt.com/docs/api/configuration/nuxt-config
import { defineNuxtConfig } from 'nuxt/config'

export default defineNuxtConfig({

  ssr: true,
  target: 'server',

  css: [
    "@/assets/scss/main.scss",
  ]
})
