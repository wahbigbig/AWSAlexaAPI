#!/usr/bin/env node
var access_key = process.env.AWS_ALEXA_ACCESS_KEY || '';
var secret = process.env.AWS_ALEXA_SECRET || '';

var awsalexa = require('./awsalexa.js')(access_key, secret);

/*
var options = [
  {key: 'ResponseGroup', value: 'Country'},
  {key: 'Start', value: 1},
  {key: 'Count', value: 10},
  {key: 'CountryCode', value: 'HK'}
];
awsalexa.alexatopsite(options, function(err, response) {
  console.log(response.text);
});
*/

/*
  response group options:
  http://docs.aws.amazon.com/AlexaWebInfoService/latest/
*/
/*
var options = [
  {key: 'Url', value: 'http://www.promise.com.hk'},
  {key: 'ResponseGroup', value: 'Related'}
];
awsalexa.alexawis_urlinfo(options, function(err, response) {
  console.log(response.text);
});
*/


var options = [
  {key: 'Url', value: 'http://www.promise.com.hk'},
  {key: 'ResponseGroup', value: 'History'},
  {key: 'Start', value: '20161001'}
];

send_request(options, 0, function(err, result) {
  if (err) {
    console.log('Unknown error, please try again');
  } else {
    console.log('done');
    console.log(data);
  }
});

function send_request(options, count, callback) {
  if (count > 5) {
    callback(true, '');
  } else {
    awsalexa.alexaawis_traffichistory(options, function(err, response) {
      console.log(response.statusCode);
      if (response.statusCode == 200) {
        var parseString = require('xml2js').parseString;
        parseString(response.text, function(err, result) {
          data = result["aws:TrafficHistoryResponse"]["aws:Response"][0]['aws:TrafficHistoryResult'][0]['aws:Alexa'][0]['aws:TrafficHistory'][0]['aws:HistoricalData'][0]['aws:Data'];
          callback(false, data);
        });
      } else {
        //try agin if response is not 200 (to be fixed for the reason of 403)
        console.log(response.statusCode);
        setTimeout(function() {
          send_request(options, ++count, callback);
        }, 5000);
      }

    });
  }
}

/*
var options = [
  {key: 'Url', value: 'http://www.promise.com.hk'},
  {key: 'ResponseGroup', value: 'SitesLinkingIn'},
  {key: 'Start', value: '0'}
];
awsalexa.alexawis_siteslinkingin(options, function(err, response) {
  console.log(response.text);
});
*/
