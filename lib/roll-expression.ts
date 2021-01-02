import { diceExpressionClasses } from "./parts/roll-registry";
import { DiceExpression, RegExpArray } from "./parts/roll-part";
import { validationRegExp, captureRegExp, CaptureGroups } from "./regex";

export class RollExpression {
    protected _value: number = 0;
    public get value(): number {
        return this._value;
    }

    private _rolls: DiceExpression[] = [];

    constructor(expression: string) {
        if (!expression) {
            throw new Error("Expression cannot be empty.");
        }

        // validate the expression
        if (!validationRegExp.test(expression)) {
            throw new Error(`Expression '${expression}' is an invalid roll expression.`);
        }

        // break down the expression in multiple parts
        let resultArray: RegExpExecArray;
        while ((resultArray = captureRegExp.exec(expression)) !== null) {
            this._rolls.push(this._parseDiceExpression(resultArray));
        }
    }

    public roll(): void {
        this.reset();

        for (const part of this._rolls) {
            part.roll();
            this._value += part.value;
        }
    }
    
    public reset(): void {
        for (const part of this._rolls) {
            part.reset();
        }

        this._value = 0;
    }

    private _parseDiceExpression(array: RegExpArray): DiceExpression {
        const operator = array.groups[CaptureGroups.OPERATOR] || "+";

        let exp: DiceExpression;
        for (const expClass of diceExpressionClasses) {
            exp = expClass.parse(array);

            if (exp) {
                return exp;
            }
        }

        return null;
    }
}
