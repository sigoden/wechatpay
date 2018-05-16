var Pay = require("../../src/pay");
var path = require("path");
var fs = require("fs");
var request = require("request");

request.post = jest.fn(function(options, callback) {
  callback(null, null, options.body);
});

Pay.helper.nonceStr = jest.fn(function() {
  return "6LSB219WG129E3OLD9JOT1QA5RSOTBHA";
});

beforeEach(function() {
  jest.clearAllMocks();
});

describe("Pay", function() {
  test("constructor", function() {
    var pay = initPay();
    expect(pay.appid).toBe("wxb80e5bddb2d804f3");
    expect(pay.mch_id).toBe("1424712502");
    expect(pay.key).toBe("6Q9VX4N3WTBM9G9XBL7H1L9PB9ANHLY8");
    expect(pay.pfx).toBeDefined();
    expect(pay.debug).toBe(false);
    expect(pay.sign_type).toBe("MD5");
  });
  test("methods", function() {
    var pay = initPay();
    expect(pay.micropay).toBeDefined();
    expect(pay.microPay).toBeDefined();
    expect(pay.reverse).toBeDefined();
    expect(pay.shorturl).toBeDefined();
    expect(pay.shortUrl).toBeDefined();
    expect(pay.shortURL).toBeDefined();
    expect(pay.authcodetoopenid).toBeDefined();
    expect(pay.authCodeToOpenId).toBeDefined();
    expect(pay.unifiedorder).toBeDefined();
    expect(pay.unifiedOrder).toBeDefined();
    expect(pay.tidyOrderResult).toBeDefined();
    expect(pay.orderquery).toBeDefined();
    expect(pay.orderQuery).toBeDefined();
    expect(pay.closeorder).toBeDefined();
    expect(pay.closeOrder).toBeDefined();
    expect(pay.refund).toBeDefined();
    expect(pay.refundquery).toBeDefined();
    expect(pay.refundQuery).toBeDefined();
    expect(pay.downloadbill).toBeDefined();
    expect(pay.downloadBill).toBeDefined();
    expect(pay.downloadfundflow).toBeDefined();
    expect(pay.downloadFundFlow).toBeDefined();
    expect(pay.report).toBeDefined();
    expect(pay.batchquerycomment).toBeDefined();
    expect(pay.batchQueryComment).toBeDefined();
    expect(pay.send_coupon).toBeDefined();
    expect(pay.sendCoupon).toBeDefined();
    expect(pay.sendcoupon).toBeDefined();
    expect(pay.query_coupon_stock).toBeDefined();
    expect(pay.querycouponstock).toBeDefined();
    expect(pay.queryCouponStock).toBeDefined();
    expect(pay.querycouponsinfo).toBeDefined();
    expect(pay.queryCouponsInfo).toBeDefined();
    expect(pay.sendredpack).toBeDefined();
    expect(pay.sendRedPack).toBeDefined();
    expect(pay.sendgroupredpack).toBeDefined();
    expect(pay.sendGroupRedPack).toBeDefined();
    expect(pay.gethbinfo).toBeDefined();
    expect(pay.getHbInfo).toBeDefined();
    expect(pay.transfers).toBeDefined();
    expect(pay.gettransferinfo).toBeDefined();
    expect(pay.getTransferInfo).toBeDefined();
    expect(pay.getpublickey).toBeDefined();
    expect(pay.getPublicKey).toBeDefined();
    expect(pay.query_bank).toBeDefined();
    expect(pay.queryBank).toBeDefined();
    expect(pay.querybank).toBeDefined();
    expect(pay.pay_bank).toBeDefined();
    expect(pay.payBank).toBeDefined();
    expect(pay.paybank).toBeDefined();
  });
});

describe("micropay", function() {
  test("full options", function(done) {
    var pay = initPay();
    var options = {
      device_info: "013467007045764",
      body: "深圳腾大- QQ公仔",
      detail:
        '{"cost_price":1,"receipt_id":"wx123","goods_detail":[{"goods_id":"商品编码","wxpay_goods_id":"1001","goods_name":"iPhone6s 16G","quantity":1,"price":1},{"goods_id":"商品编码","wxpay_goods_id":"1002","goods_name":"iPhone6s 32G","quantity":1,"price":1}]}',
      attach: "订单额外描述",
      out_trade_no: "1217752501201407033233368018",
      total_fee: 888,
      fee_type: "CNY",
      spbill_create_ip: "8.8.8.8",
      goods_tag: "1234",
      limit_pay: "no_credit",
      time_start: "20091225091010",
      time_expire: "20091227091010",
      auth_code: "120061098828009406",
      scene_info:
        '{"store_info":{"id":"SZTX001","name":"腾大餐厅","area_code":"440305","address":"科技园中一路腾讯大厦"}}'
    };
    pay.micropay(options, function(err, body) {
      if (err) return done(err);
      var requestOptions = request.post.mock.calls[0][0];
      expect(Pay.helper.sign(pay.sign_type, body, pay.key)).toEqual(body.sign);
      expect(requestOptions.url).toBe(
        "https://api.mch.weixin.qq.com/pay/micropay"
      );
      expect(requestOptions.agentOptions).toBeUndefined();
      done();
    });
  });
  test("mini options", function(done) {
    var pay = initPay();
    var options = {
      device_info: "013467007045764",
      body: "深圳腾大- QQ公仔",
      out_trade_no: "1217752501201407033233368018",
      total_fee: 888,
      spbill_create_ip: "8.8.8.8",
      auth_code: "120061098828009406"
    };
    pay.micropay(options, done);
  });
  test("miss fields", function(done) {
    var pay = initPay();
    var options = {};
    pay.micropay(options, function(err) {
      expect(err.message).toMatch(
        "miss fields body,device_info,out_trade_no,total_fee,spbill_create_ip,auth_code"
      );
      done();
    });
  });
});

describe("reverse", function() {
  test("string options", function(done) {
    var pay = initPay();
    var options = "1217752501201407033233368018";
    pay.reverse(options, function(err, body) {
      if (err) return done(err);
      var requestOptions = request.post.mock.calls[0][0];
      expect(Pay.helper.sign(pay.sign_type, body, pay.key)).toEqual(body.sign);
      expect(requestOptions.url).toBe(
        "https://api.mch.weixin.qq.com/secapi/pay/reverse"
      );
      expect(requestOptions.agentOptions).toBeDefined();
      done();
    });
  });
  test("options out_trade_no", function(done) {
    var pay = initPay();
    var options = {
      out_trade_no: "1217752501201407033233368018"
    };
    pay.reverse(options, done);
  });
  test("options transaction_id", function(done) {
    var pay = initPay();
    var options = {
      transaction_id: "1217752501201407033233368018"
    };
    pay.reverse(options, done);
  });
  test("miss fields", function(done) {
    var pay = initPay();
    var options = {};
    pay.reverse(options, function(err) {
      expect(err.message).toMatch("required transaction_id or out_trade_no");
      done();
    });
  });
});

describe("shorturl", function() {
  test("string options", function(done) {
    var pay = initPay();
    var options =
      "weixin://wxpay/bizpayurl?sign=XXXXX&appid=XXXXX&mch_id=XXXXX&product_id=XXXXXX&time_stamp=XXXXXX&nonce_str=XXXXX";
    pay.shorturl(options, function(err, body) {
      if (err) return done(err);
      var requestOptions = request.post.mock.calls[0][0];
      expect(Pay.helper.sign(pay.sign_type, body, pay.key)).toEqual(body.sign);
      expect(requestOptions.url).toBe(
        "https://api.mch.weixin.qq.com/tools/shorturl"
      );
      expect(requestOptions.agentOptions).toBeUndefined();
      done();
    });
  });
  test("options long_url", function(done) {
    var pay = initPay();
    var options = {
      long_url:
        "weixin://wxpay/bizpayurl?sign=XXXXX&appid=XXXXX&mch_id=XXXXX&product_id=XXXXXX&time_stamp=XXXXXX&nonce_str=XXXXX"
    };
    pay.shorturl(options, done);
  });
  test("miss fields", function(done) {
    var pay = initPay();
    var options = {};
    pay.shorturl(options, function(err) {
      expect(err.message).toMatch("required long_url");
      done();
    });
  });
});

describe("authcodetoopenid", function() {
  test("string options", function(done) {
    var pay = initPay();
    var options = "120061098828009406";
    pay.authcodetoopenid(options, function(err, body) {
      if (err) return done(err);
      var requestOptions = request.post.mock.calls[0][0];
      expect(Pay.helper.sign(pay.sign_type, body, pay.key)).toEqual(body.sign);
      expect(requestOptions.url).toBe(
        "https://api.mch.weixin.qq.com/tools/authcodetoopenid"
      );
      expect(requestOptions.agentOptions).toBeUndefined();
      done();
    });
  });
  test("options auth_code", function(done) {
    var pay = initPay();
    var options = {
      auth_code: "120061098828009406"
    };
    pay.authcodetoopenid(options, done);
  });
  test("miss fields", function(done) {
    var pay = initPay();
    var options = {};
    pay.authcodetoopenid(options, function(err) {
      expect(err.message).toMatch("required auth_code");
      done();
    });
  });
});

describe("unifiedorder", function() {
  test("full options", function(done) {
    var pay = initPay();
    var options = {
      body: "腾讯充值中心-QQ会员充值",
      detail:
        '{"cost_price":1,"receipt_id":"wx123","goods_detail":[{"goods_id":"商品编码","wxpay_goods_id":"1001","goods_name":"iPhone6s 16G","quantity":1,"price":1},{"goods_id":"商品编码","wxpay_goods_id":"1002","goods_name":"iPhone6s 32G","quantity":1,"price":1}]}',
      attach: "订单额外描述",
      out_trade_no: "1217752501201407033233368018",
      fee_type: "CNY",
      total_fee: 888,
      spbill_create_ip: "8.8.8.8",
      time_start: "20091225091010",
      time_expire: "20091227091010",
      goods_tag: "1234",
      notify_url: "https://example.com/wechatpay/notify",
      trade_type: "JSAPI",
      product_id: "12235413214070356458058",
      limit_pay: "no_credit",
      openid: "oUpF8uMuAJO_M2pxb1Q9zNjWeS6o",
      scene_info:
        '{"store_info":{"id":"SZTX001","name":"腾大餐厅","area_code":"440305","address":"科技园中一路腾讯大厦"}}'
    };
    pay.unifiedorder(options, function(err, body) {
      if (err) return done(err);
      var requestOptions = request.post.mock.calls[0][0];
      expect(Pay.helper.sign(pay.sign_type, body, pay.key)).toEqual(body.sign);
      expect(requestOptions.url).toBe(
        "https://api.mch.weixin.qq.com/pay/unifiedorder"
      );
      expect(requestOptions.agentOptions).toBeUndefined();
      done();
    });
  });
  test("mini options - JSAPI", function(done) {
    var pay = initPay();
    var options = {
      body: "腾讯充值中心-QQ会员充值",
      out_trade_no: "1217752501201407033233368018",
      total_fee: 888,
      spbill_create_ip: "8.8.8.8",
      notify_url: "https://example.com/wechatpay/notify",
      trade_type: "JSAPI",
      openid: "oUpF8uMuAJO_M2pxb1Q9zNjWeS6o"
    };
    pay.unifiedorder(options, done);
  });
  test("mini options - NATIVE", function(done) {
    var pay = initPay();
    var options = {
      body: "腾讯充值中心-QQ会员充值",
      out_trade_no: "1217752501201407033233368018",
      total_fee: 888,
      spbill_create_ip: "8.8.8.8",
      notify_url: "https://example.com/wechatpay/notify",
      product_id: "1324",
      trade_type: "NATIVE"
    };
    pay.unifiedorder(options, done);
  });
  test("mini options - APP", function(done) {
    var pay = initPay();
    var options = {
      body: "腾讯充值中心-QQ会员充值",
      out_trade_no: "1217752501201407033233368018",
      total_fee: 888,
      spbill_create_ip: "8.8.8.8",
      notify_url: "https://example.com/wechatpay/notify",
      trade_type: "APP"
    };
    pay.unifiedorder(options, done);
  });
  test("mini options - MWEB", function(done) {
    var pay = initPay();
    var options = {
      body: "腾讯充值中心-QQ会员充值",
      out_trade_no: "1217752501201407033233368018",
      total_fee: 888,
      spbill_create_ip: "8.8.8.8",
      notify_url: "https://example.com/wechatpay/notify",
      trade_type: "MWEB",
      scene_info:
        '{"store_info":{"id":"SZTX001","name":"腾大餐厅","area_code":"440305","address":"科技园中一路腾讯大厦"}}'
    };
    pay.unifiedorder(options, done);
  });
  test("invalid trade_type", function(done) {
    var pay = initPay();
    var options = { trade_type: "APPP" };
    pay.unifiedorder(options, function(err) {
      expect(err.message).toMatch("unsupported trade_type APPP");
      done();
    });
  });
  test("miss fields", function(done) {
    var pay = initPay();
    var options = { trade_type: "JSAPI" };
    pay.unifiedorder(options, function(err) {
      expect(err.message).toMatch(
        "miss fields body,out_trade_no,total_fee,spbill_create_ip,notify_url,openid"
      );
      done();
    });
  });
});

describe("tidyOrderResult", function() {
  test("result - NATIVE", function() {
    var pay = initPay();
    var value = {
      return_code: "SUCCESS",
      result_code: "SUCCESS",
      prepare_id: "wx201411101639507cbf6ffd8b0779950874",
      trade_type: "NATIVE",
      code_url: "weixin://wxpay/s/An4baqw"
    };
    var result = pay.tidyOrderResult(value);
    expect(result).toEqual({ code_url: value.code_url });
  });
  test("result - JSAPI", function() {
    var pay = initPay();
    var value = {
      return_code: "SUCCESS",
      result_code: "SUCCESS",
      prepare_id: "wx201411101639507cbf6ffd8b0779950874",
      trade_type: "JSAPI"
    };
    var result = pay.tidyOrderResult(value);
    expect(Object.keys(result)).toEqual([
      "appId",
      "timeStamp",
      "nonceStr",
      "package",
      "signType",
      "paySign"
    ]);
  });
  test("result - MWEB", function() {
    var pay = initPay();
    var value = {
      return_code: "SUCCESS",
      result_code: "SUCCESS",
      prepare_id: "wx201411101639507cbf6ffd8b0779950874",
      trade_type: "MWEB",
      mweb_url:
        "https://wx.tenpay.com/cgi-bin/mmpayweb-bin/checkmweb?prepay_id=wx2016121516420242444321ca0631331346&package=1405458241"
    };
    var result = pay.tidyOrderResult(value);
    expect(result).toEqual({ mweb_url: value.mweb_url });
  });
  test("result - APP", function() {
    var pay = initPay();
    var value = {
      return_code: "SUCCESS",
      result_code: "SUCCESS",
      prepare_id: "wx201411101639507cbf6ffd8b0779950874",
      trade_type: "APP"
    };
    var result = pay.tidyOrderResult(value);
    expect(Object.keys(result)).toEqual([
      "appid",
      "partnerid",
      "prepareid",
      "package",
      "noncestr",
      "timestamp",
      "sign"
    ]);
  });
  test("error - return_code = FAIL", function() {
    var pay = initPay();
    var value = {
      return_code: "FAIL",
      return_msg: "Something wrong"
    };
    expect(function() {
      pay.tidyOrderResult(value);
    }).toThrow("Something wrong");
  });
  test("error - result_code = FAIL", function() {
    var pay = initPay();
    var value = {
      return_code: "SUCCESS",
      result_code: "FAIL",
      err_code: "SYSTEMERROR",
      err_code_des: "	系统错误"
    };
    expect(function() {
      pay.tidyOrderResult(value);
    }).toThrow("系统错误");
  });
  test("error - unsupported trade_type", function() {
    var pay = initPay();
    var value = {
      return_code: "SUCCESS",
      result_code: "SUCCESS",
      trade_type: "APPP"
    };
    expect(function() {
      pay.tidyOrderResult(value);
    }).toThrow("unsupported trade_type APPP");
  });
});

describe("orderquery", function() {
  test("string options", function(done) {
    var pay = initPay();
    var options = "120061098828009406";
    pay.orderquery(options, function(err, body) {
      if (err) return done(err);
      var requestOptions = request.post.mock.calls[0][0];
      expect(Pay.helper.sign(pay.sign_type, body, pay.key)).toEqual(body.sign);
      expect(requestOptions.url).toBe(
        "https://api.mch.weixin.qq.com/pay/orderquery"
      );
      expect(requestOptions.agentOptions).toBeUndefined();
      done();
    });
  });
  test("options out_trade_no", function(done) {
    var pay = initPay();
    var options = {
      out_trade_no: "120061098828009406"
    };
    pay.orderquery(options, done);
  });
  test("options transaction_id", function(done) {
    var pay = initPay();
    var options = {
      transaction_id: "120061098828009406"
    };
    pay.orderquery(options, done);
  });
  test("miss fields", function(done) {
    var pay = initPay();
    var options = {};
    pay.orderquery(options, function(err) {
      expect(err.message).toMatch("required transaction_id or out_trade_no");
      done();
    });
  });
});

describe("closeorder", function() {
  test("string options", function(done) {
    var pay = initPay();
    var options = "120061098828009406";
    pay.closeorder(options, function(err, body) {
      if (err) return done(err);
      var requestOptions = request.post.mock.calls[0][0];
      expect(Pay.helper.sign(pay.sign_type, body, pay.key)).toEqual(body.sign);
      expect(requestOptions.url).toBe(
        "https://api.mch.weixin.qq.com/pay/closeorder"
      );
      expect(requestOptions.agentOptions).toBeUndefined();
      done();
    });
  });
  test("options out_trade_no", function(done) {
    var pay = initPay();
    var options = {
      out_trade_no: "120061098828009406"
    };
    pay.closeorder(options, done);
  });
  test("miss fields", function(done) {
    var pay = initPay();
    var options = {};
    pay.closeorder(options, function(err) {
      expect(err.message).toMatch("required transaction_id or out_trade_no");
      done();
    });
  });
});

describe("refund", function() {
  test("full options", function(done) {
    var pay = initPay();
    var options = {
      out_trade_no: "1217752501201407033233368018",
      out_refund_no: "1217752501201407033233368019",
      total_fee: 100,
      refund_fee: 100,
      refund_fee_type: "CNY",
      refund_desc: "商品已售完",
      refund_account: "REFUND_SOURCE_RECHARGE_FUNDS",
      notify_url: "https://example.com/wechatpay/notify"
    };
    pay.refund(options, function(err, body) {
      if (err) return done(err);
      var requestOptions = request.post.mock.calls[0][0];
      expect(Pay.helper.sign(pay.sign_type, body, pay.key)).toEqual(body.sign);
      expect(requestOptions.url).toBe(
        "https://api.mch.weixin.qq.com/secapi/pay/refund"
      );
      expect(requestOptions.agentOptions).toBeDefined();
      done();
    });
  });
  test("mini options", function(done) {
    var pay = initPay();
    var options = {
      out_trade_no: "1217752501201407033233368018",
      out_refund_no: "1217752501201407033233368019",
      total_fee: 100,
      refund_fee: 80
    };
    pay.refund(options, done);
  });
  test("mini options transaction_id", function(done) {
    var pay = initPay();
    var options = {
      transaction_id: "1217752501201407033233368018",
      out_refund_no: "1217752501201407033233368019",
      total_fee: 100,
      refund_fee: 80
    };
    pay.refund(options, done);
  });
  test("miss fields transaction_id or out_trade_no", function(done) {
    var pay = initPay();
    var options = {};
    pay.refund(options, function(err) {
      expect(err.message).toMatch("required transaction_id or out_trade_no");
      done();
    });
  });
  test("miss fields", function(done) {
    var pay = initPay();
    var options = { out_trade_no: "20150806125346	" };
    pay.refund(options, function(err) {
      expect(err.message).toMatch(
        "miss fields total_fee,refund_fee,out_refund_no"
      );
      done();
    });
  });
});

describe("refundquery", function() {
  test("string options", function(done) {
    var pay = initPay();
    var options = "120061098828009406";
    pay.refundquery(options, function(err, body) {
      if (err) return done(err);
      var requestOptions = request.post.mock.calls[0][0];
      expect(Pay.helper.sign(pay.sign_type, body, pay.key)).toEqual(body.sign);
      expect(requestOptions.url).toBe(
        "https://api.mch.weixin.qq.com/pay/refundquery"
      );
      expect(requestOptions.agentOptions).toBeUndefined();
      done();
    });
  });
  test("options out_trade_no", function(done) {
    var pay = initPay();
    var options = {
      out_trade_no: "120061098828009406"
    };
    pay.refundquery(options, done);
  });
  test("options transaction_id", function(done) {
    var pay = initPay();
    var options = {
      transaction_id: "120061098828009406"
    };
    pay.refundquery(options, done);
  });
  test("options out_refund_no", function(done) {
    var pay = initPay();
    var options = {
      out_refund_no: "120061098828009406"
    };
    pay.refundquery(options, done);
  });
  test("options refund_id", function(done) {
    var pay = initPay();
    var options = {
      refund_id: "120061098828009406"
    };
    pay.refundquery(options, done);
  });
  test("options with offset", function(done) {
    var pay = initPay();
    var options = {
      out_trade_no: "120061098828009406",
      offset: 15
    };
    pay.refundquery(options, done);
  });
  test("miss fields", function(done) {
    var pay = initPay();
    var options = {};
    pay.refundquery(options, function(err) {
      expect(err.message).toMatch(
        "required transaction_id or out_trade_no or out_refund_no or refund_id"
      );
      done();
    });
  });
});

describe("downloadbill", function() {
  test("full options", function(done) {
    var pay = initPay();
    var options = {
      bill_date: "20140603",
      bill_type: "ALL",
      tar_type: "GZIP"
    };
    pay.downloadbill(options, function(err, body) {
      if (err) return done(err);
      var requestOptions = request.post.mock.calls[0][0];
      expect(Pay.helper.sign(pay.sign_type, body, pay.key)).toEqual(body.sign);
      expect(requestOptions.url).toBe(
        "https://api.mch.weixin.qq.com/pay/downloadbill"
      );
      expect(requestOptions.agentOptions).toBeUndefined();
      done();
    });
  });
  test("mini options", function(done) {
    var pay = initPay();
    var options = {
      bill_date: "20140603",
      bill_type: "ALL"
    };
    pay.downloadbill(options, done);
  });
  test("miss fields", function(done) {
    var pay = initPay();
    var options = {};
    pay.downloadbill(options, function(err) {
      expect(err.message).toMatch("miss fields bill_date,bill_type");
      done();
    });
  });
});

describe("downloadfundflow", function() {
  test("full options", function(done) {
    var pay = initPay();
    var options = {
      bill_date: "20140603",
      account_type: "Basic",
      tar_type: "GZIP"
    };
    pay.downloadfundflow(options, function(err, body) {
      if (err) return done(err);
      var requestOptions = request.post.mock.calls[0][0];
      expect(Pay.helper.sign(body.sign_type, body, pay.key)).toEqual(body.sign);
      expect(body.sign_type).toBe("HMAC-SHA256");
      expect(requestOptions.url).toBe(
        "https://api.mch.weixin.qq.com/pay/downloadfundflow"
      );
      expect(requestOptions.agentOptions).toBeDefined();
      done();
    });
  });
  test("mini options", function(done) {
    var pay = initPay();
    var options = {
      bill_date: "20140603",
      account_type: "Basic"
    };
    pay.downloadfundflow(options, done);
  });
  test("miss fields", function(done) {
    var pay = initPay();
    var options = {};
    pay.downloadfundflow(options, function(err) {
      expect(err.message).toMatch("miss fields bill_date,account_type");
      done();
    });
  });
});

describe("report", function() {
  test("full options", function(done) {
    var pay = initPay();
    var options = {
      interface_url: "https://api.mch.weixin.qq.com/pay/unifiedorder",
      execute_time: 1000,
      return_code: "SUCCESS",
      return_msg: "签名失败",
      result_code: "SUCCESS",
      err_code: "SYSTEMERROR",
      err_code_des: "系统错误",
      out_trade_no: "1217752501201407033233368018",
      user_ip: "8.8.8.8",
      time: "20091227091010"
    };
    pay.report(options, function(err, body) {
      if (err) return done(err);
      var requestOptions = request.post.mock.calls[0][0];
      expect(Pay.helper.sign(pay.sign_type, body, pay.key)).toEqual(body.sign);
      expect(requestOptions.url).toBe(
        "https://api.mch.weixin.qq.com/payitil/report"
      );
      expect(requestOptions.agentOptions).toBeUndefined();
      done();
    });
  });
  test("mini options", function(done) {
    var pay = initPay();
    var options = {
      interface_url: "https://api.mch.weixin.qq.com/pay/unifiedorder",
      execute_time: 1000,
      return_code: "SUCCESS",
      result_code: "SUCCESS",
      user_ip: "8.8.8.8"
    };
    pay.report(options, done);
  });
  test("miss fields", function(done) {
    var pay = initPay();
    var options = {};
    pay.report(options, function(err) {
      expect(err.message).toMatch(
        "miss fields interface_url,execute_time,return_code,result_code,user_ip"
      );
      done();
    });
  });
});

describe("batchquerycomment", function() {
  test("full options", function(done) {
    var pay = initPay();
    var options = {
      begin_time: "20170724000000",
      end_time: "20170725000000",
      offset: 0,
      limit: 100
    };
    pay.batchquerycomment(options, function(err, body) {
      if (err) return done(err);
      var requestOptions = request.post.mock.calls[0][0];
      expect(Pay.helper.sign(body.sign_type, body, pay.key)).toEqual(body.sign);
      expect(body.sign_type).toBe("HMAC-SHA256");
      expect(requestOptions.url).toBe(
        "https://api.mch.weixin.qq.com/billcommentsp/batchquerycomment"
      );
      expect(requestOptions.agentOptions).toBeDefined();
      done();
    });
  });
  test("mini options", function(done) {
    var pay = initPay();
    var options = {
      begin_time: "20170724000000",
      end_time: "20170725000000",
      offset: 0
    };
    pay.batchquerycomment(options, done);
  });
  test("miss fields", function(done) {
    var pay = initPay();
    var options = {};
    pay.batchquerycomment(options, function(err) {
      expect(err.message).toMatch("miss fields begin_time,end_time,offset");
      done();
    });
  });
});

describe("send_coupon", function() {
  test("full options", function(done) {
    var pay = initPay();
    var options = {
      coupon_stock_id: "1757",
      openid_count: 1,
      partner_trade_no: "1000009820141203515766",
      openid: "onqOjjrXT-776SpHnfexGm1_P7iE",
      op_user_id: "10000098",
      device_info: "013467007045764",
      version: "1.0",
      type: "XML"
    };
    pay.send_coupon(options, function(err, body) {
      if (err) return done(err);
      var requestOptions = request.post.mock.calls[0][0];
      expect(body.sign_type).toBeUndefined();
      expect(Pay.helper.sign(pay.sign_type, body, pay.key)).toEqual(body.sign);
      expect(requestOptions.url).toBe(
        "https://api.mch.weixin.qq.com/mmpaymkttransfers/send_coupon"
      );
      expect(requestOptions.agentOptions).toBeDefined();
      done();
    });
  });
  test("mini options", function(done) {
    var pay = initPay();
    var options = {
      coupon_stock_id: "1757",
      openid_count: 1,
      partner_trade_no: "1000009820141203515766",
      openid: "onqOjjrXT-776SpHnfexGm1_P7iE"
    };
    pay.send_coupon(options, done);
  });
  test("miss fields", function(done) {
    var pay = initPay();
    var options = {};
    pay.send_coupon(options, function(err) {
      expect(err.message).toMatch(
        "miss fields coupon_stock_id,partner_trade_no,openid"
      );
      done();
    });
  });
});

describe("query_coupon_stock", function() {
  test("string options", function(done) {
    var pay = initPay();
    var options = "1757";
    pay.query_coupon_stock(options, function(err, body) {
      if (err) return done(err);
      var requestOptions = request.post.mock.calls[0][0];
      expect(body.sign_type).toBeUndefined();
      expect(Pay.helper.sign(pay.sign_type, body, pay.key)).toEqual(body.sign);
      expect(requestOptions.url).toBe(
        "https://api.mch.weixin.qq.com/mmpaymkttransfers/query_coupon_stock"
      );
      expect(requestOptions.agentOptions).toBeUndefined();
      done();
    });
  });
  test("options coupon_stock_id", function(done) {
    var pay = initPay();
    var options = {
      coupon_stock_id: "1757"
    };
    pay.query_coupon_stock(options, done);
  });
  test("full options", function(done) {
    var pay = initPay();
    var options = {
      coupon_stock_id: "1757",
      op_user_id: "10000098",
      device_info: "013467007045764",
      version: "1.0",
      type: "XML"
    };
    pay.query_coupon_stock(options, done);
  });
  test("miss fields", function(done) {
    var pay = initPay();
    var options = {};
    pay.query_coupon_stock(options, function(err) {
      expect(err.message).toMatch("miss fields coupon_stock_id");
      done();
    });
  });
});

describe("querycouponsinfo", function() {
  test("full options", function(done) {
    var pay = initPay();
    var options = {
      coupon_id: "1565",
      openid: "onqOjjrXT-776SpHnfexGm1_P7iE",
      stock_id: "58818",
      op_user_id: "10000098",
      device_info: "013467007045764",
      version: "1.0",
      type: "XML"
    };
    pay.querycouponsinfo(options, function(err, body) {
      if (err) return done(err);
      var requestOptions = request.post.mock.calls[0][0];
      expect(body.sign_type).toBeUndefined();
      expect(Pay.helper.sign(pay.sign_type, body, pay.key)).toEqual(body.sign);
      expect(requestOptions.url).toBe(
        "https://api.mch.weixin.qq.com/mmpaymkttransfers/querycouponsinfo"
      );
      expect(requestOptions.agentOptions).toBeUndefined();
      done();
    });
  });
  test("mini options", function(done) {
    var pay = initPay();
    var options = {
      coupon_id: "1565",
      openid: "onqOjjrXT-776SpHnfexGm1_P7iE",
      stock_id: "58818"
    };
    pay.querycouponsinfo(options, done);
  });
  test("miss fields", function(done) {
    var pay = initPay();
    var options = {};
    pay.querycouponsinfo(options, function(err) {
      expect(err.message).toMatch("miss fields coupon_id,openid,stock_id");
      done();
    });
  });
});

describe("sendredpack", function() {
  test("full options", function(done) {
    var pay = initPay();
    var options = {
      mch_billno: "10000098201411111234567890",
      send_name: "天虹百货",
      re_openid: "oxTWIuGaIt6gTKsQRLau2M0yL16E",
      total_amount: 1000,
      total_num: 1,
      wishing: "红包祝福语",
      client_ip: "192.168.0.1",
      act_name: "猜灯谜抢红包活动",
      remark: "猜越多得越多，快来抢！",
      scene_id: "PRODUCT_8",
      risk_info:
        "posttime%3d123123412%26clientversion%3d234134%26mobile%3d122344545%26deviceid%3dIOS",
      consume_mch_id: "1222000096"
    };
    pay.sendredpack(options, function(err, body) {
      if (err) return done(err);
      var requestOptions = request.post.mock.calls[0][0];
      expect(body.sign_type).toBeUndefined();
      expect(Pay.helper.sign(pay.sign_type, body, pay.key)).toEqual(body.sign);
      expect(requestOptions.url).toBe(
        "https://api.mch.weixin.qq.com/mmpaymkttransfers/sendredpack"
      );
      expect(requestOptions.agentOptions).toBeDefined();
      done();
    });
  });
  test("mini options", function(done) {
    var pay = initPay();
    var options = {
      mch_billno: "10000098201411111234567890",
      send_name: "天虹百货",
      re_openid: "oxTWIuGaIt6gTKsQRLau2M0yL16E",
      total_amount: 1000,
      total_num: 1,
      wishing: "红包祝福语",
      client_ip: "192.168.0.1",
      act_name: "猜灯谜抢红包活动",
      remark: "猜越多得越多，快来抢！"
    };
    pay.sendredpack(options, done);
  });
  test("miss fields", function(done) {
    var pay = initPay();
    var options = {};
    pay.sendredpack(options, function(err) {
      expect(err.message).toMatch(
        "miss fields mch_billno,send_name,re_openid,total_amount,total_num,wishing,client_ip,act_name,remark"
      );
      done();
    });
  });
});

describe("sendgroupredpack", function() {
  test("full options", function(done) {
    var pay = initPay();
    var options = {
      mch_billno: "10000098201411111234567890",
      send_name: "天虹百货",
      re_openid: "oxTWIuGaIt6gTKsQRLau2M0yL16E",
      total_amount: 1000,
      total_num: 1,
      wishing: "红包祝福语",
      client_ip: "192.168.0.1",
      act_name: "猜灯谜抢红包活动",
      remark: "猜越多得越多，快来抢！",
      scene_id: "PRODUCT_8",
      risk_info:
        "posttime%3d123123412%26clientversion%3d234134%26mobile%3d122344545%26deviceid%3dIOS",
      consume_mch_id: "1222000096"
    };
    pay.sendgroupredpack(options, function(err, body) {
      if (err) return done(err);
      var requestOptions = request.post.mock.calls[0][0];
      expect(body.sign_type).toBeUndefined();
      expect(Pay.helper.sign(pay.sign_type, body, pay.key)).toEqual(body.sign);
      expect(requestOptions.url).toBe(
        "https://api.mch.weixin.qq.com/mmpaymkttransfers/sendgroupredpack"
      );
      expect(requestOptions.agentOptions).toBeDefined();
      done();
    });
  });
  test("mini options", function(done) {
    var pay = initPay();
    var options = {
      mch_billno: "10000098201411111234567890",
      send_name: "天虹百货",
      re_openid: "oxTWIuGaIt6gTKsQRLau2M0yL16E",
      total_amount: 1000,
      total_num: 1,
      wishing: "红包祝福语",
      client_ip: "192.168.0.1",
      act_name: "猜灯谜抢红包活动",
      remark: "猜越多得越多，快来抢！"
    };
    pay.sendgroupredpack(options, done);
  });
  test("miss fields", function(done) {
    var pay = initPay();
    var options = {};
    pay.sendgroupredpack(options, function(err) {
      expect(err.message).toMatch(
        "miss fields mch_billno,send_name,re_openid,total_amount,total_num,wishing,act_name,remark"
      );
      done();
    });
  });
});

describe("gethbinfo", function() {
  test("string options", function(done) {
    var pay = initPay();
    var options = "10000098201411111234567890";
    pay.gethbinfo(options, function(err, body) {
      if (err) return done(err);
      var requestOptions = request.post.mock.calls[0][0];
      expect(body.sign_type).toBeUndefined();
      expect(Pay.helper.sign(pay.sign_type, body, pay.key)).toEqual(body.sign);
      expect(requestOptions.url).toBe(
        "https://api.mch.weixin.qq.com/mmpaymkttransfers/gethbinfo"
      );
      expect(requestOptions.agentOptions).toBeDefined();
      done();
    });
  });
  test("options mch_billno", function(done) {
    var pay = initPay();
    var options = {
      mch_billno: "10000098201411111234567890"
    };
    pay.gethbinfo(options, done);
  });
  test("miss fields", function(done) {
    var pay = initPay();
    var options = {};
    pay.gethbinfo(options, function(err) {
      expect(err.message).toMatch("required mch_billno");
      done();
    });
  });
});

describe("transfers", function() {
  test("full options", function(done) {
    var pay = initPay();
    var options = {
      partner_trade_no: "10000098201411111234567890",
      openid: "oxTWIuGaIt6gTKsQRLau2M0yL16E",
      check_name: "FORCE_CHECK",
      re_user_name: "王小王",
      amount: 10099,
      desc: "理赔",
      spbill_create_ip: "192.168.0.1"
    };
    pay.transfers(options, function(err, body) {
      if (err) return done(err);
      var requestOptions = request.post.mock.calls[0][0];
      expect(body.sign_type).toBeUndefined();
      expect(Pay.helper.sign(pay.sign_type, body, pay.key)).toEqual(body.sign);
      expect(requestOptions.url).toBe(
        "https://api.mch.weixin.qq.com/mmpaymkttransfers/promotion/transfers"
      );
      expect(requestOptions.agentOptions).toBeDefined();
      done();
    });
  });
  test("mini options", function(done) {
    var pay = initPay();
    var options = {
      partner_trade_no: "10000098201411111234567890",
      openid: "oxTWIuGaIt6gTKsQRLau2M0yL16E",
      check_name: "FORCE_CHECK",
      amount: 10099,
      desc: "理赔",
      spbill_create_ip: "	192.168.0.1"
    };
    pay.transfers(options, done);
  });
  test("miss fields", function(done) {
    var pay = initPay();
    var options = {};
    pay.transfers(options, function(err) {
      expect(err.message).toMatch(
        "miss fields partner_trade_no,openid,check_name,amount,desc,spbill_create_ip"
      );
      done();
    });
  });
});

describe("gettransferinfo", function() {
  test("string options", function(done) {
    var pay = initPay();
    var options = "10000098201411111234567890";
    pay.gettransferinfo(options, function(err, body) {
      if (err) return done(err);
      var requestOptions = request.post.mock.calls[0][0];
      expect(body.sign_type).toBeUndefined();
      expect(Pay.helper.sign(pay.sign_type, body, pay.key)).toEqual(body.sign);
      expect(requestOptions.url).toBe(
        "https://api.mch.weixin.qq.com/mmpaymkttransfers/gettransferinfo"
      );
      expect(requestOptions.agentOptions).toBeDefined();
      done();
    });
  });
  test("options partner_trade_no", function(done) {
    var pay = initPay();
    var options = {
      partner_trade_no: "10000098201411111234567890"
    };
    pay.gettransferinfo(options, done);
  });
  test("miss fields", function(done) {
    var pay = initPay();
    var options = {};
    pay.gettransferinfo(options, function(err) {
      expect(err.message).toMatch("miss fields partner_trade_no");
      done();
    });
  });
});

describe("getpublickey", function() {
  test("no options", function(done) {
    var pay = initPay();
    pay.getpublickey(function(err, body) {
      if (err) return done(err);
      var requestOptions = request.post.mock.calls[0][0];
      expect(body.sign_type).toBeDefined();
      expect(Pay.helper.sign(body.sign_type, body, pay.key)).toEqual(body.sign);
      expect(requestOptions.url).toBe(
        "https://fraud.mch.weixin.qq.com/risk/getpublickey"
      );
      expect(requestOptions.agentOptions).toBeDefined();
      done();
    });
  });
});

describe("query_bank", function() {
  test("string options", function(done) {
    var pay = initPay();
    var options = "1212121221227";
    pay.query_bank(options, function(err, body) {
      if (err) return done(err);
      var requestOptions = request.post.mock.calls[0][0];
      expect(body.sign_type).toBeUndefined();
      expect(Pay.helper.sign(pay.sign_type, body, pay.key)).toEqual(body.sign);
      expect(requestOptions.url).toBe(
        "https://api.mch.weixin.qq.com/mmpaysptrans/query_bank"
      );
      expect(requestOptions.agentOptions).toBeDefined();
      done();
    });
  });
  test("options partner_trade_no", function(done) {
    var pay = initPay();
    var options = {
      partner_trade_no: "1212121221227"
    };
    pay.query_bank(options, done);
  });
  test("miss fields", function(done) {
    var pay = initPay();
    var options = {};
    pay.query_bank(options, function(err) {
      expect(err.message).toMatch("miss fields partner_trade_no");
      done();
    });
  });
});

describe("pay_bank", function() {
  var rsa = [
    "-----BEGIN RSA PUBLIC KEY-----",
    "MIIBCgKCAQEArT82k67xybiJS9AD8nNAeuDYdrtCRaxkS6cgs8L9h83eqlDTlrdw",
    "zBVSv5V4imTq/URbXn4K0V/KJ1TwDrqOI8hamGB0fvU13WW1NcJuv41RnJVua0QA",
    "lS3tS1JzOZpMS9BEGeFvyFF/epbi/m9+2kUWG94FccArNnBtBqqvFncXgQsm98JB",
    "3a62NbS1ePP/hMI7Kkz+JNMyYsWkrOUFDCXAbSZkWBJekY4nGZtK1erqGRve8Jbx",
    "TWirAm/s08rUrjOuZFA21/EI2nea3DidJMTVnXVPY2qcAjF+595shwUKyTjKB8v1",
    "REPB3hPF1Z75O6LwuLfyPiCrCTmVoyfqjwIDAQAB",
    "-----END RSA PUBLIC KEY-----"
  ].join("\n");
  test("full options", function(done) {
    var pay = initPay();
    pay.setBankRSA(rsa);
    var options = {
      partner_trade_no: "1212121221227",
      enc_bank_no: "6225760017946512",
      enc_true_name: "王小王",
      bank_code: "1001",
      amount: 100,
      desc: "理财"
    };
    pay.pay_bank(options, function(err, body) {
      if (err) return done(err);
      var requestOptions = request.post.mock.calls[0][0];
      expect(body.sign_type).toBeUndefined();
      expect(Pay.helper.sign(pay.sign_type, body, pay.key)).toEqual(body.sign);
      expect(requestOptions.url).toBe(
        "https://api.mch.weixin.qq.com/mmpaysptrans/pay_bank"
      );
      expect(requestOptions.agentOptions).toBeDefined();
      done();
    });
  });
  test("mini options", function(done) {
    var pay = initPay();
    pay.setBankRSA(rsa);
    var options = {
      partner_trade_no: "1212121221227",
      enc_bank_no: "6225760017946512",
      enc_true_name: "王小王",
      bank_code: "1001",
      amount: 100
    };
    pay.pay_bank(options, done);
  });
  test("have not set bankRSA", function(done) {
    var pay = initPay();
    var options = {
      partner_trade_no: "1212121221227",
      enc_bank_no: "6225760017946512",
      enc_true_name: "王小王",
      bank_code: "1001",
      amount: 100
    };
    pay.pay_bank(options, function(err) {
      expect(err.message).toMatch("bankRSA needed");
      done();
    });
  });
  test("miss fields", function(done) {
    var pay = initPay();
    var options = {};
    pay.setBankRSA(rsa);
    pay.pay_bank(options, function(err) {
      expect(err.message).toMatch(
        "miss fields partner_trade_no,enc_bank_no,enc_true_name,bank_code,amount"
      );
      done();
    });
  });
});

describe("setSignType", function() {
  test("update sign_type", function() {
    var pay = initPay();
    expect(pay.sign_type).toBe("MD5");
    pay.setSignType("HMAC-SHA256");
    expect(pay.sign_type).toBe("HMAC-SHA256");
  });
  test("throw error if sign_type is not one of MD5,HMAC-SHA256", function() {
    var pay = initPay();
    expect(function() {
      pay.setSignType("SHA256");
    }).toThrow("unsupported sign_type SHA256");
  });
});

describe("toggleDebugMode", function() {
  test("set debug mode", function() {
    var pay = initPay();
    expect(pay.debug).toBe(false);
    pay.debugMode(true);
    expect(pay.debug).toBe(true);
  });
  test("url will be sandboxnew in debug mode", function(done) {
    var pay = initPay();
    pay.debugMode(true);
    var options = {
      out_trade_no: "1217752501201407033233368018"
    };
    pay.reverse(options, function(err, result) {
      if (err) return done(err);
      var requestOptions = request.post.mock.calls[0][0];
      expect(requestOptions.url).toBe(
        "https://api.mch.weixin.qq.com/sandboxnew/secapi/pay/reverse"
      );
      done();
    });
  });
});

describe("getUrl", function() {
  test("get url", function() {
    var pay = initPay();
    expect(pay.getUrl("reverse")).toEqual(
      "https://api.mch.weixin.qq.com/secapi/pay/reverse"
    );
  });
  test("throw error if url is not found", function() {
    var pay = initPay();
    expect(function() {
      pay.getUrl("404");
    }).toThrow("unsupported api 404");
  });
  test("url will be sandboxnew in debug mode", function() {
    var pay = initPay();
    pay.debugMode(true);
    expect(pay.getUrl("reverse")).toEqual(
      "https://api.mch.weixin.qq.com/sandboxnew/secapi/pay/reverse"
    );
  });
});

describe("request", function() {
  var requestPost;
  beforeAll(function() {
    requestPost = request.post;
  });
  afterAll(function() {
    request.post = requestPost;
  });
  test("check error on result_code and return_code", function(done) {
    var pay = initPay();
    var value = {
      body: {
        return_code: "SUCCESS",
        result_code: "FAIL",
        err_code: "SYSTEMERROR",
        err_code_des: "	系统错误"
      }
    };
    pay.request(value, function(err) {
      expect(err.message).toMatch("系统错误");
      done();
    });
  });
  test("wrap request error", function(done) {
    var pay = initPay();
    var value = {
      body: {
        return_code: "SUCCESS",
        result_code: "SUCCESS"
      }
    };
    var origin = request.post;
    request.post = jest.fn(function(options, callback) {
      callback(new Error("Wrong"));
    });
    pay.request(value, function(err) {
      expect(err.message).toMatch("Wrong");
      done();
    });
  });
  test("wrap xml error", function(done) {
    var pay = initPay();
    var value = {
      body: {
        return_code: "SUCCESS",
        result_code: "SUCCESS"
      }
    };
    var origin = request.post;
    request.post = jest.fn(function(options, callback) {
      callback(null, null, "<abc");
    });
    pay.request(value, function(err) {
      expect(err.message).toMatch("Unexpected end");
      done();
    });
  });
});

function initPay() {
  var p12Data = fs.readFileSync(
    path.resolve(__dirname, "../fixtures/cert.p12")
  );
  var pay = new Pay(
    "wxb80e5bddb2d804f3",
    "1424712502",
    "6Q9VX4N3WTBM9G9XBL7H1L9PB9ANHLY8",
    p12Data
  );
  return pay;
}
