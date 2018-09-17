/**
 * 提交刷卡支付
 * @see {@link https://pay.weixin.qq.com/wiki/doc/api/micropay.php?chapter=9_10&index=1}
 */

import { FailT, SignType, SuccessT } from "./Base";

export interface MicroPayOptions {
  /**
   * 设备号
   * @description 终端设备号(商户自定义，如门店编号)
   * @example 013467007045764
   * @typedef String(32)
   */
  device_info?: string;
  /**
   * 签名类型
   * @description 签名类型，目前支持HMAC-SHA256和MD5，默认为MD5
   * @example HMAC-SHA256
   * @typedef String(32)
   */
  sign_type?: SignType;
  /**
   * 商品描述
   * @description 商品简单描述，该字段须严格按照规范传递，具体请见参数规定
   * @example image形象店-深圳腾大- QQ公仔
   * @typedef String(128)
   */
  body: string;
  /**
   * 商品详情
   * @description 单品优惠功能字段，需要接入详见单品优惠详细说明
   * @typedef String(6000)
   */
  detail?: string;
  /**
   * 附加数据
   * @description 附加数据，在查询API和支付通知中原样返回，该字段主要用于商户携带订单的自定义数据
   * @example 说明
   * @typedef String(127)
   */
  attach?: string;
  /**
   * 商户订单号
   * @description 商户系统内部订单号，要求32个字符内，只能是数字、大小写字母_-|*且在同一个商户号下唯一。详见商户订单号
   * @example 1217752501201407033233368018
   * @typedef String(32)
   */
  out_trade_no: string;
  /**
   * 订单金额
   * @description 订单总金额，单位为分，只能为整数，详见支付金额
   * @example 888
   * @typedef Int
   */
  total_fee: number;
  /**
   * 货币类型
   * @description 符合ISO4217标准的三位字母代码，默认人民币：CNY，详见货币类型
   * @example CNY
   * @typedef String(16)
   */
  fee_type?: string;
  /**
   * 终端IP
   * @description 调用微信支付API的机器IP
   * @example 8.8.8.8
   * @typedef String(16)
   */
  spbill_create_ip: string;
  /**
   * 订单优惠标记
   * @description 订单优惠标记，代金券或立减优惠功能的参数，详见代金券或立减优惠
   * @example 1234
   * @typedef String(32)
   */
  goods_tag?: string;
  /**
   * 指定支付方式
   * @description no_credit--指定不能使用信用卡支付
   * @example no_credit
   * @typedef String(32)
   */
  limit_pay?: string;
  /**
   * 交易起始时间
   * @description 订单生成时间，格式为yyyyMMddHHmmss，如2009年12月25日9点10分10秒表示为20091225091010。其他详见时间规则
   * @example 20091225091010
   * @typedef String(14)
   */
  time_start?: string;
  /**
   * 交易结束时间
   * @description 订单失效时间，格式为yyyyMMddHHmmss，如2009年12月27日9点10分10秒表示为20091227091010。
   *   注意：最短失效时间间隔需大于1分钟
   * @example 20091227091010
   * @typedef String(14)
   */
  time_expire?: string;
  /**
   * 授权码
   * @description 扫码支付授权码，设备读取用户微信中的条码或者二维码信息
   *   （注：用户刷卡条形码规则：18位纯数字，以10、11、12、13、14、15开头）
   * @example 120061098828009406
   * @typedef String(128)
   */
  auth_code: string;
  /**
   * +场景信息
   * @description 该字段用于上报场景信息，目前支持上报实际门店信息。该字段为JSON对象数据
   * @example {"store_info" : {"id": "SZTX001","name": "腾大餐厅","area_code": "440305","address": "科技园中一路腾讯大厦" }}
   * @typedef String(256)
   */
  scene_info?: string;
}

interface MicroPayResponseCommon {
  /**
   * 公众账号ID
   * @description 调用接口提交的公众账号ID
   * @example wx8888888888888888
   * @typedef String(32)
   */
  appid: string;
  /**
   * 商户号
   * @description 调用接口提交的商户号
   * @example 1900000109
   * @typedef String(32)
   */
  mch_id: string;
  /**
   * 设备号
   * @description 调用接口提交的终端设备号，
   * @example 013467007045764
   * @typedef String(32)
   */
  device_info?: string;
  /**
   * 随机字符串
   * @description 微信返回的随机字符串
   * @example 5K8264ILTKCH16CQ2502SI8ZNMTM67VS
   * @typedef String(32)
   */
  nonce_str: string;
  /**
   * 签名
   * @description 微信返回的签名，详见签名生成算法
   * @example C380BEC2BFD727A4B6845133519F3AD6
   * @typedef String(32)
   */
  sign: string;
}

interface MicroPayResponseFail extends MicroPayResponseCommon {}

interface MicroPayResponseSuccess extends MicroPayResponseCommon {
  /**
   * 用户标识
   * @description 用户在商户appid 下的唯一标识
   * @example Y
   * @typedef String(128)
   */
  openid: string;
  /**
   * 是否关注公众账号
   * @description 用户是否关注公众账号，仅在公众账号类型支付有效，取值范围：Y或N;Y-关注;N-未关注
   * @example Y
   * @typedef String(1)
   */
  is_subscribe: string;
  /**
   * 交易类型
   * @description MICROPAY 刷卡支付
   * @example MICROPAY
   * @typedef String(16)
   */
  trade_type: string;
  /**
   * 付款银行
   * @description 银行类型，采用字符串类型的银行标识，详见银行类型
   * @example CMC
   * @typedef String(32)
   */
  bank_type: string;
  /**
   * 货币类型
   * @description 符合ISO 4217标准的三位字母代码，默认人民币：CNY，详见货币类型
   * @example CNY
   * @typedef String(16)
   */
  fee_type?: string;
  /**
   * 订单金额
   * @description 订单总金额，单位为分，只能为整数，详见支付金额
   * @example 888
   * @typedef Int
   */
  total_fee: number;
  /**
   * 应结订单金额
   * @description 当订单使用了免充值型优惠券后返回该参数，应结订单金额=订单金额-免充值优惠券金额。
   * @example 100
   * @typedef Int
   */
  settlement_total_fee?: number;
  /**
   * 代金券金额
   * @description “代金券”金额<=订单金额，订单金额-“代金券”金额=现金支付金额，详见支付金额
   * @example 100
   * @typedef Int
   */
  coupon_fee?: number;
  /**
   * 现金支付货币类型
   * @description 符合ISO 4217标准的三位字母代码，默认人民币：CNY，其他值列表详见货币类型
   * @example CNY
   * @typedef String(16)
   */
  cash_fee_type?: string;
  /**
   * 现金支付金额
   * @description 订单现金支付金额，详见支付金额
   * @example 100
   * @typedef Int
   */
  cash_fee: number;
  /**
   * 微信支付订单号
   * @description 微信支付订单号
   * @example 1217752501201407033233368018
   * @typedef String(32)
   */
  transaction_id: string;
  /**
   * 商户订单号
   * @description 商户系统内部订单号，要求32个字符内，只能是数字、大小写字母_-|*且在同一个商户号下唯一。
   * @example 1217752501201407033233368018
   * @typedef String(32)
   */
  out_trade_no: string;
  /**
   * 商家数据包
   * @description 商家数据包，原样返回
   * @example 123456
   * @typedef String(128)
   */
  attach?: string;
  /**
   * 支付完成时间
   * @description 订单生成时间，格式为yyyyMMddHHmmss，如2009年12月25日9点10分10秒表示为20091225091010。详见时间规则
   * @example 20141030133525
   * @typedef String(14)
   */
  time_end: string;
  /**
   * 营销详情
   * @description 新增返回，单品优惠功能字段，需要接入请见详细说明
   * @example 示例见下文
   * @typedef String(6000)
   */
  promotion_detail?: string;
}

export type MicroPaySuccess = SuccessT<MicroPayResponseSuccess>;
export type MicroPayFail = FailT<MicroPayResponseFail>;
