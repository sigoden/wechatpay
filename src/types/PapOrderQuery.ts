import { BaseReturn, BusinessReturn } from "./Base";

/**
 * 查询订单选项
 * @see {@link https://pay.weixin.qq.com/wiki/doc/api/pap.php?chapter=18_10&index=13}
 */
export interface PapOrderQueryOptions {
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
}

/**
 * 查询订单 `return_code` SUCCESS时返回
 * @see {@link https://pay.weixin.qq.com/wiki/doc/api/pap.php?chapter=18_10&index=13}
 */
export interface PapOrderQueryReturn extends BaseReturn, BusinessReturn {
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

/**
 * 查询订单 `return_code` 和 `result_code` 均为 SUCCESS 时返回
 * @see {@link https://pay.weixin.qq.com/wiki/doc/api/pap.php?chapter=18_10&index=13}
 */
export interface PapOrderQueryReturnSuccess extends PapOrderQueryReturn {
  /**
   * 设备号
   * @description undefined
   * @example 013467007045764
   * @typedef String(32)
   */
  device_info?: string;
  /**
   * 用户标识
   * @description undefined
   * @example oUpF8uMuAJO_M2pxb1Q9zNjWeS6o
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
   * 交易类型
   * @description undefined
   * @example JSAPI
   * @typedef String(16)
   */
  trade_type: string;
  /**
   * 交易状态
   * @description undefined
   * @example SUCCESS
   * @typedef String(32)
   */
  trade_state: string;
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
   * 代金券或立减优惠金额
   * @description undefined
   * @example 100
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
   * @example 1009660380201506130728806387
   * @typedef String(32)
   */
  transaction_id: string;
  /**
   * 商户订单号
   * @description undefined
   * @example 20150806125346
   * @typedef String(32)
   */
  out_trade_no: string;
  /**
   * 附加数据
   * @description undefined
   * @example 深圳分店
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
   * 交易状态描述
   * @description undefined
   * @example 支付失败，请重新下单支付
   * @typedef String(256)
   */
  trade_state_desc: string;
  /**
   * 委托代扣协议id
   * @description undefined
   * @example Wx15463511252015071056489715
   * @typedef String(32)
   */
  contract_id: string;
}

/**
 * 查询订单返回值
 */
export type PapOrderQueryResult =
  | PapOrderQueryReturn
  | PapOrderQueryReturnSuccess;
