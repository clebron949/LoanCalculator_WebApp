/************* Global Variables *************/


/********** Currency Object for Display **********/
const money = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',})
;

/************ Data Class ************/  
class data
{
    constructor(x, y){
        this.x = x;
        this.y = y;
    }
}

/********** Creating Chart **********/
function CreateChart(dataInterest, dataPrincipal) {
    const ctx = document.getElementById('myChart').getContext('2d');
    const myChart = new Chart(ctx, {
        type: 'scatter',
        data: {
            datasets: [{
                label: 'Interest Paid',
                data: dataInterest,
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                borderColor: 'rgba(255, 99, 132, 1)',
                borderWidth: 1,
                type: 'line',
                fill: false,
                order: 1
            },
            {
                label: 'Remaining Principal',
                data: dataPrincipal,
                backgroundColor: 'rgba(54, 162, 235, 0.2)',
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 1,
                type: 'line',
                fill: false,
                order: 2
            }],
        },
        options: {
            scales: {
                xAxes: [{
                    type: 'linear',
                    position: 'bottom',
                    scaleLabel:{
                        display: true,                
                        labelString: 'Years'
                    }
                }],
                yAxes: [{    
                    scaleLabel:{
                        display: true,                
                        labelString: 'Dollar ($)' , 
                    },
                    
                    ticks:{
                        min:0,
                        callback: function(value, index, values) {
                            return '$' + value;
                        }
                    }                  
                }]
            },            
        }
    });
}
/********** Mortgage Class Definition **********/  
class Mortgage {
    constructor(amount, rate, terms) {
        this.amount = amount;
        this.rate = rate/100;
        this.terms = terms;
        this.balance = Number(amount).toFixed(2);
    }
    GetMonthlyPayment() {
        const M = this.amount / 12 * ((this.rate * Math.pow(1 + this.rate, this.terms)) / (Math.pow(1 + this.rate, this.terms) - 1));
        return M.toFixed(2);
    }
    GetYearlyPayment() {
        const M = this.amount * ((this.rate * Math.pow(1 + this.rate, this.terms)) / (Math.pow(1 + this.rate, this.terms) - 1));
        return M.toFixed(2);
    }
}

/********** Function for Displaying Data on Table **********/  
function GetTable(loan) {
    const tbl = document.querySelector('table');
    let totalRatePayed = 0;
    let ratePayed = 0;
    let principalPayed = 0;
    let interest = [];
    let principal = [];

    interest[0] = new data(0, 0);
    principal[0] = new data(0, loan.balance);

    for (let rowIndex = 0; rowIndex < loan.terms; rowIndex++) {
        newRow = tbl.insertRow(rowIndex+1);
        newRow.insertCell(0).innerHTML = rowIndex + 1;
        newRow.insertCell(1).innerHTML = money.format(loan.balance);
        newRow.insertCell(2).innerHTML = money.format(loan.GetYearlyPayment());
        ratePayed = (loan.balance * loan.rate).toFixed(2);
        totalRatePayed += Number(ratePayed);
        interest[rowIndex+1] = new data(rowIndex+1, totalRatePayed.toFixed(2)); 
        newRow.insertCell(3).innerHTML = money.format(ratePayed);
        principalPayed = (loan.GetYearlyPayment() - (loan.balance * loan.rate)).toFixed(2);
        newRow.insertCell(4).innerHTML = money.format(principalPayed);
        loan.balance -= Number(principalPayed).toFixed(2);
        if(loan.balance < 0){
            loan.balance = 0;
        }

        principal[rowIndex+1] = new data(rowIndex+1, loan.balance.toFixed(2)); 
        newRow.insertCell(5).innerHTML = money.format(loan.balance); 
    };
    return [interest, principal];
}

/********** Function for Deleting Unused Table Rows **********/  
function DeleteRows() {    
    let table = document.querySelector('table'); 
    rowsLength = table.rows.length;
    if( rowsLength > 1){
        for (let index = 1; index < rowsLength; index++) {
            table.deleteRow(1);            
        }
    }      
}

/********** EventListener for when form is submited **********/  
let myForm = document.querySelector('form');
myForm.addEventListener('submit', (event) => {    
let _amount = document.querySelector('#loanAmount').value;
let _rate = document.querySelector('#interestRate').value; 
if(_rate == 0){
    _rate = 0.00001;
};
let _terms = document.querySelector('#terms').value; 
var Loan = new Mortgage(_amount, _rate, _terms);
document.querySelector('#initBalance').innerHTML = `Montly Payment: ${money.format(Loan.GetMonthlyPayment())}`;
DeleteRows();
let [_Interest, _Principal] = GetTable(Loan);
CreateChart(_Interest, _Principal);
event.preventDefault();
});


    

    
