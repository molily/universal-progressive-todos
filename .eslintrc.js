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

  // Override some rules in the Airbnb style guide to match
  // our setup and preferences.
  rules: {

    // Disallow or Enforce Dangling Commas
    // No trailing commas
    // http://eslint.org/docs/rules/comma-dangle
    'comma-dangle': ['error', 'never'],
    // Require Function Expressions to have a Name
    // Disable rule
    // http://eslint.org/docs/rules/func-names
    'func-names': 'off',
    // Enforce consistent linebreak style
    // Disable rule since Git for Windows converts CRLF to LF automatically
    // http://eslint.org/docs/rules/linebreak-style
    'linebreak-style': 'off',
    // Since we are using higher order components
    // and these libraries are using capital function names, disable it
    // http://eslint.org/docs/rules/new-cap
    'new-cap': 'off',
    // Identifies mathematical signs as operators, disable it
    // http://eslint.org/docs/rules/no-mixed-operators
    'no-mixed-operators': 'off',

    // Disallow certain syntax forms
    // Allow ForInStatement
    // http://eslint.org/docs/rules/no-restricted-syntax
    'no-restricted-syntax': [
      'error',
      'LabeledStatement',
      'WithStatement'
    ],
    // Unnecessary to have all object properties in separate lines
    // http://eslint.org/docs/rules/object-property-newline
    'object-property-newline': 'off',
    // Require Variable Declarations to be at the top of their scope
    // http://eslint.org/docs/rules/vars-on-top
    // Disable rule. “var” should not be used. This rule does not
    // apply to “let” and “const” anyway.
    'vars-on-top': 'off',

    // React / JSX
    // -----------

    // The following rules overwrite the AirBnB rules for React:
    // https://github.com/airbnb/javascript/blob/master/packages/eslint-config-airbnb/rules/react.js

    // Enforce label tags have htmlFor attribute.
    // Disable rule
    // https://github.com/evcohen/eslint-plugin-jsx-a11y/blob/master/docs/rules/label-has-for.md
    'jsx-a11y/label-has-for': 'off',

    // Enforce quote style for JSX attributes
    // <p title='foo'>, not <p title="foo">
    // https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-quotes.md
    'jsx-quotes': ['error', 'prefer-single'],

    // Validate closing bracket location in JSX
    // On the same line of the the last prop:
    // <Foo prop1='value'
    //   prop2='value' />
    // https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-closing-bracket-location.md
    'react/jsx-closing-bracket-location': ['error', 'after-props'],
    // Disable rule
    // https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-filename-extension.md
    'react/jsx-filename-extension': 'off',
    // Configure the position of the first property
    // Disable rule
    // https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-first-prop-new-line.md
    'react/jsx-first-prop-new-line': 'off',
    // Prevent missing parentheses around multilines JSX
    // Disable rule
    // https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/wrap-multilines.md
    'react/jsx-wrap-multilines': 'off',
    // Prevent duplicate props in JSX
    // https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-no-duplicate-props.md
    'react/jsx-no-duplicate-props': 'error',
    // Prevent usage of findDOMNode
    // Disable rule
    // https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/no-find-dom-node.md
    'react/no-find-dom-node': 'off',
    // Prevent using string references
    // Disable rule
    // https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/no-string-refs.md
    'react/no-string-refs': 'off',
    // Enforce stateless React Components to be written as a pure function
    // Disable rule because React TestUtils only work well with normal components
    // https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/prefer-stateless-function.md
    'react/prefer-stateless-function': 'off',

    // Stylistic rules
    // ---------------

    // Limit Maximum Length of Line
    // http://eslint.org/docs/rules/max-len.html
    'max-len': ['warn', 80, 2, { ignoreUrls: true }],
    // Disallow or enforce spaces inside of brackets
    // [ 1 ], not [1]
    // http://eslint.org/docs/rules/array-bracket-spacing
    'array-bracket-spacing': ['error', 'always'],
    // Disallow or enforce spaces inside of curly braces in objects
    // { a: 1 }, not {a: 1}
    // http://eslint.org/docs/rules/object-curly-spacing
    'object-curly-spacing': ['error', 'always'],
    // Disallow or enforce spaces inside of parenthesesx
    // f(1), not f( 1 )
    // http://eslint.org/docs/rules/space-in-parens
    'space-in-parens': ['error', 'never'],
    // Require Object Literal Shorthand Syntax
    // { a, b() {} }
    // http://eslint.org/docs/rules/object-shorthand
    'object-shorthand': ['error', 'always'],
    // Require parens in arrow function arguments
    // (a) => {}, not a => {}
    // http://eslint.org/docs/rules/arrow-parens
    'arrow-parens': 'error',
    // Enforce Function Style
    // Function expressions, not declarations
    // f = () => {} or f = function() {}, not function f() {}
    // http://eslint.org/docs/rules/func-style
    'func-style': ['error', 'expression', { allowArrowFunctions: true }],
    // Enforce padding within blocks
    // Disable rule to allow empty lines in blocks
    // http://eslint.org/docs/rules/padded-blocks.html
    'padded-blocks': 'off',
    // Require braces in arrow function body
    // Disable rule to allow for () => {} and () => { return () => {} }
    // http://eslint.org/docs/rules/arrow-body-style.html
    'arrow-body-style': 'off',

    // eslint-plugin-import
    // --------------------
    //
    // ESLint plugin with rules that help validate proper imports.

    // Let relative and absolute imports come in any order.
    // Disable rule
    // https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/imports-first.md
    'import/imports-first': 'off',

    // Let packages be listed devDependecies.
    // Disable rule
    // https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/no-extraneous-dependencies.md
    'import/no-extraneous-dependencies': 'off',

    // Lets the use of an exported name as the locally imported name of a default export.
    // Disable rule
    // https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/no-named-as-default.md
    'import/no-named-as-default': 'off',

    // Lets the use of an exported name as a property on the default export.
    // Disable rule
    // https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/no-named-as-default-member.md
    'import/no-named-as-default-member': 'off',

    // Ensure imports point to a file/module that can be resolved.
    // Disable since it makes no sense in a Webpack project
    // https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/no-unresolved.md
    'import/no-unresolved': 'off',

    // When there is only a single export from a module prefer using default export over named export.
    // Disable rule
    // https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/prefer-default-export.md
    'import/prefer-default-export': 'off'
  }
};
