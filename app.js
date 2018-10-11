// const currencies = [];

// const getCurrencies = function () {
//     let currencyUrl = "https://api.nexchange.io/en/api/v1/currency";

//     const getCoin1 = $('depositCoin').val();
//     const getCoin2 = $('recieveCoin').val();
//     const parameters = {
//         'code': getCoin

//     };
   
//     currencyUrl += '?' + $.param(parameters);

//     return currencyUrl;

// };



// const getCurrencies = function () {
//     const queryURL = `https://api.nexchange.io/en/api/v1/currency`;

//     $.ajax({
//         url: queryURL,
//         method: 'GET'
//     }).then(function(response) {
//         console.log(response);
//         const currencyName = response.code;
//         for (let i = 0; i < currencyName.length; i++) {
//             console.log(currencyName);
//             $('.depositCoin').append(`<option>${currencies[i]}<option>`);
//         }
        
//     });

// };

// $.get("https://api.nexchange.io/en/api/v1/currency/", function(data){
//   console.log(data);
// });

const getPrice = function() {

    let priceUrl = "https://api.nexchange.io/en/api/v1/get_price/pair_name/?amount_base=1.24354147&amount_quote=100";

    const parameters = {
		"pair_name": pairName,
		"amount_base": recieveAmount,
		"amount_quote": sendAmount
    };

    const pairName = $("").val();
    if (pairName) {
        parameters.pair_name = pairName;
    }

    const recieveAmount = $("").val();
    if (recieveAmount) {
        parameters.amount_base = recieveAmount;
	}
	
	const sendAmount = $("").val();
    if (sendAmount) {
        parameters.amount_quote = sendAmount;
    }

    priceUrl += '?' + $.param(parameters);

    return priceUrl;

};

function handleError(jqXHR, textStatus, error) {
    console.log(error);
}

$.ajax({
    type: "GET",
    url: "https://api.nexchange.io/en/api/v1/currency/",
    success: cbCurrency,
    error: handleError
});

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



//post

const createOrder = function(e){
    (e).prevent.default();

    const payload = $(this).attr("data-name");
    const orderURL = `https://api.nexchange.io/en/api/v1/orders/`

    const askingFee = $("").val();
    const biddingFee = $("").val();
    const coinName = $("").val();
    const coinSymbol = $("").val();
    const type = $("").val();
    const coinAddy = $("").val();
    const currencyCode = $("").val();


    $.ajax({
        url: orderURL,
        method: "POST",
        "payload": {
            "amount_base": recieveAmount,
            "amount_quote": sendAmount,
            "is_default_rule": true,
            "pair": {
                "name": coinName,
                "base": {
                    "code": coinSymbol,
                },
                "quote": {
                    "code": coinSymbol, 
                },
                "fee_ask": {
                    "fee_ask": askingFee
                },
                "fee_bid": {
                    "fee_bid": biddingFee
                }
            },
            "withdraw_address": {
                "type": type,
                "address": coinAddy,
                "currency_code": ""
            },
        },
        "headers": {
            "Content-Type": "app.json",
            "x-refferal-token": ""
        }
    }).then(function(response) { 

    });


}

// $( "#searchForm" ).submit(function(e) {
//     event.preventDefault();
   
//     // Get some values from elements on the page:
//     var $form = $(this),
//       term = $form.find( "input[name='s']" ).val(),
//       url = $form.attr( "action" );
   
//     // Send the data using post
//     var posting = $.post( url, { s: term } );
   
//     // Put the results in a div
//     posting.done(function( data ) {
//       var content = $( data ).find( "#content" );
//       $( "#result" ).empty().append( content );
//     });
//   });