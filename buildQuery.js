let crypto=$('#cryptoInput').val();
let currency=$('#currencyInput').val();
let timeRange=$('#timeInput').val();
const queryURL = `https://apiv2.bitcoinaverage.com/indices/global/history/${crypto}${currency}?period=${timeRange}&format=json`
