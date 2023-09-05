document.querySelector('.js-themeOne').addEventListener('click', () => {
  const body = document.getElementsByTagName('BODY')[0];
  body.classList.add('one');
  body.classList.remove('two');
  body.classList.remove('three');
})
 document.querySelector('.js-themeTwo').addEventListener('click', () => {
  const body = document.getElementsByTagName('BODY')[0];
  body.classList.remove('one');
  body.classList.add('two');
  body.classList.remove('three');
})
document.querySelector('.js-themeThree').addEventListener('click', () => {
  const body = document.getElementsByTagName('BODY')[0];
  body.classList.remove('one');
  body.classList.remove('two');
  body.classList.add('three');
})

class Calculator {
  constructor(previousText, currentText){
    this.currentText = currentText;
    this.previousText = previousText;
    this.clear();
  }

  clear(){
    this.currentOperand = '';
    this.previousOperand = '';
    this.operation = undefined;
  }
  delete(){
    this.currentOperand = this.currentOperand.toString().slice(0, -1)
  }
  appendNumber(number){
    if(number === '.' && this.currentOperand.includes('.')) return
    this.currentOperand = this.currentOperand.toString() + number.toString();
  }
  chooseOperation(operation){
    if(this.currentOperand === '') return;
    if(this.previousOperand !== ''){
      this.compute();
    }
    this.operation = operation;
    this.previousOperand = this.currentOperand;
    this.currentOperand = '';
  }
  compute(){
    let computation;
    const current = parseFloat(this.currentOperand);
    const prev = parseFloat(this.previousText)
    if(isNaN(current)) return;
    switch(this.operation){
      case '+':
        computation = prev + current;
        break;
      case '-':
        computation = prev - current;
        break;
      case 'x' : 
        computation = prev * current;
        break;
      case '/': 
        computation = prev / current;
        break;
      default: 
        return
    }
    this.currentOperand = computation;
    this.operation = undefined;
    this.previousOperand = ''
  }
  updateDisplay(){
    this.currentText.innerText = this.currentOperand
  }
}
const numberBtns = document.querySelectorAll('[data-number]');
const operatorBtns = document.querySelectorAll('[data-operation]');
const deleteBtn = document.querySelector('[data-delete]');
const resetBtn = document.querySelector('[data-clear]');
const equalBtn = document.querySelector('[data-equals]');
const currentText = document.querySelector('[data-current-operand]');
const previousText = document.querySelector('[data-previous-operand]');

const calculator = new Calculator(previousText, currentText);

numberBtns.forEach(button => {
  button.addEventListener('click', () =>{
    calculator.appendNumber(button.innerText);
    calculator.updateDisplay();
  } )
})
operatorBtns.forEach(button => {
  button.addEventListener('click',() =>{
    calculator.chooseOperation(button.innerText)
    calculator.updateDisplay();
  })
})
equalBtn.addEventListener('click', button =>{
  calculator.compute();
  calculator.updateDisplay();
})
deleteBtn.addEventListener('click', button =>{
  calculator.delete()
  calculator.updateDisplay()
})