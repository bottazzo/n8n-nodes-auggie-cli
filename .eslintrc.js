module.exports = {
	root: true,
	env: {
		browser: true,
		es6: true,
		node: true,
	},
	extends: [
		'eslint:recommended',
		'plugin:n8n-nodes-base/community',
	],
	rules: {
		'prefer-const': 'error',
		'no-var': 'error',
		'no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
	},
};
