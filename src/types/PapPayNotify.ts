import { BaseReturn, BusinessReturn, SignType } from "./Base";

/**
 * 扣款结果通知
 * @see {@link https://pay.weixin.qq.com/wiki/doc/api/pap.php?chapter=18_7&index=10}
 */
export interface PapPayNotifySuccess extends BaseReturn, BusinessReturn {
  /**
   * 请求appid
   * @description undefined
   * @example wxcbda96de0b165486
   * @typedef String(32)
   */
  appid: string;
  /**
   * 商户号
   * @description undefined
   * @example 10000098
   * @typedef String(32)
   */
  mch_id: string;
  /**
   * 设备号
   * @description undefined
   * @example 013467007045764
   * @typedef String(32)
   */
  device_info?: string;
  /**
   * 随机字符串
   * @description undefined
   * @example 5K8264ILTKCH16CQ2502SI8ZNMTM67VS
   * @typedef String(32)
   */
  nonce_str: string;
  /**
   * 签名
   * @description undefined
   * @example C380BEC2BFD727A4B6845133519F3AD6
   * @typedef String(32)
   */
  sign: string;
  /**
   * 用户标识
   * @description undefined
   * @example wxd930ea5d5a258f4f
   * @typedef String(128)
   */
  openid: string;
  /**
   * 是否关注公众账号
   * @description undefined
   * @example Y
   * @typedef String(1)
   */
  is_subscribe?: string;
  /**
   * 付款银行
   * @description undefined
   * @example CMC
   * @typedef String(16)
   */
  bank_type: string;
  /**
   * 总金额
   * @description undefined
   * @example 100
   * @typedef Int
   */
  total_fee: number;
  /**
   * 货币种类
   * @description undefined
   * @example CNY
   * @typedef String(8)
   */
  fee_type?: string;
  /**
   * 现金支付金额
   * @description undefined
   * @example 100
   * @typedef Int
   */
  cash_fee: number;
  /**
   * 现金支付货币类型
   * @description undefined
   * @example CNY
   * @typedef String(16)
   */
  cash_fee_type?: string;
  /**
   * 交易状态
   * @description undefined
   * @example SUCCESS
   * @typedef String(32)
   */
  trade_state: string;
  /**
   * 代金券或立减优惠金额
   * @description undefined
   * @example 10
   * @typedef Int
   */
  coupon_fee?: number;
  /**
   * 代金券或立减优惠使用数量
   * @description undefined
   * @example 1
   * @typedef Int
   */
  coupon_count?: number;
  /**
   * 代金券或立减优惠ID
   * @description undefined
   * @example 10000
   * @typedef String(20)
   */
  coupon_id_$n?: string;
  /**
   * 单个代金券或立减优惠支付金额
   * @description undefined
   * @example 100
   * @typedef Int
   */
  coupon_fee_$n?: number;
  /**
   * 微信支付订单号
   * @description undefined
   * @example 1217752501201407033233368018
   * @typedef String(32)
   */
  transaction_id: string;
  /**
   * 商户订单号
   * @description undefined
   * @example 1212321211201407033568112322
   * @typedef String(32)
   */
  out_trade_no: string;
  /**
   * 商家数据包
   * @description undefined
   * @example 123456
   * @typedef String(128)
   */
  attach?: string;
  /**
   * 支付完成时间
   * @description undefined
   * @example 20141030133525
   * @typedef String(14)
   */
  time_end: string;
  /**
   * 委托代扣协议id
   * @description undefined
   * @example Wx15463511252015071056489715
   * @typedef String(32)
   */
  contract_id: string;
}

/**
 * 扣款结果通知
 * @see {@link https://pay.weixin.qq.com/wiki/doc/api/pap.php?chapter=18_7&index=10}
 */
export interface PapPayNotifyFail extends BaseReturn, BusinessReturn {
  /**
   * 请求appid
   * @description undefined
   * @example wxcbda96de0b165486
   * @typedef String(32)
   */
  appid: string;
  /**
   * 商户号
   * @description undefined
   * @example 10000098
   * @typedef String(32)
   */
  mch_id: string;
  /**
   * 随机字符串
   * @description undefined
   * @example 5K8264ILTKCH16CQ2502SI8ZNMTM67VS
   * @typedef String(32)
   */
  nonce_str: string;
  /**
   * 签名
   * @description undefined
   * @example C380BEC2BFD727A4B6845133519F3AD6
   * @typedef String(32)
   */
  sign: string;
  /**
   * 交易状态
   * @description undefined
   * @example SUCCESS
   * @typedef String(32)
   */
  trade_state: string;
  /**
   * 商户订单号
   * @description undefined
   * @example 1212321211201407033568112322
   * @typedef String(32)
   */
  out_trade_no: string;
  /**
   * 委托代扣协议id
   * @description undefined
   * @example Wx15463511252015071056489715
   * @typedef String(32)
   */
  contract_id: string;
}

export interface PapPayNotifyResponse extends BaseReturn {}

export type PapPayNotifyHandler = (
  data: PapPayNotifySuccess | PapPayNotifyFail
) => Promise<PapPayNotifyResponse>;
