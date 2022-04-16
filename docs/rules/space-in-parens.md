# space-in-parens

Disallows or enforce spaces inside of parentheses.

Some style guides require or disallow spaces inside of parentheses:

```js
foo( 'bar' );
var x = ( 1 + 2 ) * 3;

foo('bar');
var x = (1 + 2) * 3;
```

## Rule Details

This rule will enforce consistent spacing directly inside of parentheses, by disallowing or requiring one or more spaces to the right of `(` and to the left of `)`.

As long as you do not explicitly disallow empty parentheses using the `"empty"` exception , `()` will be allowed.

## Options

There are two options for this rule:

* `"never"` (default) enforces zero spaces inside of parentheses
* `"always"` enforces a space inside of parentheses
* `"loose"` applies the `always` rule if there is at least one space or any other parentheses inside the parentheses, and applies the `never` rule otherwise.

Depending on your coding conventions, you can choose either option by specifying it in your configuration:

```json
"space-in-parens": ["error", "always"]
```

### "never"

Examples of **incorrect** code for this rule with the default `"never"` option:

```js
/*eslint space-in-parens: ["error", "never"]*/

foo( );

foo( 'bar');
foo('bar' );
foo( 'bar' );

foo( /* bar */ );

var foo = ( 1 + 2 ) * 3;
( function () { return 'bar'; }() );
```

Examples of **correct** code for this rule with the default `"never"` option:

```js
/*eslint space-in-parens: ["error", "never"]*/

foo();

foo('bar');

foo(/* bar */);

var foo = (1 + 2) * 3;
(function () { return 'bar'; }());
```

### "always"

Examples of **incorrect** code for this rule with the `"always"` option:

```js
/*eslint space-in-parens: ["error", "always"]*/

foo( 'bar');
foo('bar' );
foo('bar');

foo(/* bar */);

var foo = (1 + 2) * 3;
(function () { return 'bar'; }());
```

Examples of **correct** code for this rule with the `"always"` option:

```js
/*eslint space-in-parens: ["error", "always"]*/

foo();
foo( );

foo( 'bar' );

foo( /* bar */ );

var foo = ( 1 + 2 ) * 3;
( function () { return 'bar'; }() );
```


### "loose"

Examples of **incorrect** code for this rule with the `"loose"` option:

```js
/*eslint space-in-parens: ["error", "loose"]*/

foo( );

foo( 'bar');
foo('bar' );
foo( 'bar' );

foo('bar', 'baz' );
foo( 'bar', 'baz');
foo('bar', 'baz');

foo(/* bar */);

var foo = (1 + 2) * 3;
var foo = (1+(2*5)) * 3;
var foo = (1+( 2*5 )) * 3;

(function () { return 'bar'; }());
```

Examples of **correct** code for this rule with the `"loose"` option:

```js
/*eslint space-in-parens: ["error", "loose"]*/

foo();

foo('bar');

foo( 'bar', 'baz' );

foo( /* bar */ );

var foo = ( 1 + 2 ) * 3;
var foo = ( 1+(2*5) ) * 3;
var foo = ( 1 + (2*5) ) * 3;
var foo = ( 1 + ( 2 * 5 ) ) * 3;

( function () { return 'bar'; }() );
```

### Exceptions

An object literal may be used as a third array item to specify exceptions, with the key `"exceptions"` and an array as the value. These exceptions work in the context of the first option. That is, if `"always"` is set to enforce spacing, then any "exception" will *disallow* spacing. Conversely, if `"never"` is set to disallow spacing, then any "exception" will *enforce* spacing.

Note that this rule only enforces spacing within parentheses; it does not check spacing within curly or square brackets, but will enforce or disallow spacing of those brackets if and only if they are adjacent to an opening or closing parenthesis.

The following exceptions are available: `["{}", "[]", "()", "empty", "bracket lines", "bracket sides"]`.

### Empty Exception

Empty parens exception and behavior:

* `always` allows for both `()` and `( )`
* `never` (default) requires `()`
* `always` excepting `empty` requires `()`
* `never` excepting `empty` requires `( )` (empty parens without a space is here forbidden)


### Bracket Lines and Bracket Sides Exceptions

These exceptions deal with parts of the code where a chunk of code only contains brackets.
* `bracket lines` defines an exception to any lines that only contain brackets
* `bracket sides` defines an exception to the opening or closing parentheses if they only contain brackets within the same line of code.


### Examples

Examples of **incorrect** code for this rule with the `"never", { "exceptions": ["{}"] }` option:

```js
/*eslint space-in-parens: ["error", "never", { "exceptions": ["{}"] }]*/

foo({bar: 'baz'});
foo(1, {bar: 'baz'});
```

Examples of **correct** code for this rule with the `"never", { "exceptions": ["{}"] }` option:

```js
/*eslint space-in-parens: ["error", "never", { "exceptions": ["{}"] }]*/

foo( {bar: 'baz'} );
foo(1, {bar: 'baz'} );
```

Examples of **incorrect** code for this rule with the `"always", { "exceptions": ["{}"] }` option:

```js
/*eslint space-in-parens: ["error", "always", { "exceptions": ["{}"] }]*/

foo( {bar: 'baz'} );
foo( 1, {bar: 'baz'} );
```

Examples of **correct** code for this rule with the `"always", { "exceptions": ["{}"] }` option:

```js
/*eslint space-in-parens: ["error", "always", { "exceptions": ["{}"] }]*/

foo({bar: 'baz'});
foo( 1, {bar: 'baz'});
```

Examples of **incorrect** code for this rule with the `"never", { "exceptions": ["[]"] }` option:

```js
/*eslint space-in-parens: ["error", "never", { "exceptions": ["[]"] }]*/

foo([bar, baz]);
foo([bar, baz], 1);
```

Examples of **correct** code for this rule with the `"never", { "exceptions": ["[]"] }` option:

```js
/*eslint space-in-parens: ["error", "never", { "exceptions": ["[]"] }]*/

foo( [bar, baz] );
foo( [bar, baz], 1);
```

Examples of **incorrect** code for this rule with the `"always", { "exceptions": ["[]"] }` option:

```js
/*eslint space-in-parens: ["error", "always", { "exceptions": ["[]"] }]*/

foo( [bar, baz] );
foo( [bar, baz], 1 );
```

Examples of **correct** code for this rule with the `"always", { "exceptions": ["[]"] }` option:

```js
/*eslint space-in-parens: ["error", "always", { "exceptions": ["[]"] }]*/

foo([bar, baz]);
foo([bar, baz], 1 );
```

Examples of **incorrect** code for this rule with the `"never", { "exceptions": ["()"] }]` option:

```js
/*eslint space-in-parens: ["error", "never", { "exceptions": ["()"] }]*/

foo((1 + 2));
foo((1 + 2), 1);
foo(bar());
```

Examples of **correct** code for this rule with the `"never", { "exceptions": ["()"] }]` option:

```js
/*eslint space-in-parens: ["error", "never", { "exceptions": ["()"] }]*/

foo( (1 + 2) );
foo( (1 + 2), 1);
foo(bar() );
```

Examples of **incorrect** code for this rule with the `"always", { "exceptions": ["()"] }]` option:

```js
/*eslint space-in-parens: ["error", "always", { "exceptions": ["()"] }]*/

foo( ( 1 + 2 ) );
foo( ( 1 + 2 ), 1 );
```

Examples of **correct** code for this rule with the `"always", { "exceptions": ["()"] }]` option:

```js
/*eslint space-in-parens: ["error", "always", { "exceptions": ["()"] }]*/

foo(( 1 + 2 ));
foo(( 1 + 2 ), 1 );
```

The `"empty"` exception concerns empty parentheses, and works the same way as the other exceptions, inverting the first option.

Example of **incorrect** code for this rule with the `"never", { "exceptions": ["empty"] }]` option:

```js
/*eslint space-in-parens: ["error", "never", { "exceptions": ["empty"] }]*/

foo();
```

Example of **correct** code for this rule with the `"never", { "exceptions": ["empty"] }]` option:

```js
/*eslint space-in-parens: ["error", "never", { "exceptions": ["empty"] }]*/

foo( );
```

Example of **incorrect** code for this rule with the `"always", { "exceptions": ["empty"] }]` option:

```js
/*eslint space-in-parens: ["error", "always", { "exceptions": ["empty"] }]*/

foo( );
```

Example of **correct** code for this rule with the `"always", { "exceptions": ["empty"] }]` option:

```js
/*eslint space-in-parens: ["error", "always", { "exceptions": ["empty"] }]*/

foo();
```

You can include multiple entries in the `"exceptions"` array.

Examples of **incorrect** code for this rule with the `"always", { "exceptions": ["{}", "[]"] }]` option:

```js
/*eslint space-in-parens: ["error", "always", { "exceptions": ["{}", "[]"] }]*/

bar( {bar:'baz'} );
baz( 1, [1,2] );
foo( {bar: 'baz'}, [1, 2] );
```

Examples of **correct** code for this rule with the `"always", { "exceptions": ["{}", "[]"] }]` option:

```js
/*eslint space-in-parens: ["error", "always", { "exceptions": ["{}", "[]"] }]*/

bar({bar:'baz'});
baz( 1, [1,2]);
foo({bar: 'baz'}, [1, 2]);
```


Example of **incorrect** code for this rule with the `"always", { "exceptions": ["bracket lines"] }]` option:

```js
/*eslint space-in-parens: ["error", "always", { "exceptions": ["bracket lines"] }]*/

foo({
  
} );

foo( {

} );
```

Example of **correct** code for this rule with the `"always", { "exceptions": ["bracket lines"] }]` option:

```js
/*eslint space-in-parens: ["error", "always", { "exceptions": ["bracket lines"] }]*/

foo( {

});
```


Example of **incorrect** code for this rule with the `"always", { "exceptions": ["bracket sides"] }]` option:

```js
/*eslint space-in-parens: ["error", "always", { "exceptions": ["bracket sides"] }]*/

foo( {
  
} );
```

Example of **correct** code for this rule with the `"always", { "exceptions": ["bracket sides"] }]` option:

```js
/*eslint space-in-parens: ["error", "always", { "exceptions": ["bracket sides"] }]*/

foo({

});
```

## When Not To Use It

You can turn this rule off if you are not concerned with the consistency of spacing between parentheses.

## Original rule

This rule is based on the `space-in-parens` rule in the ESLint package. See the original documentation here:
* https://eslint.org/docs/rules/space-in-parens
* https://github.com/eslint/eslint/blob/main/docs/src/rules/space-in-parens.md
