let APIkey='OWE2NmUyZDk5MDllNGUwYWJkZWJiYTlhYWQ1ZDVjZjc'
let queryString=`${Date.now()}.${APIkey}`
let secretApi='MmQ3NzMzZDQzNDIxNDIyZjk5MWFhMmU0MjQ4MzVmMTM0NjgyZTNmMzcwMGE0YzZhYmNmOWM1NWU3MDYyNGI1ZQ'
const queryUrl=`https://apiv2.bitcoinaverage.com/indices/global/ticker/all?crypto={crypto}&fiat={fiat}`

const getBit=function(){
    $.ajax({
        url:queryURL,
        method: 'GET'
    }).then(function(response){

    });
}