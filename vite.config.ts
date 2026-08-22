import type { UserConfig } from 'zudoku/vite';

import { chiefOgImageVitePlugin } from './src/og-images/vitePlugin.js';

export default {
  plugins: [chiefOgImageVitePlugin()],
} satisfies UserConfig;
