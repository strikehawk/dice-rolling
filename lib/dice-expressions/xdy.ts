import { DiceExpressionBase } from "./dice-expression-base";
import { DiceExpressionResult, DieResult, DieUse } from "./types";

const CAPTURE_GROUP: string = "XdY";

export class XdY extends DiceExpressionBase {
    public static readonly CAPTURE_GROUP: string = CAPTURE_GROUP;
    public static readonly REGEX_PATTERN: string = "\\d*d\\d+";
    public static readonly CAPTURE_PATTERN: string = `(?<${XdY.CAPTURE_GROUP}>${XdY.REGEX_PATTERN})`;

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

    constructor(token: string) {
        super(token);
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
