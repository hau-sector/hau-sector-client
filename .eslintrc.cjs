process.env.ESLINT_TSCONFIG = 'tsconfig.json'

module.exports = {
    extends: ['@antfu'],
    rules: {
        '@typescript-eslint/unbound-method': 'off',
        '@typescript-eslint/no-unsafe-return': 'off',
        '@typescript-eslint/no-unsafe-argument': 'off',
        '@typescript-eslint/no-misused-promises': 'off',
        '@typescript-eslint/no-unsafe-assignment': 'off',
        '@typescript-eslint/restrict-template-expressions': 'off'
    },
    ignorePatterns: [
        '*.yml',
        '*.js'
    ],
}
