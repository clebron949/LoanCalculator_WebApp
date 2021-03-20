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