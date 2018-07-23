var helper = require('../../src/helper');

describe('nonceStr', function() {
  test('generate nonce string', function() {
    expect(helper.nonceStr()).toMatch(/^[a-zA-Z0-9]{32}$/);
    expect(helper.nonceStr()).not.toEqual(helper.nonceStr());
  });
});

describe('toXML', function() {
  test('convert plain object to xml', function() {
    var obj = {
      mch_id: '1900000109',
      partner_trade_no: '1212121221227',
      nonce_str: '5K8264ILTKCH16CQ2502SI8ZNMTM67Vs',
      sign: 'C380BEC2BFD727A4B6845133519F3AD6'
    };
    var result = [
      '<xml>',
      '  <mch_id>1900000109</mch_id>',
      '  <partner_trade_no>1212121221227</partner_trade_no>',
      '  <nonce_str>5K8264ILTKCH16CQ2502SI8ZNMTM67Vs</nonce_str>',
      '  <sign>C380BEC2BFD727A4B6845133519F3AD6</sign>',
      '</xml>'
    ].join('\n');
    expect(helper.toXML(obj)).toEqual(result);
  });
});

describe('fromXML', function() {
  test('convert xml to plain object', function(done) {
    var xml = [
      '<xml>',
      '  <mch_id>1900000109</mch_id>',
      '  <partner_trade_no>1212121221227</partner_trade_no>',
      '  <nonce_str>5K8264ILTKCH16CQ2502SI8ZNMTM67Vs</nonce_str>',
      '  <sign>C380BEC2BFD727A4B6845133519F3AD6</sign>',
      '</xml>'
    ].join('\n');
    var result = {
      mch_id: '1900000109',
      partner_trade_no: '1212121221227',
      nonce_str: '5K8264ILTKCH16CQ2502SI8ZNMTM67Vs',
      sign: 'C380BEC2BFD727A4B6845133519F3AD6'
    };
    helper.fromXML(xml, function(err, value) {
      expect(err).toBeNull();
      expect(value).toEqual(result);
      done();
    });
  });
});

describe('missFields', function() {
  test('find missed fields', function() {
    var obj = { a: 3, b: 4, c: 5 };
    var requireFields = ['a', 'e'];
    expect(helper.checkFields(obj, requireFields)).toEqual(['e']);
  });
});

describe('sign', function() {
  test('sign with md5', function() {
    var obj = { a: 3, b: 4 };
    expect(helper.sign('MD5', obj, 'abc')).toEqual('85566166DABF8B84307C0AF0A7699366');
  });
  test('sign with sha256', function() {
    var obj = { a: 3, b: 4 };
    expect(helper.sign('HMAC-SHA256', obj, 'abc')).toEqual(
      'AAF907CA1B2239E0187A4BD73331DCD840F84748C6905B7FD857688BED84ACF7'
    );
  });
  test('no change when object key order changed', function() {
    var obj = { a: 3, b: 4 };
    var obj2 = { b: 4, a: 3 };
    expect(helper.sign('MD5', obj, 'abc')).toEqual(helper.sign('MD5', obj2, 'abc'));
  });
  test('ignore key sign', function() {
    var obj = { a: 3, b: 4, sign: '85566166DABF8B84307C0AF0A7699366' };
    var obj2 = { b: 4, a: 3 };
    expect(helper.sign('MD5', obj, 'abc')).toEqual(helper.sign('MD5', obj2, 'abc'));
  });
  test('ignore property which is undefined or null or empty string', function() {
    var obj = { a: 3, b: 4, c: undefined, d: null, e: '' };
    var obj2 = { b: 4, a: 3 };
    expect(helper.sign('MD5', obj, 'abc')).toEqual(helper.sign('MD5', obj2, 'abc'));
  });
});

describe('aes256Decode', function() {
  test('decode refund data', function() {
    var data = '/Pe2X0sgRcndZWNJQQmcPw==';
    expect(helper.aes256Decode('6Q9VX4N3WTBM9G9XBL7H1L9PB9ANHLY8', data)).toEqual('{"a":3}');
  });
});

describe('rsaEncrypt', function() {
  test('encrypt data with rsa', function() {
    var pemKey = [
      '-----BEGIN RSA PUBLIC KEY-----',
      'MIIBCgKCAQEArT82k67xybiJS9AD8nNAeuDYdrtCRaxkS6cgs8L9h83eqlDTlrdw',
      'zBVSv5V4imTq/URbXn4K0V/KJ1TwDrqOI8hamGB0fvU13WW1NcJuv41RnJVua0QA',
      'lS3tS1JzOZpMS9BEGeFvyFF/epbi/m9+2kUWG94FccArNnBtBqqvFncXgQsm98JB',
      '3a62NbS1ePP/hMI7Kkz+JNMyYsWkrOUFDCXAbSZkWBJekY4nGZtK1erqGRve8Jbx',
      'TWirAm/s08rUrjOuZFA21/EI2nea3DidJMTVnXVPY2qcAjF+595shwUKyTjKB8v1',
      'REPB3hPF1Z75O6LwuLfyPiCrCTmVoyfqjwIDAQAB',
      '-----END RSA PUBLIC KEY-----'
    ].join('\n');
    var data = '张三';
    expect(helper.rsaEncrypt(pemKey, data)).toBeDefined();
  });
});

describe('createError', function() {
  test('create error with name, message, extra', function() {
    var name = 'UnexpectError';
    var message = 'Something wrong';
    var extra = {};
    var err = helper.createError(name, message, extra);
    expect(err).toBeInstanceOf(Error);
    expect(err.name).toBe(name);
    expect(err.message).toBe(message);
    expect(err.extra).toBe(extra);
  });
});

describe('wrapError', function() {
  test('rename error and add some extra info', function() {
    var message = 'Something wrong';
    var extra = {};
    var err = new Error(message);
    var wrapedError = helper.wrapError(err, 'WrapError', extra);
    expect(wrapedError).toBeInstanceOf(Error);
    expect(wrapedError.name).toBe('WrapError');
    expect(wrapedError.message).toBe(message);
    expect(wrapedError.extra).toBe(extra);
  });
});
