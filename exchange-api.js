function handleError(jqXHR) {
    console.log(jqXHR.resposneText);
}

const currencies = []

$.ajax({
    type: "GET",
    url: "https://api.nexchange.io/en/api/v1/currency/",
}).then(function(response){
    for(let i = 0; i < response.length; i++){
        console.log(response[i].code);
        currencies.push(response[i].code)
    }
    console.log(currencies);
    renderCurrencies();
});

const renderCurrencies = function (){
    $(".dropdown").empty();
    for(let i = 0; i < currencies.length; i++){
        const currencyBtn = $("<option>");
        currencyBtn.text(currencies[i]);
        $(".dropdown").append(currencyBtn);
    }
}

function cbCurrency(data){
    console.log(data);

    $.ajax({
        type: "GET",
        url: "https://api.nexchange.io/en/api/v1/pair/",
        success: cbPairs,
        error: handleError
    });
}


function cbPairs(data){
    console.log(data);
}

const createOrder = function() {
    const orderURL = `https://api.nexchange.io/en/api/v1/orders/`

    let askingFee;
    let biddingFee;
    let coinName;
    let baseCode;
    let quoteCode;
    let type;
    let coinAddy;
    let currencyCode;

    coinName = 'ETHUSD';
    baseCode = 'ETH';
    quoteCode = 'USD';
    type = 'W';
    coinAddy = '0xfCc2FeedEd9d3503217B9c0e1ce987B4B84DB2b5';

    const payload = {
        "amount_base": 1,
        "is_default_rule": true,
        "pair": {
            "name": coinName,
            "base": {
                "code": baseCode,
            },
            "quote": {
                "code": quoteCode, 
            },
            "fee_ask": {
                "fee_ask": .001,
            },
            "fee_bid": {
                "fee_bid": .001
            }
        },
        "withdraw_address": {
            "type": type,
            "address": coinAddy,
            "currency_code": 'ETH'
        },
    };

    $.ajax({
        error: function(jqXHR) {
            console.log(jqXHR.responseText);
        },
        url: orderURL,
        method: "POST",
        data: JSON.stringify(payload),
        headers: {
            "Content-Type": "application/json",
            "x-referral-token": null
        },
    }).then(function(response) { 
        console.log(response);
    });
}
createOrder();
