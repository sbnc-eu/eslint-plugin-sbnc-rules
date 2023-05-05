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
* `"loose"` applies the `always` rule if there is at least one space or any other parentheses inside the parentheses, and applies the `never` rule otherwise

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

Note that this rule only enforces spacing within parentheses; it does not check spacing within curly braces or square brackets, but will enforce or disallow spacing of those brackets if and only if they are adjacent to an opening or closing parenthesis.

The following exceptions are available: `["{}", "[]", "()", "empty", "bracket lines", "bracket sides", "bracket unclosed", "bracket within"]`.

### Empty Exception

Empty parens exception and behavior:

* `always` allows for both `()` and `( )`
* `never` (default) requires `()`
* `always` except for `empty` requires `()`
* `never` except for `empty` requires `( )` (empty parens without a space is forbidden)


### Bracket Exceptions

These exceptions deal with parts where a chunk of code only contains brackets. In this context we use "brackets" as a general term for parenthesis, curly braces and square brackets.
* `bracket lines` defines an exception for parenthesis in lines that only contain brackets and whitespaces (on either side of the subject parenthesis)
* `bracket sides` (*deprecated*) defines an exception for parenthesis when the inner side of the bracket only contain other brackets and whitespaces within the same line - note that the inner side continues after the closing pair of the parenthesis until the end of the line
* `bracket unclosed` defines an exception for parenthesis when the inner side of the bracket only contain other brackets and whitespaces and the closing pair of the parenthesis is on another line
* `bracket within` defines an exception for parenthesis when inside the bracket only contain other brackets and whitespaces within the same line - note that the inside ends where the closing parenthesis is found or where the line ends

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

#### Bracket lines

Example of **incorrect** code for this rule with the `"always", { "exceptions": ["bracket lines"] }]` option:

```js
/*eslint space-in-parens: ["error", "always", { "exceptions": ["bracket lines"] }]*/

// The closing parenthesis is in a line that only contain brackets, so it is an exception from the `always` rule.
foo( {
  
} );

// The opening parenthesis is in a line that contain the `foo` word, so it is NOT an exception from the `always` rule.
foo({

});

// The closing parenthesis contains words in the same line, so it is NOT an exception from the `always` rule.
foo({
      bar: 'baz' } );

// No exception applies to this line:
const foo = () => ({});
const foo = () => ( {});
const foo = () => ({} );
```

Example of **correct** code for this rule with the `"always", { "exceptions": ["bracket lines"] }]` option:

```js
/*eslint space-in-parens: ["error", "always", { "exceptions": ["bracket lines"] }]*/

foo( {

});

foo( {

        });

foo( { bar: 'baz',
       qux: 'quux',
       corge: 'grault' } );

const foo = () => ( {} );
```

#### Bracket sides

Example of **incorrect** code for this rule with the `"always", { "exceptions": ["bracket sides"] }]` option:

```js
/*eslint space-in-parens: ["error", "always", { "exceptions": ["bracket sides"] }]*/

// The closing parenthesis only contain brackets in the same line, so it is an exception from the `always` rule.
foo({

} );

// The opening parenthesis only contain brackets in the same line, so it is an exception from the `always` rule.
foo( {

});

foo( {
  
} );

// The closing parenthesis contains words in the same line, so it is NOT an exception from the `always` rule.
foo({
      bar: 'baz' });

// The opening parenthesis contains words in the same line, so it is NOT an exception from the `always` rule.
foo({ bar: 'baz'
});

// Exception apply to the `(` (the one after `=>`), but not to the corresponding `)`:
const foo = () => ({});
const foo = () => ( {});
const foo = () => ( {} );
```

Example of **correct** code for this rule with the `"always", { "exceptions": ["bracket sides"] }]` option:

```js
/*eslint space-in-parens: ["error", "always", { "exceptions": ["bracket sides"] }]*/

foo({

});

foo({

       });

foo({
      bar: 'baz' } );

foo( { bar: 'baz'
});

foo( { bar: 'baz',
       qux: 'quux',
       corge: 'grault' } );

const foo = () => ({} );
```

Note: `bracket sides` is a legacy configuration, and can lead to unexpected results. It is recommended to switch to `bracket unclosed` or `bracket within` instead. Consider that `bracket sides` can lead to strange behaviour, such as the following code:
```js
const foo = () => ({})
```
being "corrected" to:
```js
const foo = () => ( {})
```
or to:
```js
const foo = () => ({} )
```

This is because on the right side of the 2nd `(` there are only brackets, so it becomes an exception, however on the left side of the corresponding `)` there is the whole line of code including `const foo = () => `, so it is not an exception.

Using the `bracket unclosed` exception solves the issue by not applying the exception to any of the sides, because both `(` and `)` is on the same line, so it is not an "unclosed" bracket.

Using the `bracket within` exception also solves the asymmetry, because it only examines the code inside the parentheses, so the part before the opening `(` is not considered when examining the closing `)` (and vice-versa).


#### Bracket unclosed

Example of **incorrect** code for this rule with the `"always", { "exceptions": ["bracket unclosed"] }]` option:

```js
/*eslint space-in-parens: ["error", "always", { "exceptions": ["bracket sides"] }]*/

// The closing parenthesis only contain brackets in the same line, so it is an exception from the `always` rule.
foo({

} );

// The opening parenthesis only contain brackets in the same line, so it is an exception from the `always` rule.
foo( {

});

foo( {
  
} );

// The closing parenthesis contains words in the same line, so it is NOT an exception from the `always` rule.
foo({
      bar: 'baz' });

// The opening parenthesis contains words in the same line, so it is NOT an exception from the `always` rule.
foo({ bar: 'baz'
});

// Exception does not apply, because the parentheses are closed on the same line.
const foo = () => ({});
const foo = () => ( {});
const foo = () => ({} );
```

Example of **correct** code for this rule with the `"always", { "exceptions": ["bracket unclosed"] }]` option:

```js
/*eslint space-in-parens: ["error", "always", { "exceptions": ["bracket sides"] }]*/

foo({

});

foo({

       });

foo({
      bar: 'baz' } );

foo( { bar: 'baz'
});

foo( { bar: 'baz',
       qux: 'quux',
       corge: 'grault' } );

const foo = () => ( {} );
```

#### Bracket within

Example of **incorrect** code for this rule with the `"always", { "exceptions": ["bracket within"] }]` option:

```js
/*eslint space-in-parens: ["error", "always", { "exceptions": ["bracket sides"] }]*/

// The closing parenthesis only contain brackets in the same line, so it is an exception from the `always` rule.
foo({

} );

// The opening parenthesis only contain brackets in the same line, so it is an exception from the `always` rule.
foo( {

});

foo( {
  
} );

// The closing parenthesis contains words in the same line, so it is NOT an exception from the `always` rule.
foo({
      bar: 'baz' });

// The opening parenthesis contains words in the same line, so it is NOT an exception from the `always` rule.
foo({ bar: 'baz'
});

// Exception does not apply, because there are only brackets within the parentheses.
const foo = () => ( {} );
const foo = () => ( {});
const foo = () => ({} );
```

Example of **correct** code for this rule with the `"always", { "exceptions": ["bracket within"] }]` option:

```js
/*eslint space-in-parens: ["error", "always", { "exceptions": ["bracket sides"] }]*/

foo({

});

foo({

       });

foo({
      bar: 'baz' } );

foo( { bar: 'baz'
});

foo( { bar: 'baz',
       qux: 'quux',
       corge: 'grault' } );

const foo = () => ({});
```


## When Not To Use It

You can turn this rule off if you are not concerned with the consistency of spacing between parentheses.

## Original rule

This rule is based on the `space-in-parens` rule in the ESLint package. See the original documentation here:
* https://eslint.org/docs/rules/space-in-parens
* https://github.com/eslint/eslint/blob/main/docs/src/rules/space-in-parens.md
