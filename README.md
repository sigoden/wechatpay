# 微信支付 node.js 

[![Build Status](https://travis-ci.org/sigoden/wechatpay.svg?branch=master)](https://travis-ci.org/sigoden/wechatpay)
[![Codacy Badge](https://api.codacy.com/project/badge/Grade/f019843d36f643378a26840660c10f61)](https://www.codacy.com/app/sigoden/wechatpay?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=sigoden/wechatpay&amp;utm_campaign=Badge_Grade)
[![Coverage Status](https://coveralls.io/repos/github/sigoden/wechatpay/badge.svg?branch=master)](https://coveralls.io/github/sigoden/wechatpay?branch=master)
[![dependencies Status](https://david-dm.org/sigoden/wechatpay/status.svg)](https://david-dm.org/sigoden/wechatpay)
[![Known Vulnerabilities](https://snyk.io/test/github/sigoden/wechatpay/badge.svg?targetFile=package.json)](https://snyk.io/test/github/sigoden/wechatpay?targetFile=package.json)

## 开始使用

```js
var Pay = require('@sigoden/wechatpay');
var pfxContent = fs.readFileSync("<location-of-your-apiclient-cert.p12>")
var pay = new Pay(appid, mch_id, key, pfxContent);

pay.unifiedorder({
  body: '腾讯充值中心-QQ会员充值',
  out_trade_no: '1217752501201407033233368018',
  total_fee: 888,
  spbill_create_ip: '8.8.8.8',
  notify_url: 'https://example.com/wechatpay/notify',
  trade_type: 'JSAPI',
  openid: 'oUpF8uMuAJO_M2pxb1Q9zNjWeS6o'
}, function(err, result) {
  if (err) return callback(err);
  console.log(pay.tidyOrderResult(result)); 
})
```

## 接口

### micropay -- 提交刷卡支付 [&#128279;](https://pay.weixin.qq.com/wiki/doc/api/micropay.php?chapter=9_10&index=1)

alias: microPay

```js
pay.micropay({
  device_info: '013467007045764',
  body: '深圳腾大- QQ公仔',
  out_trade_no: '1217752501201407033233368018',
  total_fee: 888,
  spbill_create_ip: '8.8.8.8',
  auth_code: '120061098828009406'
}, function(err, result) {})
```

### reverse -- 撤销订单(仅限刷卡支付) [&#128279;](https://pay.weixin.qq.com/wiki/doc/api/micropay.php?chapter=9_11&index=3)

```js
pay.reverse({
  out_trade_no: '1217752501201407033233368018'
}, function(err, result) {})

// 或者直接传 out_trade_no 字符串

pay.reverse('1217752501201407033233368018', function(err, result) {})
```

### shorturl -- 转换短链接(仅限刷卡支付) [&#128279;](https://pay.weixin.qq.com/wiki/doc/api/micropay.php?chapter=9_9&index=9)

alias: shortUrl, shortURL

```
pay.shorturl({
  long_url: 'weixin://wxpay/bizpayurl?sign=XXXXX&appid=XXXXX&mch_id=XXXXX&product_id=XXXXXX&time_stamp=XXXXXX&nonce_str=XXXXX'
}, function(err, result) {})

// 或者直接传递 long_url 字符串
pay.shorturl('weixin://wxpay/bizpayurl?sign=XXXXX&appid=XXXXX&mch_id=XXXXX&product_id=XXXXXX&time_stamp=XXXXXX&nonce_str=XXXXX', function(err, result) {})
```

### authcodetoopenid -- 授权码查询openid [&#128279;](https://pay.weixin.qq.com/wiki/doc/api/micropay.php?chapter=9_13&index=10)

alias: authCodeToOpenId

```js
pay.authcodetoopenid({
  auth_code: '120061098828009406'
}, function(err, result) {})

// 或者直接传递 auth_code 字符串
pay.shorturl('120061098828009406', function(err, result) {})
```

### unifiedorder -- 统一下单

alias: unifiedOrder

> tidyOrderResult 可以用来处理统一下单返回结果，根据接口交易类型 (trade_type) 会生成不同的数据。

#### 公众号[&#128279;](https://pay.weixin.qq.com/wiki/doc/api/jsapi.php?chapter=9_1) / 小程序[&#128279;](https://pay.weixin.qq.com/wiki/doc/api/wxa/wxa_api.php?chapter=9_1) 

```js
pay.unifiedorder({
  body: '腾讯充值中心-QQ会员充值',
  out_trade_no: '1217752501201407033233368018',
  total_fee: 888,
  spbill_create_ip: '8.8.8.8',
  notify_url: 'https://example.com/wechatpay/notify',
  trade_type: 'JSAPI',
  openid: 'oUpF8uMuAJO_M2pxb1Q9zNjWeS6o'
}, function(err, result) {
  if (err) return callback(err);
  console.log(pay.tidyOrderResult(result)); 
})
```

```
{
  appId: 'wxb80e5bddb2d804f3',
  timeStamp: 1526470270,
  nonceStr: '6LSB219WG129E3OLD9JOT1QA5RSOTBHA',
  package: 'prepay_id=wx201411101639507cbf6ffd8b0779950874',
  signType: 'MD5',
  paySign: 'B8EE9BEF040D445275AE937CB93DAA8B'
}
```
####  扫码 [&#128279;](https://pay.weixin.qq.com/wiki/doc/api/native.php?chapter=9_1)

```js
pay.unifiedorder({
  body: '腾讯充值中心-QQ会员充值',
  out_trade_no: '1217752501201407033233368018',
  total_fee: 888,
  spbill_create_ip: '8.8.8.8',
  notify_url: 'https://example.com/wechatpay/notify',
  product_id: '1324',
  trade_type: 'NATIVE'
}, function(err, result) {
  if (err) return callback(err);
  console.log(pay.tidyOrderResult(result)); 
})
```

```
{ code_url: 'weixin://wxpay/s/An4baqw' }
```

#### APP [&#128279;](https://pay.weixin.qq.com/wiki/doc/api/app/app.php?chapter=9_1)

```js
pay.unifiedorder({
  body: '腾讯充值中心-QQ会员充值',
  out_trade_no: '1217752501201407033233368018',
  total_fee: 888,
  spbill_create_ip: '8.8.8.8',
  notify_url: 'https://example.com/wechatpay/notify',
  trade_type: 'APP'
}, function(err, result) {
  if (err) return callback(err);
  console.log(pay.tidyOrderResult(result)); 
})
```

```
{ 
  appid: 'wxb80e5bddb2d804f3',
  partnerid: '1424712502',
  prepayid: 'wx201411101639507cbf6ffd8b0779950874',
  package: 'Sign=WXPay',
  noncestr: '6LSB219WG129E3OLD9JOT1QA5RSOTBHA',
  timestamp: 1526470270,
  sign: '4B9580464280084A33C31546F65CAC9F'
}
```

#### H5 [&#128279;](https://pay.weixin.qq.com/wiki/doc/api/H5.php?chapter=9_20&index=1)

```js
pay.unifiedorder({
  body: '腾讯充值中心-QQ会员充值',
  out_trade_no: '1217752501201407033233368018',
  total_fee: 888,
  spbill_create_ip: '8.8.8.8',
  notify_url: 'https://example.com/wechatpay/notify',
  trade_type: 'MWEB',
  scene_info: '{"store_info":{"id":"SZTX001","name":"腾大餐厅","area_code":"440305","address":"科技园中一路腾讯大厦"}}'
}, function(err, result) {
  if (err) return callback(err);
  console.log(pay.tidyOrderResult(result)); 
})
```

```
{ mweb_url: 'https://wx.tenpay.com/cgi-bin/mmpayweb-bin/checkmweb?prepay_id=wx2016121516420242444321ca0631331346&package=1405458241' }
```

### orderquery -- 查询订单 [&#128279;](https://pay.weixin.qq.com/wiki/doc/api/jsapi.php?chapter=9_2)

alias: orderQuery

```js
pay.orderquery({
  out_trade_no: '120061098828009406'
}, function(err, result) {})

// 或者直接传递 out_trade_no 字符串
pay.orderquery('120061098828009406', function(err, result) {})
```

### closeorder -- 关闭订单 [&#128279;](https://pay.weixin.qq.com/wiki/doc/api/jsapi.php?chapter=9_3)

alias: closeOrder

```js
pay.closeorder({
  out_trade_no: '120061098828009406'
}, function(err, result) {})

// 或者直接传递 out_trade_no 字符串
pay.closeorder('120061098828009406', function(err, result) {})
```

### refund -- 申请退款 [&#128279;](https://pay.weixin.qq.com/wiki/doc/api/jsapi.php?chapter=9_4)

```js
pay.refund({
  out_trade_no: '1217752501201407033233368018',
  out_refund_no: '1217752501201407033233368019',
  total_fee: 100,
  refund_fee: 80
}, function(err, result) {})
```

### refundquery -- 查询退款 [&#128279;](https://pay.weixin.qq.com/wiki/doc/api/jsapi.php?chapter=9_5)

alias: refundQuery

```js
pay.refundquery({
  out_trade_no: '120061098828009406'
}, function(err, result) {})

// 或者直接传递 out_trade_no 字符串
pay.refundquery('120061098828009406', function(err, result) {})
```

### downloadbill -- 下载对账单 [&#128279;](https://pay.weixin.qq.com/wiki/doc/api/jsapi.php?chapter=9_6)

alias: downloadBill

```js
pay.downloadbill({
  bill_date: '20140603',
  bill_type: 'ALL'
}, function(err, result) {})
```

### downloadfundflow  -- 下载资金账单 [&#128279;](https://pay.weixin.qq.com/wiki/doc/api/jsapi.php?chapter=9_7)

alias: downloadFundFlow

```js
pay.downloadfundflow({
  bill_date: '20140603',
  account_type: 'Basic',
}, function(err, result) {})
```

### report -- 交易保障 [&#128279;](https://pay.weixin.qq.com/wiki/doc/api/jsapi.php?chapter=9_8&index=9)

```js
pay.report({
  interface_url: 'https://api.mch.weixin.qq.com/pay/unifiedorder',
  execute_time: 1000,
  return_code: 'SUCCESS',
  result_code: 'SUCCESS',
  user_ip: '8.8.8.8'
}, function(err, result) {})
```

### batchquerycomment -- 拉取订单评价数据 [&#128279;](https://pay.weixin.qq.com/wiki/doc/api/jsapi.php?chapter=9_17&index=11)

alias: batchQueryComment

```js
pay.batchquerycomment({
  begin_time: '20170724000000',
  end_time: '20170725000000',
  offset: 0,
}, function(err, result) {})
```

### send_coupon -- 发放代金券 [&#128279;](https://pay.weixin.qq.com/wiki/doc/api/tools/sp_coupon.php?chapter=12_3&index=4)

alias: sendCoupon, sendcoupon

```js
pay.send_coupon({
  coupon_stock_id: '1757',
  openid_count: 1,
  partner_trade_no: '1000009820141203515766',
  openid: 'onqOjjrXT-776SpHnfexGm1_P7iE'
}, function(err, result) {})
```

### query_coupon_stock -- 查询代金券批次 [&#128279;](https://pay.weixin.qq.com/wiki/doc/api/tools/sp_coupon.php?chapter=12_4&index=5)

alias: querycouponstock, queryCouponStock

```js
pay.query_coupon_stock({
  coupon_stock_id: '1757'
}, function(err, result) {})

// 或者直接传递 coupon_stock_id 字符串
pay.shorturl('1757', function(err, result) {})
```

### querycouponsinfo -- 查询代金券信息 [&#128279;](https://pay.weixin.qq.com/wiki/doc/api/tools/sp_coupon.php?chapter=12_5&index=6)

alias: queryCouponsInfo

```js
pay.querycouponsinfo({
  coupon_id: '1565',
  openid: 'onqOjjrXT-776SpHnfexGm1_P7iE',
  stock_id: '58818'
}, function(err, result) {})
```

### sendredpack -- 发放普通红包 [&#128279;](https://pay.weixin.qq.com/wiki/doc/api/tools/cash_coupon.php?chapter=13_4&index=3) 

alias: sendRedPack

```js
pay.sendredpack({
  mch_billno: '10000098201411111234567890',
  send_name: '天虹百货',
  re_openid: 'oxTWIuGaIt6gTKsQRLau2M0yL16E',
  total_amount: 1000,
  total_num: 1,
  wishing: '红包祝福语',
  client_ip: '192.168.0.1',
  act_name: '猜灯谜抢红包活动',
  remark: '猜越多得越多，快来抢！'
}, function(err, result) {})
```

### sendgroupredpack -- 发放裂变红包 [&#128279;](https://pay.weixin.qq.com/wiki/doc/api/tools/cash_coupon.php?chapter=13_5&index=4)

alias: sendGroupRedPack

```js
pay.sendgroupredpack({
  mch_billno: '10000098201411111234567890',
  send_name: '天虹百货',
  re_openid: 'oxTWIuGaIt6gTKsQRLau2M0yL16E',
  total_amount: 1000,
  total_num: 1,
  wishing: '红包祝福语',
  client_ip: '192.168.0.1',
  act_name: '猜灯谜抢红包活动',
  remark: '猜越多得越多，快来抢！'
}, function(err, result) {})
```

### gethbinfo -- 查询红包记录 [&#128279;](https://pay.weixin.qq.com/wiki/doc/api/tools/cash_coupon.php?chapter=13_6&index=5)

alias: getHbInfo

```js
pay.gethbinfo({
  mch_billno: '10000098201411111234567890'
}, function(err, result) {})

// 或者直接传递 mch_billno 字符串
pay.gethbinfo('10000098201411111234567890', function(err, result) {})
```

### transfers -- 企业付款到零钱 [&#128279;](https://pay.weixin.qq.com/wiki/doc/api/tools/mch_pay.php?chapter=14_2)

```js
pay.transfers({
  partner_trade_no: '10000098201411111234567890',
  openid: 'oxTWIuGaIt6gTKsQRLau2M0yL16E',
  check_name: 'FORCE_CHECK',
  amount: 10099,
  desc: '理赔',
  spbill_create_ip: '	192.168.0.1'
}, function(err, result) {})
```

### gettransferinfo -- 查询企业付款到零钱 [&#128279;](https://pay.weixin.qq.com/wiki/doc/api/tools/mch_pay.php?chapter=14_3)

alias: getTransferInfo

```js
pay.gettransferinfo({
  partner_trade_no: '10000098201411111234567890'
}, function(err, result) {})

// 或者直接传递 partner_trade_no 字符串
pay.gettransferinfo('10000098201411111234567890', function(err, result) {})
```

### getpublickey -- 获取RSA加密公钥 [&#128279;](https://pay.weixin.qq.com/wiki/doc/api/tools/mch_pay.php?chapter=24_7&index=4)

alias: getPublicKey

```js
pay.getpublickey(function(err, result) {})
```

### query_bank -- 查询企业付款银行卡 [&#128279;](https://pay.weixin.qq.com/wiki/doc/api/tools/mch_pay.php?chapter=24_3)

alias: querybank, queryBank

```js
pay.query_bank({
  partner_trade_no: '1212121221227'
}, function(err, result) {})

// 或者直接传递 partner_trade_no 字符串
pay.query_bank('1212121221227', function(err, result) {})
```

### pay_bank -- 企业付款银行卡 [&#128279;](https://pay.weixin.qq.com/wiki/doc/api/tools/mch_pay.php?chapter=24_2)

alias: paybank, payBank

该接口使用前需要调用 `pay.setBankRSA` 设置 rsa 证书， 证书通过接口 `pay.getpublickey` 获得。

```js
pay.setBankRSA(rsa);
pay.pay_bank({
  partner_trade_no: '1212121221227',
  enc_bank_no: '6225760017946512',
  enc_true_name: '王小王',
  bank_code: '1001',
  amount: 100
}, function(err, result) {})
```

## 帮助函数

### Pay.helper.nonceStr -- 生成随机字符串

```js
Pay.helper.nonceStr() # KB29VVVPR2zJWPTqO7Kisr18CMOuCvu8
Pay.helper.nonceStr() # VLCoEJ70B68R3P8pRo82klegXSmavq3x
```

### Pay.helper.toXML -- JS转XML

```js
var obj = {
  mch_id: '1900000109',
  partner_trade_no: '1212121221227',
  nonce_str: '5K8264ILTKCH16CQ2502SI8ZNMTM67Vs',
  sign: 'C380BEC2BFD727A4B6845133519F3AD6'
}
var result = [
  '<xml>',
  '  <mch_id>1900000109</mch_id>',
  '  <partner_trade_no>1212121221227</partner_trade_no>',
  '  <nonce_str>5K8264ILTKCH16CQ2502SI8ZNMTM67Vs</nonce_str>',
  '  <sign>C380BEC2BFD727A4B6845133519F3AD6</sign>',
  '</xml>',
].join('\n');

Pay.helper.toXML(obj) === result;
```

### Pay.helper.fromXML -- XML转JS

```js
var xml = [
  '<xml>',
  '  <mch_id>1900000109</mch_id>',
  '  <partner_trade_no>1212121221227</partner_trade_no>',
  '  <nonce_str>5K8264ILTKCH16CQ2502SI8ZNMTM67Vs</nonce_str>',
  '  <sign>C380BEC2BFD727A4B6845133519F3AD6</sign>',
  '</xml>',
].join('\n');

var result = {
  mch_id: '1900000109',
  partner_trade_no: '1212121221227',
  nonce_str: '5K8264ILTKCH16CQ2502SI8ZNMTM67Vs',
  sign: 'C380BEC2BFD727A4B6845133519F3AD6'
};

Pay.helper.fromXML(xml, function(err, obj) {
  equal(obj, result);
}) ;
```

### Pay.helper.sign -- 签名

```js
var obj = { a: 3, b: 4 };
Pay.helper.sign('MD5', obj, 'abc') === '85566166DABF8B84307C0AF0A7699366'
Pay.helper.sign('HMAC-SHA256', obj, 'abc') === 'AAF907CA1B2239E0187A4BD73331DCD840F84748C6905B7FD857688BED84ACF7'
```

### Pay.helper.aes256Decode -- 用于退款通知数据 req_info 的解码

```js
var data = '/Pe2X0sgRcndZWNJQQmcPw==';
var key = '6Q9VX4N3WTBM9G9XBL7H1L9PB9ANHLY8'
Pay.helper.aes256Decode(key, data)  === '{"a":3}'
```

## 错误处理

在回调的Error上的以name做了区分，有需要可以拿来做判断

```js
pay.unifiedorder({
  body: '腾讯充值中心-QQ会员充值',
  out_trade_no: '1217752501201407033233368018',
  total_fee: 888,
  ...
}, function(err, result) {
  if (err) {
    switch (err.name) {
      case 'ArgumentError':
        // 参数错误, 缺失参数或参数不合法
      case 'RequestError': 
        //请求错误, 请求无法抛出
      case 'XMLParseError':
        // 响应XML解析错误，无法解析响应XML数据
      case 'ProtocolError':
        // 协议错误，return_code 为 FAIL 时抛出
      case 'BusinessError':
        // 业务错误，result_code 为 FAIL 时抛出
  }
  return result;
})
```

## 许可证

[MIT](./LICENSE)
