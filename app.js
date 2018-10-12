$(document).ready(function() {
    setParams('BTC', 'USD', 'monthly'); // sets query parameters for Bitcoin Average API
    updateChart(); // renders the chart
});


//dynamically adding the currencys to the drop down menu:

const renderCurrencies = function (){
    $(".dropdown").empty();
    for(let i = 0; i < currencies.length; i++){
        const currencyBtn = $("<option>");
        currencyBtn.text(currencies[i]);
        $(".dropdown").append(currencyBtn);
    }
}

