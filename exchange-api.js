function handleError(jqXHR) {
  console.log(JSON.parse(jqXHR.responseText));
}

function cbCurrency(data) {
  $.ajax({
    type: "GET",
    url: "https://api.nexchange.io/en/api/v1/pair/"
  }).then(function(response) {
    for (let i = 0; i < response.length; i++) {
      console.log(response[i].name);
      if (response[i].base != response[i].quote) {
        console.log(true);
      } else {
        console.log(false);
      }
    }
  });
}

function cbPairs(data) {
  console.log(data);
}
let paymentURL;
const createOrder = function(e) {
  e.preventDefault();

  const orderURL = `https://api.nexchange.io/en/api/v1/orders/`;

  let coinName;
  let baseCode;
  let quoteCode;
  let type;
  let address;

  type = "W";
  // address = "0xfCc2FeedEd9d3503217B9c0e1ce987B4B84DB2b5";

  quoteCode = $(".exchange-quote .select-value").text();
  baseCode = $(".exchange-base .select-value").text();
  address = $(".wallet-address").val();
  coinName = baseCode + quoteCode;

  const quoteAmount = $(".quote-input").val();

  console.log(coinName);
  console.log(baseCode);
  console.log(quoteCode);

  const payload = {
    amount_quote: quoteAmount,
    is_default_rule: true,
    pair: {
      name: coinName,
      base: {
        code: baseCode
      },
      quote: {
        code: quoteCode
      },
      fee_ask: {
        fee_ask: 0.001
      },
      fee_bid: {
        fee_bid: 0.001
      }
    },
    withdraw_address: {
      type: type,
      address: address,
      currency_code: baseCode
    }
  };
  $;
  console.log(payload);

  $.ajax({
    error: handleError,
    url: orderURL,
    method: "POST",
    data: JSON.stringify(payload),
    headers: {
      "Content-Type": "application/json",
      "x-referral-token": null
    }
  }).then(function(response) {
    console.log(response);
    paymentURL = response.payment_url;
  });
};

function convertPrice(e) {
    const inputBox = $(e.target);

    const quoteCode = $('.exchange-quote .select-value').text();
    const baseCode = $('.exchange-base .select-value').text();
    const pair = baseCode + quoteCode;

    let quoteAmount;
    let baseAmount;
    let queryURL;

    let inputtingQuote = inputBox.hasClass('quote-input');
    if (inputtingQuote) {
        quoteAmount = inputBox.val();
        queryURL = `https://api.nexchange.io/en/api/v1/get_price/${pair}/?amount_quote=${quoteAmount}`;
    } else {
        baseAmount = e.target.value;
        queryURL = `https://api.nexchange.io/en/api/v1/get_price/${pair}/?amount_base=${baseAmount}`;
    }

    $.ajax({
        url: queryURL,
        method: 'GET',
        error: handleError,
    }).then(function(response) {
        if (inputtingQuote) {
            $('.base-input').val(response.amount_base);
        } else {
            $('.quote-input').val(response.amount_quote);
        }
    })
}
$('.quote-input, .base-input, .wallet-address').on('input', function(e) {
  convertPrice(e);
  createOrder(e);
});
$(".submit").on("click", function(e) {
  e.preventDefault();
  window.open(paymentURL, '_blank');
});
