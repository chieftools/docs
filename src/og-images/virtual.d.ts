declare module 'virtual:chief-og-images' {
  export const ogImageManifest: {
    pages: Record<
      string,
      {
        title: string;
        description: string;
        imageUrl: string;
      }
    >;
    fallbacks: Array<{
      prefix: string;
      metadata: {
        title: string;
        description: string;
        imageUrl: string;
      };
    }>;
  };
}
