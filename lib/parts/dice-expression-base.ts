import { DiceExpression } from "./roll-part";

export abstract class DiceExpressionBase implements DiceExpression {
    public readonly expression: string;

    protected _value: number = 0;
    public get value(): number {
        return this._value;
    }

    protected _dice: number[];
    public get dice(): number[] {
        return this._dice;
    }

    constructor(expression: string) {
        if (!expression) {
            throw new Error("Expression cannot be empty.");
        }

        this.expression = expression;
        this._parse(expression);
    }
    
    public abstract roll(): void;

    public reset(): void {
        this._value = 0;
        this._dice = [];
    }
    
    protected abstract _parse(expression: string): void;

    protected _rollDie(sides: number): number {
        return Math.floor(Math.random() * Math.floor(sides)) + 1;
    }
}