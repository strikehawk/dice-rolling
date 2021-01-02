# Dice-rolling, a framework to parse dice roll expressions from RPG & board games

## Objectives
The main goal is to produce a Node.js module bringing the dice parsing capabilities present in the various VTT apps:  
- [Dice expressions supported in MapTool](https://wiki.rptools.info/index.php/Dice_Expressions)
- [Dice expressions supported in Foundry VTT](https://foundryvtt.com/article/dice/)

Game-specific expressions will be implemented later, if required.  

## Implementation
Parsing dice expressions is similar to parsing mathematical expressions, as the only difference is the presence of specific dice constructs such as `2d6` or `4d6d1`.  
As such, the implementation is based on math AST.  

See the following articles for an explanation of the concepts:  
- [Math AST: Tokenizer in JavaScript](https://www.esimovmiras.cc/articles/02-build-math-ast-tokenizer/)
- [Math AST: Parser in JavaScript](https://www.esimovmiras.cc/articles/03-build-math-ast-parser/)

### Tokens in dice expressions
<table>
    <tr>
        <th>Token type</th>
        <th>Example</th>
        <th>Description</th>
    </tr>
    <tr>
        <td>Dice expressions</td>
        <td><code>2d6, 4d6d1, 1d8e, etc...</code></td>
        <td>Expressions defining the number of dice to roll, their number of sides, and possible extra logic on how to sum the result of the dice.</td>
    </tr>
    <tr>
        <td>Constants</td>
        <td><code>1, 2, 14, etc...</code></td>
        <td>Integers, single or multiple digits.</td>
    </tr>
    <tr>
        <td>Parenthesis</td>
        <td><code>(, )</code></td>
        <td>Parenthesis used to form blocks and alter operators precedence.</td>
    </tr>
    <tr>
        <td>Operators</td>
        <td><code>+, -, *, /, %</code></td>
        <td>Basic maths operators.</td>
    </tr>
</table>

<br/>

### Supported dice expressions
<table>
    <tr>
        <th>Expression</th>
        <th>Description</th>
    </tr>
    <tr>
        <td><code>XdY</code></td>
        <td>Roll <i>X</i> dice with <i>Y</i> sides each. If <i>X</i> is not included, roll 1 die with <i>Y</i> sides and sum of all rolls.</td>
    </tr>
</table>