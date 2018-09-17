import { BaseReturn, BusinessReturn, SignType } from "./Base";

/**
 * 支付结果通知
 * @see {@link https://pay.weixin.qq.com/wiki/doc/api/jsapi.php?chapter=9_7&index=8}
 */
export interface PayNotifyInfo extends BaseReturn, BusinessReturn {
  /**
   * 公众账号ID
   * @description 微信分配的公众账号ID（企业号corpid即为此appId）
   * @example wx8888888888888888
   * @typedef String(32)
   */
  appid: string;
  /**
   * 商户号
   * @description 微信支付分配的商户号
   * @example 1900000109
   * @typedef String(32)
   */
  mch_id: string;
  /**
   * 设备号
   * @description 微信支付分配的终端设备号，
   * @example 013467007045764
   * @typedef String(32)
   */
  device_info?: string;
  /**
   * 随机字符串
   * @description 随机字符串，不长于32位
   * @example 5K8264ILTKCH16CQ2502SI8ZNMTM67VS
   * @typedef String(32)
   */
  nonce_str: string;
  /**
   * 签名
   * @description 签名，详见签名算法
   * @example C380BEC2BFD727A4B6845133519F3AD6
   * @typedef String(32)
   */
  sign: string;
  /**
   * 签名类型
   * @description 签名类型，目前支持HMAC-SHA256和MD5，默认为MD5
   * @example HMAC-SHA256
   * @typedef String(32)
   */
  sign_type?: SignType;
  /**
   * 用户标识
   * @description 用户在商户appid下的唯一标识
   * @example wxd930ea5d5a258f4f
   * @typedef String(128)
   */
  openid: string;
  /**
   * 是否关注公众账号
   * @description 用户是否关注公众账号，Y-关注，N-未关注，仅在公众账号类型支付有效
   * @example Y
   * @typedef String(1)
   */
  is_subscribe?: string;
  /**
   * 交易类型
   * @description JSAPI、NATIVE、APP
   * @example JSAPI
   * @typedef String(16)
   */
  trade_type: string;
  /**
   * 付款银行
   * @description 银行类型，采用字符串类型的银行标识，银行类型见银行列表
   * @example CMC
   * @typedef String(16)
   */
  bank_type: string;
  /**
   * 订单金额
   * @description 订单总金额，单位为分
   * @example 100
   * @typedef Int
   */
  total_fee: number;
  /**
   * 应结订单金额
   * @description 应结订单金额=订单金额-非充值代金券金额，应结订单金额<=订单金额。
   * @example 100
   * @typedef Int
   */
  settlement_total_fee?: number;
  /**
   * 货币种类
   * @description 货币类型，符合ISO4217标准的三位字母代码，默认人民币：CNY，其他值列表详见货币类型
   * @example CNY
   * @typedef String(8)
   */
  fee_type?: string;
  /**
   * 现金支付金额
   * @description 现金支付金额订单现金支付金额，详见支付金额
   * @example 100
   * @typedef Int
   */
  cash_fee: number;
  /**
   * 现金支付货币类型
   * @description 货币类型，符合ISO4217标准的三位字母代码，默认人民币：CNY，其他值列表详见货币类型
   * @example CNY
   * @typedef String(16)
   */
  cash_fee_type?: string;
  /**
   * 总代金券金额
   * @description 代金券金额<=订单金额，订单金额-代金券金额=现金支付金额，详见支付金额
   * @example 10
   * @typedef Int
   */
  coupon_fee?: number;
  /**
   * 代金券使用数量
   * @example 1
   * @typedef Int
   */
  coupon_count?: number;
  /**
   * 代金券类型
   * @description
   * - CASH--充值代金券
   * - NO_CASH---非充值代金券,并且订单使用了免充值券后有返回（取值：CASH、NO_CASH）。
   *
   * $n为下标,从0开始编号，举例：coupon_type_0
   * @example CASH
   * @typedef String
   */
  coupon_type_$n?: string;
  /**
   * 代金券ID
   * @description 代金券ID,$n为下标，从0开始编号
   * @example 10000
   * @typedef String(20)
   */
  coupon_id_$n?: string;
  /**
   * 单个代金券支付金额
   * @description 单个代金券支付金额,$n为下标，从0开始编号
   * @example 100
   * @typedef Int
   */
  coupon_fee_$n?: number;
  /**
   * 微信支付订单号
   * @example 1217752501201407033233368018
   * @typedef String(32)
   */
  transaction_id: string;
  /**
   * 商户订单号
   * @description 商户系统内部订单号，要求32个字符内，只能是数字、大小写字母_-|*@ ，且在同一个商户号下唯一。
   * @example 1212321211201407033568112322
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
   * @description 支付完成时间，格式为yyyyMMddHHmmss，如2009年12月25日9点10分10秒表示为20091225091010。其他详见时间规则
   * @example 20141030133525
   * @typedef String(14)
   */
  time_end: string;
}

export interface PayNotifyResponse extends BaseReturn {}

export type PayNotifyHandler = (
  data: PayNotifyInfo
) => Promise<PayNotifyResponse>;
