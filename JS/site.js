var today = new Date();
var hourNow = today.getHours();
var greeting;

function Mortgage(amount, rate, terms) {
   this.amount = amount; 
   this.rate = rate;
   this.terms = terms;
   this.balance = 0;
   this.GetMonthlyPayment = function() {
       this.rate = this.rate/100;
       M = this.amount/12 * ((this.rate * Math.pow(1+this.rate,this.terms))/(Math.pow(1+this.rate,this.terms)-1));
       return M.toFixed(2);        
    }
}

function logSubmit(event) {
    log.textContent = 'Form Submitted! Time stamp: ${event.timeStamp}';
    event.preventDefault();
    var loan = document.getElementById
    var form = new FormData(myLoan);
}

form.addEventListener('submit', logSubmit);

if (hourNow > 18){
    greeting = 'Good Evening!';
} else if (hourNow > 12){
    greeting = 'Good Afternoon!';
} else if (hourNow > 0){
    greeting = 'Good Morning!';
} else {
    greeting = 'Welcome!';
}
var Loan = new Mortgage(200000, 2.5, 30);

Loan.balance = 198000;

document.write('<h3 class = "text-center">' + greeting + '</h3>');

document.write('<h3 class = "text-center">' + '$ ' + 
    Loan.GetMonthlyPayment() + '</h3>');

var _loanAmount = document.getElementById('loanAmount');

