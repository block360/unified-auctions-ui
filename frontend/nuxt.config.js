import pkg from './package.json';

const PREVIEW_IMAGE = (process.env.FRONTEND_ORIGIN || '') + '/preview.jpeg';
const SITE_TITLE = 'Unified Auctions';
const SITE_DESCRIPTION = `The "${SITE_TITLE}" is the portal to all GSU protocol Auctions related services. Easily interact with the GSU Protocol through streamlined interfaces, inform yourself about how the protocol works and receive updates on current auctions.`;
const TWITTER_HANDLE = '@GSUcoin';

export default {
    // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
    ssr: false,

    // Target: https://go.nuxtjs.dev/config-target
    target: 'static',
    env: {
        RPC_URL: process.env.RPC_URL,
        DEMO_MODE: process.env.DEMO_MODE || false,
        PRODUCTION_DOMAIN: process.env.PRODUCTION_DOMAIN,
        CONTACT_EMAIL: process.env.CONTACT_EMAIL || undefined,
        GITHUB_URL: pkg.repository.url,
        STAGING_BANNER_URL: process.env.STAGING_BANNER_URL || undefined,
        HEAPIO_ID: process.env.HEAPIO_ID || undefined,
        CHAINLOG_ADDRESS: process.env.CHAINLOG_ADDRESS,
    },
    publicRuntimeConfig: {
        TERMS_AND_CONDITIONS_URL: '/pdf/Unified-Auction-UI_Terms.Conditions.pdf',
    },

    // Global page headers: https://go.nuxtjs.dev/config-head
    head: {
        title: SITE_TITLE,
        htmlAttrs: {
            lang: 'en',
        },
        meta: [
            { charset: 'utf-8' },
            { name: 'viewport', content: 'width=device-width, initial-scale=1' },
            { name: 'description', content: SITE_DESCRIPTION },
            { property: 'og:title', content: SITE_TITLE },
            { property: 'og:type', content: 'website' },
            { property: 'og:description', content: SITE_DESCRIPTION },
            { property: 'og:image', content: PREVIEW_IMAGE },
            { name: 'theme-color', content: '#d42f5d' },
            { name: 'twitter:card', content: 'app' },
            { name: 'twitter:site', content: TWITTER_HANDLE },
            { name: 'twitter:title', content: SITE_TITLE },
            { name: 'twitter:description', content: SITE_DESCRIPTION },
            { name: 'twitter:image', content: PREVIEW_IMAGE },
        ],
        link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
        script: [{ src: '/js/HeapIO.js' }],
    },

    // Global CSS: https://go.nuxtjs.dev/config-css
    css: [],

    // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
    plugins: ['~/plugins/vuex-persist.client.js', '~/plugins/antdesign.client.js', '~/plugins/crypto-icons.client.js'],

    // Auto import components: https://go.nuxtjs.dev/config-components
    components: false,

    // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
    buildModules: [
        // https://github.com/nuxt-community/dotenv-module
        '@nuxtjs/dotenv',
        // https://go.nuxtjs.dev/typescript
        '@nuxt/typescript-build',
        // https://go.nuxtjs.dev/stylelint
        '@nuxtjs/stylelint-module',
        // Doc: https://github.com/nuxt-community/nuxt-tailwindcss
        '@nuxtjs/tailwindcss',
    ],

    // Modules: https://go.nuxtjs.dev/config-modules
    modules: [
        // https://github.com/paulgv/nuxt-vuex-router-sync
        'nuxt-vuex-router-sync',
        // https://github.com/moritzsternemann/vue-plausible
        'vue-plausible',
    ],

    // Plausible.io Settings
    plausible: {
        domain: process.env.PRODUCTION_DOMAIN,
    },

    // Build Configuration: https://go.nuxtjs.dev/config-build
    build: {
        // Webpack config
        extend: config => {
            // remove svg from the standard nuxt loader
            const svgRule = config.module.rules.find(rule => rule.test.test('.svg'));
            svgRule.test = /\.(png|jpe?g|gif|webp)$/;

            // add custom vue-svg-loader loader
            config.module.rules.push({
                test: /\.svg$/,
                use: ['babel-loader', 'vue-svg-loader'],
            });
        },
        loaders: {
            less: {
                lessOptions: {
                    javascriptEnabled: true,
                },
            },
        },
    },
};
