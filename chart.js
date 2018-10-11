var ctx = document.getElementById("myChart").getContext('2d');

getChartData(function (chartData) {
    var myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: chartData.labels,
            datasets: [{
                label: `${crypto}${currency}`,
                data: chartData.data,
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
                fontColor: '#f0f0f0',
                fontSize: 18,
                text: `${crypto}${currency}`
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
                        fontColor: '#f0f0f0'
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
});
