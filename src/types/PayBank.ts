/**
 * 企业付款到银行卡
 * @see {@link https://pay.weixin.qq.com/wiki/doc/api/tools/mch_pay.php?chapter=24_2}
 */

import { BankCode, FailT, SuccessT } from "./Base";

export interface PayBankOptions {
  /**
   * 商户企业付款单号
   * @description 商户订单号，需保持唯一（只允许数字[0~9]或字母[A~Z]和[a~z]，最短8位，最长32位）
   * @example 1212121221227
   * @typedef string(32)
   */
  partner_trade_no: string;
  /**
   * 收款方银行卡号
   * @description 收款方银行卡号（采用标准RSA算法，公钥由微信侧提供）,详见获取RSA加密公钥API。
   *   通过 `getPublicKey` 获取 pemkey, 然后调用  `rsa(pemkey, enc_bank_no)` 得到。
   * ```
   * @example 8609cb22e1774a50a930e414cc71eca06121bcd266335cda230d24a7886a8d9f
   * @typedef string(64)
   */
  enc_bank_no: string;
  /**
   * 收款方用户名
   * @description 收款方用户名（采用标准RSA算法，公钥由微信侧提供）详见获取RSA加密公钥API
   *   通过 `getPublicKey` 获取 pemkey, 然后调用  `rsa(pemkey, enc_true_name)` 得到。
   * @example ca775af5f841bdf424b2e6eb86a6e21e
   * @typedef string(64)
   */
  enc_true_name: string;
  /**
   * 收款方开户行
   * @description 银行卡所在开户行编号,详见银行编号列表
   * @example 1001
   * @typedef string(64)
   */
  bank_code: BankCode;
  /**
   * 付款金额
   * @description 付款金额：RMB分（支付总额，不含手续费）。注：大于0的整数
   * @example 100000
   * @typedef int
   */
  amount: number;
  /**
   * 付款说明
   * @description 企业付款到银行卡付款说明,即订单备注（UTF8编码，允许100个字符以内）
   * @example 理财
   * @typedef string
   */
  desc?: string;
}

interface PayBankResponseCommon {
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

interface PayBankResponseFail extends PayBankResponseCommon {}

interface PayBankResponseSuccess extends PayBankResponseCommon {
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

export type PayBankSuccess = SuccessT<PayBankResponseSuccess>;
export type PayBankFail = FailT<PayBankResponseFail>;
