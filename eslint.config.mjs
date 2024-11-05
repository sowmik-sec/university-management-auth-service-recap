import eslintPlugin from 'eslint-plugin';
import eslintPluginImport from 'eslint-plugin-import';
import eslintPluginNode from 'eslint-plugin-node';
import eslintPluginPromise from 'eslint-plugin-promise';
import eslintPluginPrettier from 'eslint-plugin-prettier';
import eslintPluginTypeScript from '@typescript-eslint/eslint-plugin';

export default [
  {
    // Define the environment your code will run in
    env: {
      browser: true,
      node: true,
      es2021: true,
    },
    parser: '@typescript-eslint/parser', // Use TypeScript parser
    parserOptions: {
      ecmaVersion: 2021,
      sourceType: 'module',
      project: './tsconfig.json', // Link to the TypeScript config
    },
    plugins: [
      eslintPlugin,
      eslintPluginImport,
      eslintPluginNode,
      eslintPluginPromise,
      eslintPluginPrettier,
      eslintPluginTypeScript,
    ],
    extends: [
      'eslint:recommended',
      'plugin:@typescript-eslint/recommended', // TypeScript recommendations
      'plugin:prettier/recommended', // Prettier integration
    ],
    rules: {
      // ESLint rules
      'no-unused-vars': 'warn',
      'no-console': 'warn',
      // TypeScript-specific rules
      '@typescript-eslint/no-unused-vars': ['error'],
      '@typescript-eslint/no-explicit-any': 'off',
      // Prettier rules
      'prettier/prettier': [
        'error',
        {
          singleQuote: true,
          semi: false,
        },
      ],
    },
  },
];
