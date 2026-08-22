export type OgImageBrand = {
  prefix: string;
  styleId: string;
  productName: string;
  label: 'API reference' | 'Documentation';
  fallbackTitle: string;
  fallbackDescription: string;
};

export const ogImageBrands: OgImageBrand[] = [
  {
    prefix: '/domainchief/api',
    styleId: 'domainchief',
    productName: 'Domain Chief',
    label: 'API reference',
    fallbackTitle: 'Domain Chief API reference',
    fallbackDescription: 'Integrate applications and scripts with the Domain Chief API.',
  },
  {
    prefix: '/api/domainchief',
    styleId: 'domainchief',
    productName: 'Domain Chief',
    label: 'API reference',
    fallbackTitle: 'Domain Chief API reference',
    fallbackDescription: 'Integrate applications and scripts with the Domain Chief API.',
  },
  {
    prefix: '/api/certchief',
    styleId: 'certchief',
    productName: 'Cert Chief',
    label: 'API reference',
    fallbackTitle: 'Cert Chief API reference',
    fallbackDescription: 'Query Cert Chief domains, monitors, and TLS server tests.',
  },
  {
    prefix: '/api/deploychief',
    styleId: 'deploychief',
    productName: 'Deploy Chief',
    label: 'API reference',
    fallbackTitle: 'Deploy Chief API reference',
    fallbackDescription: 'Manage applications, servers, environments, and deployments.',
  },
  {
    prefix: '/api/tny',
    styleId: 'tny',
    productName: 'Tny',
    label: 'API reference',
    fallbackTitle: 'Tny API reference',
    fallbackDescription: 'Manage Tny links, custom domains, and URL utilities.',
  },
  {
    prefix: '/domainchief',
    styleId: 'domainchief',
    productName: 'Domain Chief',
    label: 'Documentation',
    fallbackTitle: 'Domain Chief documentation',
    fallbackDescription: 'Register domains and manage contacts, DNS, nameservers, and redirects.',
  },
  {
    prefix: '/certchief',
    styleId: 'certchief',
    productName: 'Cert Chief',
    label: 'Documentation',
    fallbackTitle: 'Cert Chief documentation',
    fallbackDescription: 'Monitor certificates and inspect Cert Chief services.',
  },
  {
    prefix: '/deploychief',
    styleId: 'deploychief',
    productName: 'Deploy Chief',
    label: 'Documentation',
    fallbackTitle: 'Deploy Chief documentation',
    fallbackDescription: 'Configure servers and deploy applications with Deploy Chief.',
  },
  {
    prefix: '/flowguard',
    styleId: 'flowguard',
    productName: 'FlowGuard',
    label: 'Documentation',
    fallbackTitle: 'FlowGuard documentation',
    fallbackDescription: 'Learn how to configure and use FlowGuard.',
  },
  {
    prefix: '/billdo',
    styleId: 'billdo',
    productName: 'Bill.DO',
    label: 'Documentation',
    fallbackTitle: 'Bill.DO documentation',
    fallbackDescription: 'Understand and use Bill.DO billing insights.',
  },
  {
    prefix: '/accountchief',
    styleId: 'accountchief',
    productName: 'Account Chief',
    label: 'Documentation',
    fallbackTitle: 'Account Chief documentation',
    fallbackDescription: 'Manage your Chief Tools account, access, and identity settings.',
  },
  {
    prefix: '/tny',
    styleId: 'tny',
    productName: 'Tny',
    label: 'Documentation',
    fallbackTitle: 'Tny documentation',
    fallbackDescription: 'Create and manage Tny links and custom domains.',
  },
  {
    prefix: '/api',
    styleId: 'docs',
    productName: 'Chief Tools',
    label: 'API reference',
    fallbackTitle: 'Chief Tools API reference',
    fallbackDescription: 'Authenticate with and integrate the Chief Tools APIs.',
  },
  {
    prefix: '/',
    styleId: 'docs',
    productName: 'Chief Tools Documentation',
    label: 'Documentation',
    fallbackTitle: 'Chief Tools Documentation',
    fallbackDescription: 'Documentation for Chief Tools products and APIs.',
  },
];

export const findOgImageBrand = (pathname: string): OgImageBrand =>
  ogImageBrands.find(
    ({ prefix }) =>
      prefix === '/' || pathname === prefix || pathname.startsWith(`${prefix}/`),
  ) ?? ogImageBrands[ogImageBrands.length - 1];
