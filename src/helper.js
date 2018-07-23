'use strict';

var xml2js = require('xml2js');
var crypto = require('crypto');
var buffer = require('buffer');
var universalify = require('universalify');

exports.nonceStr = function(length) {
  var chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  var len = chars.length;
  var nonceStr = '';
  for (var i = 0; i < (length || 32); i++) {
    nonceStr += chars.charAt(Math.floor(Math.random() * len));
  }
  return nonceStr;
};

exports.toXML = function(json) {
  var builder = new xml2js.Builder({
    rootName: 'xml',
    headless: true
  });
  return builder.buildObject(json);
};

exports.fromXML = universalify.fromCallback(function(str, callback) {
  var parser = new xml2js.Parser({
    trim: true,
    explicitArray: false,
    explicitRoot: false
  });
  parser.parseString(str, callback);
});

exports.checkFields = function(obj, requireFields) {
  var missFields = [];
  for (var i = 0; i < requireFields.length; i++) {
    var field = requireFields[i];
    if (obj.hasOwnProperty(field)) {
      continue;
    }
    missFields.push(field);
  }
  return missFields;
};

exports.sign = function(signMethod, data, secretKey) {
  let qs = Object.keys(data)
    .filter(function(key) {
      return (
        key !== 'sign' && data.hasOwnProperty(key) && data[key] !== undefined && data[key] !== null && data[key] !== ''
      );
    })
    .sort()
    .map(function(key) {
      return key + '=' + data[key];
    })
    .join('&');

  qs += '&key=' + secretKey;

  return exports.signMethods[signMethod](qs, secretKey).toUpperCase();
};

// 退款结果解密
exports.aes256Decode = function(secret, base64Data) {
  var key = exports.signMethods['MD5'](secret).toLowerCase();
  var decipher = crypto.createDecipheriv('aes-256-ecb', key, '');
  decipher.setAutoPadding(true);

  var decipherChunks = [];
  decipherChunks.push(decipher.update(base64Data, 'base64', 'utf8'));
  decipherChunks.push(decipher.final('utf8'));
  return decipherChunks.join('');
};

exports.rsaEncrypt = function(pemKey, data) {
  var encrypted = crypto.publicEncrypt(pemKey, buffer.Buffer.from(data));
  return encrypted.toString('base64');
};

exports.signMethods = {
  'HMAC-SHA256': function(data, secret) {
    return crypto
      .createHmac('sha256', secret)
      .update(data)
      .digest('hex');
  },
  MD5: function(data) {
    return crypto
      .createHash('md5')
      .update(data)
      .digest('hex');
  }
};

exports.createError = function(name, message, extra) {
  var err = new Error(message);
  err.name = name;
  err.extra = extra;
  return err;
};

exports.wrapError = function(err, name, extra) {
  err.name = name;
  err.extra = extra;
  return err;
};
