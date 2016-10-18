var express = require('express');
var router = express.Router();

var access_key = process.env.AWS_ALEXA_ACCESS_KEY || '';
var secret = process.env.AWS_ALEXA_SECRET || '';

const awsalexa = require('../../awsalexa.js')(access_key, secret);

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/traffichistory', function(req, res, next) {
    d = [];
  res.render('traffichistory', {
    awsData: d,
    url: ''
  });
});

router.post('/traffichistory', function(req, res, next) {
  var url = req.param('url');
  //var url = req.params.url;
  if (url == '') {
    res.render('traffichistory', {
    });
  } else {
    var date = new Date();
    var fullDate = new Date(date.getFullYear(), date.getMonth(), 1);
    var year = fullDate.getFullYear();
    var month = fullDate.getMonth() + 1
    if (month < 10) {
      month = "0" + month;
    }
    var day = fullDate.getDate();
    if (day < 10) {
      day = "0" + day;
    }
    var firstDay = [year, month, day].join('');
    //console.log(firstDay);
    var options = [
      {key: 'Url', value: url},
      {key: 'ResponseGroup', value: 'History'},
      {key: 'Start', value: firstDay}
    ];

    send_request(options, 0, function(err, result) {
      if (err) {
        res.send('Unknown error, please try again');
      } else {
        res.render('traffichistory', {
          awsData: result,
          url: url
        });
        console.log(result);
      }
    });

  }

  function send_request(options, count, callback) {
    if (count > 5) {
      callback(true, '');
    } else {
      awsalexa = require('../../awsalexa.js')(access_key, secret);
      awsalexa.alexaawis_traffichistory(options, function(err, response) {
        if (response.statusCode == 200) {
          var parseString = require('xml2js').parseString;
          parseString(response.text, function(err, result) {
            data = result["aws:TrafficHistoryResponse"]["aws:Response"][0]['aws:TrafficHistoryResult'][0]['aws:Alexa'][0]['aws:TrafficHistory'][0]['aws:HistoricalData'][0]['aws:Data'];
            callback(false, data);
          });
        } else {
          //try agin if response is not 200 (to be fixed for the reason of 403)
          setTimeout(function() {
            send_request(options, ++count, callback);
          }, 5000);
        }

      });
    }
  }
});



module.exports = router;
