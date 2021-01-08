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

var money = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',});
  
class Mortgage {
    constructor(amount, rate, terms) {
        this.amount = amount;
        this.rate = rate/100;
        this.terms = terms;
        this.balance = Number(amount).toFixed(2);
    }
    GetMonthlyPayment() {
        let M = this.amount / 12 * ((this.rate * Math.pow(1 + this.rate, this.terms)) / (Math.pow(1 + this.rate, this.terms) - 1));
        return M.toFixed(2);
    }
    GetYearlyPayment() {
        let M = this.amount * ((this.rate * Math.pow(1 + this.rate, this.terms)) / (Math.pow(1 + this.rate, this.terms) - 1));
        return M.toFixed(2);
    }
}

function GetTable(row, loan) {
    let tbl = document.querySelector('table');
    for (let rowIndex = 0; rowIndex < row; rowIndex++) {
        newRow = tbl.insertRow(rowIndex+1);

        newRow.insertCell(0).innerHTML = rowIndex + 1;
        newRow.insertCell(1).innerHTML = money.format(loan.balance);
        newRow.insertCell(2).innerHTML = money.format(loan.GetYearlyPayment());

        let ratePayed = (loan.balance * loan.rate).toFixed(2);
        newRow.insertCell(3).innerHTML = money.format(ratePayed);
        
        let principalPayed = (loan.GetYearlyPayment() - (loan.balance * loan.rate)).toFixed(2);
        newRow.insertCell(4).innerHTML = money.format(principalPayed);
        
        loan.balance -= Number(principalPayed).toFixed(2);
        newRow.insertCell(5).innerHTML = money.format(loan.balance); 
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
if(_rate == 0){
    _rate = 0.00001;
};
let _terms = document.querySelector('#terms').value; 

var Loan = new Mortgage(_amount, _rate, _terms);

document.querySelector('#initBalance').innerHTML = `Montly Payment: $ ${Loan.GetMonthlyPayment().replace(/\d(?=(\d{3})+\.)/g, '$&,')}`;

DeleteRows();

GetTable(_terms, Loan);

event.preventDefault();
});
    

    
