import { BaseReturn, BusinessReturn, SignType } from "./Base";

/**
 * 查询退款选项
 * @see {@link https://pay.weixin.qq.com/wiki/doc/api/micropay.php?chapter=9_5}
 */
export interface RefundQueryOptions {
  /**
   * 签名类型
   * @description 签名类型，目前支持HMAC-SHA256和MD5，默认为MD5
   * @example HMAC-SHA256
   * @typedef String(32)
   */
  sign_type?: SignType;
  /**
   * 微信订单号
   * @description 微信订单号查询的优先级是： refund_id > out_refund_no > transaction_id > out_trade_no
   * @example 1217752501201407033233368018
   * @typedef String(32)
   */
  transaction_id?: string;
  /**
   * 商户订单号
   * @description 商户系统内部订单号，要求32个字符内，只能是数字、大小写字母_-|*@ ，且在同一个商户号下唯一。
   * @example 1217752501201407033233368018
   * @typedef String(32)
   */
  out_trade_no?: string;
  /**
   * 商户退款单号
   * @description 商户系统内部的退款单号，商户系统内部唯一，只能是数字、大小写字母_-|*@ ，同一退款单号多次请求只退一笔。
   * @example 1217752501201407033233368018
   * @typedef String(64)
   */
  out_refund_no?: string;
  /**
   * 微信退款单号
   * @description 微信生成的退款单号，在申请退款接口有返回
   * @example 1217752501201407033233368018
   * @typedef String(32)
   */
  refund_id?: string;
  /**
   * 偏移量
   * @description 偏移量，当部分退款次数超过10次时可使用，表示返回的查询结果从这个偏移量开始取记录
   * @example 15
   * @typedef Int
   */
  offset?: number;
}

/**
 * 查询退款 `return_code` SUCCESS时返回
 * @see {@link https://pay.weixin.qq.com/wiki/doc/api/micropay.php?chapter=9_5}
 */
export interface RefundQueryReturn extends BaseReturn, BusinessReturn {
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
   * 订单总退款次数
   * @description 订单总共已发生的部分退款次数，当请求参数传入offset后有返回
   * @example 35
   * @typedef Int
   */
  total_refund_count?: number;
  /**
   * 微信订单号
   * @description 微信订单号
   * @example 1217752501201407033233368018
   * @typedef String(32)
   */
  transaction_id: string;
  /**
   * 商户订单号
   * @description 商户系统内部订单号，要求32个字符内，只能是数字、大小写字母_-|*@ ，且在同一个商户号下唯一。
   * @example 1217752501201407033233368018
   * @typedef String(32)
   */
  out_trade_no: string;
  /**
   * 订单金额
   * @description 订单总金额，单位为分，只能为整数，详见支付金额
   * @example 100
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
   * 货币种类
   * @description 订单金额货币类型，符合ISO 4217标准的三位字母代码，默认人民币：CNY，其他值列表详见货币类型
   * @example CNY
   * @typedef String(8)
   */
  fee_type?: string;
  /**
   * 现金支付金额
   * @description 现金支付金额，单位为分，只能为整数，详见支付金额
   * @example 100
   * @typedef Int
   */
  cash_fee: number;
  /**
   * 退款笔数
   * @description 当前返回退款笔数
   * @example 1
   * @typedef Int
   */
  refund_count: number;
  /**
   * 商户退款单号
   * @description 商户系统内部的退款单号，商户系统内部唯一，只能是数字、大小写字母_-|*@ ，同一退款单号多次请求只退一笔。
   * @example 1217752501201407033233368018
   * @typedef String(64)
   */
  out_refund_no_$n: string;
  /**
   * 微信退款单号
   * @description 微信退款单号
   * @example 1217752501201407033233368018
   * @typedef String(32)
   */
  refund_id_$n: string;
  /**
   * 退款渠道
   * @description
   * - ORIGINAL—原路退款
   * - BALANCE—退回到余额
   * - OTHER_BALANCE—原账户异常退到其他余额账户
   * - OTHER_BANKCARD—原银行卡异常退到其他银行卡
   * @example ORIGINAL
   * @typedef String(16)
   */
  refund_channel_$n?: string;
  /**
   * 申请退款金额
   * @description 退款总金额,单位为分,可以做部分退款
   * @example 100
   * @typedef Int
   */
  refund_fee_$n: number;
  /**
   * 退款金额
   * @description 退款金额=申请退款金额-非充值代金券退款金额，退款金额<=申请退款金额
   * @example 100
   * @typedef Int
   */
  settlement_refund_fee_$n?: number;
  /**
   * 代金券类型
   * @description
   * - CASH--充值代金券
   * - NO_CASH---非充值优惠券 开通免充值券功能，并且订单使用了优惠券后有返回（取值：CASH、NO_CASH）。
   *
   * $n为下标,$m为下标,从0开始编号，举例：coupon_type_$0_$1
   * @example CASH
   * @typedef String(8)
   */
  coupon_type_$n_$m?: string;
  /**
   * 总代金券退款金额
   * @description 代金券退款金额<=退款金额，退款金额-代金券或立减优惠退款金额为现金，说明详见代金券或立减优惠
   * @example 100
   * @typedef Int
   */
  coupon_refund_fee_$n?: number;
  /**
   * 退款代金券使用数量
   * @description 退款代金券使用数量 ,$n为下标,从0开始编号
   * @example 1
   * @typedef Int
   */
  coupon_refund_count_$n?: number;
  /**
   * 退款代金券ID
   * @description 退款代金券ID, $n为下标，$m为下标，从0开始编号
   * @example 10000
   * @typedef String(20)
   */
  coupon_refund_id_$n_$m?: string;
  /**
   * 单个代金券退款金额
   * @description 单个退款代金券支付金额, $n为下标，$m为下标，从0开始编号
   * @example 100
   * @typedef Int
   */
  coupon_refund_fee_$n_$m?: number;
  /**
   * 退款状态
   * @description 退款状态：
   * - SUCCESS—退款成功
   * - REFUNDCLOSE—退款关闭。
   * - PROCESSING—退款处理中
   * - CHANGE—退款异常，退款到银行发现用户的卡作废或者冻结了，导致原路退款银行卡失败，可前往商户平台（pay.weixin.qq.com）-交易中心，手动处理此笔退款。
   *
   * $n为下标，从0开始编号。
   * @example SUCCESS
   * @typedef String(16)
   */
  refund_status_$n: string;
  /**
   * 退款资金来源
   * @description
   * - REFUND_SOURCE_RECHARGE_FUNDS---可用余额退款/基本账户
   * - REFUND_SOURCE_UNSETTLED_FUNDS---未结算资金退款
   *
   * $n为下标，从0开始编号。
   * @example REFUND_SOURCE_RECHARGE_FUNDS
   * @typedef String(30)
   */
  refund_account_$n?: string;
  /**
   * 退款入账账户
   * @description 取当前退款单的退款入账方
   * 1）退回银行卡：{银行名称}{卡类型}{卡尾号}
   * 2）退回支付用户零钱:	支付用户零钱
   * 3）退还商户:	商户基本账户, 商户结算银行账户
   * 4）退回支付用户零钱通:	支付用户零钱通
   * @example 招商银行信用卡0403
   * @typedef String(64)
   */
  refund_recv_accout_$n: string;
  /**
   * 退款成功时间
   * @description 退款成功时间，当退款状态为退款成功时有返回。$n为下标，从0开始编号。
   * @example 2016-07-25 15:26:26
   * @typedef String(20)
   */
  refund_success_time_$n?: string;
}

/**
 * 提交刷卡支付返回值
 */
export type RefundQueryResult = RefundQueryReturn;
