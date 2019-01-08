const builtAt = new Date().toISOString()
const path = require('path')
import blogPosts from './contents/blogPosts.js'

const router = process.env.DEPLOY_ENV === 'GH_PAGES' ? {
  router: {
    base: '/zajca.cz/'
  }
} : {
  router: {
    base: '',
    linkActiveClass: 'is-active'
  }
}

module.exports = {
  ...router,
  /*
  ** Headers of the page
  */
  head: {
    title: 'Martin Zajíc Symfony/VueJS developer | zajca.me',
    htmlAttrs: { lang: 'en' },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width,initial-scale=1.0,minimum-scale=1.0,maximum-scale=1.0,user-scalable=no' },
      // { name: 'msapplication-TileColor', content: '#ffffff' },
      // { name: 'msapplication-TileImage', content: '/favicons/mstile-144x144.png' },
      // { name: 'theme-color', content: '#c1c1c1' },
      { name: 'robots', content: 'index, follow' },
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:site', content: '@zajca' },
      { property: 'og:type', content: 'profile' },
      { property: 'og:updated_time', content: builtAt },
      { name: "author", content: "Martin Zajíc @zajca" },
      { hid: 'description', name: 'description', content: 'Martin Zajíc Symfony/VueJS developer' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      // { rel: 'icon', type: 'image/png', href: '/favicons/favicon-16x16.png', sizes: '16x16' },
      // { rel: 'icon', type: 'image/png', href: '/favicons/favicon-32x32.png', sizes: '32x32' },
      // { rel: 'icon', type: 'image/png', href: '/favicons/android-chrome-96x96.png', sizes: '96x96' },
      // { rel: 'icon', type: 'image/png', href: '/favicons/android-chrome-192x192.png', sizes: '192x192' },
      // { rel: 'apple-touch-icon', href: '/favicons/apple-touch-icon-57x57.png', sizes: '57x57' },
      // { rel: 'apple-touch-icon', href: '/favicons/apple-touch-icon-60x60.png', sizes: '60x60' },
      // { rel: 'apple-touch-icon', href: '/favicons/apple-touch-icon-72x72.png', sizes: '72x72' },
      // { rel: 'apple-touch-icon', href: '/favicons/apple-touch-icon-76x76.png', sizes: '76x76' },
      // { rel: 'apple-touch-icon', href: '/favicons/apple-touch-icon-114x114.png', sizes: '114x114' },
      // { rel: 'apple-touch-icon', href: '/favicons/apple-touch-icon-120x120.png', sizes: '120x120' },
      // { rel: 'apple-touch-icon', href: '/favicons/apple-touch-icon-144x144.png', sizes: '144x144' },
      // { rel: 'apple-touch-icon', href: '/favicons/apple-touch-icon-152x152.png', sizes: '152x152' },
      // { rel: 'apple-touch-icon', href: '/favicons/apple-touch-icon-180x180.png', sizes: '180x180' },
      // { rel: 'mask-icon', type: 'image/png', href: '/favicons/safari-pinned-tab.svg', color: '#c1c1c1' },
      // { rel: 'manifest', href: '/manifest.json' }
    ]
  },
  /*
  ** Load global CSS
  */
  css: ['@/assets/css/main.css'],
  /*
  ** Load nuxt modules
  */
  modules: [
    'nuxt-purgecss'
  ],
  plugins: ['~/plugins/lazyload', '~/plugins/globalComponents'],
  /*
  ** PurgeCSS
  ** https://github.com/Developmint/nuxt-purgecss
  */
  purgeCSS: {},
  /*
  ** This option is given directly to the vue-router Router constructor
  */
  router: {
    base: '',
    linkActiveClass: 'is-active'
  },
  /*
  ** Customize the progress bar color
  */
  loading: { color: '#3B8070' },
  /*
  ** Build configuration
  */
  build: {
    analyze: {
      analyzerMode: 'static'
    },
    /*
+    ** Extract CSS
+    */
    extractCSS: true,
    /*
    ** Run ESLint on save
    */
    extend (config, { isDev, isClient }) {
      const rule = config.module.rules.find(r => r.test.toString() === '/\\.(png|jpe?g|gif|svg|webp)$/');
      config.module.rules.splice(config.module.rules.indexOf(rule), 1);

      config.module.rules.push({
        test: /\.md$/,
        loader: 'frontmatter-markdown-loader',
        include: path.resolve(__dirname, 'contents'),
        options: {
          vue: {
            root: "dynamicMarkdown"
          }
        }
      }, {
        test: /\.(jpe?g|png)$/i,
        loader: 'responsive-loader',
        options: {
          placeholder: true,
          quality: 60,
          size: 1400,
          adapter: require('responsive-loader/sharp')
        }
      }, {
        test: /\.(gif|svg)$/,
        loader: 'url-loader',
        query: {
          limit: 1000,
          name: 'img/[name].[hash:7].[ext]'
        }
      });

      if (isDev && isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }
  },
  generate: {
    routes: [
      '404'
    ]
      .concat(blogPosts.map(w => `/blog/${w}`))
  }
}
