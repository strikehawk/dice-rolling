import { DiceExpression, DiceExpressionResult } from "./types";

export abstract class DiceExpressionBase implements DiceExpression {
    public readonly expression: string;

    constructor(expression: string) {
        if (!expression) {
            throw new Error("Expression cannot be empty.");
        }

        this.expression = expression;
        this._parse(expression);
    }
    
    public abstract roll(): DiceExpressionResult;
    
    protected abstract _parse(expression: string): void;

    protected _rollDie(sides: number): number {
        return Math.floor(Math.random() * Math.floor(sides)) + 1;
    }
}