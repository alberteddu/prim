module.exports = {
    extends: ['blitz'],
    rules: {
        'no-restricted-imports': [
            'error',
            {
                patterns: ['.*'],
            },
        ],
        indent: ['error', 4],
        'import/order': [
            'error',
            {
                groups: ['builtin', 'external', 'index', 'sibling', 'parent', 'internal', 'object'],
            },
        ],
        'import/no-relative-parent-imports': 'error',
    },
};
