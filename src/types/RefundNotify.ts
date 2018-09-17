import { BaseReturn } from "./Base";

/**
 * 退款结果通知
 * @see {@link https://pay.weixin.qq.com/wiki/doc/api/micropay.php?chapter=9_16&index=11}
 */
export interface RefundNotifyBase extends BaseReturn {
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
   * 随机字符串
   * @description 微信返回的随机字符串
   * @example 5K8264ILTKCH16CQ2502SI8ZNMTM67VS
   * @typedef String(32)
   */
  nonce_str: string;
  /**
   * 加密信息
   * @description 加密信息请用商户秘钥进行解密，详见解密方式
   * @typedef String(1024)
   */
  req_info: string;
}

/**
 * 退款结果通知解密出的数据
 */
export interface RefundNotifyDecode {
  /**
   * 微信订单号
   * @example 1217752501201407033233368018
   * @typedef String(32)
   */
  transaction_id: string;
  /**
   * 商户订单号
   * @description 商户系统内部的订单号
   * @example 1217752501201407033233368018
   * @typedef String(32)
   */
  out_trade_no: string;
  /**
   * 微信退款单号
   * @example 1217752501201407033233368018
   * @typedef String(32)
   */
  refund_id: string;
  /**
   * 商户退款单号
   * @example 1217752501201407033233368018
   * @typedef String(64)
   */
  out_refund_no: string;
  /**
   * 订单金额
   * @description 订单总金额，单位为分，只能为整数，详见支付金额
   * @example 100
   * @typedef Int
   */
  total_fee: number;
  /**
   * 应结订单金额
   * @description 当该订单有使用非充值券时，返回此字段。应结订单金额=订单金额-非充值代金券金额，应结订单金额<=订单金额。
   * @example 100
   * @typedef Int
   */
  settlement_total_fee?: number;
  /**
   * 申请退款金额
   * @description 退款总金额,单位为分
   * @example 100
   * @typedef Int
   */
  refund_fee: number;
  /**
   * 退款金额
   * @description 退款金额=申请退款金额-非充值代金券退款金额，退款金额<=申请退款金额
   * @example 100
   * @typedef Int
   */
  settlement_refund_fee: number;
  /**
   * 退款状态
   * @description
   * - SUCCESS-退款成功
   * - CHANGE-退款异常
   * - REFUNDCLOSE—退款关闭
   * @example SUCCESS
   * @typedef String(16)
   */
  refund_status: string;
  /**
   * 退款成功时间
   * @description 资金退款至用户帐号的时间，格式2017-12-15 09:46:01
   * @example 2017-12-15 09:46:01
   * @typedef String(20)
   */
  success_time?: string;
  /**
   * 退款入账账户
   * @description 取当前退款单的退款入账方
   * @example 招商银行信用卡0403
   * @typedef String(64)
   */
  refund_recv_accout: string;
  /**
   * 退款资金来源
   * @description
   * - REFUND_SOURCE_RECHARGE_FUNDS 可用余额退款/基本账户
   * - REFUND_SOURCE_UNSETTLED_FUNDS 未结算资金退款
   * @example REFUND_SOURCE_RECHARGE_FUNDS
   * @typedef String(30)
   */
  refund_account: string;
  /**
   * 退款发起来源
   * @description
   * - API接口
   * - VENDOR_PLATFORM商户平台
   * @example API
   * @typedef String(30)
   */
  refund_request_source: string;
}

export interface RefundNotifyResponse extends BaseReturn {}

export type RefundNotifyHandler = (
  data: RefundNotifyBase & RefundNotifyDecode
) => Promise<RefundNotifyResponse>;
