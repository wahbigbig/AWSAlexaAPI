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
/*
var options = [
  {key: 'Url', value: 'http://www.promise.com.hk'},
  {key: 'ResponseGroup', value: 'History'},
  {key: 'Start', value: '20161001'}
];
awsalexa.alexaawis_traffichistory(options, function(err, response) {
  console.log(response.text);
});
*/

var options = [
  {key: 'Url', value: 'http://www.promise.com.hk'},
  {key: 'ResponseGroup', value: 'SitesLinkingIn'},
  {key: 'Start', value: '0'}
];
awsalexa.alexaawis_traffichistory(options, function(err, response) {
  console.log(response.text);
});
