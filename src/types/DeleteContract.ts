/**
 * 申请解约项
 * @see {@link https://pay.weixin.qq.com/wiki/doc/api/pap.php?chapter=18_4&index=8}
 */

import { FailT, SuccessT } from "./Base";

export interface DeleteContractOptions {
  /**
   * 模板id
   * @description 商户在微信商户平台配置的代扣模版id，选择plan_id+contract_code解约，则此参数必填
   * @example 12251
   * @typedef String
   */
  plan_id?: string;
  /**
   * 签约协议号
   * @description 商户请求签约时传入的签约协议号，商户侧须唯一。选择plan_id+contract_code解约，则此参数必填
   * @example 1234
   * @typedef String
   */
  contract_code?: string;
  /**
   * 委托代扣协议id
   * @description 委托代扣签约成功后由微信返回的委托代扣协议id，选择contract_id解约，则此参数必填
   * @example Wx15463511252015071056489715
   * @typedef String
   */
  contract_id?: string;
  /**
   * 解约备注
   * @description 解约原因的备注说明，如：签约信息有误，须重新签约
   * @example 解约原因
   * @typedef String(256)
   */
  contract_termination_remark: string;
}

export interface DeleteContractResponseCommon {
  /**
   * 公众账号id
   * @description 微信支付分配的公众账号id
   * @example wxcbda96de0b165486
   * @typedef String(32)
   */
  appid: string;
  /**
   * 商户号
   * @description 微信支付分配的商户号
   * @example 10000098
   * @typedef String(32)
   */
  mch_id: string;
  /**
   * 委托代扣协议id
   * @description 委托代扣签约成功后由微信返回的委托代扣协议id
   * @example 100005698
   * @typedef String(32)
   */
  contract_id: string;
  /**
   * 模板id
   * @description 商户在微信商户平台设置的代扣协议模板id
   * @example 123
   * @typedef String(32)
   */
  plan_id: string;
  /**
   * 签约协议号
   * @description 商户请求签约时传入的签约协议号，商户侧须唯一
   * @example 1234
   * @typedef String(32)
   */
  contract_code: string;
  /**
   * 签名
   * @description 签名，详见签名生成算法
   * @example C380BEC2BFD727A4B6845133519F3AD6
   * @typedef String(32)
   */
  sign: string;
}

export interface DeleteContractResponseSuccess
  extends DeleteContractResponseCommon {}
export interface DeleteContractResponseFail
  extends DeleteContractResponseCommon {}

export type DeleteContractSuccess = SuccessT<DeleteContractResponseSuccess>;
export type DeleteContractFail = FailT<DeleteContractResponseFail>;
