import { BaseReturn, BusinessReturn, SignType } from "./Base";

/**
 * 获取RSA公钥选项
 * @see {@link https://pay.weixin.qq.com/wiki/doc/api/tools/mch_pay.php?chapter=24_7&index=4}
 */
export interface GetPublicKeyOptions {
  /**
   * 签名类型
   * @description 签名类型，目前支持HMAC-SHA256和MD5，默认为MD5
   * @example HMAC-SHA256
   * @typedef String(32)
   */
  sign_type: SignType;
}

/**
 * 获取RSA公钥 `return_code` SUCCESS时返回
 * @see {@link https://pay.weixin.qq.com/wiki/doc/api/tools/mch_pay.php?chapter=24_7&index=4}
 */
export interface GetPublicKeyReturn extends BaseReturn, BusinessReturn {}

/**
 * 获取RSA公钥 `return_code` 和 `result_code` 均为 SUCCESS 时返回
 * @see {@link https://pay.weixin.qq.com/wiki/doc/api/tools/mch_pay.php?chapter=24_7&index=4}
 */
export interface GetPublicKeyReturnSuccess extends GetPublicKeyReturn {
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

/**
 * 获取RSA公钥返回值
 */
export type GetPublicKeyResult = GetPublicKeyReturn | GetPublicKeyReturnSuccess;
