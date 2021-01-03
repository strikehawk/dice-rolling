import { DiceExpressionBase } from "./dice-expression-base";
import { DiceExpressionResult, DieResult, DieUse } from "./types";

export class XdY extends DiceExpressionBase {
    public static readonly REGEX_PATTERN: string = "\\d*d\\d+";
    public static match(expression: string): boolean {
        return XdY._validateRegexp.test(expression);
    }

    public static parse(expression: string): XdY {
        return new XdY(expression);
    }

    private static _validateRegexp: RegExp = new RegExp("^\\d*d\\d+$");
    private static _captureRegexp: RegExp = new RegExp("^(?<X>\\d+)?d(?<Y>\\d+)$");

    private _x: number;
    private _y: number;

    constructor(expression: string) {
        super(expression);
    }

    public roll(): DiceExpressionResult {
        const dice: DieResult[] = [];

        for (let i: number = 0; i < this._x; i++) {
            dice.push({
                value: this._rollDie(this._y),
                use: DieUse.KEEP
            });
        }

        const total = dice.reduce((accumulator, current) => accumulator + current.value, 0);

        return {
            expression: this.expression,
            diceSides: this._y,
            total: total,
            dice: dice
        };
    }

    protected _parse(token: string): void {
        const resultArray = XdY._captureRegexp.exec(token);
        this._x = resultArray.groups["X"] ? parseInt(resultArray.groups["X"]) : 1;
        this._y = parseInt(resultArray.groups["Y"]);
    }
}
