/**
 * @fileoverview Disallows or enforces spaces inside of parentheses.
 * @author Jonathan Rajavuori
 * @author Bence Szalai <https://sbnc.eu>
 */

"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

const rule = require("../../../lib/rules/space-in-parens"),
      RuleTester = require("eslint").RuleTester;

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

const ruleTester = new RuleTester();

ruleTester.run("space-in-parens", rule, {

  valid: [
    { code: "foo()", options: ["never"] },
    { code: "foo()", options: ["always"] },
    { code: "foo()", options: ["loose"] },
    { code: "foo( )", options: ["always"] },
    { code: "foo( bar )", options: ["always"] },
    { code: "foo( bar && baz )", options: ["loose"] },
    { code: "foo\n(\nbar\n)\n", options: ["always"] },
    { code: "foo\n(\nbar && baz\n)\n", options: ["loose"] },
    { code: "foo\n(  \nbar\n )\n", options: ["always"] },
    { code: "foo\n(  \nbar && baz\n )\n", options: ["loose"] },
    { code: "foo\n(\n bar  \n)\n", options: ["always"] },
    { code: "foo\n(\n bar && baz  \n)\n", options: ["loose"] },
    { code: "foo\n( \n  bar \n  )\n", options: ["always"] },
    { code: "foo\n( \n  bar && baz \n  )\n", options: ["loose"] },
    { code: "foo\n(\t\nbar\n)", options: ["always"] },
    { code: "foo\n(\t\nbar && baz\n)", options: ["loose"] },
    { code: "\tfoo(\n\t\tbar\n\t)", options: ["always"] },
    { code: "\tfoo(\n\t\tbar && baz\n\t)", options: ["loose"] },
    { code: "\tfoo\n(\t\n\t\tbar\t\n\t)", options: ["always"] },
    { code: "\tfoo\n(\t\n\t\tbar && baz\t\n\t)", options: ["loose"] },
    { code: "var x = ( 1 + 2 ) * 3", options: ["always"] },
    { code: "var x = ( 1 + 2 ) * 3", options: ["loose"] },
    { code: "var x = 'foo(bar)'", options: ["always"] },
    { code: "var x = 'foo(bar)'", options: ["loose"] },
    { code: "var x = 'bar( baz )'", options: ["always"] },
    { code: "var x = 'bar( baz )'", options: ["loose"] },
    { code: "var foo = `(bar)`;", options: ["always"], parserOptions: { ecmaVersion: 6 } },
    { code: "var foo = `(bar)`;", options: ["loose"], parserOptions: { ecmaVersion: 6 } },
    { code: "var foo = `(bar ${baz})`;", options: ["always"], parserOptions: { ecmaVersion: 6 } },
    { code: "var foo = `(bar ${baz})`;", options: ["loose"], parserOptions: { ecmaVersion: 6 } },
    { code: "var foo = `(bar ${( 1 + 2 )})`;", options: ["always"], parserOptions: { ecmaVersion: 6 } },
    { code: "var foo = `(bar ${( 1 + 2 )})`;", options: ["loose"], parserOptions: { ecmaVersion: 6 } },
    { code: "bar(baz)", options: ["never"] },
    { code: "bar(baz)", options: ["loose"] },
    { code: "var x = (4 + 5) * 6", options: ["never"] },
    { code: "var x = ( 4 + 5 ) * 6", options: ["loose"] },
    { code: "var x = (4+5) * 6", options: ["loose"] },
    { code: "foo\n(\nbar\n)\n", options: ["never"] },
    { code: "foo\n(\nbar\n)\n", options: ["loose"] },
    { code: "foo\n(  \nbar\n )\n", options: ["never"] },
    { code: "foo\n(  \nbar\n )\n", options: ["loose"] },
    { code: "foo\n(\n bar  \n)\n", options: ["never"] },
    { code: "foo\n(\n bar  \n)\n", options: ["loose"] },
    { code: "foo\n( \n  bar \n  )\n", options: ["never"] },
    { code: "foo\n( \n  bar \n  )\n", options: ["loose"] },
    { code: "var foo = `( bar )`;", options: ["never"], parserOptions: { ecmaVersion: 6 } },
    { code: "var foo = `( bar )`;", options: ["loose"], parserOptions: { ecmaVersion: 6 } },
    { code: "var foo = `( bar ${baz} )`;", options: ["never"], parserOptions: { ecmaVersion: 6 } },
    { code: "var foo = `( bar ${baz} )`;", options: ["loose"], parserOptions: { ecmaVersion: 6 } },
    { code: "var foo = `(bar ${(1 + 2)})`;", options: ["never"], parserOptions: { ecmaVersion: 6 } },
    { code: "const x = () => ({})", options: ["never"], parserOptions: { ecmaVersion: 6 } },
    { code: "const x = () => ({})", options: ["loose"], parserOptions: { ecmaVersion: 6 } },
    { code: "const x = () => ( {} )", options: ["always"], parserOptions: { ecmaVersion: 6 } },
    { code: "const x = () => ({})", options: ["never", { exceptions: ['bracket unclosed'] }], parserOptions: { ecmaVersion: 6 } },
    { code: "const x = () => ({})", options: ["loose", { exceptions: ['bracket unclosed'] }], parserOptions: { ecmaVersion: 6 } },
    { code: "const x = () => ( {} )", options: ["always", { exceptions: ['bracket unclosed'] }], parserOptions: { ecmaVersion: 6 } },

    { code: "const x = () => ( {}\n)", options: ["never", { exceptions: ['bracket unclosed'] }], parserOptions: { ecmaVersion: 6 } },
    { code: "const x = () => ( {}\n)", options: ["loose", { exceptions: ['bracket unclosed'] }], parserOptions: { ecmaVersion: 6 } },
    { code: "const x = () => ({}\n)", options: ["always", { exceptions: ['bracket unclosed'] }], parserOptions: { ecmaVersion: 6 } },

    { code: "const x = () => (\n{} )", options: ["never", { exceptions: ['bracket unclosed'] }], parserOptions: { ecmaVersion: 6 } },
    { code: "const x = () => (\n{} )", options: ["loose", { exceptions: ['bracket unclosed'] }], parserOptions: { ecmaVersion: 6 } },
    { code: "const x = () => (\n{})", options: ["always", { exceptions: ['bracket unclosed'] }], parserOptions: { ecmaVersion: 6 } },

    { code: "const x = () => ( {} )", options: ["never", { exceptions: ['bracket within'] }], parserOptions: { ecmaVersion: 6 } },
    { code: "const x = () => ( {} )", options: ["loose", { exceptions: ['bracket within'] }], parserOptions: { ecmaVersion: 6 } },
    { code: "const x = () => ({})", options: ["always", { exceptions: ['bracket within'] }], parserOptions: { ecmaVersion: 6 } },

    // comments
    { code: "foo( /* bar */ )", options: ["always"] },
    { code: "foo( /* bar */ )", options: ["loose"] },
    { code: "foo( /* bar */baz )", options: ["always"] },
    { code: "foo( /* bar */baz )", options: ["loose"] },
    { code: "foo( /* bar */ baz )", options: ["always"] },
    { code: "foo( /* bar */ baz )", options: ["loose"] },
    { code: "foo( baz/* bar */ )", options: ["always"] },
    { code: "foo( baz/* bar */ )", options: ["loose"] },
    { code: "foo( baz /* bar */ )", options: ["always"] },
    { code: "foo( baz /* bar */ )", options: ["loose"] },
    { code: "foo(/* bar */)", options: ["never"] },
    { code: "foo(/* bar */ baz)", options: ["never"] },
    "foo( //some comment\nbar\n)\n",
    { code: "foo(//some comment\nbar\n)\n", options: ["never"] },
    { code: "foo( //some comment\nbar\n)\n", options: ["never"] },
    { code: "foo( //some comment\nbar\n)\n", options: ["loose"] },

    // exceptions
    { code: "foo({ bar: 'baz' })", options: ["always", { exceptions: ["{}"] }] },
    { code: "foo({ bar: 'baz' })", options: ["loose", { exceptions: ["{}"] }] },
    { code: "foo( { bar: 'baz' } )", options: ["always", { exceptions: ["[]", "()"] }] },
    { code: "foo( { bar: 'baz' } )", options: ["loose", { exceptions: ["[]", "()"] }] },
    { code: "( (foo(bar() ) ) );", options: ["never", { exceptions: ["()"] }] },
    { code: "(( foo( bar())));", options: ["loose", { exceptions: ["()"] }] },
    { code: "foo( 1, { bar: 'baz' })", options: ["always", { exceptions: ["{}"] }] },
    { code: "foo( 1, { bar: 'baz' })", options: ["loose", { exceptions: ["{}"] }] },
    { code: "foo({ bar: 'baz' }, 1 )", options: ["always", { exceptions: ["{}"] }] },
    { code: "foo({ bar: 'baz' }, 1 )", options: ["loose", { exceptions: ["{}"] }] },
    { code: "foo({\nbar: 'baz',\nbaz: 'bar'\n})", options: ["always", { exceptions: ["{}"] }] },
    { code: "foo( {\nbar: 'baz',\nbaz: 'bar'\n})", options: ["always", { exceptions: ["bracket lines"] }] },
    { code: "foo({\nbar: 'baz',\nbaz: 'bar'\n})", options: ["always", { exceptions: ["bracket sides"] }] },
    { code: "foo({\nbar: 'baz',\nbaz: 'bar'\n})", options: ["always", { exceptions: ["bracket unclosed"] }] },
    { code: "foo({\nbar: 'baz',\nbaz: 'bar'\n})", options: ["always", { exceptions: ["bracket within"] }] },
    { code: "foo({\nbar: 'baz',\nbaz: 'bar'\n})", options: ["loose", { exceptions: ["{}"] }] },
    { code: "foo( {\nbar: 'baz',\nbaz: 'bar'\n})", options: ["loose", { exceptions: ["bracket lines"] }] },
    { code: "foo({\nbar: 'baz',\nbaz: 'bar'\n})", options: ["loose", { exceptions: ["bracket sides"] }] },
    { code: "foo({\nbar: 'baz',\nbaz: 'bar'\n})", options: ["loose", { exceptions: ["bracket unclosed"] }] },
    { code: "foo({\nbar: 'baz',\nbaz: 'bar'\n})", options: ["loose", { exceptions: ["bracket within"] }] },
    { code: "foo({ bar: 'baz' })", options: ["never", { exceptions: ["[]", "()"] }] },
    { code: "foo( { bar: 'baz' } )", options: ["never", { exceptions: ["{}"] }] },
    { code: "foo(1, { bar: 'baz' } )", options: ["never", { exceptions: ["{}"] }] },
    { code: "foo( { bar: 'baz' }, 1)", options: ["never", { exceptions: ["{}"] }] },
    { code: "foo( {\nbar: 'baz',\nbaz: 'bar'\n} )", options: ["never", { exceptions: ["{}"] }] },
    { code: "foo({\nbar: 'baz',\nbaz: 'bar'\n} )", options: ["never", { exceptions: ["bracket lines"] }] },
    { code: "foo( {\nbar: 'baz',\nbaz: 'bar'\n} )", options: ["never", { exceptions: ["bracket sides"] }] },
    { code: "foo( {\nbar: 'baz',\nbaz: 'bar'\n} )", options: ["never", { exceptions: ["bracket unclosed"] }] },
    { code: "foo( {\nbar: 'baz',\nbaz: 'bar'\n} )", options: ["never", { exceptions: ["bracket within"] }] },

    { code: "foo([ 1, 2 ])", options: ["always", { exceptions: ["[]"] }] },
    { code: "foo([ 1, 2 ])", options: ["loose", { exceptions: ["[]"] }] },
    { code: "foo( [ 1, 2 ] )", options: ["always", { exceptions: ["{}"] }] },
    { code: "foo( [ 1, 2 ] )", options: ["loose", { exceptions: ["{}"] }] },
    { code: "foo( 1, [ 1, 2 ])", options: ["always", { exceptions: ["[]"] }] },
    { code: "foo( 1, [ 1, 2 ])", options: ["loose", { exceptions: ["[]"] }] },
    { code: "foo([ 1, 2 ], 1 )", options: ["always", { exceptions: ["[]"] }] },
    { code: "foo([ 1, 2 ], 1 )", options: ["loose", { exceptions: ["[]"] }] },
    { code: "foo([\n1,\n2\n])", options: ["always", { exceptions: ["[]"] }] },
    { code: "foo([\n1,\n2\n])", options: ["loose", { exceptions: ["[]"] }] },
    { code: "foo([ 1, 2 ])", options: ["never", { exceptions: ["{}"] }] },
    { code: "foo( [ 1, 2 ] )", options: ["never", { exceptions: ["[]"] }] },
    { code: "foo(1, [ 1, 2 ] )", options: ["never", { exceptions: ["[]"] }] },
    { code: "foo( [ 1, 2 ], 1)", options: ["never", { exceptions: ["[]"] }] },
    { code: "foo( [\n1,\n2\n] )", options: ["never", { exceptions: ["[]"] }] },

    { code: "foo(( 1 + 2 ))", options: ["always", { exceptions: ["()"] }] },
    { code: "foo(( 1 + 2 ))", options: ["loose", { exceptions: ["()"] }] },
    { code: "foo( ( 1 + 2 ) )", options: ["always", { exceptions: ["{}"] }] },
    { code: "foo( ( 1 + 2 ) )", options: ["loose", { exceptions: ["{}"] }] },
    { code: "foo( 1 / ( 1 + 2 ))", options: ["always", { exceptions: ["()"] }] },
    { code: "foo( 1 / ( 1 + 2 ))", options: ["loose", { exceptions: ["()"] }] },
    { code: "foo(( 1 + 2 ) / 1 )", options: ["always", { exceptions: ["()"] }] },
    { code: "foo(( 1 + 2 ) / 1 )", options: ["loose", { exceptions: ["()"] }] },
    { code: "foo((\n1 + 2\n))", options: ["always", { exceptions: ["()"] }] },
    { code: "foo((\n1 + 2\n))", options: ["loose", { exceptions: ["()"] }] },
    { code: "foo((1 + 2))", options: ["never", { exceptions: ["{}"] }] },
    { code: "foo( (1 + 2) )", options: ["never", { exceptions: ["()"] }] },
    { code: "foo(1 / (1 + 2) )", options: ["never", { exceptions: ["()"] }] },
    { code: "foo( (1 + 2) / 1)", options: ["never", { exceptions: ["()"] }] },
    { code: "foo( (\n1 + 2\n) )", options: ["never", { exceptions: ["()"] }] },

    { code: "foo()", options: ["never", { exceptions: ["{}"] }] },
    { code: "foo()", options: ["loose", { exceptions: ["{}"] }] },
    { code: "foo( )", options: ["never", { exceptions: ["empty"] }] },
    { code: "foo( )", options: ["loose", { exceptions: ["empty"] }] },
    { code: "foo()", options: ["always", { exceptions: ["empty"] }] },
    { code: "foo( )", options: ["always", { exceptions: ["[]"] }] },
    { code: "foo()", options: ["loose", { exceptions: ["[]"] }] },
    { code: "foo(( x, {bar:'baz'} ))", options: ["always", { exceptions: ["empty", "()"] }] },
    { code: "foo(( x, {bar:'baz'} ))", options: ["loose", { exceptions: ["empty", "()"] }] },
    { code: "foo( [1, 2], 1 )", options: ["always", { exceptions: ["empty", "()"] }] },
    { code: "foo( [1, 2], 1 )", options: ["loose", { exceptions: ["empty", "()"] }] },
    { code: "foo(\n1 + 2\n)", options: ["always", { exceptions: ["empty"] }] },
    { code: "foo(\n1 + 2\n)", options: ["loose", { exceptions: ["empty"] }] },
    { code: "foo( \n1 + 2\n )", options: ["never", { exceptions: ["empty"] }] },
    { code: "foo( \n1 + 2\n )", options: ["loose", { exceptions: ["empty"] }] },

    { code: "foo({ bar: 'baz' }, [ 1, 2 ])", options: ["always", { exceptions: ["{}", "[]"] }] },
    { code: "foo({ bar: 'baz' }, [ 1, 2 ])", options: ["loose", { exceptions: ["{}", "[]"] }] },
    { code: "foo({\nbar: 'baz'\n}, [\n1,\n2\n])", options: ["always", { exceptions: ["{}", "[]"] }] },
    { code: "foo({\nbar: 'baz'\n}, [\n1,\n2\n])", options: ["loose", { exceptions: ["{}", "[]"] }] },
    { code: "foo(); bar({bar:'baz'}); baz([1,2])", options: ["always", { exceptions: ["{}", "[]", "()", "empty"] }] },
    { code: "foo( ); bar( {bar:'baz'} ); baz( [1,2] )", options: ["loose", { exceptions: ["{}", "[]", "()", "empty"] }] },
    { code: "foo( ); bar({ bar:'baz' }); baz([ 1,2 ])", options: ["loose", { exceptions: ["{}", "[]", "()", "empty"] }] },
    { code: "foo( { bar: 'baz' }, [ 1, 2 ] )", options: ["never", { exceptions: ["{}", "[]"] }] },
    { code: "foo( {\nbar: 'baz'\n}, [\n1,\n2\n] )", options: ["never", { exceptions: ["{}", "[]"] }] },
    { code: "foo( ); bar( {bar:'baz'} ); baz( [1,2] )", options: ["never", { exceptions: ["{}", "[]", "empty"] }] },
    { code: "foo( ); bar( {bar:'baz'} ); baz( [1,2] )", options: ["loose", { exceptions: ["{}", "[]", "empty"] }] },
    { code: "foo( ); bar({ bar:'baz' }); baz([ 1,2 ])", options: ["loose", { exceptions: ["{}", "[]", "empty"] }] },

    // faulty exceptions option
    { code: "foo( { bar: 'baz' } )", options: ["always", { exceptions: [] }] },
    { code: "foo( { bar: 'baz' } )", options: ["loose", { exceptions: [] }] },
    { code: "foo( { bar: 'baz' } )", options: ["always", {}] },
    { code: "foo( { bar: 'baz' } )", options: ["loose", {}] },

    // Loose specific
    { code: "foo('bar')", options: ["loose"] },
    { code: "foo( 'bar', 'baz' )", options: ["loose"] },
    { code: "var foo = ( 1 + 2 ) * 3", options: ["loose"] },
    { code: "var foo = ( 1+(2*5) ) * 3", options: ["loose"] },
    { code: "var foo = ( 1 + (2*5) ) * 3", options: ["loose"] },
    { code: "var foo = ( 1 + ( 2 * 5 ) ) * 3", options: ["loose"] },
    { code: "( function () { return 'bar'; }() )", options: ["loose"] },

    { code: "if ( foo && baz ) {} else if (bar) {}", options: ["loose"] },

    // Bracket line specific
    { code: "foo ( bar, {\n baz: 'quux'\n })", options: ["always", { exceptions: ["bracket lines"] }] },
    { code: "foo ( bar, {\n baz: 'quux'\n }\n)", options: ["always", { exceptions: ["bracket lines"] }] },

    { code: "const qux = {\nfoo ( { bar, baz } ) {\n}\n}",
      options: ["loose", { exceptions: ["bracket lines"] }],
      parserOptions: { ecmaVersion: 2022 } },
    { code: "const qux = {\nfoo ( { bar, baz } ) {\n}\n}",
      options: ["loose", { exceptions: ["bracket sides"] }],
      parserOptions: { ecmaVersion: 2022 } },
    { code: "const qux = {\nfoo ( { bar, baz } ) {\n}\n}",
      options: ["loose", { exceptions: ["bracket unclosed"] }],
      parserOptions: { ecmaVersion: 2022 } },
    { code: "const qux = {\nfoo ( { bar, baz } ) {\n}\n}",
      options: ["loose", { exceptions: ["bracket within"] }],
      parserOptions: { ecmaVersion: 2022 } },

    { code: "const qux = {\nfoo (bar) {\n}\n}",
      options: ["loose", { exceptions: ["bracket lines"] }],
      parserOptions: { ecmaVersion: 2022 } },
    { code: "const qux = {\nfoo (bar) {\n}\n}",
      options: ["loose", { exceptions: ["bracket sides"] }],
      parserOptions: { ecmaVersion: 2022 } },
    { code: "const qux = {\nfoo (bar) {\n}\n}",
      options: ["loose", { exceptions: ["bracket unclosed"] }],
      parserOptions: { ecmaVersion: 2022 } },
    { code: "const qux = {\nfoo (bar) {\n}\n}",
      options: ["loose", { exceptions: ["bracket within"] }],
      parserOptions: { ecmaVersion: 2022 } },

    { code: "const qux = {\nfoo ( bar, qux ) {\n}\n}",
      options: ["loose", { exceptions: ["bracket lines"] }],
      parserOptions: { ecmaVersion: 2022 } },
    { code: "const qux = {\nfoo ( bar, qux ) {\n}\n}",
      options: ["loose", { exceptions: ["bracket sides"] }],
      parserOptions: { ecmaVersion: 2022 } },
    { code: "const qux = {\nfoo ( bar, qux ) {\n}\n}",
      options: ["loose", { exceptions: ["bracket unclosed"] }],
      parserOptions: { ecmaVersion: 2022 } },
    { code: "const qux = {\nfoo ( bar, qux ) {\n}\n}",
      options: ["loose", { exceptions: ["bracket within"] }],
      parserOptions: { ecmaVersion: 2022 } },
  ],

  invalid: [

    // methods and functions
    {
      code: "bar(baz )",
      output: "bar(baz)",
      options: ["never"],
      errors: [{ messageId: "rejectedClosingSpace" }]
    },
    {
      code: "bar(baz )",
      output: "bar(baz)",
      options: ["loose"],
      errors: [{ messageId: "rejectedClosingSpace" }]
    },
    {
      code: "bar( baz )",
      output: "bar(baz)",
      options: ["never"],
      errors: [
        { messageId: "rejectedOpeningSpace", line: 1, column: 5, endColumn: 6 },
        { messageId: "rejectedClosingSpace", line: 1, column: 9, endColumn: 10 }
      ]
    },
    {
      code: "bar( baz )",
      output: "bar(baz)",
      options: ["loose"],
      errors: [
        { messageId: "rejectedOpeningSpace", line: 1, column: 5, endColumn: 6 },
        { messageId: "rejectedClosingSpace", line: 1, column: 9, endColumn: 10 }
      ]
    },
    {
      code: "bar(  baz  )",
      output: "bar(baz)",
      options: ["never"],
      errors: [
        { messageId: "rejectedOpeningSpace", line: 1, column: 5, endColumn: 7 },
        { messageId: "rejectedClosingSpace", line: 1, column: 10, endColumn: 12 }
      ]
    },
    {
      code: "bar(  baz  )",
      output: "bar(baz)",
      options: ["loose"],
      errors: [
        { messageId: "rejectedOpeningSpace", line: 1, column: 5, endColumn: 7 },
        { messageId: "rejectedClosingSpace", line: 1, column: 10, endColumn: 12 }
      ]
    },
    {
      code: "foo( )",
      output: "foo()",
      options: ["never"],
      errors: [
        { messageId: "rejectedOpeningSpace", line: 1, column: 5, endColumn: 6 },
        { messageId: "rejectedClosingSpace", line: 1, column: 5, endColumn: 6 }
      ]
    },
    {
      code: "foo( )",
      output: "foo()",
      options: ["loose"],
      errors: [
        { messageId: "rejectedOpeningSpace", line: 1, column: 5, endColumn: 6 },
        { messageId: "rejectedClosingSpace", line: 1, column: 5, endColumn: 6 }
      ]
    },
    {
      code: "foo(  )",
      output: "foo()",
      options: ["never"],
      errors: [
        { messageId: "rejectedOpeningSpace", line: 1, column: 5, endColumn: 7 },
        { messageId: "rejectedClosingSpace", line: 1, column: 5, endColumn: 7 }
      ]
    },
    {
      code: "foo(  )",
      output: "foo()",
      options: ["loose"],
      errors: [
        { messageId: "rejectedOpeningSpace", line: 1, column: 5, endColumn: 7 },
        { messageId: "rejectedClosingSpace", line: 1, column: 5, endColumn: 7 }
      ]
    },
    {
      code: "foo(bar() )",
      output: "foo(bar())",
      options: ["never"],
      errors: [{ messageId: "rejectedClosingSpace" }]
    },
    {
      code: "foo(bar() )",
      output: "foo( bar() )",
      options: ["loose"],
      errors: [{ messageId: "missingOpeningSpace" }]
    },
    {
      code: "foo\n(\nbar )",
      output: "foo\n(\nbar)",
      options: ["never"],
      errors: [{ messageId: "rejectedClosingSpace", line: 3, column: 4 }]
    },
    {
      code: "foo\n(\nbar )",
      output: "foo\n(\nbar)",
      options: ["loose"],
      errors: [{ messageId: "rejectedClosingSpace", line: 3, column: 4 }]
    },
    {
      code: "foo\n(bar\n)\n",
      output: "foo\n( bar\n)\n",
      options: ["always"],
      errors: [{ messageId: "missingOpeningSpace", line: 2, column: 1 }]
    },
    {
      code: "foo\n(bar + baz\n)\n",
      output: "foo\n( bar + baz\n)\n",
      options: ["loose"],
      errors: [{ messageId: "missingOpeningSpace", line: 2, column: 1 }]
    },
    {
      code: "foo( bar)",
      output: "foo( bar )",
      options: ["always"],
      errors: [{ messageId: "missingClosingSpace", line: 1, column: 9 }]
    },
    {
      code: "foo( bar + baz)",
      output: "foo( bar + baz )",
      options: ["loose"],
      errors: [{ messageId: "missingClosingSpace", line: 1, column: 15 }]
    },
    {
      code: "foo(bar)",
      output: "foo( bar )",
      options: ["always"],
      errors: [
        { messageId: "missingOpeningSpace", line: 1, column: 4, endColumn: 5 },
        { messageId: "missingClosingSpace", line: 1, column: 8, endColumn: 9 }
      ]
    },
    {
      code: "foo(bar + baz)",
      output: "foo( bar + baz )",
      options: ["loose"],
      errors: [
        { messageId: "missingOpeningSpace", line: 1, column: 4, endColumn: 5 },
        { messageId: "missingClosingSpace", line: 1, column: 14, endColumn: 15 }
      ]
    },
    {
      code: "const x = () => ( {} )",
      output: "const x = () => ({})",
      options: ["never"],
      parserOptions: { ecmaVersion: 6 },
      errors: [
        { messageId: "rejectedOpeningSpace", line: 1, column: 18, endColumn: 19 },
        { messageId: "rejectedClosingSpace", line: 1, column: 21, endColumn: 22 }
      ]
    },
    {
      code: "const x = () => ( {} )",
      output: "const x = () => ({})",
      options: ["loose"],
      parserOptions: { ecmaVersion: 6 },
      errors: [
        { messageId: "rejectedOpeningSpace", line: 1, column: 18, endColumn: 19 },
        { messageId: "rejectedClosingSpace", line: 1, column: 21, endColumn: 22 }
      ]
    },
    {
      code: "const x = () => ({})",
      output: "const x = () => ( {} )",
      options: ["always"],
      parserOptions: { ecmaVersion: 6 },
      errors: [
        { messageId: "missingOpeningSpace", line: 1, column: 17, endColumn: 18 },
        { messageId: "missingClosingSpace", line: 1, column: 20, endColumn: 21 }
      ]
    },

    // variable declaration and formulas
    {
      code: "var x = ( 1 + 2) * 3",
      output: "var x = ( 1 + 2 ) * 3",
      options: ["always"],
      errors: [{ messageId: "missingClosingSpace", line: 1, column: 16 }]
    },
    {
      code: "var x = ( 1 + 2) * 3",
      output: "var x = ( 1 + 2 ) * 3",
      options: ["loose"],
      errors: [{ messageId: "missingClosingSpace", line: 1, column: 16 }]
    },
    {
      code: "var x = (1 + 2 ) * 3",
      output: "var x = ( 1 + 2 ) * 3",
      options: ["always"],
      errors: [{ messageId: "missingOpeningSpace", line: 1, column: 9 }]
    },
    {
      code: "var x = (1 + 2 ) * 3",
      output: "var x = ( 1 + 2 ) * 3",
      options: ["loose"],
      errors: [{ messageId: "missingOpeningSpace", line: 1, column: 9 }]
    },
    {
      code: "var x = ( 4 + 5) * 6",
      output: "var x = (4 + 5) * 6",
      options: ["never"],
      errors: [{ messageId: "rejectedOpeningSpace" }]
    },
    {
      code: "var x = ( 4+5) * 6",
      output: "var x = (4+5) * 6",
      options: ["loose"],
      errors: [{ messageId: "rejectedOpeningSpace" }]
    },
    {
      code: "var x = (4 + 5 ) * 6",
      output: "var x = (4 + 5) * 6",
      options: ["never"],
      errors: [{ messageId: "rejectedClosingSpace" }]
    },
    {
      code: "var x = (4+5 ) * 6",
      output: "var x = (4+5) * 6",
      options: ["loose"],
      errors: [{ messageId: "rejectedClosingSpace" }]
    },

    // comments
    {
      code: "foo(/* bar */)",
      output: "foo( /* bar */ )",
      options: ["always"],
      errors: [
        { messageId: "missingOpeningSpace" },
        { messageId: "missingClosingSpace" }
      ]
    },
    {
      code: "foo(/* bar */)",
      output: "foo( /* bar */ )",
      options: ["loose"],
      errors: [
        { messageId: "missingOpeningSpace" },
        { messageId: "missingClosingSpace" }
      ]
    },
    {
      code: "foo(/* bar */baz )",
      output: "foo( /* bar */baz )",
      options: ["always"],
      errors: [{ messageId: "missingOpeningSpace" }]
    },
    {
      code: "foo(/* bar */baz )",
      output: "foo( /* bar */baz )",
      options: ["loose"],
      errors: [{ messageId: "missingOpeningSpace" }]
    },
    {
      code: "foo(/* bar */ baz )",
      output: "foo( /* bar */ baz )",
      options: ["always"],
      errors: [{ messageId: "missingOpeningSpace" }]
    },
    {
      code: "foo(/* bar */ baz )",
      output: "foo( /* bar */ baz )",
      options: ["loose"],
      errors: [{ messageId: "missingOpeningSpace" }]
    },
    {
      code: "foo( baz/* bar */)",
      output: "foo( baz/* bar */ )",
      options: ["always"],
      errors: [{ messageId: "missingClosingSpace" }]
    },
    {
      code: "foo( baz/* bar */)",
      output: "foo( baz/* bar */ )",
      options: ["loose"],
      errors: [{ messageId: "missingClosingSpace" }]
    },
    {
      code: "foo( baz /* bar */)",
      output: "foo( baz /* bar */ )",
      options: ["always"],
      errors: [{ messageId: "missingClosingSpace" }]
    },
    {
      code: "foo( baz /* bar */)",
      output: "foo( baz /* bar */ )",
      options: ["loose"],
      errors: [{ messageId: "missingClosingSpace" }]
    },
    {
      code: "foo( /* bar */ )",
      output: "foo(/* bar */)",
      options: ["never"],
      errors: [
        { messageId: "rejectedOpeningSpace" },
        { messageId: "rejectedClosingSpace" }
      ]
    },
    {
      code: "foo( /* bar */ baz)",
      output: "foo(/* bar */ baz)",
      options: ["never"],
      errors: [{ messageId: "rejectedOpeningSpace", line: 1, column: 5 }]
    },

    // exceptions
    {
      code: "foo()",
      output: "foo( )",
      options: ["never", { exceptions: ["empty"] }],
      errors: [
        { messageId: "missingOpeningSpace", line: 1, column: 4 },
        { messageId: "missingClosingSpace", line: 1, column: 5 }
      ]
    },
    {
      code: "foo()",
      output: "foo( )",
      options: ["loose", { exceptions: ["empty"] }],
      errors: [
        { messageId: "missingOpeningSpace", line: 1, column: 4 },
        { messageId: "missingClosingSpace", line: 1, column: 5 }
      ]
    },
    {
      code: "foo( )",
      output: "foo()",
      options: ["always", { exceptions: ["()", "empty"] }],
      errors: [
        { messageId: "rejectedOpeningSpace", line: 1, column: 5 },
        { messageId: "rejectedClosingSpace", line: 1, column: 5 }
      ]
    },
    {
      code: "foo( )",
      output: "foo()",
      options: ["always", { exceptions: ["empty"] }],
      errors: [
        { messageId: "rejectedOpeningSpace", line: 1, column: 5 },
        { messageId: "rejectedClosingSpace", line: 1, column: 5 }
      ]
    },
    {
      code: "foo( bar() )",
      output: "foo( bar())",
      options: ["always", { exceptions: ["()", "empty"] }],
      errors: [
        { messageId: "rejectedClosingSpace", line: 1, column: 11 }
      ]
    },
    {
      code: "foo( bar() )",
      output: "foo( bar( ))",
      options: ["loose", { exceptions: ["()", "empty"] }],
      errors: [
        { messageId: "missingOpeningSpace", line: 1, column: 9 },
        { messageId: "missingClosingSpace", line: 1, column: 10 },
        { messageId: "rejectedClosingSpace", line: 1, column: 11 }
      ]
    },
    {
      code: "foo(bar())",
      output: "foo(bar() )",
      options: ["never", { exceptions: ["()"] }],
      errors: [
        { messageId: "missingClosingSpace", line: 1, column: 10 }
      ]
    },
    {
      code: "foo(bar())",
      output: "foo( bar())",
      options: ["loose", { exceptions: ["()"] }],
      errors: [
        { messageId: "missingOpeningSpace", line: 1, column: 4 }
      ]
    },
    {
      code: "foo( bar() )",
      output: "foo(bar( ))",
      options: ["never", { exceptions: ["empty"] }],
      errors: [
        { messageId: "rejectedOpeningSpace", line: 1, column: 5 },
        { messageId: "missingOpeningSpace", line: 1, column: 9 },
        { messageId: "missingClosingSpace", line: 1, column: 10 },
        { messageId: "rejectedClosingSpace", line: 1, column: 11 }
      ]
    },
    {
      code: "foo([1,2], bar() )",
      output: "foo( [1,2], bar())",
      options: ["never", { exceptions: ["[]"] }],
      errors: [
        { messageId: "missingOpeningSpace", line: 1, column: 4 },
        { messageId: "rejectedClosingSpace", line: 1, column: 17 }
      ]
    },
    {
      code: "foo({ bar: 'baz' })",
      output: "foo( { bar: 'baz' } )",
      options: ["always", { exceptions: ["[]"] }],
      errors: [
        { messageId: "missingOpeningSpace" },
        { messageId: "missingClosingSpace" }
      ]
    },
    {
      code: "foo({ bar: 'baz' })",
      output: "foo( { bar: 'baz' } )",
      options: ["loose", { exceptions: ["[]"] }],
      errors: [
        { messageId: "missingOpeningSpace" },
        { messageId: "missingClosingSpace" }
      ]
    },
    {
      code: "foo( { bar: 'baz' } )",
      output: "foo({ bar: 'baz' })",
      options: ["always", { exceptions: ["{}"] }],
      errors: [
        { messageId: "rejectedOpeningSpace" },
        { messageId: "rejectedClosingSpace" }
      ]
    },
    {
      code: "foo( { bar: 'baz' } )",
      output: "foo({ bar: 'baz' })",
      options: ["loose", { exceptions: ["{}"] }],
      errors: [
        { messageId: "rejectedOpeningSpace" },
        { messageId: "rejectedClosingSpace" }
      ]
    },
    {
      code: "foo({ bar: 'baz' })",
      output: "foo( { bar: 'baz' } )",
      options: ["never", { exceptions: ["{}"] }],
      errors: [
        { messageId: "missingOpeningSpace" },
        { messageId: "missingClosingSpace" }
      ]
    },
    {
      code: "foo( { bar: 'baz' } )",
      output: "foo({ bar: 'baz' })",
      options: ["never", { exceptions: ["[]"] }],
      errors: [
        { messageId: "rejectedOpeningSpace" },
        { messageId: "rejectedClosingSpace" }
      ]
    },
    {
      code: "foo( { bar: 'baz' })",
      output: "foo({ bar: 'baz' })",
      options: ["always", { exceptions: ["{}"] }],
      errors: [{ messageId: "rejectedOpeningSpace" }]
    },
    {
      code: "foo( { bar: 'baz' })",
      output: "foo({ bar: 'baz' })",
      options: ["loose", { exceptions: ["{}"] }],
      errors: [{ messageId: "rejectedOpeningSpace" }]
    },
    {
      code: "foo( { bar: 'baz' })",
      output: "foo( { bar: 'baz' } )",
      options: ["never", { exceptions: ["{}"] }],
      errors: [{ messageId: "missingClosingSpace" }]
    },
    {
      code: "foo({ bar: 'baz' } )",
      output: "foo({ bar: 'baz' })",
      options: ["always", { exceptions: ["{}"] }],
      errors: [{ messageId: "rejectedClosingSpace" }]
    },
    {
      code: "foo({ bar: 'baz' } )",
      output: "foo({ bar: 'baz' })",
      options: ["loose", { exceptions: ["{}"] }],
      errors: [{ messageId: "rejectedClosingSpace" }]
    },
    {
      code: "foo({ bar: 'baz' } )",
      output: "foo( { bar: 'baz' } )",
      options: ["never", { exceptions: ["{}"] }],
      errors: [{ messageId: "missingOpeningSpace" }]
    },
    {
      code: "foo([ 1, 2 ])",
      output: "foo( [ 1, 2 ] )",
      options: ["always", { exceptions: ["empty"] }],
      errors: [
        { messageId: "missingOpeningSpace" },
        { messageId: "missingClosingSpace" }
      ]
    },
    {
      code: "foo([ 1, 2 ])",
      output: "foo( [ 1, 2 ] )",
      options: ["loose", { exceptions: ["empty"] }],
      errors: [
        { messageId: "missingOpeningSpace" },
        { messageId: "missingClosingSpace" }
      ]
    },
    {
      code: "foo( [ 1, 2 ] )",
      output: "foo([ 1, 2 ])",
      options: ["always", { exceptions: ["[]"] }],
      errors: [
        { messageId: "rejectedOpeningSpace" },
        { messageId: "rejectedClosingSpace" }
      ]
    },
    {
      code: "foo( [ 1, 2 ] )",
      output: "foo([ 1, 2 ])",
      options: ["loose", { exceptions: ["[]"] }],
      errors: [
        { messageId: "rejectedOpeningSpace" },
        { messageId: "rejectedClosingSpace" }
      ]
    },
    {
      code: "foo([ 1, 2 ])",
      output: "foo( [ 1, 2 ] )",
      options: ["never", { exceptions: ["[]"] }],
      errors: [
        { messageId: "missingOpeningSpace" },
        { messageId: "missingClosingSpace" }
      ]
    },
    {
      code: "foo([1,2])",
      output: "foo( [1,2] )",
      options: ["loose", { exceptions: ["[]"] }],
      errors: [
        { messageId: "missingOpeningSpace" },
        { messageId: "missingClosingSpace" }
      ]
    },
    {
      code: "foo( [ 1, 2 ] )",
      output: "foo([ 1, 2 ])",
      options: ["never", { exceptions: ["()"] }],
      errors: [
        { messageId: "rejectedOpeningSpace" },
        { messageId: "rejectedClosingSpace" }
      ]
    },
    {
      code: "foo( [1,2] )",
      output: "foo([1,2])",
      options: ["loose", { exceptions: ["()"] }],
      errors: [
        { messageId: "rejectedOpeningSpace" },
        { messageId: "rejectedClosingSpace" }
      ]
    },
    {
      code: "foo([ 1, 2 ] )",
      output: "foo([ 1, 2 ])",
      options: ["always", { exceptions: ["[]"] }],
      errors: [{ messageId: "rejectedClosingSpace" }]
    },
    {
      code: "foo([ 1, 2 ] )",
      output: "foo([ 1, 2 ])",
      options: ["loose", { exceptions: ["[]"] }],
      errors: [{ messageId: "rejectedClosingSpace" }]
    },
    {
      code: "foo([ 1, 2 ] )",
      output: "foo( [ 1, 2 ] )",
      options: ["never", { exceptions: ["[]"] }],
      errors: [{ messageId: "missingOpeningSpace" }]
    },
    {
      code: "foo([1,2] )",
      output: "foo( [1,2] )",
      options: ["loose", { exceptions: ["[]"] }],
      errors: [{ messageId: "missingOpeningSpace" }]
    },
    {
      code: "foo( [ 1, 2 ])",
      output: "foo([ 1, 2 ])",
      options: ["always", { exceptions: ["[]"] }],
      errors: [{ messageId: "rejectedOpeningSpace" }]
    },
    {
      code: "foo( [ 1, 2 ])",
      output: "foo( [ 1, 2 ] )",
      options: ["never", { exceptions: ["[]"] }],
      errors: [{ messageId: "missingClosingSpace" }]
    },
    {
      code: "foo( [1,2])",
      output: "foo( [1,2] )",
      options: ["loose", { exceptions: ["[]"] }],
      errors: [{ messageId: "missingClosingSpace" }]
    },
    {
      code: "(( 1 + 2 ))",
      output: "( ( 1 + 2 ) )",
      options: ["always", { exceptions: ["[]"] }],
      errors: [
        { messageId: "missingOpeningSpace" },
        { messageId: "missingClosingSpace" }
      ]
    },
    {
      code: "(( 1 + 2 ))",
      output: "( ( 1 + 2 ) )",
      options: ["loose", { exceptions: ["[]"] }],
      errors: [
        { messageId: "missingOpeningSpace" },
        { messageId: "missingClosingSpace" }
      ]
    },
    {
      code: "( ( 1 + 2 ) )",
      output: "(( 1 + 2 ))",
      options: ["always", { exceptions: ["()"] }],
      errors: [
        { messageId: "rejectedOpeningSpace", line: 1, column: 2 },
        { messageId: "rejectedClosingSpace", line: 1, column: 12 }
      ]
    },
    {
      code: "( ( 1 + 2 ) )",
      output: "(( 1 + 2 ))",
      options: ["loose", { exceptions: ["()"] }],
      errors: [
        { messageId: "rejectedOpeningSpace", line: 1, column: 2 },
        { messageId: "rejectedClosingSpace", line: 1, column: 12 }
      ]
    },
    {
      code: "( ( 1 + 2 ) )",
      output: "((1 + 2))",
      options: ["never"],
      errors: [
        { messageId: "rejectedOpeningSpace", line: 1, column: 2 },
        { messageId: "rejectedOpeningSpace", line: 1, column: 4 },
        { messageId: "rejectedClosingSpace", line: 1, column: 10 },
        { messageId: "rejectedClosingSpace", line: 1, column: 12 }
      ]
    },
    {
      code: "( ( 1 + 2 ) )",
      output: "((1 + 2))",
      options: ["never", { exceptions: ["[]"] }],
      errors: [
        { messageId: "rejectedOpeningSpace" },
        { messageId: "rejectedOpeningSpace" },
        { messageId: "rejectedClosingSpace" },
        { messageId: "rejectedClosingSpace" }
      ]
    },
    {
      code: "((1 + 2))",
      output: "(( 1 + 2 ))",
      options: ["always", { exceptions: ["()"] }],
      errors: [
        { messageId: "missingOpeningSpace", line: 1, column: 2 },
        { messageId: "missingClosingSpace", line: 1, column: 8 }
      ]
    },
    {
      code: "((1 + 2))",
      output: "(( 1 + 2 ))",
      options: ["loose", { exceptions: ["()"] }],
      errors: [
        { messageId: "missingOpeningSpace", line: 1, column: 2 },
        { messageId: "missingClosingSpace", line: 1, column: 8 }
      ]
    },
    {
      code: "((1 + 2))",
      output: "( (1 + 2) )",
      options: ["never", { exceptions: ["()"] }],
      errors: [
        { messageId: "missingOpeningSpace", line: 1, column: 1 },
        { messageId: "missingClosingSpace", line: 1, column: 9 }
      ]
    },
    {
      code: "((1 + 2) )",
      output: "( (1 + 2) )",
      options: ["never", { exceptions: ["()"] }],
      errors: [
        { messageId: "missingOpeningSpace", line: 1, column: 1 }
      ]
    },
    {
      code: "var result = ( 1 / ( 1 + 2 ) ) + 3",
      output: "var result = ( 1 / ( 1 + 2 )) + 3",
      options: ["always", { exceptions: ["()"] }],
      errors: [
        { messageId: "rejectedClosingSpace", line: 1, column: 29 }
      ]
    },
    {
      code: "var result = ( 1 / ( 1 + 2 ) ) + 3",
      output: "var result = ( 1 / ( 1 + 2 )) + 3",
      options: ["loose", { exceptions: ["()"] }],
      errors: [
        { messageId: "rejectedClosingSpace", line: 1, column: 29 }
      ]
    },
    {
      code: "var result = (1 / (1 + 2)) + 3",
      output: "var result = (1 / (1 + 2) ) + 3",
      options: ["never", { exceptions: ["()"] }],
      errors: [
        { messageId: "missingClosingSpace", line: 1, column: 26 }
      ]
    },
    {
      code: "var result = (1 / ( 1 + 2) ) + 3",
      output: "var result = ( 1 / ( 1 + 2 )) + 3",
      options: ["always", { exceptions: ["()"] }],
      errors: [
        { messageId: "missingOpeningSpace", line: 1, column: 14 },
        { messageId: "missingClosingSpace", line: 1, column: 26 },
        { messageId: "rejectedClosingSpace", line: 1, column: 27 }
      ]
    },
    {
      code: "var result = (1 / ( 1 + 2) ) + 3",
      output: "var result = ( 1 / ( 1 + 2 )) + 3",
      options: ["loose", { exceptions: ["()"] }],
      errors: [
        { messageId: "missingOpeningSpace", line: 1, column: 14 },
        { messageId: "missingClosingSpace", line: 1, column: 26 },
        { messageId: "rejectedClosingSpace", line: 1, column: 27 }
      ]
    },

    // ES6
    {
      code: "var foo = `(bar ${( 1 + 2 )})`;",
      output: "var foo = `(bar ${(1 + 2)})`;",
      options: ["never"],
      parserOptions: { ecmaVersion: 6 },
      errors: [
        { messageId: "rejectedOpeningSpace", line: 1, column: 20 },
        { messageId: "rejectedClosingSpace", line: 1, column: 26 }
      ]
    },
    {
      code: "var foo = `(bar ${(1 + 2 )})`;",
      output: "var foo = `(bar ${( 1 + 2 )})`;",
      options: ["always"],
      parserOptions: { ecmaVersion: 6 },
      errors: [{ messageId: "missingOpeningSpace", line: 1, column: 19 }]
    },
    {
      code: "var foo = `(bar ${(1 + 2 )})`;",
      output: "var foo = `(bar ${( 1 + 2 )})`;",
      options: ["loose"],
      parserOptions: { ecmaVersion: 6 },
      errors: [{ messageId: "missingOpeningSpace", line: 1, column: 19 }]
    }
  ]
});
