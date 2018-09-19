# 微信支付 node.js

[![Build Status](https://travis-ci.org/sigoden/wechatpay.svg?branch=master)](https://travis-ci.org/sigoden/wechatpay)
[![Codacy Badge](https://api.codacy.com/project/badge/Grade/f019843d36f643378a26840660c10f61)](https://www.codacy.com/app/sigoden/wechatpay?utm_source=github.com&utm_medium=referral&utm_content=sigoden/wechatpay&utm_campaign=Badge_Grade)
[![Coverage Status](https://coveralls.io/repos/github/sigoden/wechatpay/badge.svg?branch=master)](https://coveralls.io/github/sigoden/wechatpay?branch=master)
[![dependencies Status](https://david-dm.org/sigoden/wechatpay/status.svg)](https://david-dm.org/sigoden/wechatpay)
[![Known Vulnerabilities](https://snyk.io/test/github/sigoden/wechatpay/badge.svg?targetFile=package.json)](https://snyk.io/test/github/sigoden/wechatpay?targetFile=package.json)

> 微信支付 SDK，支持刷卡支付、公众号支付、扫码支付、APP 支付、H5 支付，以及优惠券，红包，企业付款，微信代扣

## 特性

- 使用 Typescript 编写，拥有更安全的类型和更好的代码提示
- 支持所有类型微信支付
- 支持微信代扣
- 提供调试模式

## 开始使用

```js
const path = require("path");
const fs = require("fs");
const {
  PubPay,
  RequestError,
  CommunicationError,
  utils: { getXMLBody }
} = require("@sigodenjs/wechatpay");

const pay = new PubPay({
  appId: "wxb80e5bddb2d804f3",
  key: "6Q9VX4N3WTBM9G9XBL7H1L9PB9ANHLY7",
  mchId: "1434712502",
  pfx: fs.readFileSync(path.resolve(__dirname, "cert.p12"))
});

// 调用统一下单接口
pay
  .unifiedOrder({
    body: "腾讯充值中心-QQ会员充值",
    out_trade_no: "1217752501201407033233368018",
    total_fee: 888,
    spbill_create_ip: "8.8.8.8",
    notify_url: "https://example.com/wechatpay/notify",
    trade_type: "JSAPI",
    openid: "oUpF8uMuAJO_M2pxb1Q9zNjWeS6o"
  })
  .then(res => {
    if (!pay.verifySign(res)) {
      // 签名校验失败
      throw new Error("签名校验失败");
    }
    if (res.result_code === "FAIL") {
      console.log(res.err_code, res.err_code_des);
    } else {
      console.log(res.prepay_id);
    }
  })
  .catch(err => {
    if (err instanceof RequestError) {
      // 请求错误
    } else if (err instanceof CommunicationError) {
      // return_code = FAIL
    }
  });

// 支付结果通知
router.post("/wechatpay/notify", (req, res) => {
  const options = {
    length: req.headers["content-length"],
    limit: "1mb",
    encoding: "utf8"
  };
  getXMLBody(req, options).then(data => {
    pay
      .payNotify(data, async parsedData => {
        if (!pay.verifySign(parsedData)) {
          // 签名校验失败
        }
        if (parsedData.parsedDatault_code === "FAIL") {
          // 业务逻辑失败
        }
        // ...
        return {
          return_code: "SUCCESS",
          return_msg: "OK"
        };
      })
      .then(returnData => {
        res.set("Content-Type", "application/xml; charset=utf-8");
        res.end(returnData);
      });
  });
});
```

## 类和接口

### 业务类
- [AppPay](https://sigoden.github.io/wechatpay/classes/apppay): APP 支付
- [Bank](https://sigoden.github.io/wechatpay/classes/bank): 企业付款
- [Coupon](https://sigoden.github.io/wechatpay/classes/coupon): 代金券
- [LitePay](https://sigoden.github.io/wechatpay/classes/litepay): 小程序支付
- [PubPay](https://sigoden.github.io/wechatpay/classes/pubpay): 公众号支付
- [PubQrPay](https://sigoden.github.io/wechatpay/classes/pubqrpay): 扫码支付
- [PubScanPay](https://sigoden.github.io/wechatpay/classes/pubscanpay): 刷卡支付
- [RedPack](https://sigoden.github.io/wechatpay/classes/redpack): 现金红包
- [WapPay](https://sigoden.github.io/wechatpay/classes/wappay): H5 支付
- [AppEntrust](https://sigoden.github.io/wechatpay/classes/appentrust): APP 代扣
- [LiteEntrust](https://sigoden.github.io/wechatpay/classes/liteentrust): 小程序代扣
- [PubEntrsut](https://sigoden.github.io/wechatpay/classes/pubentrsut): 公众号代扣
- [WapEntrust](https://sigoden.github.io/wechatpay/classes/wapentrust): H5 代扣

### 综合类

- [Pay](https://sigoden.github.io/wechatpay/classes/pay): 组合所有支付类，包含所有支付相关接口
- [Entrust](https://sigoden.github.io/wechatpay/classes/entrust): 组合所有代扣类，包含所有代扣相关接扣

> 如果你只使用了某一项支付，请使用业务类。但如果涉及多种支付，使用综合类更便捷。

### 支付相关接口

- [batchQueryComment](https://sigoden.github.io/wechatpay/classes/pay#batchquerycomment): 拉取订单评价数据
- [downloadBill](https://sigoden.github.io/wechatpay/classes/pay#downloadbill): 下载对账单
- [downloadFundFlow](https://sigoden.github.io/wechatpay/classes/pay#downloadfundflow): 下载资金账单
- [orderQuery](https://sigoden.github.io/wechatpay/classes/pay#orderquery): 查询订单
- [refund](https://sigoden.github.io/wechatpay/classes/pay#refund): 申请退款
- [refundNotify](https://sigoden.github.io/wechatpay/classes/pay#refundnotify): 退款结果通知处理
- [refundQuery](https://sigoden.github.io/wechatpay/classes/pay#refundquery): 查询退款
- [report](https://sigoden.github.io/wechatpay/classes/pay#report): 交易保障
- [closeOrder](https://sigoden.github.io/wechatpay/classes/pay#closeorder): 关闭订单
- [payNotify](https://sigoden.github.io/wechatpay/classes/pay#paynotify): 支付结果通知
- [unifiedOrder](https://sigoden.github.io/wechatpay/classes/pay#unifiedorder): 统一下单
- [authCodeToOpenId](https://sigoden.github.io/wechatpay/classes/pay#authcodetoopenid) - 授权码查询 OpenId
- [microPay](https://sigoden.github.io/wechatpay/classes/pay#micropay) - 提交刷卡支付
- [reverse](https://sigoden.github.io/wechatpay/classes/pay#reverse) - 撤销订单
- [shortURL](https://sigoden.github.io/wechatpay/classes/pay#shorturl) - 短链接转换
- [getPublicKey](https://sigoden.github.io/wechatpay/classes/pay#getpublickey): 获取 RSA 加密公钥
- [getTransferInfo](https://sigoden.github.io/wechatpay/classes/pay#gettransferinfo): 查询企业付款到零钱
- [payBank](https://sigoden.github.io/wechatpay/classes/pay#paybank): 企业付款到银行卡
- [queryBank](https://sigoden.github.io/wechatpay/classes/pay#querybank): 查询企业付款到银行卡
- [transfers](https://sigoden.github.io/wechatpay/classes/pay#transfers): 企业付款到零钱
- [queryCouponStock](https://sigoden.github.io/wechatpay/classes/pay#querycouponstock): 查询代金券批次
- [queryCouponsInfo](https://sigoden.github.io/wechatpay/classes/pay#querycouponsinfo): 查询代金券信息
- [sendCoupon](https://sigoden.github.io/wechatpay/classes/pay#sendcoupon): 发放代金券
- [getHbInfo](https://sigoden.github.io/wechatpay/classes/pay#gethbinfo): 查询红包记录
- [sendGroupGroupRedPack](https://sigoden.github.io/wechatpay/classes/pay#sendgroupgroupredpack): 发放裂变红包
- [sendRedPack](https://sigoden.github.io/wechatpay/classes/pay#sendredpack): 发放普通红包

### 代扣相关接口

- [contractNotify](https://sigoden.github.io/wechatpay/classes/entrust#contractnotify): 签约，解约结果通知
- [contractOrder](https://sigoden.github.io/wechatpay/classes/entrust#contractorder): 支付中签约
- [deleteContract](https://sigoden.github.io/wechatpay/classes/entrust#deletecontract): 申请解约
- [entrust](https://sigoden.github.io/wechatpay/classes/entrust#entrust): 纯签约
- [papOrderQuery](https://sigoden.github.io/wechatpay/classes/entrust#paporderquery): 查询订单
- [papPayApply](https://sigoden.github.io/wechatpay/classes/entrust#pappayapply): 申请扣款
- [papPayNotify](https://sigoden.github.io/wechatpay/classes/entrust#pappaynotify): 扣款结果通知
- [queryContract](https://sigoden.github.io/wechatpay/classes/entrust#querycontract): 查询签约关系
- [downloadBill](https://sigoden.github.io/wechatpay/classes/entrust#downloadbill): 下载对账单
- [refund](https://sigoden.github.io/wechatpay/classes/entrust#refund): 申请退款
- [refundQuery](https://sigoden.github.io/wechatpay/classes/entrust#refundquery): 查询退款

## 许可证

Copyright (c) 2018 sigoden

Licensed under the MIT license.
