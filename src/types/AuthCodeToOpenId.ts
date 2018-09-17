import { BaseReturn, BusinessReturn } from "./Base";

/**
 * 授权码查询OpenId选项
 * @see {https://pay.weixin.qq.com/wiki/doc/api/micropay.php?chapter=9_13&index=10}
 */
export interface AuthCodeToOpenIdOptions {
  /**
   * 授权码
   * @description	扫码支付授权码，设备读取用户微信中的条码或者二维码信息
   * @typedef String(128)
   */
  auth_code: string;
}

/**
 * 授权码查询OpenId `return_code` SUCCESS时返回
 * @see {https://pay.weixin.qq.com/wiki/doc/api/micropay.php?chapter=9_13&index=10}
 */
export interface AuthCodeToOpenIdReturn extends BaseReturn, BusinessReturn {
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

/**
 * 授权码查询OpenId `return_code` 和 `result_code` 均为 SUCCESS 时返回
 * @see {https://pay.weixin.qq.com/wiki/doc/api/micropay.php?chapter=9_13&index=10}
 */
export interface AuthCodeToOpenIdReturnSuccess extends AuthCodeToOpenIdReturn {
  /**
   * 用户标识
   * @description 用户在商户appid下的唯一标识
   * @typedef String(128)
   */
  openid: string;
}

export type AuthCodeToOpenIdResult =
  | AuthCodeToOpenIdReturn
  | AuthCodeToOpenIdReturnSuccess;
