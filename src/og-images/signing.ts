import { createHmac } from 'node:crypto';

export type OgImageParams = {
  title: string;
  label?: string;
};

export type SignOgImageUrlOptions = {
  secret: string;
  signerId: string;
  styleId: string;
  slug: string;
  params: OgImageParams;
};

const ogImageVersion = '2';

const base64UrlEncode = (value: string | Buffer): string =>
  Buffer.from(value).toString('base64url');

export const signOgImageUrl = ({
  secret,
  signerId,
  styleId,
  slug,
  params,
}: SignOgImageUrlOptions): string => {
  const encodedParams = base64UrlEncode(JSON.stringify(params));
  const signature = createHmac('sha256', secret)
    .update(encodedParams)
    .digest('base64url');

  return `https://static.assets.chief.tools/og/${signerId}:${styleId}/${encodedParams}/${slug}.png?signature=${signature}&v=${ogImageVersion}`;
};
