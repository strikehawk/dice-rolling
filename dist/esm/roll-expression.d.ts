export declare class RollExpression {
    protected _value: number;
    get value(): number;
    private _rolls;
    constructor(expression: string);
    roll(): void;
    reset(): void;
    private _parseDiceExpression;
}
