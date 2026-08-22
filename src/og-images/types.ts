export type OgImageMetadata = {
  title: string;
  description: string;
  imageUrl: string;
};

export type OgImageFallback = {
  prefix: string;
  metadata: OgImageMetadata;
};

export type OgImageManifest = {
  pages: Record<string, OgImageMetadata>;
  fallbacks: OgImageFallback[];
};
