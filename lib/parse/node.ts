import { DiceExpression, DiceExpressionResult } from "../dice-expressions/types";
import { Token } from "../tokenize/token";

export class ASTNode {
    private _token: Token;
    public get token(): Token {
        return this._token;
    }

    private _left: ASTNode;
    public get left(): ASTNode {
        return this._left;
    }

    private _right: ASTNode;
    public get right(): ASTNode {
        return this._right;
    }

    private _isOperator: boolean;
    public get isOperator(): boolean {
        return this._isOperator;
    }

    constructor(token: Token, isOperator: boolean) {
        this._token = token;
        this._isOperator = isOperator;

        this._left = null;
        this._right = null;
    }

    public setRight(node: ASTNode) {
        this._right = node;
    }

    public setLeft(node: ASTNode) {
        this._left = node;
    }
}

export interface ASTOperandNode extends ASTNode {
    value: number;

    diceExpression?: DiceExpression;
    diceResult?: DiceExpressionResult;
}