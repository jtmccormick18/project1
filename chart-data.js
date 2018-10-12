let base;
let quote;
let period;

function getQueryURL() {
    return `https://apiv2.bitcoinaverage.com/indices/global/history/${base}${quote}?period=${period}&format=json`;
}

function setParams(newBase, newQuote, newPeriod) {
    base = newBase || base;
    quote = newQuote || quote;
    period = newPeriod || period;
}

function getChartData(cb) {
    callBitcoinAvgAPI(getQueryURL(), function (response) {
        const differentTimes = myChart.data.labels[0] !== response[response.length - 1].time;
        const differentAverages = myChart.data.datasets[0].data[0] !== response[response.length - 1].average;
        if (differentTimes || differentAverages) {
            console.log('updated!')
            let chartData = {
                times: [],
                averages: [],
            };
            for (let i = response.length - 1; i >= 0; i--) {
                chartData.times.push(response[i].time);
                chartData.averages.push(response[i].average);
            }
            cb(chartData);
        } else {
            console.log('not updated')
        }
    })
}

function updateChart() {
    getChartData(function(chartData) {
        console.log('Old latest timestamp: ' + myChart.data.labels[myChart.data.labels.length - 1]);
        myChart.data.labels = chartData.times;
        myChart.data.datasets[0].data = chartData.averages;
        myChart.options.title.text = base + quote + ' - ' + period;
        myChart.update();
        console.log('New latest timestamp: ' + myChart.data.labels[myChart.data.labels.length - 1]);
    });
}

let autoUpdater;
function startAutoUpdater(seconds) {
    clearInterval(autoUpdater);
    autoUpdater = setInterval(updateChart, seconds * 1000);
}
function stopAutoUpdater() {
    clearInterval(autoUpdater);
}
