import { Token } from "../tokenize/token";
import { Evaluator, RollExpressionResult } from "./evaluator";
import { ASTNode } from "./node";
import { Parser } from "./parser";

export const parseTokens: (tokens: Token[]) => ASTNode = Parser.parse;

export const isValidNode: (node: ASTNode) => boolean = Evaluator.isValid;
export const evaluateNode: (node: ASTNode) => RollExpressionResult = Evaluator.evaluate;