import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
//import App from './App';
import registerServiceWorker from './registerServiceWorker';

const validKeys = ['Q','W','E','A','S','D','Z','X','C'];

class App extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.state={
      result: "0",
      operations:"",
      lastoperand:"",
      usedPeriod: false,
      noEqual:true
    }
  }

  handleClick(event) {
    let key =event.target.id;
    let result=this.state.result;
    let operations=this.state.operations;
    let lastoperand=this.state.lastoperand;
    let usedPeriod=this.state.usedPeriod;
    let noEqual=this.state.noEqual;

    let keyinput="";
    let isOperator=false;
    let isNumber=false;

    // code
    switch (key) {
      case "add":
        keyinput="+";
        isOperator=true;
        break;
      case "subtract":
        keyinput="-";
        isOperator=true;
        break;
      case "multiply":
        keyinput="*";
        isOperator=true;
        break;
      case "divide":
        keyinput="/";
        isOperator=true;
        break;
      case "one":
        keyinput="1";
        isNumber=true;
        break;
      case "two":
        keyinput="2";
        isNumber=true;
        break;
      case "three":
        keyinput="3";
        isNumber=true;
        break;
      case "four":
        keyinput="4";
        isNumber=true;
        break;
      case "five":
        keyinput="5";
        isNumber=true;
        break;
      case "six":
        keyinput="6";
        isNumber=true;
        break;
      case "seven":
        keyinput="7";
        isNumber=true;
        break;
      case "eight":
        keyinput="8";
        isNumber=true;
        break;
      case "nine":
        keyinput="9";
        isNumber=true;
        break;
      case "zero":
        keyinput="0";
        isNumber=true;
        if (result === "0")
        {
          if (operations==="") operations="0";
          keyinput="";
        }
        break;
      case "decimal":
        if (!usedPeriod) {
          keyinput=".";
        }
        usedPeriod=true;
        break;
      case "clear":
        keyinput="";
        operations="";
        lastoperand="";
        result="0";
        usedPeriod=false;
        break;
      case "equals":
        result=eval(operations);
        console.log('Result :'+result);
        lastoperand="";
        keyinput="";
        operations="";
        usedPeriod=false;
        noEqual=false;
        break;
      case "pm":
        keyinput="";
        result=-result;
        break;
    default:
        return(null);
    }
    if (isOperator) {   // Its an add, substract, multiply, etc
      if ((result !== 0) && (operations === "")) {
        operations = result;
      }
      lastoperand=keyinput;  // now we know last operation
      result = keyinput;
    }
    else {
      if (lastoperand) {
        operations += lastoperand;
        usedPeriod=false;
        lastoperand = "";
        result="";
      }
      // Is this is a new calculation, reset display to nothing
      if ((isNumber) && (!operations)) {
        result="";
      }
      operations += keyinput;
      if ((result === "0")  && (keyinput !== "")) result="";
      result += keyinput;
    }
    this.setState({
      result: result,
      operations: operations,
      lastoperand: lastoperand,
      usedPeriod: usedPeriod,
      noEqual: noEqual
    });
  }

  onKeyDown(event) {
    let key = String.fromCharCode(event.keyCode);
    if (!(validKeys.indexOf(key) < 0)) {
      // code
    }
  }

  componentWillMount() {
      document.addEventListener("keydown", this.onKeyDown);
  }

  componentWillUnmount() {
      document.removeEventListener("keydown", this.onKeyDown);
  }

  render() {
    return (
      <div id="container" className="container" onClick={this.handleClick}>
        <div id="buttons" className="buttons">
          <div className="redbutton"></div>
          <div className="yellowbutton"></div>
          <div className="greenbutton"></div>
        </div>
        <div id="root" className="displaywindow">
          <div id="display" className="calcresult">
            {this.state.result}
          </div>
          <div id="operation" className="calcoperation">
            {this.state.operations}
          </div>
        </div>
        <div id="clear" className="clear">AC</div>
        <div id="empty" className="empty"></div>
        <div id="empty" className="empty"></div>
        <div id="divide" className="operator">/</div>
        <div id="multiply" className="operator">*</div>
        <div id="subtract" className="operator">-</div>
        <div id="add" className="operator">+</div>
        <div id="seven" className="number">7</div>
        <div id="eight" className="number">8</div>
        <div id="nine" className="number">9</div>
        <div id="four" className="number">4</div>
        <div id="five" className="number">5</div>
        <div id="six" className="number">6</div>
        <div id="one" className="number">1</div>
        <div id="two" className="number">2</div>
        <div id="three" className="number">3</div>
        <div id="zero" className="numberzero">0</div>
        <div id="decimal" className="number">.</div>
        <div id="equals" className="equal">=</div>
      </div>
    );
  }
};


ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
