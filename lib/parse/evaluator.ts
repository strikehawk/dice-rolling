import { getDiceExpression } from "../dice-expressions/roll-registry";
import { DiceExpressionResult } from "../dice-expressions/types";
import { isConstant, isDiceExpression } from "../tokenize/token";
import { ASTNode, ASTOperandNode } from "./node";

export interface RollExpressionResult {
    /**
     * The total result of the roll expression.
     */
    total: number;

    /**
     * Details on every DiceExpression present in the RollExpression. The keys of the object correspond to the index of the token having produced the DiceExpressionResult.
     */
    explanations: { [key: number]: DiceExpressionResult }
}

export class Evaluator {
    /**
     * Check that the expected number of arguments is satisfied.
     * @param node The AST node to validate.
     * @param deep If true, children nodes of the specified node are validated as well.
     * @returns True if the node is valid; false otherwise.
     */
    public static isValid(node: ASTNode, deep: boolean = true): boolean {
        if (!node) {
            throw new Error("ASTNode cannot be null.");
        }

        // check number of args
        const argsCount: number = typeof node.token.args === "number" ? node.token.args : 0;

        let isValid: boolean;
        switch (argsCount) {
            case 0:
                isValid = !node.left && !node.right;

                return isValid;
                break;
            case 1:
                isValid = !node.left && !!node.right;

                if (!isValid) {
                    return false;
                }

                if (deep) {
                    return Evaluator.isValid(node.right);
                } else {
                    return true;
                }
                break;
            case 2:
                isValid = !!node.left && !!node.right;

                if (!isValid) {
                    return false;
                }

                if (deep) {
                    return Evaluator.isValid(node.right) && Evaluator.isValid(node.left);
                } else {
                    return true;
                }
                break;
            default:
                throw new Error("Unsupported number of args.");
        }
    }

    public static evaluate(node: ASTNode): RollExpressionResult {
        if (!node) {
            throw new Error("ASTNode cannot be null.");
        }

        const result: RollExpressionResult = {
            total: 0,
            explanations: []
        }

        const total = Evaluator._evaluateNode(node, result);
        result.total = total;

        return result;
    }

    private static _evaluateNode(node: ASTNode, rollResult: RollExpressionResult): number {
        if (node.isOperator) {
            return Evaluator._evaluateOperatorNode(node, rollResult);
        } else {
            return Evaluator._evaluateOperandNode(node as ASTOperandNode, rollResult);
        }
    }

    private static _evaluateOperatorNode(node: ASTNode, rollResult: RollExpressionResult): number {
        // evaluate operands
        let left: number;
        let right: number;

        if (node.right) {
            // right = Evaluator.evaluate(node.right);
            right = Evaluator._evaluateNode(node.right, rollResult);
        }

        if (node.left) {
            // left = Evaluator.evaluate(node.left);
            left = Evaluator._evaluateNode(node.left, rollResult);
        }

        // apply the operator to the operands
        const result = Evaluator._applyOperator(node.token.value, left, right);

        return result;
    }

    private static _evaluateOperandNode(node: ASTOperandNode, rollResult: RollExpressionResult): number {
        let nodeValue: number;

        if (isDiceExpression(node.token)) {
            if (!node.diceExpression) {
                node.diceExpression = getDiceExpression(node.token.value);
            }

            const result = node.diceExpression.roll();
            nodeValue = result.total;
            rollResult.explanations[node.token.index] = result;
        }

        if (isConstant(node.token)) {
            nodeValue = parseInt(node.token.value);
        }

        return nodeValue;
    }

    private static _applyOperator(operator: string, left: number, right: number): number {
        let result: number;

        switch (operator) {
            case "+":
                result = left + right;
                break;
            case "-":
                result = left - right;
                break;
            case "*":
                result = left * right;
                break;
            case "/":
                result = left / right;
                break;
            case "%":
                result = left % right;
                break;
            default:
                throw new Error(`Unsupported '${operator}' operator.`);
        }

        return result;
    }
}