/**
 * 签约结果通知
 * @see {@link https://pay.weixin.qq.com/wiki/doc/api/pap.php?chapter=18_17&index=5}
 */

import { BaseReturn, FailT, SuccessT } from "./Base";

export interface ContractNotifyOptionsCommon {}

export interface ContractNotifyOptionsFail extends ContractNotifyOptionsCommon {}
export interface ContractNotifyOptionsSuccess extends ContractNotifyOptionsCommon {
  /**
   * 商户号
   * @description 微信支付分配的商户号
   * @example 10000098
   * @typedef String(32)
   */
  mch_id: string;
  /**
   * 签约协议号
   * @example 100001256
   * @typedef String
   */
  contract_code: string;
  /**
   * 模板id
   * @description 协议模板id
   * @example 123
   * @typedef String
   */
  plan_id: string;
  /**
   * 用户标识
   * @description Appid下，用户的唯一标识
   * @example onqOjjmM1tad-3ROpncN-yUfa6ua
   * @typedef String(32)
   */
  openid: string;
  /**
   * 签名
   * @description 详见签名生成算法
   * @example C380BEC2BFD727A4B6845133519F3AD6
   * @typedef String(32)
   */
  sign: string;
  /**
   * 变更类型
   * @description
   * - ADD--签约
   * - DELETE--解约
   * 商户可通过该字段判断是签约回调还是解约回调
   * @example ADD
   * @typedef String(32)
   */
  change_type: string;
  /**
   * 操作时间
   * @example 2015-07-01 10:00:00
   * @typedef String
   */
  operate_time: string;
  /**
   * 委托代扣协议id
   * @description 签约成功后，微信返回的委托代扣协议id
   * @example Wx15463511252015071056489715
   * @typedef String（32）
   */
  contract_id: string;
  /**
   * 协议到期时间
   * @description 协议到期时间，当change_type为ADD时有返回
   * @example 2016-07-01 10:00:00
   * @typedef String
   */
  contract_expired_time?: string;
  /**
   * 协议解约方式
   * @description 当change_type为DELETE时有返回
   * 0-未解约
   * 1-有效期过自动解约
   * 2-用户主动解约
   * 3-商户API解约
   * 4-商户平台解约
   * 5-注销
   * @example 3
   * @typedef int
   */
  contract_termination_mode?: number;
  /**
   * 请求序列号
   * @description 商户请求签约时的序列号，商户侧须唯一 ,纯数字。长度不超过12位
   * @example 1695
   * @typedef String
   */
  request_serial: string;
}

export type ContractNotifySuccess = SuccessT<ContractNotifyOptionsSuccess>;
export type ContractNotifyFail = FailT<ContractNotifyOptionsFail>;

export type ContractNotifyHandler = (
  data: ContractNotifySuccess | ContractNotifyFail
) => Promise<BaseReturn>;
