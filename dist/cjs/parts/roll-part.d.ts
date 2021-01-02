export declare type RegExpArray = RegExpExecArray & {
    groups?: any;
};
export interface DiceExpression {
    /**
     * An positive number representing the value of the part.
     */
    value: number;
    roll(): void;
    reset(): void;
}
export interface DiceExpressionClass {
    readonly CAPTURE_GROUP: string;
    readonly REGEX_PATTERN: string;
    readonly CAPTURE_PATTERN: string;
    new (...args: any[]): DiceExpression;
    match(array: RegExpArray): boolean;
    parse(array: RegExpArray): DiceExpression;
}
