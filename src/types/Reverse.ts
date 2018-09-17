/**
 * 撤销订单
 * @see {@link https://pay.weixin.qq.com/wiki/doc/api/micropay.php?chapter=9_11&index=3}
 */

import { FailT, SignType, SuccessT } from "./Base";

export interface ReverseOptions {
  /**
   * 微信订单号
   * @description 微信的订单号，优先使用
   * @example 1217752501201407033233368018
   * @typedef String(32)
   */
  transaction_id?: string;
  /**
   * 商户订单号
   * @description 商户系统内部的订单号,transaction_id、out_trade_no二选一，如果同时存在优先级：transaction_id> out_trade_no
   * @example 1217752501201407033233368018
   * @typedef String(32)
   */
  out_trade_no: string;
  /**
   * 签名类型
   * @description 签名类型，目前支持HMAC-SHA256和MD5，默认为MD5
   * @example HMAC-SHA256
   * @typedef String(32)
   */
  sign_type?: SignType;
}

interface ReverseResponseCommon {
  /**
   * 公众账号ID
   * @description 返回提交的公众账号ID
   * @example wx8888888888888888
   * @typedef String(32)
   */
  appid: string;
  /**
   * 商户号
   * @description 返回提交的商户号
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
   * 签名
   * @description 返回数据的签名，详见签名算法
   * @example C380BEC2BFD727A4B6845133519F3AD6
   * @typedef String(32)
   */
  sign: string;
  /**
   * 是否重调
   * @description 是否需要继续调用撤销，Y-需要，N-不需要
   * @example Y
   * @typedef String(1)
   */
  recall: string;
}

interface ReverseResponseFail extends ReverseResponseCommon {}

interface ReverseResponseSuccess extends ReverseResponseCommon {}

export type ReverseSuccess = SuccessT<ReverseResponseSuccess>;
export type ReverseFail = FailT<ReverseResponseFail>;
