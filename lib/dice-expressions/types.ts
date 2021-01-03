export enum DieUse {
    KEEP = "keep",
    DROP = "drop",
    EXPLODE = "explode"
}

export interface DieResult {
    /**
     * The result of the roll.
     */
    value: number;

    /**
     * A hint on how the result is used in the overall expression
     */
    use: DieUse;
}

export interface DiceExpressionResult {
    /**
     * The expression that produced the result.
     */
    expression: string;

    /**
     * number of
     */
    diceSides: number;

    /**
     * An positive number representing the final result of the dice expression, after applying all rules.
     */
    total: number;

    /**
     * The raw rolls of each die.
     */
    dice: DieResult[];
}

export interface DiceExpression {
    roll(): DiceExpressionResult;
}

export interface DiceExpressionClass {
    readonly REGEX_PATTERN: string;

    new (...args: any[]): DiceExpression;

    match(expression: string): boolean;
    parse(expression: string): DiceExpression;
}
