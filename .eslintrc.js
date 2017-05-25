module.exports = {
  parser: 'babel-eslint',

  // Build upon Airbnb JavaScript style guide
  // https://github.com/airbnb/javascript
  // https://github.com/airbnb/javascript/tree/master/packages/eslint-config-airbnb
  extends: 'airbnb',

  // Environments define global variables that are predefined.
  // http://eslint.org/docs/user-guide/configuring.html#specifying-environments
  env: {
    // Enforce explicit globals via window.foo
    browser: false,
    // jasmine, describe, it, expect etc.
    jasmine: true
  },

  globals: {
    window: false
  },

  settings: {
    react: {
      pragma: 'h'
    }
  },

  // Override some rules in the Airbnb style guide to match
  // our setup and preferences.
  rules: {

    // Disallow or Enforce Dangling Commas
    // No trailing commas
    // http://eslint.org/docs/rules/comma-dangle
    'comma-dangle': [ 'error', 'never' ],
    // Require Function Expressions to have a name
    // Disable rule
    // http://eslint.org/docs/rules/func-names
    'func-names': 'off',
    // Enforce consistent linebreak style
    // Disable rule since Git for Windows converts CRLF to LF automatically
    // http://eslint.org/docs/rules/linebreak-style
    'linebreak-style': 'off',

    // Disallow certain syntax forms
    // Allow ForInStatement
    // http://eslint.org/docs/rules/no-restricted-syntax
    'no-restricted-syntax': [
      'error',
      'LabeledStatement',
      'WithStatement'
    ],

    // React / JSX
    // -----------

    // The following rules overwrite the AirBnB rules for React:
    // https://github.com/airbnb/javascript/blob/master/packages/eslint-config-airbnb/rules/react.js

    // Enforce quote style for JSX attributes
    // <p title='foo'>, not <p title="foo">
    // https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-quotes.md
    'jsx-quotes': [ 'error', 'prefer-single' ],
    // Restrict file extensions that may contain JSX
    // Disable rule since we’re using .js instead of .jsx
    // https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-filename-extension.md
    'react/jsx-filename-extension': 'off',
    // Prevent missing parentheses around multilines JSX
    // Disable rule to allow for `const hello = <div>\n</div>;`
    // https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-wrap-multilines.md
    'react/jsx-wrap-multilines': 'off',
    // Enforce label tags have htmlFor attribute.
    // Disable rule since <label><input /></label> is fine
    // https://github.com/evcohen/eslint-plugin-jsx-a11y/blob/master/docs/rules/label-has-for.md
    'jsx-a11y/label-has-for': 'off',

    // Stylistic rules
    // ---------------

    // Limit Maximum Length of Line
    // http://eslint.org/docs/rules/max-len.html
    'max-len': [ 'warn', 80, 2, { ignoreUrls: true } ],
    // Disallow or enforce spaces inside of brackets
    // [ 1 ], not [1]
    // http://eslint.org/docs/rules/array-bracket-spacing
    'array-bracket-spacing': [ 'error', 'always' ],
    // Require parens in arrow function arguments
    // (a) => {}, not a => {}
    // http://eslint.org/docs/rules/arrow-parens
    'arrow-parens': [ 'error', 'always' ],
    // Enforce Function Style
    // Function expressions, not declarations
    // f = () => {} or f = function() {}, not function f() {}
    // http://eslint.org/docs/rules/func-style
    'func-style': [ 'error', 'expression', { allowArrowFunctions: true } ],
    // Require braces in arrow function body
    // Disable rule to allow for () => {} and () => { return () => {} }
    // http://eslint.org/docs/rules/arrow-body-style.html
    'arrow-body-style': 'off',

    // eslint-plugin-import
    // --------------------
    //
    // ESLint plugin with rules that help validate proper imports.

    // Ensure imports point to a file/module that can be resolved.
    // Disable since it makes no sense in a Webpack project
    // https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/no-unresolved.md
    'import/no-unresolved': 'off'
  }
};
