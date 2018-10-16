<!-- 
API Key: 66a378a2cbd74b6abf131ae3927c2f6b 
Secret: cfb117c959bf46d5ab1125bf5064212e
-->

<?php

$apikey='66a378a2cbd74b6abf131ae3927c2f6b';
$apisecret='cfb117c959bf46d5ab1125bf5064212e';

function bittrexballance($apikey, $apisecret){
    $nonce=time(); 
    $uri='https://bittrex.com/api/v1.1/account/getbalance?apikey='.$apikey. '&currency=BTC&nonce='.$nonce; 
    $sign=hash_hmac('sha512',$uri,$apisecret); 
    $ch = curl_init($uri); 
        curl_setopt($ch, CURLOPT_HTTPHEADER, array('apisign:'.$sign));
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    $execResult = curl_exec($ch); 
    $obj = json_decode($execResult, true);
    $balance = $obj["result"]["Available"];
    return $balance;
}

function bittrexbuy($apikey, $apisecret, $symbol, $quant, $rate){
    $nonce=time(); 
    $uri='https://bittrex.com/api/v1.1/market/buylimit?apikey='.$apikey. '&market=BTC-'.$symbol.'&quantity='.$quant.'&rate='.$rate.'&nonce='.$nonce; 
    $sign=hash_hmac('sha512',$uri,$apisecret); 
    $ch = curl_init($uri); 
        curl_setopt($ch, CURLOPT_HTTPHEADER, array('apisign:'.$sign));
    $execResult = curl_exec($ch); 
    $obj = json_decode($execResult, true);
    return $obj;
}



// coinmarketcap api
$cnmkt = "https://api.coinmarketcap.com/v2/ticker/?limit=50"; //getting top 50 cryptos from coinmarket cap
$fgc = json_decode(file_get_contents($cnmkt), true);
$counter = 0;
for($i = 0; i < 50; $i++) //creating a loop to go through top 50 coins
        if($counter < 4){  //checking for the top 3 coins 
            $percentChange = $fgc[$i]["percent_change_7d"];//to see if the percentage changed over the last 7 days
            if($percentChange < 4 && $percentChange > -4){
                $symbol = $fgc[$i]["symbol"];
                $cost = $fgc[$i]["price_btc"];
                //figure out how much of this can we buy? so we need to get our balance from bittrex,
                //...then divide a certain amount(for this, let's put in 1/5th of our balance into each one.)
                //so we'll divide it by a 1/5th then we'll divide that 1/5th amount by the $cost.
                //then we'll know how much of whatever symbol this is that we want to add to our portfolio.
                $balance = bittrexballance($apikey, $apisecret);
                $fifthBal = $balance / 5;
                $amountToBuy = $fifthBal / $cost;
                $buy = bittrexbuy($apikey, $apisecret, $symbol, $amountToBuy, $cost);
                print_r($buy);
                $counter++;
            }
            
        }
?>