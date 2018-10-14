const getPrice = function () {
    const priceUrl = "https://api.nexchange.io/en/api/v1/get_price/pair_name/?amount_base=1.24354147&amount_quote=100";
    const paramters = {
        "pair_name": pairName,
        "amount_base": baseAmount,
        "amount_quote": quoteAmount,
        };

        //quoteAmount is the amount sent
        //baseAmount is amount of currency you recieve in exchange for the amountQuote

        const pairName = $("").val();
        if (pairName) {
            paramters.pair_name = pairName;
        }
        const baseAmount = $(".firstCurrency").val();
        if (baseAmount) {
            paramters.amount_base = baseAmount;
        }
        const quoteAmount = $("").val();
        if (pairName) {
            paramters.amount_quote = quoteAmount;
        }

        priceUrl += '?' + $.param(paramters);

        console.log(priceUrl);
}

function handleError(jqXHR) {
    console.log(jqXHR.resposneText);
}

const currencies = [];

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


const baseCoin = $(".coin1").val();
const quoteCoin = $(".coin2").val();

function cbCurrency(data){
    console.log(data);

    $.ajax({
        type: "GET",
        url: "https://api.nexchange.io/en/api/v1/pair/",
    }).then(function(response){
        for(let i = 0; i < response.length; i++){
            console.log(response[i].name);
            if(response[i].base != response[i].quote){
                console.log(true);
            } else {
                console.log(false);
            }
        }
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

    // coinName = 'ETHUSD';
    // baseCode = 'ETH';
    // quoteCode = 'USD';
    type = 'W';
    coinAddy = '0xfCc2FeedEd9d3503217B9c0e1ce987B4B84DB2b5';

    const getSelectedValue1 = function () {
        const selectedValue = $(".dropdown").val();
        console.log(selectedValue);
    }
    $(".dropdown").on("change", getSelectedValue1);

    const getSelectedValue2 = function () {
        const selectedValue2 = $(".dropdown .two").val();
        console.log(selectedValue2);
    }
    $(".dropdown").on("change", getSelectedValue2);

    // coinAddy = $('.address').val();
    coinName = baseCode + quoteCode;
    baseCode = getSelectedValue1;
    quoteCode = getSelectedValue2;

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
// $('.submit').on('click', createOrder);

