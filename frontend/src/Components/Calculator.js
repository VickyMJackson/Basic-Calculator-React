import React, { useState } from 'react';
import './Calculator.css';

function Calculator() {
  const [display, setDisplay] = useState('0');
  const [currentValue, setCurrentValue] = useState('');
  const [operator, setOperator] = useState('');
  const [previousValue, setPreviousValue] = useState('');

  const handleNumberClick = (num) => {
    if (num === '.' && currentValue.includes('.')) {
        return;
      }
    if (display === '0' || currentValue === '0') {
      setDisplay(num);
      setCurrentValue(num);
    } else {
      setDisplay(display + num);
      setCurrentValue(currentValue + num);
    }
  };

  const handleOperatorClick = (e) => {
    setOperator(e.target.value);
    setPreviousValue(display);
    setCurrentValue('');
  };

  const handleEqualsClick = async() => {

    const response = await fetch(`http://localhost:7077/${operator}`,{
            method:'POST',
            headers:{'Content-Type':'application/json'},
            body:JSON.stringify({Num1:parseFloat(previousValue),Num2:parseFloat(currentValue)})
        });
    
    const data = await response.json();
    setDisplay(data.result);
    setCurrentValue(data.result);
    setOperator('');
    setPreviousValue('');
    console.log(data)
  };

  const handleClearClick = () => {
    setDisplay('0');
    setCurrentValue('');
    setOperator('');
    setPreviousValue('');
  };

  return (
    <div className="calculator">
      <div className="display">{display}</div>
      <div className="calculator-grid">
        <button className="calculator-button" onClick={() => handleNumberClick('7')}>7</button>
        <button className="calculator-button" onClick={() => handleNumberClick('8')}>8</button>
        <button className="calculator-button" onClick={() => handleNumberClick('9')}>9</button>
        <button className="calculator-button" value='divide' onClick={handleOperatorClick}>/</button>
        <button className="calculator-button" onClick={() => handleNumberClick('4')}>4</button>
        <button className="calculator-button" onClick={() => handleNumberClick('5')}>5</button>
        <button className="calculator-button" onClick={() => handleNumberClick('6')}>6</button>
        <button className="calculator-button" value='multiply' onClick={handleOperatorClick}>*</button>
        <button className="calculator-button" onClick={() => handleNumberClick('1')}>1</button>
        <button className="calculator-button" onClick={() => handleNumberClick('2')}>2</button>
        <button className="calculator-button" onClick={() => handleNumberClick('3')}>3</button>
        <button className="calculator-button" value='subtract' onClick={handleOperatorClick}>-</button>
        <button className="calculator-button" onClick={() => handleNumberClick('0')}>0</button>
        <button className="calculator-button" onClick={() => handleNumberClick('.')}>.</button>
        <button className="calculator-button" onClick={handleEqualsClick}>=</button>
        <button className="calculator-button" value='add' onClick={handleOperatorClick}>+</button>
        <button className="calculator-button" onClick={handleClearClick}>C</button>
      </div>
    </div>
  );
}

export default Calculator;
