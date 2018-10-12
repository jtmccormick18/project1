const ctx = document.getElementById("myChart").getContext('2d');

window.myChart = new Chart(ctx, {
    type: 'line',
    data: {
        datasets: [{
            backgroundColor: [
                'rgba(0, 0, 0, 0)'
            ],
            borderColor: [
                'rgba(0, 255, 255, 1)',
            ],
            borderWidth: 2,
            pointRadius: 0,
            lineTension: 0,
        }]
    },
    options: {
        legend: {
            display: false
        },
        title: {
            display: true,
            fontColor: 'blue',
            fontSize: 18,
        },
        layout: {
            padding: {
                left: 0
            }
        },
        scales: {
            yAxes: [{
                gridLines: {
                    display: true,
                    drawBorder: false
                },
                ticks: {
                    display: true,
                    fontColor: 'blue'
                }
            }],
            xAxes: [{
                gridLines: {
                    display: true,
                    drawBorder: false
                },
                ticks: {
                    display: false,
                    fontColor: '#f0f0f0'
                }
            }]
        }
    }
})
