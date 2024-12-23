const react = require('eslint-plugin-react');
const globals = require('globals');

const typescriptParser = require('@typescript-eslint/parser');
const typescript = require('@typescript-eslint/eslint-plugin');

module.exports = [
  {
    files: ['**/*.{js,jsx,mjs,cjs,ts,tsx}'],
    ignores: ["build/**", "eslint.config.cjs"],
    plugins: {
      react,
      '@typescript-eslint': typescript,
    },
    languageOptions: {
      parser: typescriptParser,
      parserOptions: {
        ecmaVersion: 'latest',
        ecmaFeatures: {
          jsx: true,
          modules: true
        },
      },
      globals: {
        ...globals.browser
      },
    },
    rules: {
      ...react.configs.recommended.rules,
      ...react.configs['jsx-runtime'].rules,
      ...typescript.configs['eslint-recommended'].rules,
      ...typescript.configs.recommended.rules,
    },
    settings: {
      react: {
        version: 'detect'
      }
    }
  }
]