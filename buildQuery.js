let crypto;
let currency;
let timeRange;

crypto = 'BTC';
currency = 'USD';
timeRange = 'monthly';

const queryURL = `https://apiv2.bitcoinaverage.com/indices/global/history/${crypto}${currency}?period=${timeRange}&format=json`

getChartData(queryURL, function (response) {
    console.log(response);
})
