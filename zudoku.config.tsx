import {ExternalLink} from './src/ExternalLink.js';
import {chiefOgImagePlugin} from './src/og-images/plugin.js';
import {graphqlPlugin} from '@zudoku/plugin-graphql';
import {createApiIdentityPlugin} from 'zudoku/plugins';
import {defaultLanguages, type ZudokuConfig} from 'zudoku';

const config: ZudokuConfig = {
    mdx: {
        components: {
            ExternalLink,
        },
    },
    site: {
        title: 'Chief Tools Documentation',
        logo: {
            src: {
                light: 'https://static.assets.chief.tools/icons/accountchief_full_256.png',
                dark: 'https://static.assets.chief.tools/icons/accountchief_full_white_256.png',
            },
            alt: 'Chief Tools Logo',
            href: 'https://chief.app?ref=chiefdocs',
            width: '160px',
        },
        showPoweredBy: false,
    },
    apis: {
        type: 'file',
        path: '/api/domainchief',
        input: './apis/domainchief.json',
        options: {
            schemaDownload: {
                enabled: true,
            },
            disableSecurity: false,
            examplesLanguage: 'shell',
            supportedLanguages: [
                {label: 'cURL', value: 'shell'},
            ],
        },
    },
    docs: {
        llms: {
            llmsTxt: true,
            llmsTxtFull: true,
            includeProtected: false,
        },
        files: 'pages/**/*.{md,mdx}',
        defaultOptions: {
            suggestEdit: {
                text: 'Edit this page',
                url: 'https://github.com/chieftools/docs/edit/main/docs/{filePath}',
            },
            showLastModified: false,
        },
        publishMarkdown: true,
    },
    search: {
        type: 'pagefind',
    },
    plugins: [
        chiefOgImagePlugin(),
        createApiIdentityPlugin({
            getIdentities: async (context) => [
                {
                    id: 'openid',
                    label: 'Chief Tools account',
                    authorizeRequest: async (request) => {
                        if (!context.getAuthState().isAuthenticated) {
                            throw new Error(
                                'Sign in to Chief Tools from the documentation header before sending an authenticated request.',
                            );
                        }

                        return context.signRequest(request);
                    },
                    authorizationFields: {
                        headers: ['Authorization'],
                    },
                },
            ],
        }),
        graphqlPlugin({
            schema: './apis/certchief.graphql',
            endpoint: 'https://cert.chief.app/api/graphql',
            path: '/api/certchief',
            options: {
                title: 'Cert Chief GraphQL API',
                description: 'Query and manage Cert Chief domains, monitors, and TLS server tests.',
            },
        }),
        graphqlPlugin({
            schema: './apis/tny.graphql',
            endpoint: 'https://tny.app/api/graphql',
            path: '/api/tny',
            options: {
                title: 'Tny GraphQL API',
                description: 'Query Tny links, custom domains, and URL utilities.',
            },
        }),
        graphqlPlugin({
            schema: './apis/deploychief.graphql',
            endpoint: 'https://deploy.chief.app/api/graphql',
            path: '/api/deploychief',
            options: {
                title: 'Deploy Chief GraphQL API',
                description: 'Query and manage applications, servers, environments, and deployments.',
            },
        }),
    ],
    sitemap: {
        siteUrl: 'https://docs.chief.tools',
    },
    metadata: {
        title: '%s | Chief Tools Documentation',
        defaultTitle: 'Chief Tools Documentation',
        favicon: 'https://static.assets.chief.tools/icons/accountchief_favicon.svg',
    },
    redirects: [
        {from: '/', to: '/introduction'},
        {from: '/accountchief', to: '/accountchief/introduction'},
        {from: '/accountchief/tokens', to: '/api/tokens'},
        {from: '/accountchief/api/tokens', to: '/api/tokens'},
        {from: '/domainchief', to: '/domainchief/introduction'},
        {from: '/certchief', to: '/certchief/introduction'},
        {from: '/certchief/ip-addresses', to: '/certchief/bot#ip-addresses'},
        {from: '/deploychief', to: '/deploychief/introduction'},
        {from: '/tny', to: '/tny/introduction'},
        {from: '/flowguard', to: '/flowguard/introduction'},
        {from: '/billdo', to: '/billdo/introduction'},
        {from: '/toolchief', to: '/introduction'},
    ],
    navigation: [
        {
            type: 'category',
            label: 'Documentation',
            items: [
                {
                    type: 'category',
                    label: 'General',
                    icon: 'sparkles',
                    items: [
                        '/introduction',
                        '/support',
                        '/security',
                        '/bots',
                        {
                            type: 'category',
                            label: 'API',
                            collapsible: false,
                            items: [
                                '/api/tokens',
                                '/api/scopes',
                                '/api/discovery',
                            ],
                        },
                    ],
                },
                {
                    type: 'category',
                    label: 'Account Chief',
                    icon: 'book',
                    items: [
                        '/accountchief/introduction',
                        {
                            type: 'category',
                            label: 'API',
                            collapsible: false,
                            items: [
                                '/accountchief/api/scopes',
                            ],
                        },
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
                            label: 'Guides',
                            collapsible: false,
                            items: [
                                '/domainchief/registration',
                                '/domainchief/transfers',
                                '/domainchief/domain-portfolio',
                                '/domainchief/renewals-expiration',
                                '/domainchief/registrant-contacts-privacy',
                                '/domainchief/nameservers-dnssec',
                                '/domainchief/cloudflare-dnssec',
                                '/domainchief/dns-records',
                                '/domainchief/dns-import-migration',
                                '/domainchief/web-redirects',
                                '/domainchief/email-forwarding',
                                '/domainchief/billing-payments',
                                '/domainchief/ai',
                            ],
                        },
                        {
                            type: 'category',
                            label: 'API',
                            collapsible: false,
                            items: [
                                '/domainchief/api/introduction',
                                '/domainchief/api/scopes',
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
                                '/domainchief/developers/example-tld',
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
                        '/certchief/bot',
                        {
                            type: 'category',
                            label: 'API',
                            collapsible: false,
                            items: [
                                {
                                    type: 'link',
                                    label: 'GraphQL API',
                                    to: '/api/certchief',
                                    stack: true,
                                },
                            ],
                        },
                    ],
                },
                {
                    type: 'category',
                    label: 'Deploy Chief',
                    icon: 'book',
                    items: [
                        '/deploychief/introduction',
                        '/deploychief/server-setup',
                        {
                            type: 'category',
                            label: 'API',
                            collapsible: false,
                            items: [
                                {
                                    type: 'link',
                                    label: 'GraphQL API',
                                    to: '/api/deploychief',
                                    stack: true,
                                },
                            ],
                        },
                    ],
                },
                {
                    type: 'category',
                    label: 'Tny',
                    icon: 'book',
                    items: [
                        '/tny/introduction',
                        '/tny/custom-domains',
                        {
                            type: 'category',
                            label: 'API',
                            collapsible: false,
                            items: [
                                '/tny/api/scopes',
                                {
                                    type: 'link',
                                    label: 'GraphQL API',
                                    to: '/api/tny',
                                    stack: true,
                                },
                            ],
                        },
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
    authentication: {
        type: 'openid',
        scopes: [
            'openid',
            'profile',
            'email',
            'domainchief:read',
            'certchief',
            'tny:read',
            'deploychief',
        ],
        issuer: process.env.ZUDOKU_PUBLIC_AUTH_ISSUER as string,
        clientId: process.env.ZUDOKU_PUBLIC_AUTH_CLIENT_ID as string,
    },
    syntaxHighlighting: {
        languages: [...defaultLanguages, 'nginx', 'regex'],
    },
    canonicalUrlOrigin: 'https://docs.chief.tools',
};

export default config;
