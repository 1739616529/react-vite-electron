module.exports = {
    "env": {
        "browser": true,
        "es2021": true,
        "node": true
    },
    "extends": [
        "eslint:recommended",
        "plugin:react/recommended",
        "plugin:@typescript-eslint/recommended"
    ],
    "parser": "@typescript-eslint/parser",
    "parserOptions": {
        "ecmaFeatures": {
            "jsx": true
        },
        "ecmaVersion": "latest"
    },
    "plugins": [
        "react",
        "@typescript-eslint"
    ],
    "rules": {
        "arrow-parens": "always",
        "space-in-parens": [2, "always"],
        "space-before-blocks": [2, "always"],
        "object-curly-spacing": [2, "always"],
        "no-trailing-spaces": 1,
        "no-multi-spaces": 1,
        "no-mixed-spaces-and-tabs": [2, false],
        "key-spacing": [2, { "beforeColon": false, "afterColon": true }],
        "no-unused-vars": "off",
        "brace-style": [1, "1tbs"],
        "no-nested-ternary": 2,
        "eqeqeq": [2, "allow-null"],
        "comma-spacing": [2, { "before": false, "after": true }],
        "array-bracket-spacing": [2, "never"],
        "react/react-in-jsx-scope": "off",
        "indent": [
            "error",
            4
        ],
        "linebreak-style": [
            "error",
            "unix"
        ],
        "quotes": [
            "error",
            "double"
        ],
        "semi": [
            "error",
            "always"
        ]
    }
};
