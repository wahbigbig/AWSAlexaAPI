var express = require('express');
var router = express.Router();

var access_key = process.env.AWS_ALEXA_ACCESS_KEY || '';
var secret = process.env.AWS_ALEXA_SECRET || '';

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/traffichistory', function(req, res, next) {
  res.render('traffichistory', {
  });
});

router.post('/traffichistory', function(req, res, next) {
  var url = req.param('url');
  if (url == '') {
    res.render('traffichistory', {
    });
  } else {
    var awsalexa = require('../../awsalexa.js')(access_key, secret);
    var options = [
      {key: 'Url', value: 'http://www.promise.com.hk'},
      {key: 'ResponseGroup', value: 'History'},
      {key: 'Start', value: '20161001'}
    ];
    awsalexa.alexaawis_traffichistory(options, function(err, response) {
      //console.log(response.text);
      res.send(response.text);
    });


  }
  /*
  res.render('traffichistory', {
    title: 'AWS Alexa Web Information Service'
  });
  */
});

module.exports = router;
