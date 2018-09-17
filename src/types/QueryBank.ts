import { BaseReturn, BusinessReturn } from "./Base";

/**
 * 查询企业付款到银行卡选项
 * @see {@link https://pay.weixin.qq.com/wiki/doc/api/tools/mch_pay.php?chapter=24_3}
 */
export interface QueryBankOptions {
  /**
   * 商户企业付款单号
   * @description 商户订单号，需保持唯一（只允许数字[0~9]或字母[A~Z]和[a~z]，最短8位，最长32位）
   * @example 1212121221227
   * @typedef string(32)
   */
  partner_trade_no: string;
}

/**
 * 查询企业付款到银行卡 `return_code` SUCCESS时返回
 * @see {@link https://pay.weixin.qq.com/wiki/doc/api/tools/mch_pay.php?chapter=24_3}
 */
export interface QueryBankReturn extends BaseReturn, BusinessReturn {}

/**
 * 查询企业付款到银行卡 `return_code` 和 `result_code` 均为 SUCCESS 时返回
 * @see {@link https://pay.weixin.qq.com/wiki/doc/api/tools/mch_pay.php?chapter=24_3}
 */
export interface QueryBankReturnSuccess extends QueryBankReturn {
  /**
   * 商户号
   * @typedef string(32)
   */
  mch_id: string;
  /**
   * 商户企业付款单号
   * @description 商户单号
   * @typedef string(32)
   */
  partner_trade_no: string;
  /**
   * 微信企业付款单号
   * @description 即为微信内部业务单号
   * @typedef string(64)
   */
  payment_no: string;
  /**
   * 银行卡号
   * @description 收款用户银行卡号(MD5加密)
   * @typedef string(32)
   */
  bank_no_md5: string;
  /**
   * 用户真实姓名
   * @description 收款人真实姓名（MD5加密）
   * @typedef string(32)
   */
  true_name_md5: string;
  /**
   * 代付金额
   * @description 代付订单金额RMB：分
   * @typedef int
   */
  amount: number;
  /**
   * 代付单状态
   * @description 代付订单状态：
   * - PROCESSING（处理中，如有明确失败，则返回额外失败原因；否则没有错误原因）
   * - SUCCESS（付款成功）
   * - FAILED（付款失败,需要替换付款单号重新发起付款）
   * - BANK_FAIL（银行退票，订单状态由付款成功流转至退票,退票时付款金额和手续费会自动退还）
   * @typedef string
   */
  status: string;
  /**
   * 手续费金额
   * @description 手续费订单金额 RMB：分
   * @typedef int
   */
  cmms_amt: number;
  /**
   * 商户下单时间
   * @description 微信侧订单创建时间
   * @typedef String
   */
  create_time: string;
  /**
   * 成功付款时间
   * @description 微信侧付款成功时间（但无法保证银行不会退票）
   * @typedef String
   */
  pay_succ_time?: string;
  /**
   * 失败原因
   * @description 订单失败原因（如：余额不足）
   * @typedef String
   */
  reason?: string;
}

/**
 * 查询企业付款到银行卡返回值
 */
export type QueryBankResult = QueryBankReturn | QueryBankReturnSuccess;
