/**
 * 下载资金账单
 * @see {@link https://pay.weixin.qq.com/wiki/doc/api/jsapi.php?chapter=9_18&index=7}
 */

import { FailT, SuccessT } from "./Base";

export interface AuthCodeToOpenIdOptions {
  /**
   * 授权码
   * @description	扫码支付授权码，设备读取用户微信中的条码或者二维码信息
   * @typedef String(128)
   */
  auth_code: string;
}

interface AuthCodeToOpenIdResponseCommon {
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
   * 签名
   * @description 微信返回的签名，详见签名生成算法
   * @example C380BEC2BFD727A4B6845133519F3AD6
   * @typedef String(32)
   */
  sign: string;
}

interface AuthCodeToOpenIdResponseFail extends AuthCodeToOpenIdResponseCommon {}

interface AuthCodeToOpenIdResponseSuccess
  extends AuthCodeToOpenIdResponseCommon {
  /**
   * 用户标识
   * @description 用户在商户appid下的唯一标识
   * @typedef String(128)
   */
  openid: string;
}

export type AuthCodeToOpenIdSuccess = SuccessT<AuthCodeToOpenIdResponseSuccess>;
export type AuthCodeToOpenIdFail = FailT<AuthCodeToOpenIdResponseFail>;
