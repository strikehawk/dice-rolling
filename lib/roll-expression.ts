import { Evaluator, RollExpressionResult } from "./parse/evaluator";
import { ASTNode } from "./parse/node";
import { Parser } from "./parse/parser";
import { Tokenizer } from "./tokenize/tokenizer";

export class RollExpression {
    private _ast: ASTNode;

    constructor(expression: string) {
        if (!expression) {
            throw new Error("Expression cannot be empty.");
        }

        // break down the expression in multiple parts
        const tokens = Tokenizer.tokenize(expression);

        // build an AST out of the tokens
        const ast = Parser.parse(tokens);

        // validate the AST
        if (!Evaluator.isValid(ast)) {
            throw new Error(`Expression '${expression}' is an invalid roll expression.`);
        }

        this._ast = ast;
    }

    public roll(): RollExpressionResult {
        return Evaluator.evaluate(this._ast);
    }
}
