/**
 * 获取RSA公钥
 * @see {@link https://pay.weixin.qq.com/wiki/doc/api/tools/mch_pay.php?chapter=24_7&index=4}
 */

import { FailT, SignType, SuccessT } from "./Base";

export interface GetPublicKeyOptions {
  /**
   * 签名类型
   * @description 签名类型，目前支持HMAC-SHA256和MD5，默认为MD5
   * @example HMAC-SHA256
   * @typedef String(32)
   */
  sign_type: SignType;
}

export interface GetPublicKeyResponseCommon {}

export interface GetPublicKeyResponseFail extends GetPublicKeyResponseCommon {}

export interface GetPublicKeyResponseSuccess extends GetPublicKeyResponseCommon {
  /**
   * 商户号
   * @typedef String(32)
   */
  mch_id: string;
  /**
   * 密钥
   * @description RSA 公钥
   * @typedef String(2048)
   */
  pub_key: string;
}

export type GetPublicKeySuccess = SuccessT<GetPublicKeyResponseSuccess>;
export type GetPublicKeyFail = FailT<GetPublicKeyResponseFail>;
