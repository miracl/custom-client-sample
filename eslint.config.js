import globals from 'globals'
import pluginJs from '@eslint/js'

/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    languageOptions: { globals: globals.browser },
    rules: {
      ...pluginJs.configs.all.rules,
      'func-names': 'off',
      'init-declarations': 'off',
      'max-lines-per-function': 'off',
      'max-statements': 'off',
      'new-cap': 'off',
      'no-console': 'off',
      'no-plusplus': ['error', { allowForLoopAfterthoughts: true }],
      'one-var': 'off',
      'sort-imports': 'off',
      'sort-keys': 'off'
    }
  }
]
