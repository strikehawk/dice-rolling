import { DiceExpression, DiceExpressionClass } from "./types";
import { XdY } from "./xdy";

export const diceExpressionClasses: DiceExpressionClass[] = [
    XdY
];

export function getDiceExpression(expression: string): DiceExpression {
    for (const c of diceExpressionClasses) {
        if (c.match(expression)) {
            return c.parse(expression);
        }
    }

    return null;
}