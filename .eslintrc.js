module.exports = {
  root: true,
  env: {
    node: true,
    browser: true,
  },
  extends: [
    'plugin:vue/vue3-recommended',
    '@vue/eslint-config-typescript/recommended',
    '@vue/eslint-config-prettier',
  ],
  parserOptions: {
    ecmaVersion: 2020,
  },
  rules: {
    // Allow unused parameters in TypeScript interfaces and type definitions
    '@typescript-eslint/no-unused-vars': [
      'warn',
      {
        argsIgnorePattern: '^_',
        varsIgnorePattern: '^_',
        // Ignore interface and type declaration parameters
        args: 'none',
      },
    ],
  },
  overrides: [
    {
      files: ['src/Types.ts'],
      rules: {
        // Disable unused vars completely for Types.ts since interface parameter names are for documentation
        '@typescript-eslint/no-unused-vars': 'off',
      },
    },
    {
      files: ['*.config.ts', '*.config.js'],
      rules: {
        // Allow any type assertions in config files
        '@typescript-eslint/no-explicit-any': 'off',
        '@typescript-eslint/ban-ts-comment': 'off',
      },
    },
  ],
};
