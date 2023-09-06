import { useState } from "react";
import "./App.css";
import * as math from "mathjs";

function App() {
	const [expression, setExpression] = useState("");
	const [answer, setAnswer] = useState("");

	function handleNumberClick(number) {
		if (expression === "0") {
			setExpression(number);
		} else {
			if (answer !== "") {
				setAnswer("");
			}
			setExpression(expression + number);
		}
	}

	function handleClear() {
		setAnswer("");
		setExpression("0");
	}

	function handleOperatorClick(operator) {
		const newExp =
			answer === ""
				? expression + " " + operator + " "
				: answer + " " + operator + " ";
		setAnswer("");
		setExpression(newExp);
	}

	function handleDecimal() {
		const element = expression.split(" ");
		const lastEle = element[element.length - 1];

		if (!lastEle.includes(".")) {
			setExpression(expression + ".");
		}
	}
	const isOperator = (symbol) => {
		return /[*/+-]/.test(symbol);
	};

	function handleEqualsClick() {
		const element = expression.split(" ").filter(Boolean);
		const lastEle = element[element.length - 1];

		if ("+-*/".includes(lastEle)) return;

		const newParts = [];

		for (let i = element.length - 1; i >= 0; i--) {
			if (["*", "/", "+"].includes(element[i]) && isOperator(element[i - 1])) {
				newParts.unshift(element[i]);
				let j = 0;
				let k = i - 1;
				while (isOperator(element[k])) {
					k--;
					j++;
				}
				i -= j;
			} else {
				newParts.unshift(element[i]);
			}
		}

		const newExp = newParts.join(" ");

		if (isOperator(newExp.charAt(0))) {
			setAnswer(eval(answer + newExp));
		} else {
			setAnswer(eval(newExp));
		}
		setExpression("");
	}

	return (
		<div className="main">
			<div className="calculator">
				<div id="display">
					<div className="answer">{answer}</div>
					<div className="expression">{expression}</div>
				</div>
				<div className="buttons-grid">
					<button
						id="clear"
						onClick={handleClear}>
						AC
					</button>
					<button
						id="divide"
						onClick={() => handleOperatorClick("/")}>
						/
					</button>
					<button
						id="multiply"
						onClick={() => handleOperatorClick("*")}>
						x
					</button>
					<button
						id="seven"
						onClick={() => handleNumberClick("7")}>
						7
					</button>
					<button
						id="eight"
						onClick={() => handleNumberClick("8")}>
						8
					</button>
					<button
						id="nine"
						onClick={() => handleNumberClick("9")}>
						9
					</button>
					<button
						id="subtract"
						onClick={() => handleOperatorClick("-")}>
						-
					</button>
					<button
						id="four"
						onClick={() => handleNumberClick("4")}>
						4
					</button>
					<button
						id="five"
						onClick={() => handleNumberClick("5")}>
						5
					</button>
					<button
						id="six"
						onClick={() => handleNumberClick("6")}>
						6
					</button>
					<button
						id="add"
						onClick={() => handleOperatorClick("+")}>
						+
					</button>
					<button
						id="one"
						onClick={() => handleNumberClick("1")}>
						1
					</button>
					<button
						id="two"
						onClick={() => handleNumberClick("2")}>
						2
					</button>
					<button
						id="three"
						onClick={() => handleNumberClick("3")}>
						3
					</button>
					<button
						id="equals"
						onClick={handleEqualsClick}>
						=
					</button>
					<button
						id="zero"
						onClick={() => handleNumberClick("0")}>
						0
					</button>
					<button
						id="decimal"
						onClick={handleDecimal}>
						.
					</button>
				</div>
			</div>
		</div>
	);
}

export default App;
