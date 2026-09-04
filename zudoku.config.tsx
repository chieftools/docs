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
    apis: [
        {
            type: 'file',
            path: '/api/accountchief/rest',
            input: './apis/accountchief.json',
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
        {
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
        {
            type: 'file',
            path: '/api/flowguard',
            input: './apis/flowguard.json',
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
    ],
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
            schema: './apis/accountchief.graphql',
            endpoint: 'https://account.chief.app/api/graphql',
            path: '/api/accountchief/graphql',
            options: {
                title: 'Account Chief GraphQL API',
                description: 'Query Account Chief profiles, teams, and account data.',
            },
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
        {from: '/accountchief/tokens', to: '/developers/authentication'},
        {from: '/accountchief/api/tokens', to: '/developers/authentication'},
        {from: '/accountchief/api/scopes', to: '/developers/accountchief/scopes'},
        {from: '/api/tokens', to: '/developers/authentication'},
        {from: '/api/scopes', to: '/developers/scopes'},
        {from: '/api/discovery', to: '/developers/discovery'},
        {from: '/domainchief', to: '/domainchief/introduction'},
        {from: '/domainchief/developers', to: '/developers/domainchief'},
        {from: '/domainchief/developers/introduction', to: '/developers/domainchief'},
        {from: '/domainchief/developers/guides', to: '/developers/domainchief#developer-guides'},
        {from: '/domainchief/developers/guides/notices', to: '/developers/domainchief/guides/notices'},
        {from: '/domainchief/developers/guides/domain-connect', to: '/developers/domainchief/guides/domain-connect'},
        {from: '/domainchief/developers/api', to: '/developers/domainchief/api/introduction'},
        {from: '/domainchief/developers/api/introduction', to: '/developers/domainchief/api/introduction'},
        {from: '/domainchief/developers/api/scopes', to: '/developers/domainchief/api/scopes'},
        {from: '/domainchief/developers/api/metadata', to: '/developers/domainchief/api/metadata'},
        {from: '/domainchief/developers/notices', to: '/developers/domainchief/guides/notices'},
        {from: '/domainchief/developers/domain-connect', to: '/developers/domainchief/guides/domain-connect'},
        {from: '/domainchief/developers/example-tld', to: '/domainchief/example-tld'},
        {from: '/domainchief/api', to: '/developers/domainchief/api/introduction'},
        {from: '/domainchief/api/introduction', to: '/developers/domainchief/api/introduction'},
        {from: '/domainchief/api/scopes', to: '/developers/domainchief/api/scopes'},
        {from: '/domainchief/api/metadata', to: '/developers/domainchief/api/metadata'},
        {from: '/developers/domainchief/introduction', to: '/developers/domainchief'},
        {from: '/developers/domainchief/guides', to: '/developers/domainchief#developer-guides'},
        {from: '/developers/domainchief/guides/events', to: '/developers/domainchief/guides/sync-data'},
        {from: '/developers/domainchief/guides/domain-inventory', to: '/developers/domainchief/guides/sync-data'},
        {from: '/developers/domainchief/api', to: '/developers/domainchief/api/introduction'},
        {from: '/certchief', to: '/certchief/introduction'},
        {from: '/certchief/ip-addresses', to: '/certchief/bot#ip-addresses'},
        {from: '/deploychief', to: '/deploychief/introduction'},
        {from: '/tny', to: '/tny/introduction'},
        {from: '/tny/api/scopes', to: '/developers/tny/scopes'},
        {from: '/flowguard', to: '/flowguard/introduction'},
        {from: '/flowguard/api/scopes', to: '/developers/flowguard/scopes'},
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
                    ],
                },
                {
                    type: 'category',
                    label: 'Account Chief',
                    icon: 'book',
                    items: [
                        '/accountchief/introduction',
                        {
                            type: 'doc',
                            file: '/accountchief/teams',
                            label: 'Teams and roles',
                        },
                        {
                            type: 'link',
                            label: 'Developers',
                            to: '/developers/accountchief',
                            stack: true,
                        },
                        // Keep related authentication pages in the Account Chief stack.
                        {
                            type: 'link',
                            label: 'Tokens',
                            to: '/developers/authentication',
                            stack: true,
                            display: 'hide',
                        },
                        {
                            type: 'link',
                            label: 'How scopes work',
                            to: '/developers/scopes',
                            stack: true,
                            display: 'hide',
                        },
                        {
                            type: 'link',
                            label: 'OAuth and OpenID Connect',
                            to: '/developers/discovery',
                            stack: true,
                            display: 'hide',
                        },
                        {
                            type: 'link',
                            label: 'Scopes',
                            to: '/developers/accountchief/scopes',
                            stack: true,
                            display: 'hide',
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
                            type: 'doc',
                            file: '/domainchief/getting-started',
                            label: 'Getting started',
                        },
                        {
                            type: 'category',
                            label: 'Domains',
                            collapsible: true,
                            items: [
                                '/domainchief/registration',
                                '/domainchief/transfers',
                                '/domainchief/action-required',
                                '/domainchief/domain-portfolio',
                                '/domainchief/renewals-expiration',
                                '/domainchief/registrant-contacts-privacy',
                            ],
                        },
                        {
                            type: 'category',
                            label: 'DNS and services',
                            collapsible: true,
                            items: [
                                '/domainchief/nameservers-dnssec',
                                '/domainchief/cloudflare-dnssec',
                                '/domainchief/dns-records',
                                '/domainchief/dns-import-migration',
                                '/domainchief/web-redirects',
                                '/domainchief/email-forwarding',
                            ],
                        },
                        {
                            type: 'category',
                            label: 'Tools and billing',
                            collapsible: true,
                            items: [
                                '/domainchief/tlds-pricing',
                                '/domainchief/billing-payments',
                                '/domainchief/ai',
                                '/domainchief/example-tld',
                            ],
                        },
                        {
                            type: 'link',
                            label: 'Developers',
                            to: '/developers/domainchief',
                            stack: true,
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
                            type: 'link',
                            label: 'Developers',
                            to: '/developers/certchief',
                            stack: true,
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
                            type: 'link',
                            label: 'Developers',
                            to: '/developers/deploychief',
                            stack: true,
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
                            type: 'link',
                            label: 'Developers',
                            to: '/developers/tny',
                            stack: true,
                        },
                    ],
                },
                {
                    type: 'category',
                    label: 'FlowGuard',
                    icon: 'book',
                    items: [
                        '/flowguard/introduction',
                        '/flowguard/stream',
                        {
                            type: 'link',
                            label: 'Developers',
                            to: '/developers/flowguard',
                            stack: true,
                        },
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
            type: 'category',
            label: 'Developers',
            items: [
                {
                    type: 'category',
                    label: 'General',
                    icon: 'sparkles',
                    items: [
                        {
                            type: 'doc',
                            file: '/developers',
                            label: 'Introduction',
                        },
                        {
                            type: 'link',
                            label: 'Documentation',
                            to: '/introduction',
                        },
                    ],
                },
                {
                    type: 'category',
                    label: 'Authentication',
                    icon: 'key-round',
                    items: [
                        {
                            type: 'doc',
                            file: '/developers/authentication',
                            label: 'Tokens',
                        },
                        {
                            type: 'doc',
                            file: '/developers/discovery',
                            label: 'OAuth and OpenID Connect',
                        },
                        {
                            type: 'doc',
                            file: '/developers/scopes',
                            label: 'How scopes work',
                        },
                    ],
                },
                {
                    type: 'category',
                    label: 'Account Chief',
                    icon: 'code',
                    items: [
                        {
                            type: 'doc',
                            file: '/developers/accountchief',
                            label: 'Introduction',
                        },
                        {
                            type: 'category',
                            label: 'API',
                            collapsible: true,
                            items: [
                                {
                                    type: 'doc',
                                    file: '/developers/accountchief/scopes',
                                    label: 'Scopes',
                                },
                                {
                                    type: 'link',
                                    label: 'REST API reference',
                                    to: '/api/accountchief/rest',
                                    stack: true,
                                },
                                {
                                    type: 'link',
                                    label: 'GraphQL API reference',
                                    to: '/api/accountchief/graphql',
                                    stack: true,
                                },
                            ],
                        },
                    ],
                },
                {
                    type: 'category',
                    label: 'Domain Chief',
                    icon: 'code',
                    items: [
                        {
                            type: 'doc',
                            file: '/developers/domainchief',
                            label: 'Introduction',
                        },
                        {
                            type: 'category',
                            label: 'Guides',
                            collapsible: true,
                            items: [
                                '/developers/domainchief/guides/domain-search-pricing',
                                '/developers/domainchief/guides/contacts',
                                '/developers/domainchief/guides/registration',
                                '/developers/domainchief/guides/incoming-transfers',
                                '/developers/domainchief/guides/sync-data',
                                '/developers/domainchief/guides/notices',
                                '/developers/domainchief/guides/domain-connect',
                            ],
                        },
                        {
                            type: 'category',
                            label: 'API',
                            collapsible: true,
                            items: [
                                '/developers/domainchief/api/introduction',
                                '/developers/domainchief/api/scopes',
                                '/developers/domainchief/api/metadata',
                                {
                                    type: 'link',
                                    label: 'API reference',
                                    to: '/api/domainchief',
                                    stack: true,
                                },
                            ],
                        },
                    ],
                },
                {
                    type: 'category',
                    label: 'Cert Chief',
                    icon: 'code',
                    items: [
                        {
                            type: 'doc',
                            file: '/developers/certchief',
                            label: 'Introduction',
                        },
                        {
                            type: 'category',
                            label: 'API',
                            collapsible: true,
                            items: [
                                {
                                    type: 'link',
                                    label: 'GraphQL API reference',
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
                    icon: 'code',
                    items: [
                        {
                            type: 'doc',
                            file: '/developers/deploychief',
                            label: 'Introduction',
                        },
                        {
                            type: 'category',
                            label: 'API',
                            collapsible: true,
                            items: [
                                {
                                    type: 'link',
                                    label: 'GraphQL API reference',
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
                    icon: 'code',
                    items: [
                        {
                            type: 'doc',
                            file: '/developers/tny',
                            label: 'Introduction',
                        },
                        {
                            type: 'category',
                            label: 'API',
                            collapsible: true,
                            items: [
                                {
                                    type: 'doc',
                                    file: '/developers/tny/scopes',
                                    label: 'Scopes',
                                },
                                {
                                    type: 'link',
                                    label: 'GraphQL API reference',
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
                    icon: 'code',
                    items: [
                        {
                            type: 'doc',
                            file: '/developers/flowguard',
                            label: 'Introduction',
                        },
                        {
                            type: 'category',
                            label: 'API',
                            collapsible: true,
                            items: [
                                {
                                    type: 'doc',
                                    file: '/developers/flowguard/scopes',
                                    label: 'Scopes',
                                },
                                {
                                    type: 'link',
                                    label: 'REST API reference',
                                    to: '/api/flowguard',
                                    stack: true,
                                },
                            ],
                        },
                    ],
                },
            ],
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
            'flowguard:read',
            'deploychief',
        ],
        issuer: process.env.ZUDOKU_PUBLIC_AUTH_ISSUER as string,
        clientId: process.env.ZUDOKU_PUBLIC_AUTH_CLIENT_ID as string,
    },
    syntaxHighlighting: {
        languages: [...defaultLanguages, 'http', 'nginx', 'regex'],
    },
    canonicalUrlOrigin: 'https://docs.chief.tools',
};

export default config;
