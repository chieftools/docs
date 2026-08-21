import eslint from '@eslint/js';
import typescriptEslint from '@typescript-eslint/eslint-plugin';
import globals from 'globals';

export default [
    {
        ignores: ['dist/**', 'node_modules/**'],
    },
    eslint.configs.recommended,
    ...typescriptEslint.configs['flat/recommended'],
    {
        files: ['**/*.{js,mjs,cjs,ts,tsx}'],
        languageOptions: {
            globals: {
                ...globals.browser,
                ...globals.node,
            },
        },
    },
];
