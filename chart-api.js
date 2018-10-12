const hmac_sha256 = require('crypto-js/hmac-sha256');
const enc_hex = require('crypto-js/enc-hex');

const publicKey = 'NjdiM2JlNGE2ZWI1NGJmNDhlZDI5YzM2MjBhMmI1ODg'
const secretKey = 'NTQzYmFhZTA3MWNmNGY4Yzk0NWE2NTFkNDlhZGE1ZmJmYTYzNDY4NTRiYmE0ZWU5OTdmMzlmMjEzZDlmNTg1Zg'

function buildXSig(timestamp) {
    timestamp = Math.round(timestamp / 1000)
    const payload = `${timestamp}.${publicKey}`;
    const hash = hmac_sha256(payload, secretKey);
    digestValue = enc_hex.stringify(hash);
    return `${payload}.${digestValue}`;
}

window.callBitcoinAvgAPI = function(queryURL, cb) {
    $.ajax({
        url: queryURL,
        method: 'GET',
        headers: {
            'X-signature': buildXSig(Date.now())
        }
    }).then(function(data) {
        cb(data);
    });
}
