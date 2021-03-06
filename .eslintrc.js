module.exports = {
    "env": {
        "browser": true,
        "commonjs": true,
        "es2021": true,
        "node": true
    },
    "extends": "eslint:recommended",
    "parserOptions": {
        "ecmaVersion": 12
    },
    "rules": {
    },
    globals: {
        page: true,
        browser: true,
        context: true,
        jestPuppeteer: true,
        $: true,
    },
};
