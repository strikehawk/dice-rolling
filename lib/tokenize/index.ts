import { flattenDeep, compact } from "lodash";

import { Rule, rules } from "./rules";
import { buildToken, isToken, Target, Token } from "./token";

export class Tokenizer {
    public static tokenize(expression: string): Token[] {
        // remove whitespaces from expression
        expression = expression.replace(" ", "");

        // wrap for convenience
        const targets = [expression];

        let output: Target[];

        // run every rule on targets
        output = rules.reduce(Tokenizer._applyRuleOnTargets, targets);

        // remove string tokens
        const result = output.filter(o => typeof o !== "string") as Token[];

        // set indices on tokens
        for (let i: number = 0; i < result.length; i++) {
            result[i].index = i;
        }

        return result;
    }

    private static _applyRuleOnTargets(targets: Target[], rule: Rule): Target[] {
        let output: any[];

        // run every rule on target
        output = targets.map(target => Tokenizer._applyRuleOnTarget(target, rule));

        // flatten one level deep ["a", "b", ["c"]] -> ["a", "b", "c"]
        output = flattenDeep(output);

        // clear from empty-ish values ["a", "", "b", null, "c"] -> ["a", "b", "c"]
        output = compact(output);

        return output;
    }

    private static _applyRuleOnTarget(target: Target, rule: Rule): Target[] {
        // no need to do anything if it's not a string
        if (isToken(target)) {
            return [target];
        }

        target = target as string;

        // splits string into array of substrings
        const split = target.split(rule.key);

        // find matched substrings and produce tokens out of them
        const regExpArray = target.match(rule.key);
        const match = regExpArray ? regExpArray.map(o => buildToken(o, rule.data)) : [];

        // sequentally concatenate arrays: zipConcat([a1, a2], [b1, b2]) -> [a1, b1, a2, b2]
        return Tokenizer._zipConcat(split, match);
    }

    private static _zipConcat(source1: any[], source2: any[]): any[] {
        const output = [];

        for (let i = 0; i < Math.max(source1.length, source2.length); i += 1) {
            if (i < source1.length) {
                output.push(source1[i]);
            }

            if (i < source2.length) {
                output.push(source2[i]);
            }
        }

        return output;
    }
}

export const tokenize: (expression: string) => Target[] = Tokenizer.tokenize;
