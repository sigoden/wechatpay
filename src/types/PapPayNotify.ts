/**
 * 扣款结果通知
 * @see {@link https://pay.weixin.qq.com/wiki/doc/api/pap.php?chapter=18_7&index=10}
 */

import { BaseReturn, FailT, SuccessT } from "./Base";

export interface PapPayNotifyOptionsSuccess {
  /**
   * 请求appid
   * @description appid是商户在微信申请公众号或移动应用成功后分配的帐号ID，登录平台为mp.weixin.qq.com或open.weixin.qq.com
   * @example wxcbda96de0b165486
   * @typedef String(32)
   */
  appid: string;
  /**
   * 商户号
   * @description 商户号是商户在微信申请微信支付成功后分配的帐号ID，登录平台为pay.weixin.qq.com
   * @example 10000098
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
   * 付款银行
   * @description 银行类型，采用字符串类型的银行标识，银行类型见银行列表
   * @example CMC
   * @typedef String(16)
   */
  bank_type: string;
  /**
   * 总金额
   * @description 订单总金额，单位为分(trade_state为SUCCESS和REFUND时才有返回)
   * @example 100
   * @typedef Int
   */
  total_fee: number;
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
   * 交易状态
   * @description
   * - SUCCESS—支付成功
   * - REFUND—转入退款
   * - NOTPAY—未支付
   * - CLOSED—已关闭
   * - ACCEPT—已接收，等待扣款
   * - PAY_FAIL--支付失败(其他原因，如银行返回失败)
   * @example SUCCESS
   * @typedef String(32)
   */
  trade_state: string;
  /**
   * 代金券或立减优惠金额
   * @description 代金券或立减优惠金额<=订单总金额，订单总金额-代金券或立减优惠金额=现金支付金额，详见支付金额
   * @example 10
   * @typedef Int
   */
  coupon_fee?: number;
  /**
   * 代金券或立减优惠使用数量
   * @example 1
   * @typedef Int
   */
  coupon_count?: number;
  /**
   * 代金券或立减优惠ID
   * @description 代金券或立减优惠ID,$n为下标，从0开始编号
   * @example 10000
   * @typedef String(20)
   */
  coupon_id_$n?: string;
  /**
   * 单个代金券或立减优惠支付金额
   * @description 单个代金券或立减优惠支付金额,$n为下标，从0开始编号
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
   * @description 商户系统的订单号，与请求一致。
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
  /**
   * 委托代扣协议id
   * @description 签约成功后，微信返回的委托代扣协议id
   * @example Wx15463511252015071056489715
   * @typedef String(32)
   */
  contract_id: string;
}

export interface PapPayNotifyOptionsFail {
  /**
   * 请求appid
   * @description appid是商户在微信申请公众号或移动应用成功后分配的帐号ID，登录平台为mp.weixin.qq.com或open.weixin.qq.com
   * @example wxcbda96de0b165486
   * @typedef String(32)
   */
  appid: string;
  /**
   * 商户号
   * @description 商户号是商户在微信申请微信支付成功后分配的帐号ID，登录平台为pay.weixin.qq.com
   * @example 10000098
   * @typedef String(32)
   */
  mch_id: string;
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
   * 交易状态
   * @description
   * - SUCCESS—支付成功
   * - REFUND—转入退款
   * - NOTPAY—未支付
   * - CLOSED—已关闭
   * - ACCEPT—已接收，等待扣款
   * - PAY_FAIL--支付失败(其他原因，如银行返回失败)
   * @example SUCCESS
   * @typedef String(32)
   */
  trade_state: string;
  /**
   * 商户订单号
   * @description 商户系统的订单号，与请求一致。
   * @example 1212321211201407033568112322
   * @typedef String(32)
   */
  out_trade_no: string;
  /**
   * 委托代扣协议id
   * @description 签约成功后，微信返回的委托代扣协议id
   * @example Wx15463511252015071056489715
   * @typedef String(32)
   */
  contract_id: string;
}

export type PapPayNotifySuccess = SuccessT<PapPayNotifyOptionsSuccess>;
export type PapPayNotifyFail = FailT<PapPayNotifyOptionsFail>;

export type PapPayNotifyHandler = (
  data: PapPayNotifySuccess | PapPayNotifyFail
) => Promise<BaseReturn>;
