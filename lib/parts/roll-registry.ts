import { DiceExpressionClass } from "./roll-part";
import { ConstantRollPart } from "./constant";
import { XdYRollPart } from "./xdy";

export const diceExpressionClasses: DiceExpressionClass[] = [
    XdYRollPart,
    ConstantRollPart // add constant last, to provide valid regex patterns
];