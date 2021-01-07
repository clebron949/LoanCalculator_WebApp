var today = new Date();
var hourNow = today.getHours();
var greeting;

if (hourNow > 18){
    greeting = 'Good Evening!';
} else if (hourNow > 12){
    greeting = 'Good Afternoon!';
} else if (hourNow > 0){
    greeting = 'Good Morning!';
} else {
    greeting = 'Welcome!';
}
document.getElementById('greeting').textContent = greeting;

class Mortgage {
    constructor(amount, rate, terms) {
        this.amount = amount;
        this.rate = rate;
        this.terms = terms;
        this.balance = amount;
    }
    GetMonthlyPayment() {
        this.rate = this.rate / 100;
        let M = this.amount / 12 * ((this.rate * Math.pow(1 + this.rate, this.terms)) / (Math.pow(1 + this.rate, this.terms) - 1));
        return M.toFixed(2);
    }
}

function GetTable(row, columm, initValue) {
    let tbl = document.querySelector('table');
    for (let rowIndex = 0; rowIndex < row; rowIndex++) {
        newRow = tbl.insertRow(rowIndex+1);
        for (let colummIndex = 0; colummIndex < columm; colummIndex++) {
            newRow.insertCell(colummIndex).innerHTML = rowIndex + 1;
        }
    }
}

function DeleteRows() {    
    let table = document.querySelector('table'); 
    rowsLength = table.rows.length;
    if( rowsLength > 1){
        for (let index = 1; index < rowsLength; index++) {
            table.deleteRow(1);            
        }
    }      
}

let myForm = document.querySelector('form');

myForm.addEventListener('submit', (event) => {    
let _amount = document.querySelector('#loanAmount').value;
let _rate = document.querySelector('#interestRate').value; 
let _terms = document.querySelector('#terms').value; 

var Loan = new Mortgage(_amount, _rate, _terms);

document.querySelector('#payment').innerHTML = `Montly Payment: $ ${Loan.GetMonthlyPayment()}`;
document.querySelector('#initBalance').innerHTML = `Initial Balance: $ ${Loan.balance}`;

DeleteRows();

GetTable(_terms, 5, _amount);

event.preventDefault();
});
    

    
