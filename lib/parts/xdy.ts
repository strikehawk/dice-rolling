import { DiceExpressionBase } from "./dice-expression-base";
import { RegExpArray } from "./roll-part";

const CAPTURE_GROUP: string = "XdY";

export class XdYRollPart extends DiceExpressionBase {
    public static readonly CAPTURE_GROUP: string = CAPTURE_GROUP;
    public static readonly REGEX_PATTERN: string = "\\d+d\\d+";
    public static readonly CAPTURE_PATTERN: string = `(?<${XdYRollPart.CAPTURE_GROUP}>${XdYRollPart.REGEX_PATTERN})`;

    public static match(array: RegExpArray): boolean {
        return array && array.groups && !!array.groups[CAPTURE_GROUP];
    }
    
    public static parse(array: RegExpArray): XdYRollPart {
        const match: string = array && array.groups && array.groups[CAPTURE_GROUP];

        if (!match) {
            return null;
        }

        return new XdYRollPart(match);
    }

    private static _regexp: RegExp = new RegExp("^(?<X>\\d+)d(?<Y>\\d+)$");

    private _x: number;
    private _y: number;

    constructor(expression: string) {
        super(expression);
    }
    
    public roll(): void {
        const dice: number[] = [];

        for (let i: number = 0; i < this._x; i++) {
            dice.push(this._rollDie(this._y));
        }

        this._value = dice.reduce((prev, current) => prev + current, 0);
        this._dice = dice;
    }   
    
    protected _parse(expression: string): void {
        const resultArray = XdYRollPart._regexp.exec(expression);
        this._x = parseInt(resultArray.groups["X"]);
        this._y = parseInt(resultArray.groups["Y"]);
    }
}
