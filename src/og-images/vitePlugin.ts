import { promises as fs } from 'node:fs';
import path from 'node:path';

import type { Plugin } from 'zudoku/vite';

import { findOgImageBrand, ogImageBrands } from './catalog.js';
import { readPageFrontmatter } from './frontmatter.js';
import { signOgImageUrl } from './signing.js';
import type { OgImageManifest, OgImageMetadata } from './types.js';

const virtualModuleId = 'virtual:chief-og-images';
const resolvedVirtualModuleId = `\0${virtualModuleId}`;

const listDocumentationFiles = async (directory: string): Promise<string[]> => {
  const entries = await fs.readdir(directory, { withFileTypes: true });
  const files = await Promise.all(
    entries.map(async (entry) => {
      const entryPath = path.join(directory, entry.name);

      if (entry.isDirectory()) {
        return listDocumentationFiles(entryPath);
      }

      return /\.mdx?$/.test(entry.name) ? [entryPath] : [];
    }),
  );

  return files.flat();
};

const routeFromFile = (pagesDirectory: string, filePath: string): string => {
  const relativePath = path.relative(pagesDirectory, filePath).replaceAll(path.sep, '/');
  const withoutExtension = relativePath.replace(/\.mdx?$/, '');
  const withoutIndex = withoutExtension.replace(/(?:^|\/)index$/, '');

  return `/${withoutIndex}`.replace(/\/$/, '') || '/';
};

const slugFromRoute = (route: string): string =>
  route.replace(/^\//, '').replace(/[^a-z0-9]+/gi, '-').replace(/^-|-$/g, '') || 'home';

const parseEnvValue = (source: string, key: string): string | undefined => {
  const match = source.match(new RegExp(`^${key}=(.*)$`, 'm'));

  if (!match) {
    return undefined;
  }

  return match[1].trim().replace(/^(?:"(.*)"|'(.*)')$/, '$1$2');
};

const readSigningSecret = async (rootDirectory: string): Promise<string> => {
  if (process.env.CHIEF_DOCS_OG_SECRET_KEY) {
    return process.env.CHIEF_DOCS_OG_SECRET_KEY;
  }

  const envPath = path.join(rootDirectory, '.env');
  const source = await fs.readFile(envPath, 'utf8').catch(() => '');
  const secret = parseEnvValue(source, 'CHIEF_DOCS_OG_SECRET_KEY');

  if (!secret) {
    throw new Error('CHIEF_DOCS_OG_SECRET_KEY is required to generate social images.');
  }

  return secret;
};

const createMetadata = (
  secret: string,
  route: string,
  title: string,
  description: string,
): OgImageMetadata => {
  const brand = findOgImageBrand(route);
  const socialTitle = title.toLocaleLowerCase().startsWith(brand.productName.toLocaleLowerCase())
    ? title
    : `${title} | ${brand.productName}`;

  return {
    title: socialTitle,
    description,
    imageUrl: signOgImageUrl({
      secret,
      signerId: 'docs',
      styleId: brand.styleId,
      slug: slugFromRoute(route),
      params: {
        title,
        label: brand.label,
      },
    }),
  };
};

const buildManifest = async (rootDirectory: string): Promise<OgImageManifest> => {
  const pagesDirectory = path.join(rootDirectory, 'pages');
  const [secret, files] = await Promise.all([
    readSigningSecret(rootDirectory),
    listDocumentationFiles(pagesDirectory),
  ]);
  const pages: Record<string, OgImageMetadata> = {};

  for (const filePath of files) {
    const source = await fs.readFile(filePath, 'utf8');
    const frontmatter = readPageFrontmatter(source);

    if (!frontmatter.title) {
      continue;
    }

    const route = routeFromFile(pagesDirectory, filePath);
    pages[route] = createMetadata(
      secret,
      route,
      frontmatter.title,
      frontmatter.description ?? '',
    );
  }

  return {
    pages,
    fallbacks: ogImageBrands.map((brand) => ({
      prefix: brand.prefix,
      metadata: createMetadata(
        secret,
        brand.prefix,
        brand.fallbackTitle,
        brand.fallbackDescription,
      ),
    })),
  };
};

export const chiefOgImageVitePlugin = (): Plugin => {
  let rootDirectory = process.cwd();

  return {
    name: 'chief-og-image-manifest',
    configResolved(config) {
      rootDirectory = config.root;
    },
    resolveId(id) {
      if (id === virtualModuleId) {
        return resolvedVirtualModuleId;
      }
    },
    async load(id) {
      if (id !== resolvedVirtualModuleId) {
        return;
      }

      const manifest = await buildManifest(rootDirectory);
      const files = await listDocumentationFiles(path.join(rootDirectory, 'pages'));

      for (const file of files) {
        this.addWatchFile(file);
      }

      return `export const ogImageManifest = ${JSON.stringify(manifest)};`;
    },
  };
};
