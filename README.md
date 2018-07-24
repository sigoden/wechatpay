# 微信支付 node.js 

[![Build Status](https://travis-ci.org/sigoden/wechatpay.svg?branch=master)](https://travis-ci.org/sigoden/wechatpay)
[![Codacy Badge](https://api.codacy.com/project/badge/Grade/f019843d36f643378a26840660c10f61)](https://www.codacy.com/app/sigoden/wechatpay?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=sigoden/wechatpay&amp;utm_campaign=Badge_Grade)
[![Coverage Status](https://coveralls.io/repos/github/sigoden/wechatpay/badge.svg?branch=master)](https://coveralls.io/github/sigoden/wechatpay?branch=master)
[![dependencies Status](https://david-dm.org/sigoden/wechatpay/status.svg)](https://david-dm.org/sigoden/wechatpay)
[![Known Vulnerabilities](https://snyk.io/test/github/sigoden/wechatpay/badge.svg?targetFile=package.json)](https://snyk.io/test/github/sigoden/wechatpay?targetFile=package.json)

> 微信支付 SDK，支持刷卡支付、公众号支付、扫码支付、APP支付、H5支付，以及优惠券，红包，企业付款，微信代扣

<!-- TOC -->

- [微信支付 node.js](#微信支付-nodejs)
    - [开始使用](#开始使用)
    - [接口](#接口)
        - [microPay -- 提交刷卡支付](#micropay----提交刷卡支付)
        - [reverse -- 撤销订单(仅限刷卡支付)](#reverse----撤销订单仅限刷卡支付)
        - [shortUrl -- 转换短链接(仅限刷卡支付)](#shorturl----转换短链接仅限刷卡支付)
        - [authCodeToOpenId -- 授权码查询openid](#authcodetoopenid----授权码查询openid)
        - [unifiedOrder -- 统一下单](#unifiedorder----统一下单)
        - [orderQuery -- 查询订单](#orderquery----查询订单)
        - [closeOrder -- 关闭订单](#closeorder----关闭订单)
        - [refund -- 申请退款](#refund----申请退款)
        - [refundQuery -- 查询退款](#refundquery----查询退款)
        - [downloadBill -- 下载对账单](#downloadbill----下载对账单)
        - [downloadFundFlow  -- 下载资金账单](#downloadfundflow-----下载资金账单)
        - [report -- 交易保障](#report----交易保障)
        - [batchQueryComment -- 拉取订单评价数据](#batchquerycomment----拉取订单评价数据)
        - [sendCoupon -- 发放代金券](#sendcoupon----发放代金券)
        - [queryCouponStock -- 查询代金券批次](#querycouponstock----查询代金券批次)
        - [queryCouponsInfo -- 查询代金券信息](#querycouponsinfo----查询代金券信息)
        - [sendRedPack -- 发放普通红包](#sendredpack----发放普通红包)
        - [sendGroupRedPack -- 发放裂变红包](#sendgroupredpack----发放裂变红包)
        - [getHbInfo -- 查询红包记录](#gethbinfo----查询红包记录)
        - [transfers -- 企业付款到零钱](#transfers----企业付款到零钱)
        - [getTransferInfo -- 查询企业付款到零钱](#gettransferinfo----查询企业付款到零钱)
        - [getPublicKey -- 获取RSA加密公钥](#getpublickey----获取rsa加密公钥)
        - [queryBank -- 查询企业付款银行卡](#querybank----查询企业付款银行卡)
        - [payBank -- 企业付款银行卡](#paybank----企业付款银行卡)
        - [entrustWeb -- 公众号、APP纯签约](#entrustweb----公众号app纯签约)
        - [minaEntrustWeb -- 小程序纯签约](#minaentrustweb----小程序纯签约)
        - [h5EntrustWeb -- H5纯签约](#h5entrustweb----h5纯签约)
        - [contractorder -- 支付中签约](#contractorder----支付中签约)
        - [queryContract -- 查询签约关系](#querycontract----查询签约关系)
        - [papPayApply -- 申请扣款](#pappayapply----申请扣款)
        - [deleteContract -- 申请解约](#deletecontract----申请解约)
        - [papOrderQuery -- 查询代扣支付订单](#paporderquery----查询代扣支付订单)
    - [帮助函数](#帮助函数)
        - [Pay.helper.nonceStr -- 生成随机字符串](#payhelpernoncestr----生成随机字符串)
        - [Pay.helper.toXML -- JS转XML](#payhelpertoxml----js转xml)
        - [Pay.helper.fromXML -- XML转JS](#payhelperfromxml----xml转js)
        - [Pay.helper.sign -- 签名](#payhelpersign----签名)
        - [Pay.helper.aes256Decode -- 用于退款通知数据 req_info 的解码](#payhelperaes256decode----用于退款通知数据-req_info-的解码)
    - [错误处理](#错误处理)
    - [许可证](#许可证)

<!-- /TOC -->

## 开始使用

```js
var Pay = require('@sigodenh/wechatpay');
var pfxContent = fs.readFileSync("<location-of-your-apiclient-cert.p12>")
var pay = new Pay(appid, mch_id, key, pfxContent);

// Callback style
pay.unifiedOrder({
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

// Promise style
pay.unifiedOrder({
  body: '腾讯充值中心-QQ会员充值',
  out_trade_no: '1217752501201407033233368018',
  total_fee: 888,
  spbill_create_ip: '8.8.8.8',
  notify_url: 'https://example.com/wechatpay/notify',
  trade_type: 'JSAPI',
  openid: 'oUpF8uMuAJO_M2pxb1Q9zNjWeS6o'
}).then(function(result) {
  console.log(pay.tidyOrderResult(result));
})
```

## 接口

### microPay -- 提交刷卡支付

[微信文档](https://pay.weixin.qq.com/wiki/doc/api/micropay.php?chapter=9_10&index=1)

```js
pay.microPay({
  device_info: '013467007045764',
  body: '深圳腾大- QQ公仔',
  out_trade_no: '1217752501201407033233368018',
  total_fee: 888,
  spbill_create_ip: '8.8.8.8',
  auth_code: '120061098828009406'
}, function(err, result) {})
```

### reverse -- 撤销订单(仅限刷卡支付) 

[微信文档](https://pay.weixin.qq.com/wiki/doc/api/micropay.php?chapter=9_11&index=3)

```js
pay.reverse({
  out_trade_no: '1217752501201407033233368018'
}, function(err, result) {})

// 或者直接传 out_trade_no 字符串

pay.reverse('1217752501201407033233368018', function(err, result) {})
```

### shortUrl -- 转换短链接(仅限刷卡支付)

[微信文档](https://pay.weixin.qq.com/wiki/doc/api/micropay.php?chapter=9_9&index=9)

```
pay.shortUrl({
  long_url: 'weixin://wxpay/bizpayurl?sign=XX&appid=XX&mch_id=XX&product_id=XX&time_stamp=XX&nonce_str=XX'
}, function(err, result) {})

// 或者直接传递 long_url 字符串
pay.shortUrl('weixin://wxpay/bizpayurl?sign=XX&appid=XX&mch_id=XX&product_id=XX&time_stamp=XX&nonce_str=XX', function(err, result) {})
```

### authCodeToOpenId -- 授权码查询openid

[微信文档](https://pay.weixin.qq.com/wiki/doc/api/micropay.php?chapter=9_13&index=10)

```js
pay.authCodeToOpenid({
  auth_code: '120061098828009406'
}, function(err, result) {})

// 或者直接传递 auth_code 字符串
pay.authCodeToOpenid('120061098828009406', function(err, result) {})
```

### unifiedOrder -- 统一下单

> tidyOrderResult 可以用来处理统一下单返回结果，根据接口交易类型 (trade_type) 会生成不同的数据。

[公众号](https://pay.weixin.qq.com/wiki/doc/api/jsapi.php?chapter=9_1) / [小程序](https://pay.weixin.qq.com/wiki/doc/api/wxa/wxa_api.php?chapter=9_1) 

```js
pay.unifiedOrder({
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

[扫码](https://pay.weixin.qq.com/wiki/doc/api/native.php?chapter=9_1)

```js
pay.unifiedOrder({
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

[APP](https://pay.weixin.qq.com/wiki/doc/api/app/app.php?chapter=9_1)

```js
pay.unifiedOrder({
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

[MWEB](https://pay.weixin.qq.com/wiki/doc/api/H5.php?chapter=9_20&index=1)

```js
pay.unifiedOrder({
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

### orderQuery -- 查询订单

[微信文档](https://pay.weixin.qq.com/wiki/doc/api/jsapi.php?chapter=9_2)

```js
pay.orderQuery({
  out_trade_no: '120061098828009406'
}, function(err, result) {})

// 或者直接传递 out_trade_no 字符串
pay.orderQuery('120061098828009406', function(err, result) {})
```

### closeOrder -- 关闭订单

[微信文档](https://pay.weixin.qq.com/wiki/doc/api/jsapi.php?chapter=9_3)

```js
pay.closeOrder({
  out_trade_no: '120061098828009406'
}, function(err, result) {})

// 或者直接传递 out_trade_no 字符串
pay.closeOrder('120061098828009406', function(err, result) {})
```

### refund -- 申请退款

[微信文档](https://pay.weixin.qq.com/wiki/doc/api/jsapi.php?chapter=9_4)

```js
pay.refund({
  out_trade_no: '1217752501201407033233368018',
  out_refund_no: '1217752501201407033233368019',
  total_fee: 100,
  refund_fee: 80
}, function(err, result) {})
```

### refundQuery -- 查询退款

[微信文档](https://pay.weixin.qq.com/wiki/doc/api/jsapi.php?chapter=9_5)

```js
pay.refundQuery({
  out_trade_no: '120061098828009406'
}, function(err, result) {})

// 或者直接传递 out_trade_no 字符串
pay.refundQuery('120061098828009406', function(err, result) {})
```

### downloadBill -- 下载对账单

[微信文档](https://pay.weixin.qq.com/wiki/doc/api/jsapi.php?chapter=9_6)

```js
pay.downloadBill({
  bill_date: '20140603',
  bill_type: 'ALL'
}, function(err, result) {})
```

### downloadFundFlow  -- 下载资金账单

[微信文档](https://pay.weixin.qq.com/wiki/doc/api/jsapi.php?chapter=9_7)

```js
pay.downloadFundFlow({
  bill_date: '20140603',
  account_type: 'Basic',
}, function(err, result) {})
```

### report -- 交易保障

[微信文档](https://pay.weixin.qq.com/wiki/doc/api/jsapi.php?chapter=9_8&index=9)

```js
pay.report({
  interface_url: 'https://api.mch.weixin.qq.com/pay/unifiedorder',
  execute_time: 1000,
  return_code: 'SUCCESS',
  result_code: 'SUCCESS',
  user_ip: '8.8.8.8'
}, function(err, result) {})
```

### batchQueryComment -- 拉取订单评价数据

[微信文档](https://pay.weixin.qq.com/wiki/doc/api/jsapi.php?chapter=9_17&index=11)

```js
pay.batchQueryComment({
  begin_time: '20170724000000',
  end_time: '20170725000000',
  offset: 0,
}, function(err, result) {})
```

### sendCoupon -- 发放代金券

[微信文档](https://pay.weixin.qq.com/wiki/doc/api/tools/sp_coupon.php?chapter=12_3&index=4)

```js
pay.sendCoupon({
  coupon_stock_id: '1757',
  openid_count: 1,
  partner_trade_no: '1000009820141203515766',
  openid: 'onqOjjrXT-776SpHnfexGm1_P7iE'
}, function(err, result) {})
```

### queryCouponStock -- 查询代金券批次

[微信文档](https://pay.weixin.qq.com/wiki/doc/api/tools/sp_coupon.php?chapter=12_4&index=5)

```js
pay.queryCouponStock({
  coupon_stock_id: '1757'
}, function(err, result) {})

// 或者直接传递 coupon_stock_id 字符串
pay.queryCouponStock('1757', function(err, result) {})
```

### queryCouponsInfo -- 查询代金券信息

[微信文档](https://pay.weixin.qq.com/wiki/doc/api/tools/sp_coupon.php?chapter=12_5&index=6)

```js
pay.queryCouponsInfo({
  coupon_id: '1565',
  openid: 'onqOjjrXT-776SpHnfexGm1_P7iE',
  stock_id: '58818'
}, function(err, result) {})
```

### sendRedPack -- 发放普通红包

[微信文档](https://pay.weixin.qq.com/wiki/doc/api/tools/cash_coupon.php?chapter=13_4&index=3) 

```js
pay.sendRedPack({
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

### sendGroupRedPack -- 发放裂变红包

[微信文档](https://pay.weixin.qq.com/wiki/doc/api/tools/cash_coupon.php?chapter=13_5&index=4)

```js
pay.sendGroupredPack({
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

### getHbInfo -- 查询红包记录

[微信文档](https://pay.weixin.qq.com/wiki/doc/api/tools/cash_coupon.php?chapter=13_6&index=5)

```js
pay.getHbInfo({
  mch_billno: '10000098201411111234567890'
}, function(err, result) {})

// 或者直接传递 mch_billno 字符串
pay.getHbInfo('10000098201411111234567890', function(err, result) {})
```

### transfers -- 企业付款到零钱

[微信文档](https://pay.weixin.qq.com/wiki/doc/api/tools/mch_pay.php?chapter=14_2)

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

### getTransferInfo -- 查询企业付款到零钱

[微信文档](https://pay.weixin.qq.com/wiki/doc/api/tools/mch_pay.php?chapter=14_3)

```js
pay.getTransferInfo({
  partner_trade_no: '10000098201411111234567890'
}, function(err, result) {})

// 或者直接传递 partner_trade_no 字符串
pay.getTransferInfo('10000098201411111234567890', function(err, result) {})
```

### getPublicKey -- 获取RSA加密公钥

[微信文档](https://pay.weixin.qq.com/wiki/doc/api/tools/mch_pay.php?chapter=24_7&index=4)

```js
pay.getPublicKey(function(err, result) {})
```

### queryBank -- 查询企业付款银行卡

[微信文档](https://pay.weixin.qq.com/wiki/doc/api/tools/mch_pay.php?chapter=24_3)

```js
pay.queryBank({
  partner_trade_no: '1212121221227'
}, function(err, result) {})

// 或者直接传递 partner_trade_no 字符串
pay.queryBank('1212121221227', function(err, result) {})
```

### payBank -- 企业付款银行卡

[微信文档](https://pay.weixin.qq.com/wiki/doc/api/tools/mch_pay.php?chapter=24_2)

该接口使用前需要调用 `pay.setBankRSA` 设置 rsa 证书， 证书通过接口 `pay.getpublickey` 获得。

```js
pay.setBankRSA(rsa);
pay.payBank({
  partner_trade_no: '1212121221227',
  enc_bank_no: '6225760017946512',
  enc_true_name: '王小王',
  bank_code: '1001',
  amount: 100
}, function(err, result) {})
```

### entrustWeb -- 公众号、APP纯签约

[微信文档](https://pay.weixin.qq.com/wiki/doc/api/pap.php?chapter=18_1&index=1)

```js
let url = pay.entrustWeb({
  plan_id: '12535',
  contract_code: '100000',
  request_serial: 1000,
  contract_display_account: '微信代扣',
  notify_url: 'https://example.com/wechatpay/papcontract/notify'
});
console.log(url);
// https://api.mch.weixin.qq.com/papay/entrustweb?appid=wx426a3015555a46be&contract_code=122&contract_display_account=name1&mch_id=1223816102&notify_url=www.qq.com%2Ftest%2Fpapay&plan_id=106&request_serial=123&timestamp=1414488825&version=1.0&sign=FF1A406564EE701064450CA2149E2514
```

### minaEntrustWeb -- 小程序纯签约
[微信支付](https://pay.weixin.qq.com/wiki/doc/api/pap.php?chapter=18_14&index=2)

```js
let extraData = pay.entrustWeb({
  plan_id: '106',
  contract_code: '122',
  request_serial: 123,
  contract_display_account: '张三',
  notify_url: 'https://www.qq.com/test/papay'
});
console.log(extraData);
{
  appid:'wx426a3015555a46be',
  contract_code:'122',
  contract_display_account:'张三',
  mch_id:'1223816102',
  notify_url:'https://www.qq.com/test/papay',
  plan_id:'106',
  request_serial:123,
  timestamp:1414488825,
  sign:'FF1A406564EE701064450CA2149E2514'
}
```

### h5EntrustWeb -- H5纯签约

[微信支付](https://pay.weixin.qq.com/wiki/doc/api/pap.php?chapter=18_14&index=2)

```js
pay.h5EntrustWeb({
  plan_id: '12535',
  contract_code: '100000',
  request_serial: 1000,
  contract_display_account: '微信代扣',
  notify_url: 'https://example.com/wechatpay/papcontract/notify',
  clientip: '102.142.132.12'
}, function(err, result) {})
```

### contractorder -- 支付中签约

[微信支付](https://pay.weixin.qq.com/wiki/doc/api/pap.php?chapter=18_13&index=4)

```js
pay.contractOrder({
  trade_type: 'JSAPI', // 可选值 JSAPI,NATIVE,APP,MWEB
  contract_mchid: '1223816102',
  contract_appid: 'wx426a3015555a46be',
  out_trade_no: '1217752501201407033233368018',
  body: '腾讯充值中心-QQ会员充值',
  notify_url: 'https://example.com/wechatpay/notify',
  total_fee: 888,
  spbill_create_ip: '8.8.8.8',
  plan_id: 12535,
  contract_code: '100000',
  request_serial: 1000,
  contract_display_account: '微信代扣',
  contract_notify_url: 'https://example.com/wechatpay/pap/notify',
}, function(err, result) {
  // 返回值的处理类似 unifiedOrder
});
```

### queryContract -- 查询签约关系

[微信支付](https://pay.weixin.qq.com/wiki/doc/api/pap.php?chapter=18_2&index=6)

```js
// 通过 contract_id 查询
pay.queryContract('100005698', function(err, result) {}) 

pay.queryContract({
  contract_id: '100005698'
}, function(err, result) {})

// 通过 plan_id + contract_code 查询
pay.queryContract({
  plan_id: 123,
  contract_code: '1023658866'
}, function(err, result) {})
```

### papPayApply -- 申请扣款

[微信支付](https://pay.weixin.qq.com/wiki/doc/api/pap.php?chapter=18_3&index=7)

```js
pay.papPayApply({
  body: '水电代扣',
  out_trade_no: '1217752501201407033233368018',
  total_fee: 888,
  spbill_create_ip: '8.8.8.8',
  notify_url: 'https://example.com/wechatpay/pap/notify',
  contract_id: 'Wx15463511252015071056489715'
}, function(err, result) {})
```

### deleteContract -- 申请解约

[微信支付](https://pay.weixin.qq.com/wiki/doc/api/pap.php?chapter=18_4&index=8)

```js
// 通过 contract_id 解约
pay.deleteContract({
  contract_id: 'Wx15463511252015071056489715',
  contract_termination_remark: '解约原因'
}, function(err, result) {})

// 通过 plan_id + contract_code 解约
pay.deleteContract({
  plan_id: 123,
  contract_code: '1023658866'
  contract_termination_remark: '解约原因'
}, function(err, result) {})
```

### papOrderQuery -- 查询代扣支付订单

[微信支付](https://pay.weixin.qq.com/wiki/doc/api/pap.php?chapter=18_10&index=13)

```js
// 通过 out_trade_no 查询
pay.papOrderQuery({
  out_trade_no: '20150806125346'
}, function(err, result) {})

pay.papOrderQuery('20150806125346', function(err, result) {})

// 通过 transaction_id 查询
pay.papOrderQuery({
  transaction_id: '1009660380201506130728806387'
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
pay.unifiedOrder({
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
