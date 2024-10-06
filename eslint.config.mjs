import react from 'eslint-plugin-react';
import globals from 'globals';
import js from '@eslint/js';
import jsdoc from 'eslint-plugin-jsdoc';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';

export default [
    js.configs.recommended,
    eslintPluginPrettierRecommended,
    {
        files: ['**/*.js'],

        plugins: {
            react,
            jsdoc,
        },

        languageOptions: {
            globals: {
                ...globals.browser,
                ...globals.node,
            },

            ecmaVersion: 'latest',
            sourceType: 'module',

            parserOptions: {
                ecmaFeatures: {
                    jsx: true,
                    modules: true,
                    experimentalObjectRestSpread: true,
                },
            },
        },

        rules: {
            'react/jsx-curly-brace-presence': [
                'error',
                {
                    props: 'never',
                    children: 'never',
                },
            ],

            'react/jsx-key': 'error',
            'no-unused-vars': 'off',
            'jsdoc/require-description': 'off',
        },
    },
];
