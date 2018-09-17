/**
 * 查询企业付款到零钱选项
 * @see {@link https://pay.weixin.qq.com/wiki/doc/api/tools/mch_pay.php?chapter=14_2}
 */
import { FailT, SuccessT } from "./Base";

export interface TransfersOptions {
  /**
   * 设备号
   * @description 微信支付分配的终端设备号
   * @example 013467007045764
   * @typedef String(32)
   */
  device_info?: string;
  /**
   * 商户订单号
   * @description 商户订单号，需保持唯一性。(只能是字母或者数字，不能包含有符号)
   * @example 10000098201411111234567890
   * @typedef String
   */
  partner_trade_no: string;
  /**
   * 用户openid
   * @description 商户appid下，某用户的openid
   * @example oxTWIuGaIt6gTKsQRLau2M0yL16E
   * @typedef String
   */
  openid: string;
  /**
   * 校验用户姓名选项
   * @description
   * - NO_CHECK：不校验真实姓名
   * - FORCE_CHECK：强校验真实姓名
   * @example FORCE_CHECK
   * @typedef String
   */
  check_name: string;
  /**
   * 收款用户姓名
   * @description 收款用户真实姓名。如果check_name设置为FORCE_CHECK，则必填用户真实姓名
   * @example 王小王
   * @typedef String
   */
  re_user_name?: string;
  /**
   * 金额
   * @description 企业付款金额，单位为分
   * @example 10099
   * @typedef int
   */
  amount: number;
  /**
   * 企业付款描述信息
   * @description 企业付款操作说明信息。必填。
   * @example 理赔
   * @typedef String
   */
  desc: string;
  /**
   * Ip地址
   * @description 该IP同在商户平台设置的IP白名单中的IP没有关联，该IP可传用户端或者服务端的IP。
   * @example 192.168.0.1
   * @typedef String(32)
   */
  spbill_create_ip: string;
}

interface TransfersResponseCommon {
  /**
   * 商户appid
   * @description 申请商户号的appid或商户号绑定的appid（企业号corpid即为此appId）
   * @example wx8888888888888888
   * @typedef String
   */
  mch_appid: string;
  /**
   * 商户号
   * @description 微信支付分配的商户号
   * @example 1900000109
   * @typedef String(32)
   */
  mchid: string;
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
}

interface TransfersResponseFail extends TransfersResponseCommon {}

interface TransfersResponseSuccess extends TransfersResponseCommon {
  /**
   * 商户订单号
   * @description 商户订单号，需保持历史全局唯一性(只能是字母或者数字，不能包含有符号)
   * @example 1217752501201407033233368018
   * @typedef String(32)
   */
  partner_trade_no: string;
  /**
   * 微信订单号
   * @description 企业付款成功，返回的微信订单号
   * @example 1007752501201407033233368018
   * @typedef String
   */
  payment_no: string;
  /**
   * 微信支付成功时间
   * @description 企业付款成功时间
   * @example 2015-05-19 15：26：59
   * @typedef String
   */
  payment_time: string;
}

export type TransfersSuccess = SuccessT<TransfersResponseSuccess>;
export type TransfersFail = FailT<TransfersResponseFail>;
