import { TokenRuleData } from "./rules";
import { TokenTypes } from "./token-types";

export interface Token extends TokenRuleData {
    value: string;

    /**
     * The index of the token in the expression, starting at 0 for the first element.
     */
    index: number;
}

export type Target = string | Token;

export function isToken(target: any): boolean {
    if (typeof target !== "object") {
        return false;
    }

    if (target.type && typeof target.value === "string") {
        return true;
    }

    return false;
}

export function buildToken(target: string, data: TokenRuleData): Token {
    return {
        value: target,
        index: 0,
        ...data
    };
}

export function isConstant(token: Token): boolean {
    return token.type === TokenTypes.CONSTANT;
}

export function isOperator(token: Token): boolean {
    return token.type === TokenTypes.OPERATOR;
}

export function isLeftParenthesis(token: Token): boolean {
    return token.type === TokenTypes.LEFT_PARENTHESIS;
}

export function isRightParenthesis(token: Token): boolean {
    return token.type === TokenTypes.RIGHT_PARENTHESIS;
}

export function isDiceExpression(token: Token): boolean {
    return token.type === TokenTypes.DICE_EXPRESSION;
}