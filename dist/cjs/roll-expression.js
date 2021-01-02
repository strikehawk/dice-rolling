"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RollExpression = void 0;
const roll_registry_1 = require("./parts/roll-registry");
const regex_1 = require("./regex");
class RollExpression {
    constructor(expression) {
        this._value = 0;
        this._rolls = [];
        if (!expression) {
            throw new Error("Expression cannot be empty.");
        }
        // validate the expression
        if (!regex_1.validationRegExp.test(expression)) {
            throw new Error(`Expression '${expression}' is an invalid roll expression.`);
        }
        // break down the expression in multiple parts
        let resultArray;
        while ((resultArray = regex_1.captureRegExp.exec(expression)) !== null) {
            this._rolls.push(this._parseDiceExpression(resultArray));
        }
    }
    get value() {
        return this._value;
    }
    roll() {
        this.reset();
        for (const part of this._rolls) {
            part.roll();
            this._value += part.value;
        }
    }
    reset() {
        for (const part of this._rolls) {
            part.reset();
        }
        this._value = 0;
    }
    _parseDiceExpression(array) {
        const operator = array.groups[regex_1.CaptureGroups.OPERATOR] || "+";
        let exp;
        for (const expClass of roll_registry_1.diceExpressionClasses) {
            exp = expClass.parse(array);
            if (exp) {
                return exp;
            }
        }
        return null;
    }
}
exports.RollExpression = RollExpression;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm9sbC1leHByZXNzaW9uLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vbGliL3JvbGwtZXhwcmVzc2lvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSx5REFBOEQ7QUFFOUQsbUNBQXlFO0FBRXpFLE1BQWEsY0FBYztJQVF2QixZQUFZLFVBQWtCO1FBUHBCLFdBQU0sR0FBVyxDQUFDLENBQUM7UUFLckIsV0FBTSxHQUFxQixFQUFFLENBQUM7UUFHbEMsSUFBSSxDQUFDLFVBQVUsRUFBRTtZQUNiLE1BQU0sSUFBSSxLQUFLLENBQUMsNkJBQTZCLENBQUMsQ0FBQztTQUNsRDtRQUVELDBCQUEwQjtRQUMxQixJQUFJLENBQUMsd0JBQWdCLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxFQUFFO1lBQ3BDLE1BQU0sSUFBSSxLQUFLLENBQUMsZUFBZSxVQUFVLGtDQUFrQyxDQUFDLENBQUM7U0FDaEY7UUFFRCw4Q0FBOEM7UUFDOUMsSUFBSSxXQUE0QixDQUFDO1FBQ2pDLE9BQU8sQ0FBQyxXQUFXLEdBQUcscUJBQWEsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsS0FBSyxJQUFJLEVBQUU7WUFDNUQsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLG9CQUFvQixDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUM7U0FDNUQ7SUFDTCxDQUFDO0lBckJELElBQVcsS0FBSztRQUNaLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQztJQUN2QixDQUFDO0lBcUJNLElBQUk7UUFDUCxJQUFJLENBQUMsS0FBSyxFQUFFLENBQUM7UUFFYixLQUFLLE1BQU0sSUFBSSxJQUFJLElBQUksQ0FBQyxNQUFNLEVBQUU7WUFDNUIsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDO1lBQ1osSUFBSSxDQUFDLE1BQU0sSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDO1NBQzdCO0lBQ0wsQ0FBQztJQUVNLEtBQUs7UUFDUixLQUFLLE1BQU0sSUFBSSxJQUFJLElBQUksQ0FBQyxNQUFNLEVBQUU7WUFDNUIsSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDO1NBQ2hCO1FBRUQsSUFBSSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUM7SUFDcEIsQ0FBQztJQUVPLG9CQUFvQixDQUFDLEtBQWtCO1FBQzNDLE1BQU0sUUFBUSxHQUFHLEtBQUssQ0FBQyxNQUFNLENBQUMscUJBQWEsQ0FBQyxRQUFRLENBQUMsSUFBSSxHQUFHLENBQUM7UUFFN0QsSUFBSSxHQUFtQixDQUFDO1FBQ3hCLEtBQUssTUFBTSxRQUFRLElBQUkscUNBQXFCLEVBQUU7WUFDMUMsR0FBRyxHQUFHLFFBQVEsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUM7WUFFNUIsSUFBSSxHQUFHLEVBQUU7Z0JBQ0wsT0FBTyxHQUFHLENBQUM7YUFDZDtTQUNKO1FBRUQsT0FBTyxJQUFJLENBQUM7SUFDaEIsQ0FBQztDQUNKO0FBeERELHdDQXdEQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGRpY2VFeHByZXNzaW9uQ2xhc3NlcyB9IGZyb20gXCIuL3BhcnRzL3JvbGwtcmVnaXN0cnlcIjtcclxuaW1wb3J0IHsgRGljZUV4cHJlc3Npb24sIFJlZ0V4cEFycmF5IH0gZnJvbSBcIi4vcGFydHMvcm9sbC1wYXJ0XCI7XHJcbmltcG9ydCB7IHZhbGlkYXRpb25SZWdFeHAsIGNhcHR1cmVSZWdFeHAsIENhcHR1cmVHcm91cHMgfSBmcm9tIFwiLi9yZWdleFwiO1xyXG5cclxuZXhwb3J0IGNsYXNzIFJvbGxFeHByZXNzaW9uIHtcclxuICAgIHByb3RlY3RlZCBfdmFsdWU6IG51bWJlciA9IDA7XHJcbiAgICBwdWJsaWMgZ2V0IHZhbHVlKCk6IG51bWJlciB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX3ZhbHVlO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgX3JvbGxzOiBEaWNlRXhwcmVzc2lvbltdID0gW107XHJcblxyXG4gICAgY29uc3RydWN0b3IoZXhwcmVzc2lvbjogc3RyaW5nKSB7XHJcbiAgICAgICAgaWYgKCFleHByZXNzaW9uKSB7XHJcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIkV4cHJlc3Npb24gY2Fubm90IGJlIGVtcHR5LlwiKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIHZhbGlkYXRlIHRoZSBleHByZXNzaW9uXHJcbiAgICAgICAgaWYgKCF2YWxpZGF0aW9uUmVnRXhwLnRlc3QoZXhwcmVzc2lvbikpIHtcclxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBFeHByZXNzaW9uICcke2V4cHJlc3Npb259JyBpcyBhbiBpbnZhbGlkIHJvbGwgZXhwcmVzc2lvbi5gKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIGJyZWFrIGRvd24gdGhlIGV4cHJlc3Npb24gaW4gbXVsdGlwbGUgcGFydHNcclxuICAgICAgICBsZXQgcmVzdWx0QXJyYXk6IFJlZ0V4cEV4ZWNBcnJheTtcclxuICAgICAgICB3aGlsZSAoKHJlc3VsdEFycmF5ID0gY2FwdHVyZVJlZ0V4cC5leGVjKGV4cHJlc3Npb24pKSAhPT0gbnVsbCkge1xyXG4gICAgICAgICAgICB0aGlzLl9yb2xscy5wdXNoKHRoaXMuX3BhcnNlRGljZUV4cHJlc3Npb24ocmVzdWx0QXJyYXkpKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHJvbGwoKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5yZXNldCgpO1xyXG5cclxuICAgICAgICBmb3IgKGNvbnN0IHBhcnQgb2YgdGhpcy5fcm9sbHMpIHtcclxuICAgICAgICAgICAgcGFydC5yb2xsKCk7XHJcbiAgICAgICAgICAgIHRoaXMuX3ZhbHVlICs9IHBhcnQudmFsdWU7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgXHJcbiAgICBwdWJsaWMgcmVzZXQoKTogdm9pZCB7XHJcbiAgICAgICAgZm9yIChjb25zdCBwYXJ0IG9mIHRoaXMuX3JvbGxzKSB7XHJcbiAgICAgICAgICAgIHBhcnQucmVzZXQoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuX3ZhbHVlID0gMDtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIF9wYXJzZURpY2VFeHByZXNzaW9uKGFycmF5OiBSZWdFeHBBcnJheSk6IERpY2VFeHByZXNzaW9uIHtcclxuICAgICAgICBjb25zdCBvcGVyYXRvciA9IGFycmF5Lmdyb3Vwc1tDYXB0dXJlR3JvdXBzLk9QRVJBVE9SXSB8fCBcIitcIjtcclxuXHJcbiAgICAgICAgbGV0IGV4cDogRGljZUV4cHJlc3Npb247XHJcbiAgICAgICAgZm9yIChjb25zdCBleHBDbGFzcyBvZiBkaWNlRXhwcmVzc2lvbkNsYXNzZXMpIHtcclxuICAgICAgICAgICAgZXhwID0gZXhwQ2xhc3MucGFyc2UoYXJyYXkpO1xyXG5cclxuICAgICAgICAgICAgaWYgKGV4cCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGV4cDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICB9XHJcbn1cclxuIl19