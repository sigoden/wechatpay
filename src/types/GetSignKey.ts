import { BaseReturn } from "./Base";

/**
 * 获取验签秘钥选项
 * @see {@link https://pay.weixin.qq.com/wiki/doc/api/jsapi.php?chapter=23_1}
 */
export interface GetSignKeyOptions {}

/**
 * 获取验签秘钥返回值
 */
export interface GetSignKeyReturn extends BaseReturn {
  /**
   * 商户号
   * @description 微信支付分配的微信商户号
   * @example 1305638280
   * @typedef String(32)
   */
  mch_id: string;
  /**
   * 沙箱密钥
   * @description 返回的沙箱密钥
   * @example 013467007045764
   * @typedef String(32)
   */
  sandbox_signkey: string;
}

export type GetSignKeyResult = GetSignKeyReturn;
