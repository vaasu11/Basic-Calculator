class Calculator{
	constructor(previousOperandText, currentOperandText){
		this.previousOperandText=previousOperandText;
		this.currentOperandText=currentOperandText;
		this.clear();
	}

	appendNumber(number)
	{
		if(number==='.'&&this.currentOperand.includes('.'))
		{
			return;
		}
		this.currentOperand=this.currentOperand.toString()+number.toString();
	}

	chooseOperation(operation)
	{
		if(this.currentOperand==='')
		{
			return;
		}
		if(this.previousOperand!=='')
		{
			this.compute();
		}
		this.operation=operation;
		this.previousOperand=this.currentOperand;
		this.currentOperand='';

	}

	compute()
	{
		let computation;
		const prev=parseFloat(this.previousOperand);
		const curr=parseFloat(this.currentOperand);

		if(isNaN(prev) || isNaN(curr))
		{
			return;
		}
		switch(this.operation)
		{
			case '+':
				computation=prev+curr;
				break;

			case '-':
				computation=prev-curr;
				break;

			case '*':
				computation=prev*curr;
				break;
				
			case '÷':
				computation=prev/curr;
				break;	

			default:
				return;			

		}

		this.previousOperand='';
		this.currentOperand=computation;
		this.operation=undefined;
	}

	clear()
	{
		this.currentOperand='';
		this.previousOperand='';
		this.operation=undefined;
	}

	delete()
	{
		this.currentOperand=this.currentOperand.toString().slice(0,-1);
	}

	getDisplay(number)
	{
		const stringNumber=number.toString();
		const integerDigits=parseFloat(stringNumber.split('.')[0]);
		const decimalDigits=stringNumber.split('.')[1];
		let integerDisplay;

		if(isNaN(integerDigits))
		{
			integerDisplay='';
		}
		else
		{
			integerDisplay=integerDigits.toLocaleString('en', {maximumFractionDigits: 0});
		}

		if(decimalDigits!=null)
		{
			return `${integerDigits}.${decimalDigits}`;
		}
		else
		{
			return integerDisplay;
		}
	}

	updateDisplay()
	{
		this.currentOperandText.innerText=this.getDisplay(this.currentOperand);
		if(this.operation!=null)
		{
			this.previousOperandText.innerText=`${this.getDisplay(this.previousOperand)} ${this.operation}`;
		}
		else
		{
			this.previousOperandText.innerText='';
		}
	}
}
const numberButton=document.querySelectorAll(".number")
const operationButton=document.querySelectorAll(".operation")
const allClearButton=document.querySelector(".allClear")
const deleteButton=document.querySelector(".delete")
const equalButton=document.querySelector(".equal")
const previousOperandText=document.querySelector(".previous-operand")
const currentOperandText=document.querySelector(".current-operand")

const calculator=new Calculator(previousOperandText, currentOperandText);

numberButton.forEach(button=>{
	button.addEventListener('click', ()=>{
		calculator.appendNumber(button.innerText);
		calculator.updateDisplay();
	})
})

operationButton.forEach(button=>{
	button.addEventListener('click', ()=>{
		calculator.chooseOperation(button.innerText);
		calculator.updateDisplay();
	})
})

allClearButton.addEventListener('click', ()=>{
	calculator.clear();
	calculator.updateDisplay();
})

deleteButton.addEventListener('click', ()=>{
	calculator.delete();
	calculator.updateDisplay();
})

equalButton.addEventListener('click', ()=>{
	calculator.compute();
	calculator.updateDisplay();
})

