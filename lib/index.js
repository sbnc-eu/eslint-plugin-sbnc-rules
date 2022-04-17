/**
 * @fileoverview An ESLint plugin for customised linting rules
 * @author Bence Szalai <https://sbnc.eu>
 */
"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

const requireIndex = require("requireindex");

//------------------------------------------------------------------------------
// Plugin Definition
//------------------------------------------------------------------------------


// import all rules in lib/rules
module.exports.rules = requireIndex(__dirname + "/rules", ['padded-blocks', 'space-in-parens']);



