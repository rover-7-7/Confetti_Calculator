import React, { useState } from "react";
import styled from "styled-components";
import ConfettiExplosion from "react-confetti-explosion";
import * as math from "mathjs";
import { type } from "@testing-library/user-event/dist/type";

// Styled Components
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: "Roboto", sans-serif;
  width: 140vh;
  margin: auto;
  border: 1px solid #ccc;
  border-radius: 10px;
  background-color: #414141;
  color: white;
  margin-top: 100px;
`;

const Display = styled.div`
  background-color: 505050;
  color: white;
  font-size: 2rem;
  width: 100%;
  height: 70px;
  text-align: right;
  padding: 2px;
  margin-bottom: 2px;
  border-radius: 50px 0px;
`;

const ButtonGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(10, 1fr);
  grid-template-row: repeat(6, 1fr);
  gap: 1px;
`;

const Button = styled.button`
  background-color: #555;
  border: none;
  padding: 20px;
  font-size: 1.2rem;
  color: white;
  cursor: pointer;
  &:hover {
    background-color: #777;
  }
  &.operator {
    background-color: #f0a03a;
    color: white;
  }
  &.equals {
    background-color: #f0a03a;
    color: white;
    grid-column: span 2;
  }
  &.number {
    background-color: grey;
  }
`;

const calculatorButtons = [
  { label: "(", type: "function" },
  { label: ")", type: "function" },
  { label: "mc", type: "memory" },
  { label: "m+", type: "memory" },
  { label: "m-", type: "memory" },
  { label: "mr", type: "memory" },
  { label: "C", type: "clear" },
  { label: "+/-", type: "operator " },
  { label: "%", type: "operator " },
  { label: "÷", type: "operator" },
  { label: "2nd", type: "function" },
  { label: "x²", type: "function" },
  { label: "x³", type: "function" },
  { label: "xʸ", type: "function" },
  { label: "eˣ", type: "function" },
  { label: "10ˣ", type: "function" },
  { label: "7", type: "number" },
  { label: "8", type: "number" },
  { label: "9", type: "number" },
  { label: "×", type: "operator" },
  { label: "¹/x", type: "function" },
  { label: "²√x", type: "function" },
  { label: "³√x", type: "function" },
  { label: "ʸ√x", type: "function" },
  { label: "ln", type: "function" },
  { label: "log₁₀", type: "function" },
  { label: "4", type: "number" },
  { label: "5", type: "number" },
  { label: "6", type: "number" },
  { label: "-", type: "operator" },
  { label: "x!", type: "function" },
  { label: "sin", type: "function" },
  { label: "cos", type: "function" },
  { label: "tan", type: "function" },
  { label: "e", type: "function" },
  { label: "EE", type: "function" },
  { label: "1", type: "number" },
  { label: "2", type: "number" },
  { label: "3", type: "number" },
  { label: "+", type: "operator" },
  { label: "Rad", type: "function" },
  { label: "sinh", type: "function" },
  { label: "cosh", type: "function" },
  { label: "tanh", type: "function" },
  { label: "π", type: "function" },
  { label: "Rand", type: "function" },
  { label: "0", type: "number" },
  { label: ".", type: "number" },
  { label: "=", type: "equals" },
];

const Calculator = () => {
  const [display, setDisplay] = useState("");
  const [confetti, setConfetti] = useState(false);
  const [memory, setMemory] = useState(0);
  const [isSecond, setIsSecond] = useState(false);
  const [angleUnit, setAngleUnit] = useState("deg");

  const handleButtonClick = (label, type) => {
    if (type === "number") {
      setDisplay(display + label);
    } else if (type === "operator") {
      setDisplay(display + " " + label + " ");
    } else if (type === "clear") {
      setDisplay("");
    } else if (type === "equals") {
      try {
        const result = eval(display.replace("÷", "/").replace("×", "*"));
        setDisplay(result.toString());
        if (display.includes("5") && display.includes("6")) {
          setConfetti(true);
          setTimeout(() => setConfetti(false), 3000);
        }
      } catch (error) {
        setDisplay("Error");
      }
    } else if (type === "memory") {
      if (label === "mc") setMemory(0);
      if (label === "m+") setMemory(memory + Number(display));
      if (label === "m-") setMemory(memory - Number(display));
      if (label === "mr") setDisplay(memory.toString());
    } else if (type === "function") {
      handleScientificFunction(label);
    }
  };
  const handleScientificFunction = (label) => {
    let currentValue = parseFloat(display);
    let result;

    switch (label) {
      case "2nd":
        setIsSecond(!isSecond);
        break;
      case "x²":
        result = Math.pow(currentValue, 2);
        break;
      case "x³":
        result = Math.pow(currentValue, 3);
        break;
      case "xʸ":
        const power = parseFloat(prompt("Enter the exponent:"));
        result = Math.pow(currentValue, power);
        break;
      case "eˣ":
        result = Math.exp(currentValue);
        break;
      case "10ˣ":
        result = Math.pow(10, currentValue);
        break;
      case "¹/x":
        result = 1 / currentValue;
        break;
      case "²√x":
        result = Math.sqrt(currentValue);
        break;
      case "³√x":
        result = Math.cbrt(currentValue);
        break;
      case "ʸ√x":
        const root = parseFloat(prompt("Enter the root value:"));
        result = Math.pow(currentValue, 1 / root);
        break;
      case "ln":
        result = Math.log(currentValue);
        break;
      case "log₁₀":
        result = Math.log10(currentValue);
        break;
      case "x!":
        result = math.factorial(currentValue);
        break;
      case "sin":
        result =
          angleUnit === "deg"
            ? Math.sin(math.unit(currentValue, "deg"))
            : Math.sin(currentValue);
        break;
      case "cos":
        result =
          angleUnit === "deg"
            ? Math.cos(math.unit(currentValue, "deg"))
            : Math.cos(currentValue);
        break;
      case "tan":
        result =
          angleUnit === "deg"
            ? Math.tan(math.unit(currentValue, "deg"))
            : Math.tan(currentValue);
        break;
      case "sinh":
        result = Math.sinh(currentValue);
        break;
      case "cosh":
        result = Math.cosh(currentValue);
        break;
      case "tanh":
        result = Math.tanh(currentValue);
        break;
      case "π":
        result = Math.PI;
        break;
      case "e":
        result = Math.E;
        break;
      case "Rand":
        result = Math.random();
        break;
      case "Rad":
        setAngleUnit(angleUnit === "deg" ? "rad" : "deg");
        return;
      default:
        result = display;
    }
    setDisplay(result.toString());
  };

  return (
    <Container>
      {confetti && <ConfettiExplosion />}
      <Display>{display}</Display>
      <ButtonGrid>
        {calculatorButtons.map((button, index) => (
          <Button
            key={index}
            className={button.type}
            onClick={() => handleButtonClick(button.label, button.type)}
          >
            {button.label}
          </Button>
        ))}
      </ButtonGrid>
    </Container>
  );
};

export default Calculator;
