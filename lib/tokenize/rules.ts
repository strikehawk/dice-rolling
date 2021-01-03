import { diceExpressionClasses } from "../dice-expressions/registry";
import { TokenTypes } from "./token-types";

export interface TokenRuleData {
    type: TokenTypes;
    args?: number;
    precedence?: number;
    isLeftAssociative?: boolean;
}

export interface TokenRuleDefinition {
    key: string;
    data: TokenRuleData;
}

export interface TokenRule {
    key: RegExp;
    data: TokenRuleData;
}

export interface TokenizationConfig {
    rules: TokenRuleDefinition[];
}

const DICE_EXPRESSIONS = diceExpressionClasses.map(o => o.REGEX_PATTERN).join("|");

export const config: TokenizationConfig = {
    rules: [
        {
            key: `(?:${DICE_EXPRESSIONS})`,
            data: {
                type: TokenTypes.DICE_EXPRESSION
            }
        },
        {
            key: "\\(",
            data: {
                type: TokenTypes.LEFT_PARENTHESIS
            }
        },
        {
            key: "\\)",
            data: {
                type: TokenTypes.RIGHT_PARENTHESIS
            }
        },
        {
            key: "[\\%]",
            data: {
                type: TokenTypes.OPERATOR,
                args: 2,
                precedence: 3,
                isLeftAssociative: true
            }
        },
        {
            key: "[\\*\\/]",
            data: {
                type: TokenTypes.OPERATOR,
                args: 2,
                precedence: 2,
                isLeftAssociative: true
            }
        },
        {
            key: "[\\+\\-]",
            data: {
                type: TokenTypes.OPERATOR,
                args: 2,
                precedence: 1,
                isLeftAssociative: true
            }
        },
        {
            key: "\\d+",
            data: {
                type: TokenTypes.CONSTANT
            }
        }
    ]
};

export const rules: TokenRule[] = config.rules.map(o => ({ key: new RegExp(o.key, "g"), data: o.data }));