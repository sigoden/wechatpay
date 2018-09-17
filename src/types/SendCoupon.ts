/**
 * 发放代金券
 * @see {@link https://pay.weixin.qq.com/wiki/doc/api/tools/sp_coupon.php?chapter=12_3&index=4}
 */

import { FailT, SuccessT } from "./Base";

export interface SendCouponOptions {
  /**
   * 代金券批次id
   * @example 1757
   * @typedef String
   */
  coupon_stock_id: string;
  /**
   * openid记录数
   * @description openid记录数（目前支持num=1）
   * @example 1
   * @typedef int
   */
  openid_count: number;
  /**
   * 商户单据号
   * @description 商户此次发放凭据号（格式：商户id+日期+流水号），商户侧需保持唯一性
   * @example 1000009820141203515766
   * @typedef String
   */
  partner_trade_no: string;
  /**
   * 用户openid
   * @description Openid信息，用户在appid下的唯一标识
   * @example onqOjjrXT-776SpHnfexGm1_P7iE
   * @typedef String
   */
  openid: string;
  /**
   * 操作员
   * @description 操作员帐号, 默认为商户号。可在商户平台配置操作员对应的api权限
   * @example 10000098
   * @typedef String(32)
   */
  op_user_id?: string;
  /**
   * 设备号
   * @description 微信支付分配的终端设备号
   * @typedef String(32)
   */
  device_info?: string;
  /**
   * 协议版本
   * @description 默认1.0
   * @example 1.0
   * @typedef String(32)
   */
  version?: string;
  /**
   * 协议类型
   * @description XML【目前仅支持默认XML】
   * @example XML
   * @typedef String(32)
   */
  type?: string;
}

interface SendCouponResponseCommon {
  /**
   * 公众账号ID
   * @description 微信为发券方商户分配的公众账号ID，接口传入的所有appid应该为公众号的appid（在mp.weixin.qq.com申请的），
   *   不能为APP的appid（在open.weixin.qq.com申请的）。
   * @example wx5edab3bdfba3dc1c
   * @typedef String(32)
   */
  appid: string;
  /**
   * 商户号
   * @description 微信为发券方商户分配的商户号
   * @example 10000098
   * @typedef String(32)
   */
  mch_id: string;
  /**
   * 设备号
   * @description 微信支付分配的终端设备号，
   * @example 123456sb
   * @typedef String(32)
   */
  device_info?: string;
  /**
   * 随机字符串
   * @description 随机字符串，不长于32位
   * @example 1417574675
   * @typedef String(32)
   */
  nonce_str: string;
  /**
   * 签名
   * @description 对返回参数签名计算后得到的签名值
   * @example 841B3002FE2220C87A2D08ABD8A8F791
   * @typedef String(32)
   */
  sign: string;
}

interface SendCouponResponseFail extends SendCouponResponseCommon {}

interface SendCouponResponseSuccess extends SendCouponResponseCommon {
  /**
   * 代金券批次id
   * @description 创建代金券时生成的批次号，可在商户平台-代金券管理页面查看
   * @example 1757
   * @typedef String
   */
  coupon_stock_id: string;
  /**
   * 返回记录数
   * @example 1
   * @typedef Int
   */
  resp_count: number;
  /**
   * 成功记录数
   * @example 1或者0
   * @typedef Int
   */
  success_count: number;
  /**
   * 失败记录数
   * @example 1或者0
   * @typedef Int
   */
  failed_count: number;
  /**
   * 用户标识
   * @description 用户在商户appid下的唯一标识
   * @example onqOjjrXT-776SpHnfexGm1_P7iE
   * @typedef String
   */
  openid: string;
  /**
   * 返回码
   * @description 返回码，SUCCESS/FAILED
   * @example SUCCESS或者FAILED
   * @typedef String
   */
  ret_code: string;
  /**
   * 代金券id
   * @description 对一个用户成功发放代金券则返回代金券id，即ret_code为SUCCESS的时候；如果ret_code为FAILED则填写空串""
   * @example 1870
   * @typedef String
   */
  coupon_id: string;
  /**
   * 返回信息
   * @description 返回信息，当返回码是FAILED的时候填写，否则填空串“”
   * @example 失败描述信息，例如：“用户已达领用上限”
   * @typedef String
   */
  ret_msg: string;
}

export type SendCouponSuccess = SuccessT<SendCouponResponseSuccess>;
export type SendCouponFail = FailT<SendCouponResponseFail>;
