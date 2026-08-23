export type PageFrontmatter = {
  title?: string;
  description?: string;
  ogTitle?: string;
};

const parseScalar = (value: string): string => {
  const trimmed = value.trim();

  if (trimmed.startsWith('"') && trimmed.endsWith('"')) {
    return JSON.parse(trimmed) as string;
  }

  if (trimmed.startsWith("'") && trimmed.endsWith("'")) {
    return trimmed.slice(1, -1).replaceAll("''", "'");
  }

  return trimmed;
};

export const readPageFrontmatter = (source: string): PageFrontmatter => {
  const block = source.match(/^---\r?\n([\s\S]*?)\r?\n---(?:\r?\n|$)/)?.[1];

  if (!block) {
    return {};
  }

  const frontmatter: PageFrontmatter = {};

  for (const line of block.split(/\r?\n/)) {
    const match = line.match(/^(title|description|ogTitle):\s*(.*)$/);

    if (!match) {
      continue;
    }

    frontmatter[match[1] as keyof PageFrontmatter] = parseScalar(match[2]);
  }

  return frontmatter;
};
