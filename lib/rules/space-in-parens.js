/**
 * @fileoverview Disallows or enforces spaces inside of parentheses.
 * @author Jonathan Rajavuori
 * @author Bence Szalai <https://sbnc.eu>
 */

"use strict";

const astUtils = require("./utils/ast-utils");

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

/** @type {import('eslint/lib/shared/types').Rule} */
module.exports = {
    meta: {
        type: "layout",

        docs: {
            description: "enforce consistent spacing inside parentheses",
            recommended: false,
            url: "https://github.com/BenceSzalai/eslint-plugin-sbnc-rules/blob/main/docs/rules/space-in-parens.md", // URL to the documentation page for this rule
        },

        fixable: "whitespace",

        schema: [
            {
                enum: ["always", "never", "loose"]
            },
            {
                type: "object",
                properties: {
                    exceptions: {
                        type: "array",
                        items: {
                            enum: ["{}", "[]", "()", "empty", "bracket lines", "bracket sides", "bracket unclosed", "bracket within"]
                        },
                        uniqueItems: true
                    }
                },
                additionalProperties: false
            }
        ],

        messages: {
            missingOpeningSpace : "There must be a space after this paren.",
            missingClosingSpace : "There must be a space before this paren.",
            rejectedOpeningSpace: "There should be no space after this paren.",
            rejectedClosingSpace: "There should be no space before this paren."
        }
    },

    create(context) {
        const ALWAYS = context.options[0] === "always",
              LOOSE = context.options[0] === "loose",
              exceptionsArrayOptions = (context.options[1] && context.options[1].exceptions) || [],
              options = {};

        let exceptions;

        //if (exceptionsArrayOptions.length) {
        options.braceException   = exceptionsArrayOptions.includes("{}");
        options.bracketException = exceptionsArrayOptions.includes("[]");
        options.parenException   = exceptionsArrayOptions.includes("()");
        options.empty            = exceptionsArrayOptions.includes("empty");
        options.bracketLines     = exceptionsArrayOptions.includes("bracket lines");
        options.bracketSides     = exceptionsArrayOptions.includes("bracket sides");
        options.bracketUnclosed  = exceptionsArrayOptions.includes("bracket unclosed");
        options.bracketWithin    = exceptionsArrayOptions.includes("bracket within");
        //}

        /**
         * Produces an object with the opener and closer exception values
         * @returns {Object} `openers` and `closers` exception values
         * @private
         */
        function getExceptions() {
            const openers = [],
                closers = [];

            if (options.braceException) {
                openers.push("{");
                closers.push("}");
            }

            if (options.bracketException) {
                openers.push("[");
                closers.push("]");
            }

            if (options.parenException) {
                openers.push("(");
                closers.push(")");
            }

            if (options.empty) {
                openers.push(")");
                closers.push("(");
            }

            return {
                openers,
                closers
            };
        }

        //--------------------------------------------------------------------------
        // Helpers
        //--------------------------------------------------------------------------
        const sourceCode = context.getSourceCode();

        /**
         * Determines if a token is one of the exceptions for the opener paren
         * @param {Object} token The token to check
         * @returns {boolean} True if the token is one of the exceptions for the opener paren
         */
        function isOpenerException(token) {
            return exceptions.openers.includes(token.value);
        }

        /**
         * Determines if a token is one of the exceptions for the closer paren
         * @param {Object} token The token to check
         * @returns {boolean} True if the token is one of the exceptions for the closer paren
         */
        function isCloserException(token) {
          return exceptions.closers.includes(token.value);
        }

        /**
         * Determines if an opening paren is immediately followed by a required space
         * @returns {boolean} True if the opening paren is missing a required space
         */
        function openerMissingSpace(tokens, index) {
          let token = tokens[index]
          const nextToken = tokens[index + 1];
          const openingParenToken = token
          const tokenAfterOpeningParen = nextToken

          if (sourceCode.isSpaceBetweenTokens(openingParenToken, tokenAfterOpeningParen)) {
              return false;
          }

          if (!options.empty && astUtils.isClosingParenToken(tokenAfterOpeningParen)) {
              return false;
          }

          const isException =
                  isOpenerException(tokenAfterOpeningParen) ||
                  (options.bracketLines && isInBracketLine(tokens, index)) ||
                  (options.bracketSides && isInBracketLine(tokens, index, 'forward')) ||
                  (options.bracketUnclosed && isInBracketLine(tokens, index, 'unclosed')) ||
                  (options.bracketWithin && isInBracketLine(tokens, index, 'within'))

          if (ALWAYS || (LOOSE && needsSpaceLoose(tokens, index))) {
              return !isException;
          }
          return isException
        }

        /**
         * Determines if an opening paren is immediately followed by a disallowed space
         * @returns {boolean} True if the opening paren has a disallowed space
         */
        function openerRejectsSpace(tokens, index) {
          let token = tokens[index]
          const nextToken = tokens[index + 1];
          const openingParenToken = token
          const tokenAfterOpeningParen = nextToken

          if (!astUtils.isTokenOnSameLine(openingParenToken, tokenAfterOpeningParen)) {
              return false;
          }

          if (tokenAfterOpeningParen.type === "Line") {
              return false;
          }

          if (!sourceCode.isSpaceBetweenTokens(openingParenToken, tokenAfterOpeningParen)) {
              return false;
          }

          const isException =
                  isOpenerException(tokenAfterOpeningParen) ||
                  (options.bracketLines && isInBracketLine(tokens, index)) ||
                  (options.bracketSides && isInBracketLine(tokens, index, 'forward')) ||
                  (options.bracketUnclosed && isInBracketLine(tokens, index, 'unclosed')) ||
                  (options.bracketWithin && isInBracketLine(tokens, index, 'within'))

          if (ALWAYS || (LOOSE && needsSpaceLoose(tokens, index))) {
              return isException;
          }
          return !isException;
        }

        /**
         * Determines if a closing paren is immediately preceded by a required space
         * @returns {boolean} True if the closing paren is missing a required space
         */
        function closerMissingSpace(tokens, index) {
          let token = tokens[index]
          const prevToken = tokens[index - 1];
          const closingParenToken = token
          const tokenBeforeClosingParen = prevToken

          if (sourceCode.isSpaceBetweenTokens(tokenBeforeClosingParen, closingParenToken)) {
              return false;
          }

          if (!options.empty && astUtils.isOpeningParenToken(tokenBeforeClosingParen)) {
              return false;
          }

          const isException =
                  isCloserException(tokenBeforeClosingParen) ||
                  (options.bracketLines && isInBracketLine(tokens, index)) ||
                  (options.bracketSides && isInBracketLine(tokens, index, 'backward')) ||
                  (options.bracketUnclosed && isInBracketLine(tokens, index, 'unclosed')) ||
                  (options.bracketWithin && isInBracketLine(tokens, index, 'within'))

          if (ALWAYS || (LOOSE && needsSpaceLoose(tokens, index))) {
              return !isException;
          }
          return isException;
        }

        /**
         * Determines if a closer paren is immediately preceded by a disallowed space
         * @returns {boolean} True if the closing paren has a disallowed space
         */
        function closerRejectsSpace(tokens, index) {
          let token = tokens[index]
          const prevToken = tokens[index - 1];
          const closingParenToken = token
          const tokenBeforeClosingParen = prevToken

          if (!astUtils.isTokenOnSameLine(tokenBeforeClosingParen, closingParenToken)) {
              return false;
          }

          if (!sourceCode.isSpaceBetweenTokens(tokenBeforeClosingParen, closingParenToken)) {
              return false;
          }

          const isException =
                  isCloserException(tokenBeforeClosingParen) ||
                  (options.bracketLines && isInBracketLine(tokens, index)) ||
                  (options.bracketSides && isInBracketLine(tokens, index, 'backward')) ||
                  (options.bracketUnclosed && isInBracketLine(tokens, index, 'unclosed')) ||
                  (options.bracketWithin && isInBracketLine(tokens, index, 'within'))

          if (ALWAYS || (LOOSE && needsSpaceLoose(tokens, index))) {
              return isException;
          }
          return !isException;
        }

        function needsSpaceLoose(tokens, index) {
          let token = tokens[index]
          if (astUtils.isOpeningParenToken(token)) {
            do {
              // If there are less than 1 more token left, we bail out
              if ( index + 1 > (tokens.length - 1) ) {
                return false;
              }
              if ( tokens[index + 1].type === 'Block' /* Block comment */ ) {
                return true
              }
              token = tokens[++index]
              // If there are another parentheses inside, we need a space
              if ( astUtils.isOpeningParenToken(token) ) {
                return true
              }
              // If the parentheses ends we don't need a space
              if ( astUtils.isClosingParenToken(token) || astUtils.isClosingParenToken(tokens[index+1] || token) ) {
                return false
              }
              // If there is one more token ahead, and that token does not start right after this one, we need a space
              if ( sourceCode.isSpaceBetweenTokens(token, (tokens[index+1] || token)) ) {
                return true
              }
            } while (index+1 < tokens.length)
          }
          else if (astUtils.isClosingParenToken(token)) {
            do {
              // If there are less than 1 more token left, we bail out
              if ( index < 2 ) {
                return false;
              }
              if ( tokens[index - 1].type === 'Block' /* Block comment */ ) {
                return true
              }
              token = tokens[--index]
              // If there are another parentheses inside, we need a space
              if ( astUtils.isClosingParenToken(token) ) {
                return true
              }
              // If the parentheses ends we don't need a space
              if ( astUtils.isOpeningParenToken(token) || astUtils.isOpeningParenToken(tokens[index-1] || token) ) {
                return false
              }
              // If there is one more token ahead, and that token does not start right before this one, we need a space
              if ( sourceCode.isSpaceBetweenTokens(tokens[index-1] || token, token) ) {
                return true
              }
            } while (index+1 < tokens.length)
          }
          return false
        }

        function stackCount( stack, token ) {
          const opposite =
                  token.value === '(' ? ')' :
                    token.value === ')' ? '(' :
                      token.value === '{' ? '}' :
                        token.value === '}' ? '{' :
                          token.value === '[' ? ']' :
                            token.value === ']' ? '[' :
                              null

          if (opposite) {
            if ( stack.length && stack[stack.length-1] === opposite ) {
              stack.pop()
            }
            else {
              stack.push(token.value)
            }
          }

          return stack
        }

        function isInBracketLine(tokens, index, searchDirection = 'both') {
          const token = tokens[index]
          const tokensInLine = [];
          let stack = [];
          let unclosed = false;
          let within = false;

          if ( searchDirection === 'unclosed' ) {
            unclosed = true
          }
          if ( searchDirection === 'within' || searchDirection === 'unclosed' ) {
            if ( ['(', '{', '['].includes(token.value) ) {
              searchDirection = 'forward'
              within = true
            }
            else if ( [')', '}', ']'].includes(token.value) ) {
              searchDirection = 'backward'
              within = true
            }
            else {
              return false
            }
          }

          tokensInLine.push(token)
          stack.push(token.value)

          let indexBack = index, indexFwd = index

          if (searchDirection !== 'forward') {
            while (indexBack > 0) {
              if ( astUtils.isTokenOnSameLine(tokens[--indexBack], token)) {
                tokensInLine.push(tokens[indexBack])
                if (within) {
                  stack = stackCount(stack, tokens[indexBack])
                  if (stack.length === 0) {
                    break
                  }
                }
              }
              else {
                break
              }
            }
          }

          if (searchDirection !== 'backward') {
            while (indexFwd < tokens.length - 1) {
              if (astUtils.isTokenOnSameLine(tokens[++indexFwd], token)) {
                tokensInLine.push(tokens[indexFwd])
                if (within) {
                  stack = stackCount(stack, tokens[indexFwd])
                  if (stack.length === 0) {
                    break
                  }
                }
              } else {
                break
              }
            }
          }

          if (unclosed && stack.length === 0) {
            return false
          }

          for (const tokenInLine of tokensInLine) {
            if (tokenInLine.type !== "Punctuator") {
              return false
            }
          }
          return true
        }

        //--------------------------------------------------------------------------
        // Public
        //--------------------------------------------------------------------------

        return {
            Program: function checkParenSpaces(node) {
                exceptions = getExceptions();
                const tokens = sourceCode.tokensAndComments;

                tokens.forEach((token, i) => {
                    const prevToken = tokens[i - 1];
                    const nextToken = tokens[i + 1];

                    // if token is not an opening or closing paren token, do nothing
                    if (!astUtils.isOpeningParenToken(token) && !astUtils.isClosingParenToken(token)) {
                        return;
                    }

                    // if token is an opening paren and is not followed by a required space
                    if (token.value === "(" && openerMissingSpace(tokens, i)) {
                        context.report({
                            node,
                            loc: token.loc,
                            messageId: "missingOpeningSpace",
                            fix(fixer) {
                                return fixer.insertTextAfter(token, " ");
                            }
                        });
                    }

                    // if token is an opening paren and is followed by a disallowed space
                    if (token.value === "(" && openerRejectsSpace(tokens, i)) {
                        context.report({
                            node,
                            loc: { start: token.loc.end, end: nextToken.loc.start },
                            messageId: "rejectedOpeningSpace",
                            fix(fixer) {
                                return fixer.removeRange([token.range[1], nextToken.range[0]]);
                            }
                        });
                    }

                    // if token is a closing paren and is not preceded by a required space
                    if (token.value === ")" && closerMissingSpace(tokens, i)) {
                        context.report({
                            node,
                            loc: token.loc,
                            messageId: "missingClosingSpace",
                            fix(fixer) {
                                return fixer.insertTextBefore(token, " ");
                            }
                        });
                    }

                    // if token is a closing paren and is preceded by a disallowed space
                    if (token.value === ")" && closerRejectsSpace(tokens, i)) {
                        context.report({
                            node,
                            loc: { start: prevToken.loc.end, end: token.loc.start },
                            messageId: "rejectedClosingSpace",
                            fix(fixer) {
                                return fixer.removeRange([prevToken.range[1], token.range[0]]);
                            }
                        });
                    }
                });
            }
        };
    }
};
