$(document).ready(function() {
    setParams('BTC', 'USD', 'monthly'); // sets query parameters for Bitcoin Average API
    updateChart(); // renders the chart
});


$('#submit').on('click', function() {
    setParams($('#cryptoDrop').val(),$('#currencyDrop').val(),'monthly');
    updateChart();
});
