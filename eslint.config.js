import config from '@antfu/eslint-config'

export default config({
  typescript: {
    tsconfigPath: 'tsconfig.json',
  },
  vue: false, // disable vue rules/parser

  // `.eslintignore` is no longer supported in Flat config, use `ignores` instead
  ignores: [
    // './fixtures',
    // ...globs
  ],
})
