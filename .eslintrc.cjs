// @ts-check
const { defineConfig } = require('eslint-define-config')

module.exports = defineConfig({
  root: true,
  extends: [
    'plugin:vue/vue3-recommended',
    'eslint:recommended',
    'plugin:node/recommended',
    'plugin:@typescript-eslint/recommended'
  ],
  parser: 'vue-eslint-parser',
  parserOptions: {
    parser: '@typescript-eslint/parser',
    sourceType: 'module',
    ecmaVersion: 2021
  },
  // 暂时无用，需安装 eslint-plugin-import eslint-import-resolver-typescript
  // plugins: ['import'],
  // settings: {
  //   'import/parsers': {
  //     '@typescript-eslint/parser': ['.ts', '.tsx']
  //   },
  //   'import/resolver': {
  //     typescript: {
  //       alwaysTryTypes: true,
  //       project: 'packages/*/tsconfig.json'
  //     }
  //   }
  // },
  // https://eslint.vuejs.org/user-guide/#faq
  env: {
    'vue/setup-compiler-macros': true
  },
  // https://eslint.bootcss.com/docs/user-guide/configuring#specifying-globals
  globals: {
    Nullable: true
  },
  rules: {
    // 关闭此规则 使用 prettier 的格式化规则， 感觉prettier 更加合理，
    // 而且一起使用会有冲突
    'vue/max-attributes-per-line': ['off'],
    'vue/singleline-html-element-content-newline': ['off'], // 在单行元素的内容前后需要换行符
    // 强制使用驼峰命名
    'vue/component-name-in-template-casing': [
      'error',
      'PascalCase',
      {
        registeredComponentsOnly: false,
        ignores: []
      }
    ],
    // https://github.com/vuejs/eslint-plugin-vue/issues/905
    'vue/html-self-closing': [
      'error',
      {
        html: {
          void: 'always',
          normal: 'never',
          component: 'any'
        }
      }
    ],

    eqeqeq: ['warn', 'always', { null: 'never' }],
    'no-debugger': ['error'],
    'no-empty': ['warn', { allowEmptyCatch: true }],
    'no-process-exit': 'off',
    'no-useless-escape': 'off',
    'prefer-const': [
      'warn',
      {
        destructuring: 'all'
      }
    ],

    // 'node/no-missing-import': [
    //   'error',
    //   {
    //     allowModules: [
    //       'types',
    //       'estree',
    //       'testUtils',
    //       'less',
    //       'sass',
    //       'stylus'
    //     ],
    //     tryExtensions: ['.ts', '.js', '.jsx', '.tsx', '.d.ts']
    //   }
    // ],
    'node/no-missing-import': 'off', // todo
    'node/no-missing-require': [
      'error',
      {
        // for try-catching yarn pnp
        allowModules: ['pnpapi', 'vite'],
        tryExtensions: ['.ts', '.js', '.jsx', '.tsx', '.d.ts']
      }
    ],
    // 'node/no-restricted-require': [
    //   'error',
    //   Object.keys(require('./packages/vite/package.json').devDependencies).map(
    //     (d) => ({
    //       name: d,
    //       message:
    //         `devDependencies can only be imported using ESM syntax so ` +
    //         `that they are included in the rollup bundle. If you are trying to ` +
    //         `lazy load a dependency, use (await import('dependency')).default instead.`
    //     })
    //   )
    // ],
    'node/no-extraneous-import': [
      'error',
      {
        allowModules: ['vite', 'less', 'sass']
      }
    ],
    'node/no-extraneous-require': [
      'error',
      {
        allowModules: ['vite']
      }
    ],
    'node/no-deprecated-api': 'off',
    'node/no-unpublished-import': 'off',
    'node/no-unpublished-require': 'off',
    'node/no-unsupported-features/es-syntax': 'off',

    '@typescript-eslint/ban-ts-comment': 'off', // TODO: we should turn this on in a new PR
    '@typescript-eslint/ban-types': 'off', // TODO: we should turn this on in a new PR
    '@typescript-eslint/no-empty-function': [
      'error',
      { allow: ['arrowFunctions'] }
    ],
    '@typescript-eslint/no-empty-interface': 'off',
    '@typescript-eslint/no-explicit-any': 'off', // maybe we should turn this on in a new PR
    '@typescript-eslint/no-extra-semi': 'off', // conflicts with prettier
    '@typescript-eslint/no-inferrable-types': 'off',
    '@typescript-eslint/no-non-null-assertion': 'off', // maybe we should turn this on in a new PR
    '@typescript-eslint/no-unused-vars': 'off', // maybe we should turn this on in a new PR
    '@typescript-eslint/no-var-requires': 'off'
  },
  overrides: [
    // {
    //   files: ['packages/vite/src/node/**'],
    //   rules: {
    //     'no-console': ['error']
    //   }
    // },
    // {
    //   files: ['packages/vite/types/**'],
    //   rules: {
    //     'node/no-extraneous-import': 'off'
    //   }
    // },
    // {
    //   files: ['packages/playground/**'],
    //   rules: {
    //     'node/no-extraneous-import': 'off',
    //     'node/no-extraneous-require': 'off'
    //   }
    // },
    // {
    //   files: ['packages/create-vite/template-*/**'],
    //   rules: {
    //     'node/no-missing-import': 'off'
    //   }
    // },
    {
      files: ['*.js'],
      rules: {
        '@typescript-eslint/explicit-module-boundary-types': 'off'
      }
    },
    {
      files: ['*.d.ts'],
      rules: {
        '@typescript-eslint/triple-slash-reference': 'off'
      }
    }
  ]
})
