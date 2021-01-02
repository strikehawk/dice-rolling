import { DiceExpression } from "./roll-part";
export declare abstract class DiceExpressionBase implements DiceExpression {
    readonly expression: string;
    protected _value: number;
    get value(): number;
    protected _dice: number[];
    get dice(): number[];
    constructor(expression: string);
    abstract roll(): void;
    reset(): void;
    protected abstract _parse(expression: string): void;
    protected _rollDie(sides: number): number;
}
