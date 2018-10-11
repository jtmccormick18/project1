let crypto;
let currency;
let timeRange;

crypto = 'BTC';
currency = 'USD';
timeRange = 'monthly';

const queryURL = `https://apiv2.bitcoinaverage.com/indices/global/history/${crypto}${currency}?period=${timeRange}&format=json`

function getChartData(cb) {
    callBitcoinAvgAPI(queryURL, function (response) {
        console.log(response);
        let chartData = {
            labels: [],
            data: [],
        };
        for (let i = response.length - 1; i >= 0; i--) {
            chartData.labels.push(response[i].time);
            chartData.data.push(response[i].average);
        }
        cb(chartData);
    })
}
