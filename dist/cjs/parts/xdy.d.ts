import { DiceExpressionBase } from "./dice-expression-base";
import { RegExpArray } from "./roll-part";
export declare class XdYRollPart extends DiceExpressionBase {
    static readonly CAPTURE_GROUP: string;
    static readonly REGEX_PATTERN: string;
    static readonly CAPTURE_PATTERN: string;
    static match(array: RegExpArray): boolean;
    static parse(array: RegExpArray): XdYRollPart;
    private static _regexp;
    private _x;
    private _y;
    constructor(expression: string);
    roll(): void;
    protected _parse(expression: string): void;
}
