import type { ReactNode } from 'react';
import type { ZudokuPlugin } from 'zudoku';

import { ogImageManifest } from 'virtual:chief-og-images';

import type { OgImageMetadata } from './types.js';

const canonicalOrigin = 'https://docs.chief.tools';

const normalizePathname = (pathname: string): string =>
  pathname.length > 1 ? pathname.replace(/\/+$/, '') : pathname;

const findMetadata = (pathname: string): OgImageMetadata | undefined =>
  ogImageManifest.pages[pathname] ??
  ogImageManifest.fallbacks.find(
    ({ prefix }) =>
      prefix === '/' || pathname === prefix || pathname.startsWith(`${prefix}/`),
  )?.metadata;

export const chiefOgImagePlugin = (): ZudokuPlugin => ({
  getHead: ({ location }): ReactNode => {
    const pathname = normalizePathname(location.pathname);
    const metadata = findMetadata(pathname);

    if (!metadata) {
      return;
    }

    const canonicalUrl = new URL(pathname, canonicalOrigin).toString();

    return (
      <>
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Chief Tools Documentation" />
        <meta property="og:title" content={metadata.title} />
        <meta property="og:description" content={metadata.description} />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:image" content={metadata.imageUrl} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@chieftools" />
        <meta name="twitter:title" content={metadata.title} />
        <meta name="twitter:description" content={metadata.description} />
        <meta name="twitter:url" content={canonicalUrl} />
        <meta name="twitter:image" content={metadata.imageUrl} />
      </>
    );
  },
});
