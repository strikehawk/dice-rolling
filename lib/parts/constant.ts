import { RegExpArray, DiceExpression } from "./roll-part";

const CAPTURE_GROUP: string = "constant";

export class ConstantRollPart implements DiceExpression {
    public static readonly CAPTURE_GROUP: string = CAPTURE_GROUP;
    public static readonly REGEX_PATTERN: string = "\\d+";
    public static readonly CAPTURE_PATTERN: string = `(?<${ConstantRollPart.CAPTURE_GROUP}>${ConstantRollPart.REGEX_PATTERN})`;

    public static match(array: RegExpArray): boolean {
        return array && array.groups && !!array.groups[CAPTURE_GROUP];
    }
    
    public static parse(array: RegExpArray): ConstantRollPart {
        const match: string = array && array.groups && array.groups[CAPTURE_GROUP];

        if (!match) {
            return null;
        }

        return new ConstantRollPart(parseInt(match));
    }

    public readonly value: number;

    constructor(constant: number) {
        this.value = constant;
    }

    public roll(): void {
        // nothing to do
    }

    public reset(): void {
        // nothing to do
    }
}
