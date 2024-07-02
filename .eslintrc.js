module.exports = {
    env: {
        browser: true,
        node: true,
        es2021: true,
    },
    extends: ['eslint:recommended', 'google', 'prettier'],
    overrides: [
        {
            env: {
                node: true,
            },
            files: ['.eslintrc.{js,cjs}'],
            parserOptions: {
                sourceType: 'script',
            },
        },
    ],
    parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        ecmaFeatures: {
            jsx: true,
            modules: true,
            experimentalObjectRestSpread: true,
        },
    },
    plugins: ['react'],
    rules: {
        'react/jsx-curly-brace-presence': [
            'error',
            { props: 'never', children: 'never' },
        ],
        'react/jsx-key': 'error',
        'no-unused-vars': 'off',
        'require-jsdoc': 'off',
    },
};
