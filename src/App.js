import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
//import Button from './components/Button'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      displayValue : "0",
      trueValue : "",
      processedValue : '',
      numbers : [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
      processedStringArray : [],
      //list: [1, 2, 3],
      //operators : [ "+", "-", '*', '/', '='],
      clear : "AC",
      //backspace : "&larr;",
      period : ".",
      finalValue : null,
      twoOpinArow : false
    };
    //this.buildNum2 = this.buildNum2.bind(this);
  }

  //displayValueFunc = () => { return this.state.displayValue === '' ? '0' : this.state.displayValue;}
/*
  buildNum2(x) { this.setState({ displayValue : this.state.displayValue + x }); 
  console.log("hello")
  }
*/

  deleteLastDigit = () => {
    this.setState({
      trueValue : (this.state.trueValue.length > 0 ? this.state.trueValue.slice(0, this.state.trueValue.length - 1)  : this.state.trueValue)
    });
  }

  buildNum2 = (x) => {
    this.setState({ 
      trueValue : this.state.trueValue + x,
      displayValue :  this.state.trueValue,

      twoOpinArow : false
      
    });
    //https://reactjs.org/docs/faq-state.html
    //console.log('displayValue:' + this.state.displayValue);
  }

  clearEverything = () => {
    this.setState({
      displayValue : '0',
      trueValue : '',
      processedStringArray : []
    })
  }
  attachPeriod = () => {
     if(!this.state.trueValue.includes('.'))
     { 
       this.setState({trueValue : this.state.trueValue + '.' }) 
     }
  }

  attachOperation = (operation) => {

    //console.log(this.state.trueValue);
    switch (operation)
    {
        case String.fromCharCode(215) : //multiplication
        operation = '*'
        break;
        case String.fromCharCode(247) : //division
        operation = '/'
        break;
        case String.fromCharCode(8722) : //subtraction
        operation = '-'
        break;
        case String.fromCharCode(43) : //addition
        operation = '+'
        break;
    }
    ///////////////////////////////
    
       if ( this.state.displayValue == '0')
        {
          if (operation != '-')
          {
            console.log("hello5");
           this.setState({
            processedStringArray : this.state.processedStringArray.concat('0', operation)
           })
           //return false;
          }
        }
        else if ( this.state.displayValue ===  "Division by zero" ) { }
    
        if( !this.state.twoOpinArow )
        {
          if ( !( this.state.trueValue === "") )
          {
          let myarray = [this.state.trueValue, operation]  
          this.setState({
            
            trueValue : '',
            displayValue : '0',
            processedStringArray : this.state.processedStringArray.concat(myarray),

            twoOpinArow : true
            })
          }
          else if ( this.state.trueValue == "" && operation == '-' )
          {
            console.log("this.state.trueValue " + this.state.trueValue);
          let myarray = [operation];
          this.setState({
          
          //trueValue : '',
          trueValue : '-' + this.state.trueValue,
          twoOpinArow : true
          //displayValue : '-',
          //processedStringArray : this.state.processedStringArray.concat(myarray)
            })
          }
        }
        else
        {
          console.log("up");
          if ( this.state.trueValue != '-' )
          {
          //let tempArray = [ this.state.processedStringArray[0], operation ];
          let tempArray = [...this.state.processedStringArray];
          //tempArray = tempArray.pop();
          console.log( tempArray[0] + tempArray[1]);
          tempArray.splice( tempArray.length - 1, 1);
          tempArray = [...tempArray, operation];
          //console.log( tempArray[0] + tempArray[1]);
          this.setState({
            //processedStringArray : this.state.processedStringArray.splice(this.state.processedStringArray.length-1, 1)
            processedStringArray : tempArray
          });
          }
        }
        /*
        
        */
    ///////////////////////////////

    /* //was working
    let myarray = [this.state.trueValue, operation]  
    this.setState({
      //processedValue : this.state.trueValue,
      trueValue : '',
      displayValue : '0',
      processedStringArray : this.state.processedStringArray.concat(myarray)
    })
    */

    //console.log(this.state.processedStringArray[0] + " " + this.state.processedStringArray[1]);
  }

  countDecimals = (arrayWithDecimals) => {
    let value = null;
    let max = 0;
	
    for (let i = 0; i < arrayWithDecimals.length; i++)
    {			
		  value = arrayWithDecimals[i];
		  if ( !isNaN(value) )
		  {
			  if ((value % 1) != 0)
			  {	
			  	value = value.toString().split(".")[1].length;
			  	console.log("decimal: " + value);
				  if ( value >= max ) { max = value; }
			  }
		  }
    }
    return max;
  }

  getResult = () => {
    let result = null;
    let numberOfDecimals = this.countDecimals(this.state.processedStringArray);
/*
    this.setState({
      processedStringArray : this.state.processedStringArray.concat(this.state.trueValue)
    })
*/
    //console.log(this.state.processedStringArray[0] + " " + this.state.processedStringArray[1] + " " + this.state.processedStringArray[2] );
    //console.log("this.state.trueValue : " + this.state.trueValue);

    
    if ( this.state.displayValue === "Division by zero" )
    {
      result = "Division by zero";
    }

    //input: number, operation, no input
    else if ( this.state.trueValue === "" )
    {
      result = eval(this.state.processedStringArray.concat("0").join(" ") );
      result = result.toFixed(numberOfDecimals);
      result = "" + result; 
    }
    else
    { 
      result = eval(this.state.processedStringArray.concat(this.state.trueValue).join(" ") );
      result = result.toFixed(numberOfDecimals);
      result = "" + result;
    }
    //console.log(this.state.processedStringArray.concat(this.state.trueValue));
    //console.log(result);

    //result produced by division by zero
    if ( !isFinite(result) )
    {
      this.setState({
        displayValue : "Division by zero",
        trueValue : "",
        processedStringArray : [],
        twoOpinArow : true
      })
    }
    else
    {
    this.setState ({

        //processedStringArray : this.state.processedStringArray.concat(this.state.displayValue),
       displayValue : result,
        //displayValue: eval(this.state.processedStringArray),
        trueValue : "" + result,
        processedStringArray : []
      })
   }
  }
  render() {
    return (
      <React.Fragment>
        <h1 style={{textAlign: 'center'}}>React Calculator</h1>
      <div className="flexContainer" style={{}}>

      <div style={{width: '160px', height: '40px', textAlign: 'right', color: 'white', backgroundColor: 'black', paddingRight: '5%', marginTop: '5%'}}>
      <p> {this.state.trueValue === '' ? this.state.displayValue : this.state.trueValue} </p>
      <p>{
        
        this.state.processedStringArray.map(x => x)
       
        }</p>
      </div>
      
      <AC cl={this.state.clear} eraseNum={this.clearEverything} />
      {/*
      <AC cl={this.state.clear} eraseNum={this.clearEverything} />
      */}
      <Backspace removeLastDigit={this.deleteLastDigit}/>
      <Division doOperation={this.attachOperation} />
      
      < Button btn={this.state.numbers[7]} buildNum={this.buildNum2} />
      < Button btn={this.state.numbers[8]} buildNum={this.buildNum2} />
      < Button btn={this.state.numbers[9]} buildNum={this.buildNum2} />
      <Multiplication doOperation={this.attachOperation} />
        {/* < Operator op={this.state.operators[0]} /> */}
     
      < Button btn={this.state.numbers[4]} buildNum={this.buildNum2} />
      < Button btn={this.state.numbers[5]} buildNum={this.buildNum2} />
      < Button btn={this.state.numbers[6]} buildNum={this.buildNum2} />
      <Subtract doOperation={this.attachOperation} />
     
      < Button btn={this.state.numbers[1]} buildNum={this.buildNum2} />
      < Button btn={this.state.numbers[2]} buildNum={this.buildNum2} />
      < Button btn={this.state.numbers[3]} buildNum={this.buildNum2} />
      <Addition doOperation={this.attachOperation} />
      {/*  < Operator op={this.state.operators[2]} /> */}
      
      < Button btn={this.state.numbers[0]} buildNum={this.buildNum2} />
{/*
      < Button btn={this.state.numbers[0]} buildNum={this.buildNum2} />
*/}
      < Period pd={this.state.period} putPeriod={this.attachPeriod} />
      <Equals performOperation={this.getResult} />
      </div>
      </React.Fragment>
    );
  }
}

class Button extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      
    };
    this.sendData = this.sendData.bind(this);
  }


  sendData() {
    this.props.buildNum(this.props.btn);
  }

  render() { 
    
      return (
      <div><button 
      className="btn btn-primary myButton"
      onClick={this.sendData}
      >
      {this.props.btn}
      </button></div> );
    
  }
}

/*
class Operator extends Component {
  state = {  }
  render() { 
    return ( <div><button className="btn btn-secondary" styles={{color: "#000000"}}>{this.props.op}</button></div> );
  }
}
*/

class AC extends Component {
  
  eraseData = () => { this.props.eraseNum(); }
  render() { 
    return ( <div className="bigger-button myButton"><button 
      className="btn btn-warning btn-block" onClick={this.eraseData}>
      {this.props.cl}
      </button></div>  );
  }
}
 
class Period extends Component {
  addPeriod = () => {this.props.putPeriod();}
  render() { 
    return ( 
    <div>
      <button className="btn btn-primary myButton" onClick={this.addPeriod}>
      {this.props.pd}
      </button></div>  );
  }
}

class Backspace extends Component {
  takeOutLastDigit = () => {this.props.removeLastDigit();}
  render() { 
    return ( <div><button
    className="btn btn-warning myButton"
    onClick={this.takeOutLastDigit}
    >
    {String.fromCharCode(8592)}
    </button></div> );
  }
}

class Addition extends Component {
  callOperation = () => {this.props.doOperation(String.fromCharCode(43));}
  render() { 
    return ( 
      <div><button 
      className="btn btn-warning myButton"
      onClick={this.callOperation}
      >
    {String.fromCharCode(43)}</button></div>
     );
  }
}

class Subtract extends Component {
  callOperation = () => {this.props.doOperation(String.fromCharCode(8722));}
  render() { 
    return ( 
      <div><button className="btn btn-warning myButton"
      onClick={this.callOperation}
      >
    {String.fromCharCode(8722)}</button></div>
     );
  }
}

class Multiplication extends Component {
  callOperation = () => {this.props.doOperation(String.fromCharCode(215));}
  render() { 
    return ( 
      <div><button className="btn btn-warning myButton"
      onClick={this.callOperation}
      >
    {String.fromCharCode(215)}</button></div>
     );
  }
}

class Division extends Component {
  callOperation = () => {this.props.doOperation(String.fromCharCode(247));}
  render() { 
    return ( 
      <div><button className="btn btn-warning myButton"
      onClick={this.callOperation}
      >
    {String.fromCharCode(247)}</button></div>
     );
  }
}
 
class Equals extends Component {
  performOp = () => {this.props.performOperation();}
  render() { 
    return ( 
      <div><button className="btn btn-warning myButton"
      onClick={this.performOp}
      >
    {String.fromCharCode(61)}</button></div>
     );
  }
}
 

export default App;

