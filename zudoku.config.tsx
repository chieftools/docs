import type {ZudokuConfig} from 'zudoku';
import {createApiIdentityPlugin} from 'zudoku/plugins';
import {ExternalLink} from './src/ExternalLink.js';

const config: ZudokuConfig = {
    site: {
        title: 'Chief Tools Documentation',
        logo: {
            src: {
                light: 'https://static.assets.chief.tools/icons/accountchief_full_256.png',
                dark: 'https://static.assets.chief.tools/icons/accountchief_full_256.png',
            },
            alt: 'Chief Tools Logo',
            href: 'https://chief.app?ref=chiefdocs',
            width: '160px',
        },
        showPoweredBy: false,
    },
    docs: {
        defaultOptions: {
            suggestEdit: {
                text: 'Edit this page',
                url: 'https://github.com/chieftools/docs/edit/main/docs/{filePath}',
            },
            showLastModified: false,
        },
    },
    sitemap: {
        siteUrl: 'https://docs.chief.tools',
    },
    metadata: {
        title: '%s - Chief Tools Documentation',
        defaultTitle: 'Chief Tools Documentation',
        favicon: 'https://static.assets.chief.tools/icons/accountchief_favicon.svg',
    },
    navigation: [
        {
            type: 'category',
            label: 'Documentation',
            items: [
                {
                    type: 'category',
                    label: 'Getting Started',
                    icon: 'sparkles',
                    items: [
                        '/introduction',
                        '/support',
                        '/security',
                        '/bots',
                    ],
                },
                {
                    type: 'category',
                    label: 'Account Chief',
                    icon: 'book',
                    items: [
                        '/accountchief/introduction',
                        '/accountchief/tokens',
                    ],
                },
                {
                    type: 'category',
                    label: 'Domain Chief',
                    icon: 'book',
                    items: [
                        '/domainchief/introduction',
                        {
                            type: 'category',
                            label: 'API',
                            collapsible: false,
                            items: [
                                '/domainchief/api/introduction',
                                '/domainchief/api/metadata',
                                {
                                    type: 'link',
                                    label: 'Playground',
                                    to: '/api/domainchief',
                                },
                            ],
                        },
                        {
                            type: 'category',
                            label: 'Developers',
                            collapsible: false,
                            items: [
                                '/domainchief/developers/domain-connect',
                            ],
                        },
                    ],
                },
                {
                    type: 'category',
                    label: 'Cert Chief',
                    icon: 'book',
                    items: [
                        '/certchief/introduction',
                        '/certchief/ip-addresses',
                    ],
                },
                {
                    type: 'category',
                    label: 'Deploy Chief',
                    icon: 'book',
                    items: [
                        '/deploychief/introduction',
                        '/deploychief/server-setup',
                    ],
                },
                {
                    type: 'category',
                    label: 'Tny',
                    icon: 'book',
                    items: [
                        '/tny/introduction',
                        '/tny/custom-domains',
                    ],
                },
                {
                    type: 'category',
                    label: 'FlowGuard',
                    icon: 'book',
                    items: [
                        '/flowguard/introduction',
                    ],
                },
                {
                    type: 'category',
                    label: 'Bill.DO',
                    icon: 'book',
                    items: [
                        '/billdo/introduction',
                        '/billdo/frequently-asked-questions',
                    ],
                },
                {
                    type: 'category',
                    label: 'Useful Links',
                    collapsible: false,
                    icon: 'link',
                    items: [
                        {
                            type: 'link',
                            icon: 'line-squiggle',
                            label: 'Roadmap',
                            to: 'https://roadmap.chief.tools?ref=chiefdocs',
                        },
                        {
                            type: 'link',
                            icon: 'code',
                            label: 'GitHub',
                            to: 'https://github.com/chieftools?ref=chiefdocs',
                        },
                    ],
                },
            ],
        },
        {
            type: 'link',
            to: '/api/domainchief',
            label: 'Domain Chief API',
        },
    ],
    redirects: [
        {from: '/', to: '/introduction'},
        {from: '/accountchief', to: '/accountchief/introduction'},
        {from: '/billdo', to: '/billdo/introduction'},
        {from: '/certchief', to: '/certchief/introduction'},
        {from: '/deploychief', to: '/deploychief/introduction'},
        {from: '/domainchief', to: '/domainchief/introduction'},
        {from: '/tny', to: '/tny/introduction'},
    ],
    apis: [
        {
            type: 'url',
            input: process.env.ZUDOKU_PUBLIC_DOMAINCHIEF_API_SPEC,
            path: '/api/domainchief',
        },
    ],
    search: {
        type: 'pagefind',
    },
    authentication: {
        type: 'openid',
        clientId: process.env.ZUDOKU_PUBLIC_AUTH_CLIENT_ID,
        issuer: process.env.ZUDOKU_PUBLIC_AUTH_ISSUER,
        scopes: ['openid', 'profile', 'email', 'domainchief'],
    },
    plugins: [
        createApiIdentityPlugin({
            getIdentities: async (context) => [
                {
                    id: 'openid',
                    label: 'Chief Tools (OpenID)',
                    authorizeRequest: async (request) => {
                        // We get the access token from the
                        // authentication provider (Auth0) and add it to the request headers
                        const token = await context.authentication?.getAccessToken();
                        if (token) {
                            request.headers.set('Authorization', `Bearer ${token}`);
                        }
                        return request;
                    },
                },
            ],
        }),
    ],
    mdx: {
        components: {
            ExternalLink,
        },
    },
};

export default config;
