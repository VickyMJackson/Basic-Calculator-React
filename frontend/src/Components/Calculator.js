// import React, { useState } from 'react'
// import '../Components/Calculator.css'

// function Calculator () {

//     const [num1, setNum1] = useState('');
//     const [num2, setNum2] = useState('');
//     const [operation, setOperation] = useState('');
//     const [result, setResult] = useState('');

//     const handleOperation = async() => {
//         const response = await fetch(`http://localhost:7077/${operation}`,{
//             method:'POST',
//             headers:{'Content-Type':'application/json'},
//             body:JSON.stringify({Num1:parseFloat(num1),Num2:parseFloat(num2)})
//         });
//         const data = await response.json();
//         setResult(data.result);
//     }


//   return (
//     <div className='calculator'>
//         <label >Num1</label><input type="number" value={num1} placeholder='enter first number' onChange={(e)=>setNum1(e.target.value)}/>
//         <label >Operation</label>
//         <select required onChange={(e)=>setOperation(e.target.value)}>
//             <option value="logic">Select Operation</option>
//             <option value="add">+</option>
//             <option value="subtract">-</option>
//             <option value="multiply">*</option>
//             <option value="divide">/</option>
//             </select>
//             {/* <button value='add' onClick={(e)=>setOperation(e.target.value)}>+</button> */}
//         <label >Num2</label><input type="number" value={num2} placeholder='enter second number' onChange={(e)=>setNum2(e.target.value)} />
//         <button onClick={handleOperation}>Calculate</button>
//         <div className='result'>
//             Result : {result}
//         </div>
//     </div>
//   )
// }

// export default Calculator

import React, { useState } from 'react';
import './Calculator.css';

function Calculator() {
  const [display, setDisplay] = useState('0');
  const [currentValue, setCurrentValue] = useState('');
  const [operator, setOperator] = useState('');
  const [previousValue, setPreviousValue] = useState('');

  const handleNumberClick = (num) => {
    if (num === '.' && currentValue.includes('.')) {
        return; // Do nothing if currentValue already contains a decimal
      }
    if (display === '0' || currentValue === '0') {
      setDisplay(num);
      setCurrentValue(num);
    } else {
      setDisplay(display + num);
      setCurrentValue(currentValue + num);
    }
  };

//   const handleOperatorClick = (op) => {
//     setOperator(op);
//     setPreviousValue(display);
//     setCurrentValue('');
//   };

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
    
    // let result;
    // switch (operator) {
    //   case '+':
    //     result = parseFloat(previousValue) + parseFloat(currentValue);
    //     break;
    //   case '-':
    //     result = parseFloat(previousValue) - parseFloat(currentValue);
    //     break;
    //   case '*':
    //     result = parseFloat(previousValue) * parseFloat(currentValue);
    //     break;
    //   case '/':
    //     result = parseFloat(previousValue) / parseFloat(currentValue);
    //     break;
    //   default:
    //     return;
    // }
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