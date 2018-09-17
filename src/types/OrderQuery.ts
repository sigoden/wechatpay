/**
 * 查询订单
 * @see {@link https://pay.weixin.qq.com/wiki/doc/api/micropay.php?chapter=9_2}
 */
import { FailT, SignType, SuccessT } from "./Base";

export interface OrderQueryOptions {
  /**
   * 微信订单号
   * @description 微信的订单号，建议优先使用
   * @example 1009660380201506130728806387
   * @typedef String(32)
   */
  transaction_id?: string;
  /**
   * 商户订单号
   * @description 商户系统内部订单号，要求32个字符内，只能是数字、大小写字母_-|*@ ，且在同一个商户号下唯一。 详见商户订单号
   * @example 20150806125346
   * @typedef String(32)
   */
  out_trade_no?: string;
  /**
   * 签名类型
   * @description 签名类型，目前支持HMAC-SHA256和MD5，默认为MD5
   * @example HMAC-SHA256
   * @typedef String(32)
   */
  sign_type?: SignType;
}

interface OrderQueryResponseCommon {
  /**
   * 公众账号ID
   * @description 微信分配的公众账号ID
   * @example wxd678efh567hg6787
   * @typedef String(32)
   */
  appid?: string;
  /**
   * 商户号
   * @description 微信支付分配的商户号
   * @example 1230000109
   * @typedef String(32)
   */
  mch_id?: string;
  /**
   * 随机字符串
   * @description 随机字符串，不长于32位。推荐随机数生成算法
   * @example 5K8264ILTKCH16CQ2502SI8ZNMTM67VS
   * @typedef String(32)
   */
  nonce_str?: string;
  /**
   * 签名
   * @description 签名，详见签名生成算法
   * @example C380BEC2BFD727A4B6845133519F3AD6
   * @typedef String(32)
   */
  sign?: string;
}

export interface OrderQueryResponseFail extends OrderQueryResponseCommon {}

export interface OrderQueryResponseSuccess extends OrderQueryResponseCommon {
  /**
   * 设备号
   * @description 微信支付分配的终端设备号，
   * @example 013467007045764
   * @typedef String(32)
   */
  device_info?: string;
  /**
   * 用户标识
   * @description 用户在商户appid下的唯一标识
   * @example oUpF8uMuAJO_M2pxb1Q9zNjWeS6o
   * @typedef String(128)
   */
  openid?: string;
  /**
   * 是否关注公众账号
   * @description 用户是否关注公众账号，Y-关注，N-未关注，仅在公众账号类型支付有效
   * @example Y
   * @typedef String(1)
   */
  is_subscribe?: string;
  /**
   * 交易类型
   * @description 调用接口提交的交易类型，取值如下：JSAPI，NATIVE，APP，MICROPAY，详细说明见参数规定
   * @example JSAPI
   * @typedef String(16)
   */
  trade_type?: string;
  /**
   * 交易状态
   * @description
   * - SUCCESS—支付成功
   * - REFUND—转入退款
   * - NOTPAY—未支付
   * - CLOSED—已关闭
   * - REVOKED—已撤销（刷卡支付）
   * - USERPAYING--用户支付中
   * - PAYERROR--支付失败(其他原因，如银行返回失败)
   * @example SUCCESS
   * @typedef String(32)
   */
  trade_state?: string;
  /**
   * 付款银行
   * @description 银行类型，采用字符串类型的银行标识
   * @example CMC
   * @typedef String(16)
   */
  bank_type?: string;
  /**
   * 标价金额
   * @description 订单总金额，单位为分
   * @example 100
   * @typedef Int
   */
  total_fee?: number;
  /**
   * 应结订单金额
   * @description 当订单使用了免充值型优惠券后返回该参数，应结订单金额=订单金额-免充值优惠券金额。
   * @example 100
   * @typedef Int
   */
  settlement_total_fee?: number;
  /**
   * 标价币种
   * @description 货币类型，符合ISO 4217标准的三位字母代码，默认人民币：CNY，其他值列表详见货币类型
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
  cash_fee?: number;
  /**
   * 现金支付币种
   * @description 货币类型，符合ISO 4217标准的三位字母代码，默认人民币：CNY，其他值列表详见货币类型
   * @example CNY
   * @typedef String(16)
   */
  cash_fee_type?: string;
  /**
   * 代金券金额
   * @description “代金券”金额<=订单金额，订单金额-“代金券”金额=现金支付金额，详见支付金额
   * @example 100
   * @typedef Int
   */
  coupon_fee?: number;
  /**
   * 代金券使用数量
   * @description 代金券使用数量
   * @example 1
   * @typedef Int
   */
  coupon_count?: number;
  /**
   * 代金券类型
   * @description CASH--充值代金券 NO_CASH---非充值优惠券 开通免充值券功能，并且订单使用了优惠券后有返回（取值：CASH、NO_CASH）。$n为下标,从0开始编号，举例：coupon_type_$0
   * @example CASH
   * @typedef String
   */
  coupon_type_$n?: string;
  /**
   * 代金券ID
   * @description 代金券ID, $n为下标，从0开始编号
   * @example 10000
   * @typedef String(20)
   */
  coupon_id_$n?: string;
  /**
   * 单个代金券支付金额
   * @description 单个代金券支付金额, $n为下标，从0开始编号
   * @example 100
   * @typedef Int
   */
  coupon_fee_$n?: number;
  /**
   * 微信支付订单号
   * @description 微信支付订单号
   * @example 1009660380201506130728806387
   * @typedef String(32)
   */
  transaction_id?: string;
  /**
   * 商户订单号
   * @description 商户系统内部订单号，要求32个字符内，只能是数字、大小写字母_-|*@ ，且在同一个商户号下唯一。
   * @example 20150806125346
   * @typedef String(32)
   */
  out_trade_no?: string;
  /**
   * 附加数据
   * @description 附加数据，原样返回
   * @example 深圳分店
   * @typedef String(128)
   */
  attach?: string;
  /**
   * 支付完成时间
   * @description 订单支付时间，格式为yyyyMMddHHmmss，如2009年12月25日9点10分10秒表示为20091225091010。其他详见时间规则
   * @example 20141030133525
   * @typedef String(14)
   */
  time_end?: string;
  /**
   * 交易状态描述
   * @description 对当前查询订单状态的描述和下一步操作的指引
   * @example 支付失败，请重新下单支付
   * @typedef String(256)
   */
  trade_state_desc?: string;
}

export type OrderQuerySuccess = SuccessT<OrderQueryResponseSuccess>;
export type OrderQueryFail = FailT<OrderQueryResponseFail>;
