module.exports = {
  extends: ['standard'],
  env    : {
    browser : true,
    commonjs: true,
    es2021  : true,
    node    : true,
  },
  parserOptions: { ecmaVersion: 'latest' },
  rules        : {
    curly                  : ['error', 'multi-or-nest'],
    'array-element-newline': ['error', { multiline: true, minItems: 3 }],
    'array-bracket-newline': [
      'error',
      {
        multiline: true,
        minItems : 3,
      },
    ],
    camelcase        : 'warn',
    'comma-dangle'   : ['error', 'always-multiline'],
    'no-console'     : ['error', { allow: ['warn', 'error'] }],
    'no-var'         : 'error',
    'prefer-template': 'error',
    'linebreak-style': 'off',
    'key-spacing'    : [
      'error',
      {
        align: {
          beforeColon: false,
          afterColon : true,
          on         : 'colon',
        },
      },
    ],
    'arrow-parens'        : ['error', 'always'],
    'operator-linebreak'  : ['error', 'before'],
    'object-curly-newline': [
      'error',
      {
        ObjectExpression: {
          multiline    : true,
          minProperties: 3,
        },
        ObjectPattern    : 'never',
        ImportDeclaration: 'never',
        ExportDeclaration: 'always',
      },
    ],
    'object-property-newline': 'error',
    'object-curly-spacing'   : ['error', 'always'],
    'no-multi-spaces'        : [
      'error',
      {
        exceptions: {
          VariableDeclarator  : true,
          AssignmentExpression: true,
        },
      },
    ],
  },
}
