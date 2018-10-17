let paymentURL;
let errorDiv = $(".error");

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

  $.ajax({
    error: function(jqXHR) {
      let error = JSON.parse(jqXHR.responseText);
      if (error.non_field_errors) {
        errorDiv.text("*" + error.non_field_errors[0]);
      }
      paymentURL = undefined;
      console.log(error);
    },
    success: function() {
      errorDiv.text("");
    },
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

function callNExchange(e) {
  let target = $(e.target);
  if (target.hasClass("wallet-address")) {
    createOrder(e);
  } else {
    const baseInput = $(".base-input");
    const quoteInput = $(".quote-input");

    const quoteCode = $(".exchange-quote .select-value").text();
    const baseCode = $(".exchange-base .select-value").text();
    const pair = baseCode + quoteCode;

    let quoteAmount = quoteInput.val();
    let baseAmount = baseInput.val();
    let queryURL;

    console.log(target);
    let inputtingBase = target.hasClass("base-input");
    if (inputtingBase) {
      baseAmount = baseInput.val();
      queryURL = `https://api.nexchange.io/en/api/v1/get_price/${pair}/?amount_base=${baseAmount}`;
    } else {
      quoteAmount = quoteInput.val();
      queryURL = `https://api.nexchange.io/en/api/v1/get_price/${pair}/?amount_quote=${quoteAmount}`;
    }

    $.ajax({
      url: queryURL,
      method: "GET",
      error: function(jqXHR) {
        let error = JSON.parse(jqXHR.responseText);
        errorDiv.text("*" + error.detail);
        paymentURL = undefined;
      },
      success: function(response) {
        errorDiv.text("");
        if (inputtingBase) {
          quoteInput.val(response.amount_quote);
        } else {
          baseInput.val(response.amount_base);
        }
        createOrder(e);
      }
    });
  }
}
$(".quote-input, .base-input, .wallet-address").on("input", function(e) {
  // updatePrices(e);
  callNExchange(e);
});
$(".submit").on("click", function(e) {
  e.preventDefault();
  if (paymentURL) window.open(paymentURL, "_blank");
});
