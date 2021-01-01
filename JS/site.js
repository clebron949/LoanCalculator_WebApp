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

document.write('<h3 class = "text-center">' + greeting + '</h3>');

function Mortgage(amount, rate, terms) {
   this.amount = amount; 
   this.rate = rate;
   this.terms = terms;
   this.balance = amount;
   this.GetMonthlyPayment = function() {
       this.rate = this.rate/100;
       M = this.amount/12 * ((this.rate * Math.pow(1+this.rate,this.terms))/(Math.pow(1+this.rate,this.terms)-1));
       return M.toFixed(2);        
    }
}

    document.querySelector('form').onsubmit = function () {
    let _amount = document.querySelector('#loanAmount').value;
    let _rate = document.querySelector('#interestRate').value; 
    let _terms = document.querySelector('#terms').value; 

    var Loan = new Mortgage(_amount, _rate, _terms);

    document.querySelector('#payment').innerHTML = `Montly Payment: $ ${Loan.GetMonthlyPayment()}`;
    document.querySelector('#initBalance').innerHTML = `Initial Balance: $ ${Loan.balance}`;
    return false;
}
