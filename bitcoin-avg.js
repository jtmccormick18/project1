const HMAC_SHA256 = require('crypto-js/hmac-sha256');
let crypto=$('#cryptoInput').val();
let currency=$('#currencyInput').val();
let timeRange=$('#timeInput').val();
let publicKey = 'OWE2NmUyZDk5MDllNGUwYWJkZWJiYTlhYWQ1ZDVjZjc'
let secretKey = 'MmQ3NzMzZDQzNDIxNDIyZjk5MWFhMmU0MjQ4MzVmMTM0NjgyZTNmMzcwMGE0YzZhYmNmOWM1NWU3MDYyNGI1ZQ'
const queryURL = `https://apiv2.bitcoinaverage.com/indices/global/history/${crypto}${currency}?period=${timeRange}&format=json`

function buildXSig(timestamp) {
    const payload = `${timestamp}.${publicKey}`;
    const digestValue = HMAC_SHA256(payload, secretKey);
    return `${payload}.${digestValue}`;
}

$.ajax({
    url: 'https://apiv2.bitcoinaverage.com/constants/time',
    method: 'GET'
}).then(function(timestamp) {
    timestamp = timestamp.epoch;
    $.ajax({
        url: queryURL,
        method: 'GET',
        headers: {
            'X-signature': buildXSig(timestamp)
        }
    }).then(function(response) {
        console.log(response);
    });
});

