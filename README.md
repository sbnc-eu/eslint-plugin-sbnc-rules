# eslint-plugin-sbnc-rules

An ESLint plugin for customised linting rules

## Installation

You'll first need to install [ESLint](https://eslint.org/):

```sh
npm i eslint --save-dev
```

Next, install `eslint-plugin-sbnc-rules`:

```sh
npm install eslint-plugin-sbnc-rules --save-dev
```

## Usage

Add `sbnc-rules` to the plugins section of your `.eslintrc` configuration file. You can omit the `eslint-plugin-` prefix:

```json
{
    "plugins": [
        "sbnc-rules"
    ]
}
```


Then configure the rules you want to use under the rules section.

```json
{
    "rules": {
        "sbnc-rules/rule-name": 2
    }
}
```

## Supported Rules

* Fill in provided rules here


