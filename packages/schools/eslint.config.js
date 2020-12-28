module.exports = {
    parser: 'babel-eslint',
    extends: ['airbnb', 'plugin:prettier/recommended'],
    plugins: ['jsx-a11y', 'prettier'],
    env: {
        browser: true,
        commonjs: true,
        es6: true,
        node: true,
    },
    parserOptions: {
        ecmaFeatures: {
            jsx: true,
        },
        ecmaVersion: 2018,
        sourceType: 'module',
    },
    rules: {
        indent: 0,
        'class-methods-use-this': 0,
        'no-underscore-dangle': [
            'error',
            {
                allow: [
                    '__ALGOLIA_CLIENT__',
                    '__REDUX_DEVTOOLS_EXTENSION_COMPOSE__',
                    '_highlightResult',
                    '_geoloc',
                ],
                allowAfterThis: true,
            },
        ],
        'no-unused-vars': [
            'error',
            {
                argsIgnorePattern: '^_',
            },
        ],
        'no-param-reassign': [
            'error',
            {
                props: false,
            },
        ],
        'no-console': [
            'error',
            {
                allow: ['warn', 'error', 'info'],
            },
        ],
        'no-restricted-properties': 0,
        'no-duplicate-imports': 0,
        'react/no-array-index-key': 0,
        'react/require-default-props': 0,
        'react/sort-comp': 0,
        'react/jsx-indent': 0,
        'react/jsx-filename-extension': 0,
        'react/jsx-indent-props': ['error', 4],
        'react/jsx-no-comment-textnodes': 0,
        'react/jsx-curly-brace-presence': 0,
        'react/jsx-one-expression-per-line': 0, // Added because of bug with Lint auto fix.
        'react/jsx-wrap-multilines': 0, // Added because of bug with Lint auto fix.
        'react/prop-types': 0,
        'react/no-unused-prop-types': 0,
        'react/no-danger': 0,
        'react/default-props-match-prop-types': 0,
        'jsx-a11y/html-has-lang': 0,
        'jsx-a11y/no-static-element-interactions': 0,
        'jsx-a11y/anchor-has-content': 0,
        'jsx-a11y/iframe-has-title': 0,
        'jsx-a11y/label-has-for': 0,
        'jsx-a11y/no-noninteractive-element-interactions': 0,
        'jsx-a11y/no-interactive-element-to-noninteractive-role': 0,
        'jsx-a11y/interactive-supports-focus': 0,
        'jsx-a11y/click-events-have-key-events': 0,
        'jsx-a11y/anchor-is-valid': 0,
        'jsx-a11y/mouse-events-have-key-events': 0,
        'flowtype/no-types-missing-file-annotation': 0,
        'jsx-a11y/no-noninteractive-element-to-interactive-role': 0,
        'import/no-webpack-loader-syntax': 0,
        'import/no-extraneous-dependencies': 0,
        'import/extensions': 0,
        'import/prefer-default-export': 0,
        'import/newline-after-import': [
            'error',
            {
                count: 1,
            },
        ],
        'import/order': [
            'error',
            {
                groups: ['builtin', 'external', 'internal', 'parent', 'sibling'],
            },
        ],
        // new rules added by upgrading eslint plugins,
        // should check whether we want these
        'function-paren-newline': 0,
        'object-curly-newline': 0,
        'prefer-destructuring': 0,
        'no-return-assign': 0,
        'import/no-cycle': 0,
        'no-buffer-constructor': 0,
        'no-restricted-globals': 0,
        'no-plusplus': [
            'error',
            {
                allowForLoopAfterthoughts: true,
            },
        ],
    },
    settings: {
        'import/resolver': {
            node: {
                paths: ['src', 'node_modules'],
                extensions: ['.js', '.jsx', '.ts', '.tsx'],
                moduleDirectory: ['./src'],
            },
        },
    },
};
