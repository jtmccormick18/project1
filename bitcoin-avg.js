const HMAC_SHA256 = require('crypto-js/hmac-sha256');

let publicKey = 'OWE2NmUyZDk5MDllNGUwYWJkZWJiYTlhYWQ1ZDVjZjc'
let secretKey = 'MmQ3NzMzZDQzNDIxNDIyZjk5MWFhMmU0MjQ4MzVmMTM0NjgyZTNmMzcwMGE0YzZhYmNmOWM1NWU3MDYyNGI1ZQ'
const queryURL = `https://apiv2.bitcoinaverage.com/convert/global?from=BTC&to=USD&amount=2`

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

// const startReq = new XMLHttpRequest();
// startReq.open('GET', 'https://apiv2.bitcoinaverage.com/constants/time');
// startReq.onload = function() {
//     const xhr = new XMLHttpRequest();
//     const timestamp = JSON.parse(startReq.response).epoch;
//     xhr.open('GET', queryURL);
//     xhr.setRequestHeader('X-signature', buildXSig(timestamp));
//     xhr.onload = function() {
//         console.log(JSON.parse(xhr.response));
//     }
//     xhr.send();
// }
// startReq.send();
