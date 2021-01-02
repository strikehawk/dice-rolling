import { diceExpressionClasses } from "./parts/roll-registry";

export enum CaptureGroups {
    OPERATOR = "operator"
}

const OPERATORS: string = "[\\+\\-\\*\\/\\%]";
const OPERATORS_CAPTURE: string = `(?<${CaptureGroups.OPERATOR}>${OPERATORS})`;

const ELEMENT_VALIDATION = diceExpressionClasses.map(o => o.REGEX_PATTERN).join("|");
const ELEMENT_CAPTURE = diceExpressionClasses.map(o => o.CAPTURE_PATTERN).join("|");

/**
 * NOTE: All these patterns accept strings starting with '/', '*' or '%', which are binary operators. When these cases happen, assume 0 for the missing operand.
 */

function getValidationRegexPattern(): string {
    return `(${OPERATORS}?(?:${ELEMENT_VALIDATION}))`;
}

function getCaptureRegexPattern(): string {
    return `${OPERATORS_CAPTURE}?(?:${ELEMENT_CAPTURE})`;
}

export const validationRegexPattern: string = getValidationRegexPattern();
export const captureRegexPattern: string = getCaptureRegexPattern();

export const validationRegExp = new RegExp(validationRegexPattern, "gm");
export const captureRegExp = new RegExp(captureRegexPattern, "gm");

export const test = "423";