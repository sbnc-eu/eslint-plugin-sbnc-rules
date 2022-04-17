# ESLint Plugin: SBNC Rules

This plugin includes some specialised ESLint rules.

The current version of the rules are based on the [v8.13.0](https://github.com/eslint/eslint/releases/tag/v8.13.0) varsion of ESLint and are tested to be compatible with ESLint v7 and v8.

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


Then configure the rules you want to use under the rules section. Since these rules are a superset of the built in rules with the same names those need to be disabled for the replacements to work as intended.

```json
{
    "rules": {
      "space-in-parens"           : "off",
      "padded-blocks"             : "off",
      "sbnc-rules/space-in-parens": [ "error", "loose", { "exceptions": ["bracket sides"] } ],
      "sbnc-rules/padded-blocks"  : [ "error", "loose", { "allowSingleLineBlocks": true, "noBottomPadding": true } ]
    }
}
```

## Supported Rules

This Plugin contains two rules. Each of these are an extended versions of the rules under the same name provided with ESLint. These rules should behave exactly the same as their original counterparts if the rule configuration is the same. However, they allow some additional configuration options to further fine-tune their behaviour.

For detailed information and examples about the rules refer to their respective documentation under the `docs/rules` folder:
* [docs/rules/space-in-parens.md](https://github.com/BenceSzalai/eslint-plugin-sbnc-rules/blob/main/docs/rules/space-in-parens.md)
* [docs/rules/padded-blocks.md](https://github.com/BenceSzalai/eslint-plugin-sbnc-rules/blob/main/docs/rules/padded-blocks.md)

### space-in-parens

This rule provides extra options to control when spaces in parens should be used.

The first option has a new value `loose`. This means to only apply spaces around the brackets if there is more than one item in the bracket separated by space(s).

The second option allows new exceptions:
 * `bracket lines` which turns around the rule selected in the first option for brackets in lines that only contain brackets.
 * `bracket sides` which turns around the rule selected in the first option for brackets where the inside of the bracket only contain other brackets within the same line.

### padded-blocks

This rule provides extra options to control when padding lines in curly brace contained blocks should be used.

The first option has a new value `loose`. This means to only apply padding around the brackets if there is at least one empty (padding) line inside the block's body.

The second option allows a new setting:
* `noBottomPadding` which can be used to avoid padding the bottom of blocks regardless of the first option's value. 

## Additional info

The plugin scaffolding has been generated using [yo](https://www.npmjs.com/package/yo) and [generator-eslint](https://www.npmjs.com/package/generator-eslint).

***

Bence Szalai - https://sbnc.eu/
