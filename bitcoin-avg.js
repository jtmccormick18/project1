const HMAC_SHA256 = require('crypto-js/hmac-sha256');

const publicKey = 'OWE2NmUyZDk5MDllNGUwYWJkZWJiYTlhYWQ1ZDVjZjc'
const secretKey = 'MmQ3NzMzZDQzNDIxNDIyZjk5MWFhMmU0MjQ4MzVmMTM0NjgyZTNmMzcwMGE0YzZhYmNmOWM1NWU3MDYyNGI1ZQ'

function buildXSig(timestamp) {
    const payload = `${timestamp}.${publicKey}`;
    const digestValue = HMAC_SHA256(payload, secretKey);
    return `${payload}.${digestValue}`;
}

window.getChartData = function(queryURL, cb) {
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
        }).then(function(data) {
            cb(data);
        });
    });
}
