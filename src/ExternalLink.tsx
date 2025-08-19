import React from 'react';

interface ExternalLinkProps {
  href: string;
  children: React.ReactNode;
  target?: string;
  rel?: string;
}

export const ExternalLink: React.FC<ExternalLinkProps> = ({
  href,
  children,
  target = '_blank',
  rel = 'noopener',
}) => {
  // Add ?ref=chiefdocs if no ref parameter exists
  const processedHref = React.useMemo(() => {
    try {
      const url = new URL(href);
      if (!url.searchParams.has('ref')) {
        url.searchParams.set('ref', 'chiefdocs');
      }
      return url.toString();
    } catch {
      // If href is not a valid URL, return it as-is
      return href;
    }
  }, [href]);

  return (
    <a href={processedHref} target={target} rel={rel}>
      {children}
    </a>
  );
};
