export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: ['@nuxtjs/tailwindcss'],
  css: ['~/assets/css/main.css'],
  app: {
    head: {
      title: '오늘 뭐 먹지? - 귀여운 점심 추천',
      script: [
        {
          src: '//dapi.kakao.com/v2/maps/sdk.js?appkey=681b415cced50195b39d1326e4651643&libraries=services',
          type: 'text/javascript'
        }
      ]
    }
  }
})
