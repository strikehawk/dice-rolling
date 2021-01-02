import { RegExpArray, DiceExpression } from "./roll-part";
export declare class ConstantRollPart implements DiceExpression {
    static readonly CAPTURE_GROUP: string;
    static readonly REGEX_PATTERN: string;
    static readonly CAPTURE_PATTERN: string;
    static match(array: RegExpArray): boolean;
    static parse(array: RegExpArray): ConstantRollPart;
    readonly value: number;
    constructor(constant: number);
    roll(): void;
    reset(): void;
}
