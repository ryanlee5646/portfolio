module.exports = {

    root: true,
    env: {
        node: true,
    },
    extends: [
        'plugin:vue/essential',
        '@vue/airbnb',
    ],
    rules: {
        'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
        'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
        'linebreak-style': ['error', process.platform === 'win32' ? 'windows' : 'unix'],
        'indent': ["error", 2]

    },
    parserOptions: {
        parser: 'babel-eslint',
    },
}
