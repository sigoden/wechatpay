import { BaseReturn, BusinessReturn } from "./Base";

/**
 * 查询签约关系选项
 * @see {@link https://pay.weixin.qq.com/wiki/doc/api/pap.php?chapter=18_2&index=6}
 */
export interface QueryContractOptions {
  /**
   * 委托代扣协议id
   * @description 委托代扣签约成功后由微信返回的委托代扣协议id，选择contract_id查询，则此参数必填
   * @example 100005698
   * @typedef String(32)
   */
  contract_id?: string;
  /**
   * 模板id
   * @description 商户在微信商户平台配置的代扣模版id，选择plan_id+contract_code查询，则此参数必填
   * @example 123
   * @typedef int
   */
  plan_id?: number;
  /**
   * 签约协议号
   * @description 商户请求签约时传入的签约协议号，商户侧须唯一。选择plan_id+contract_code查询，则此参数必填
   * @example 1023658866
   * @typedef string
   */
  contract_code?: string;
  /**
   * 版本号
   * @description 固定值1.0
   * @example 1.0
   * @typedef string
   */
  version: string;
}

/**
 * 查询签约关系 `return_code` SUCCESS时返回
 * @see {@link https://pay.weixin.qq.com/wiki/doc/api/pap.php?chapter=18_2&index=6}
 */
export interface QueryContractReturn extends BaseReturn, BusinessReturn {
}

/**
 * 查询签约关系 `return_code` 和 `result_code` 均为 SUCCESS 时返回
 * @see {@link https://pay.weixin.qq.com/wiki/doc/api/pap.php?chapter=18_2&index=6}
 */
export interface QueryContractReturnSuccess extends QueryContractReturn {
  /**
   * 商户号
   * @description 微信支付分配的商户号
   * @example 10000098
   * @typedef int
   */
  mch_id: number;
  /**
   * 公众账号id
   * @description 微信支付分配的公众账号id
   * @example wxcbda96de0b165486
   * @typedef String(32)
   */
  appid: string;
  /**
   * 委托代扣协议id
   * @description 签约成功后，微信返回的委托代扣协议id
   * @example 100005698
   * @typedef String(32)
   */
  contract_id: string;
  /**
   * 模板id
   * @description 商户在微信商户平台设置的代扣协议模板id
   * @example 123
   * @typedef Int
   */
  plan_id: number;
  /**
   * 请求序列号
   * @description 商户请求签约时的序列号，商户侧须唯一,纯数字。长度不超过12位
   * @example 1695
   * @typedef Uint64
   */
  request_serial: number;
  /**
   * 签约协议号
   * @description 商户请求签约时传入的签约协议号，商户侧须唯一
   * @example 1023658866
   * @typedef String
   */
  contract_code: string;
  /**
   * 用户账户展示名称
   * @description 签约用户的名称，用于页面展示
   * @example 张三
   * @typedef String
   */
  contract_display_account: string;
  /**
   * 协议状态
   * @description
   * 0-已签约
   * 1-未签约
   * @example 1
   * @typedef int
   */
  contract_state: number;
  /**
   * 协议签署时间
   * @example 2015-07-01 10:00:00
   * @typedef String
   */
  contract_signed_time: string;
  /**
   * 协议到期时间
   * @example 2016-07-01 10:00:00
   * @typedef String
   */
  contract_expired_time: string;
  /**
   * 协议解约时间
   * @description 当contract_state=1时，该值有效
   * @example 2015-09-01 10:00:00
   * @typedef String
   */
  contract_terminated_time?: string;
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
   * 签名
   * @description 详见签名生成算法
   * @example C380BEC2BFD727A4B6845133519F3AD6
   * @typedef String(32)
   */
  sign: string;
  /**
   * 解约备注
   * @description 当contract_state=1时，该值有效
   * @example 解约原因
   * @typedef String
   */
  contract_termination_remark?: string;
  /**
   * 用户标识
   * @description 商户appid下的用户唯一标识
   * @example ozoKAt9TIPHfwVMkcniiNKZ1vbyw
   * @typedef String
   */
  openid: string;
}

/**
 * 查询签约关系返回值
 */
export type QueryContractResult = QueryContractReturn | QueryContractReturnSuccess;
