/**
 * @fileoverview A rule to ensure blank lines within blocks.
 * @author Mathias Schreck <https://github.com/lo1tuma>
 * @author Bence Szalai <https://sbnc.eu>
 */

"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

const astUtils = require("./utils/ast-utils");

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

/** @type {import('eslint/lib/shared/types').Rule} */
module.exports = {
  meta: {
    type: `layout`, // `problem`, `suggestion`, or `layout`
    docs: {
      description: "require or disallow padding within blocks",
      category: "Layout & Formatting", // Category on https://eslint.org/docs/rules/
      recommended: false,
      url: "https://github.com/BenceSzalai/eslint-plugin-sbnc-rules/blob/main/docs/rules/padded-blocks.md", // URL to the documentation page for this rule
    },
    fixable: "whitespace", // `code` or `whitespace`

    schema: [
      {
        oneOf: [
          {
            enum: ["always", "never", "loose"]
          },
          {
            type: "object",
            properties: {
              blocks: {
                enum: ["always", "never", "loose"]
              },
              switches: {
                enum: ["always", "never", "loose"]
              },
              classes: {
                enum: ["always", "never", "loose"]
              }
            },
            additionalProperties: false,
            minProperties: 1
          }
        ]
      },
      {
        type: "object",
        properties: {
          allowSingleLineBlocks: {
            type: "boolean"
          },
          noBottomPadding: {
            type: "boolean"
          }
        },
        additionalProperties: false
      }
    ],

    messages: {
      alwaysPadBlock: "Block must be padded by blank lines.",
      neverPadBlock: "Block must not be padded by blank lines.",
      alwaysPadSlicedBlock: "Sliced block must be padded by blank lines.",
      neverPadMonolithBlock: "Monolith block must not be padded by blank lines.",
      neverPadBottom: "Bottom of a block must not be padded by blank lines.",
    }
  },


  create(context) {
    const options = {};
    const typeOptions = context.options[0] || "always";
    const exceptOptions = context.options[1] || {};

    if (typeof typeOptions === "string") {
      const shouldHavePadding = typeOptions === "always";
      const onlyPadSliced = typeOptions === "loose";

      options.blocks = { shouldHavePadding, onlyPadSliced };
      options.switches = { shouldHavePadding, onlyPadSliced };
      options.classes = { shouldHavePadding, onlyPadSliced };
    }
    else {
      if (Object.prototype.hasOwnProperty.call(typeOptions, "blocks")) {
        options.blocks = {
          shouldHavePadding: typeOptions.blocks === "always",
          onlyPadSliced: typeOptions.blocks === "loose"
        };
      }
      if (Object.prototype.hasOwnProperty.call(typeOptions, "switches")) {
        options.switches = {
          shouldHavePadding: typeOptions.switches === "always",
          onlyPadSliced: typeOptions.switches === "loose"
        };
      }
      if (Object.prototype.hasOwnProperty.call(typeOptions, "classes")) {
        options.classes = {
          shouldHavePadding: typeOptions.classes === "always",
          onlyPadSliced: typeOptions.classes === "loose"
        };
      }
    }

    if (Object.prototype.hasOwnProperty.call(exceptOptions, "allowSingleLineBlocks")) {
      options.allowSingleLineBlocks = exceptOptions.allowSingleLineBlocks === true;
    }
    if (Object.prototype.hasOwnProperty.call(exceptOptions, "noBottomPadding")) {
      options.noBottomPadding = exceptOptions.noBottomPadding === true;
    }

    const sourceCode = context.getSourceCode();

    /**
     * Gets the open brace token from a given node.
     * @param {ASTNode} node A BlockStatement or SwitchStatement node from which to get the open brace.
     * @returns {Token} The token of the open brace.
     */
    function getOpenBrace(node) {
      if (node.type === "SwitchStatement") {
        return sourceCode.getTokenBefore(node.cases[0]);
      }

      if (node.type === "StaticBlock") {
        return sourceCode.getFirstToken(node, { skip: 1 }); // skip the `static` token
      }

      // `BlockStatement` or `ClassBody`
      return sourceCode.getFirstToken(node);
    }

    /**
     * Checks if the given parameter is a comment node
     * @param {ASTNode|Token} node An AST node or token
     * @returns {boolean} True if node is a comment
     */
    function isComment(node) {
      return node.type === "Line" || node.type === "Block";
    }

    /**
     * Checks if two tokens are in consecutive lines
     * @param {Token} first The first token
     * @param {Token} second The second token
     * @returns {boolean} True if there is at least a line between the tokens
     */
    function isMultipleLinesBetweenTokens(first, second) {
      return second.loc.start.line - first.loc.end.line >= 2;
    }

    /**
     * Checks if there is padding between two tokens in a node's own scope
     * @param {Token} first The first token
     * @param {Token} second The second token
     * @param {Node} node
     * @returns {boolean} True if there is at least a line between the tokens
     */
    function isPaddingInNodeOwnBody(first, second, node) {
      let emptyLineCount = 0;
      let line = first.loc.start.line - 1; // use 0 indexed array

      do {
        if (isIndiceInNodeOwnBlock(node, sourceCode.lineStartIndices[line])) {
          if (!sourceCode.lines[line].trim()) {
            emptyLineCount++;
          }
        }
        line++
      } while (emptyLineCount == 0 && line <= (second.loc.end.line-1) )

      return emptyLineCount >= 1;
    }

    function isIndiceInNodeOwnBlock(node, indice) {
      const ranges = getNodeOwnRanges(node);

      for (const range of ranges) {
        if (indice >= range[0] && indice <= range[1]) {
          return true;
        }
      }
      return false;
    }

    let nodeOwnRanges = {};
    function getNodeOwnRanges(node) {
      let key = `${node.range[0]},${node.range[1]}`
      if (!nodeOwnRanges[key]) {
        let start  = node.range[0];
        nodeOwnRanges[key] = [];
        if (node.body) {
          node.body.forEach(function (childNode) {
            if (childNode.type === "SwitchStatement" || childNode.type === "StaticBlock" ||
                childNode.type === "BlockStatement" || childNode.type === "ClassBody" ||
              childNode.type === "MethodDefinition"
               ) {
              let openBrace = getOpenBrace(childNode);
              nodeOwnRanges[key].push([start, openBrace.range[0] - 1]);
              start = childNode.range[1] + 1;
            }
          });
        }
        nodeOwnRanges[key].push([start, node.range[1]]);
      }
      return nodeOwnRanges[key]
    }

    /**
     * Gets the first token of the line after the given token.
     * @param {Token} token The token to check.
     * @returns {Token} Whether or not the token is followed by a blank line.
     */
    function getFirstBlockToken(token) {
      let prev,
          first = token;

      do {
        prev = first;
        first = sourceCode.getTokenAfter(first, { includeComments: true });
      } while (isComment(first) && first.loc.start.line === prev.loc.end.line);

      return first;
    }

    /**
     Gets the last token of the line before the given token.
     * @param {Token} token The token to check
     * @returns {Token} Whether or not the token is preceded by a blank line
     */
    function getLastBlockToken(token) {
      let last = token,
          next;

      do {
        next = last;
        last = sourceCode.getTokenBefore(last, { includeComments: true });
      } while (isComment(last) && last.loc.end.line === next.loc.start.line);

      return last;
    }

    /**
     * Checks if a node should be padded, according to the rule config.
     * @param {ASTNode} node The AST node to check.
     * @param {boolean} isBlockSliced
     * @throws {Error} (Unreachable)
     * @returns {boolean} True if the node should be padded, false otherwise.
     */
    function requirePaddingFor(node, isBlockSliced) {
      switch (node.type) {
        case "BlockStatement":
        case "StaticBlock":
          return options.blocks.shouldHavePadding || ( options.blocks.onlyPadSliced && isBlockSliced );
        case "SwitchStatement":
          return options.switches.shouldHavePadding || ( options.switches.onlyPadSliced && isBlockSliced );
        case "ClassBody":
          return options.classes.shouldHavePadding || ( options.classes.onlyPadSliced && isBlockSliced );

        /* istanbul ignore next */
        default:
          throw new Error("unreachable");
      }
    }

    /**
     * Checks if a node should be excluded from the no-padding rule.
     * @param {ASTNode} node The AST node to check.
     * @throws {Error} (Unreachable)
     * @returns {boolean} True if the node should be padded, false otherwise.
     */
    function shouldOnlyPadSliced(node) {
      switch (node.type) {
        case "BlockStatement":
        case "StaticBlock":
          return options.blocks.onlyPadSliced;
        case "SwitchStatement":
          return options.switches.onlyPadSliced;
        case "ClassBody":
          return options.classes.onlyPadSliced;

        /* istanbul ignore next */
        default:
          throw new Error("unreachable");
      }
    }

    /**
     * Checks the given BlockStatement node to be padded if the block is not empty.
     * @param {ASTNode} node The AST node of a BlockStatement.
     * @returns {void} undefined.
     */
    function checkPadding(node) {
      const openBrace = getOpenBrace(node),
            firstBlockToken = getFirstBlockToken(openBrace),
            tokenBeforeFirst = sourceCode.getTokenBefore(firstBlockToken, { includeComments: true }),
            closeBrace = sourceCode.getLastToken(node),
            lastBlockToken = getLastBlockToken(closeBrace),
            tokenAfterLast = sourceCode.getTokenAfter(lastBlockToken, { includeComments: true }),
            blockHasTopPadding = isMultipleLinesBetweenTokens(tokenBeforeFirst, firstBlockToken),
            blockHasBottomPadding = isMultipleLinesBetweenTokens(lastBlockToken, tokenAfterLast),
            blockIsSliced = isPaddingInNodeOwnBody(firstBlockToken, lastBlockToken, node);

            if (options.allowSingleLineBlocks && astUtils.isTokenOnSameLine(tokenBeforeFirst, tokenAfterLast)) {
        return;
      }

      let requirePadding = requirePaddingFor(node, blockIsSliced)
      if (requirePadding) {

        if (!blockHasTopPadding) {
          context.report({
            node,
            loc: {
              start: tokenBeforeFirst.loc.start,
              end: firstBlockToken.loc.start
            },
            fix(fixer) {
              return fixer.insertTextAfter(tokenBeforeFirst, "\n");
            },
            messageId: shouldOnlyPadSliced(node) ? "alwaysPadSlicedBlock" : "alwaysPadBlock"
          });
        }
        if (!blockHasBottomPadding && !options.noBottomPadding) {
          context.report({
            node,
            loc: {
              end: tokenAfterLast.loc.start,
              start: lastBlockToken.loc.end
            },
            fix(fixer) {
              return fixer.insertTextBefore(tokenAfterLast, "\n");
            },
            messageId: shouldOnlyPadSliced(node) ? "alwaysPadSlicedBlock" : "alwaysPadBlock"
          });
        }
      }
      else {
        if (blockHasTopPadding) {

          context.report({
            node,
            loc: {
              start: tokenBeforeFirst.loc.start,
              end: firstBlockToken.loc.start
            },
            fix(fixer) {
              return fixer.replaceTextRange([tokenBeforeFirst.range[1], firstBlockToken.range[0] - firstBlockToken.loc.start.column], "\n");
            },
            messageId: shouldOnlyPadSliced(node) ? "neverPadMonolithBlock" : "neverPadBlock"
          });
        }
      }
      if (!requirePadding || options.noBottomPadding) {
        if (blockHasBottomPadding) {

          context.report({
            node,
            loc: {
              end: tokenAfterLast.loc.start,
              start: lastBlockToken.loc.end
            },
            messageId: options.noBottomPadding ? "neverPadBottom" : ( shouldOnlyPadSliced(node) ? "neverPadMonolithBlock" : "neverPadBlock" ),
            fix(fixer) {
              return fixer.replaceTextRange([lastBlockToken.range[1], tokenAfterLast.range[0] - tokenAfterLast.loc.start.column], "\n");
            }
          });
        }
      }
    }

    const rule = {};

    if (Object.prototype.hasOwnProperty.call(options, "switches")) {
      rule.SwitchStatement = function(node) {
        if (node.cases.length === 0) {
          return;
        }
        checkPadding(node);
      };
    }

    if (Object.prototype.hasOwnProperty.call(options, "blocks")) {
      rule.BlockStatement = function(node) {
        if (node.body.length === 0) {
          return;
        }
        checkPadding(node);
      };
      rule.StaticBlock = rule.BlockStatement;
    }

    if (Object.prototype.hasOwnProperty.call(options, "classes")) {
      rule.ClassBody = function(node) {
        if (node.body.length === 0) {
          return;
        }
        checkPadding(node);
      };
    }

    return rule;
  }
};
