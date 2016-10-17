var crypto = require('crypto');
var request = require('superagent');

module.exports = function(access_key, secret) {

  function alexatopsite(options, callback) {
    var endpoint = 'ats.amazonaws.com';
    options.push({key: 'Action', value: 'TopSites'});
    options.push({key: 'AWSAccessKeyId', value: access_key});
    options.push({key: 'Timestamp', value: new Date().toISOString()});
    options.push({key: 'SignatureVersion', value: 2});
    options.push({key: 'SignatureMethod', value: 'HmacSHA1'});
    process(endpoint, options, callback);
  }

  function alexawis_urlinfo(options, callback) {
    var endpoint = 'awis.amazonaws.com';
    options.push({key: 'Action', value: 'UrlInfo'});
    options.push({key: 'AWSAccessKeyId', value: access_key});
    options.push({key: 'Timestamp', value: new Date().toISOString()});
    options.push({key: 'SignatureVersion', value: 2});
    options.push({key: 'SignatureMethod', value: 'HmacSHA1'});
    process(endpoint, options, callback);
  }

  function alexaawis_traffichistory(options, callback) {
    var endpoint = 'awis.amazonaws.com';
    options.push({key: 'Action', value: 'TrafficHistory'});
    options.push({key: 'AWSAccessKeyId', value: access_key});
    options.push({key: 'Timestamp', value: new Date().toISOString()});
    options.push({key: 'SignatureVersion', value: 2});
    options.push({key: 'SignatureMethod', value: 'HmacSHA1'});
    process(endpoint, options, callback);
  }

  function alexawis_siteslinkingin(options, callback) {
    var endpoint = 'awis.amazonaws.com';
    options.push({key: 'Action', value: 'SitesLinkingIn'});
    options.push({key: 'AWSAccessKeyId', value: access_key});
    options.push({key: 'Timestamp', value: new Date().toISOString()});
    options.push({key: 'SignatureVersion', value: 2});
    options.push({key: 'SignatureMethod', value: 'HmacSHA1'});
    process(endpoint, options, callback);
  }

  function process(endpoint, options, callback) {
    var encryption = '';

    options.map(function(obj) {
      if (obj.key == "SignatureMethod") {
        switch (obj.value) {
          case 'HmacSHA1':
            encryption = 'sha1';
            break;
            case'HmacSHA256':
            encryption ='sha256'
            break;
          default:
            encryption = 'sha1';
            obj.value = 'HmacSHA1';
        }
      }
    });

    //sort params in alphabet order
    var params = options.sort(function(a, b) {
      var keyA = a.key, keyB = b.key;
      if (keyA < keyB) {
        return -1;
      }
      if (keyB < keyA) {
        return 1;
      }
      return 0;
    });

    //convert params to query
    var query = params.map(function(obj) {
      return obj.key + "=" + encodeURIComponent(obj.value);
    }).join('&');

    var sign_str = "GET\n" + endpoint + "\n/\n" + query;
    //encrypt with SHA1 or SHA256 according to the options
    var signature = crypto.createHmac(encryption, secret).update(sign_str).digest('base64');
    var url = "http://" + endpoint + "/?" + (query) + "&Signature=" + signature;
    //console.log(url);
    request.get(url).end(function(err, res) {
      callback(err, res);
    });
  }

  return {
    alexatopsite: alexatopsite,
    alexawis_urlinfo: alexawis_urlinfo,
    alexaawis_traffichistory: alexaawis_traffichistory
  }
}
