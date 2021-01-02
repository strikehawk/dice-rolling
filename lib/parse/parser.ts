import { isConstant, isDiceExpression, isLeftParenthesis, isOperator, isRightParenthesis, Token } from "../tokenize/token";
import { ASTNode } from "./node";

function last(array: any[]): any {
    return array.length > 0 ? array[array.length - 1] : null;
}

export class Parser {
    public static parse(tokens: Token[]): ASTNode {
        const ops: Token[] = [];
        const nodes: ASTNode[] = [];

        for (const token of tokens) {
            // straightforwardly put dice expressions / constants in nodes
            if (isConstant(token) || isDiceExpression(token)) {
                Parser._addOperandNode(nodes, token);
            }

            // push left-parenthesis to ops
            if (isLeftParenthesis(token)) {
                ops.push(token);
            }

            // pull everything out until it's left-parenthesis
            if (isRightParenthesis(token)) {
                while (last(ops) && !isLeftParenthesis(last(ops))) {
                    Parser._addOperatorNode(nodes, ops.pop());
                }

                ops.pop();
            }

            // pull operators based on precedence & associativity
            if (isOperator(token)) {
                while (
                    last(ops) &&
                    (last(ops).precedence > token.precedence ||
                        (token.isLeftAssociative &&
                            last(ops).precedence === token.precedence)) &&
                    !isLeftParenthesis(token)
                ) {
                    Parser._addOperatorNode(nodes, ops.pop());
                }

                ops.push(token);
            }
        }

        // if there are still operators in the stack
        while (ops.length > 0) {
            Parser._addOperatorNode(nodes, ops.pop());
        }

        return nodes.pop();
    }

    private static _addOperandNode(nodes: ASTNode[], token: Token): void {
        const node = new ASTNode(token, false);

        nodes.push(node);
    }

    private static _addOperatorNode(nodes: ASTNode[], token: Token): void {
        const node = new ASTNode(token, true);

        if (token.args > 1) {
            node.setRight(nodes.pop());
        }
        node.setLeft(nodes.pop());

        nodes.push(node);
    }
}
