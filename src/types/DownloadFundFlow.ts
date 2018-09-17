/**
 * 下载资金账单
 * @see {@link https://pay.weixin.qq.com/wiki/doc/api/micropay.php?chapter=9_18&index=7}
 */

import { BaseReturn, SignType } from "./Base";

export interface DownloadFundFlowOptions {
  /**
   * 签名类型
   * @description 签名类型，目前仅支持HMAC-SHA256
   * @example HMAC-SHA256
   * @typedef String(32)
   */
  sign_type?: SignType;
  /**
   * 资金账单日期
   * @description 下载对账单的日期，格式：20140603
   * @example 20140603
   * @typedef String(8)
   */
  bill_date: string;
  /**
   * 资金账户类型
   * @description 账单的资金来源账户：
   * - Basic  基本账户
   * - Operation 运营账户
   * - Fees 手续费账户
   * @example Basic
   * @typedef String(8)
   */
  account_type: string;
  /**
   * 压缩账单
   * @description 非必传参数，固定值：GZIP，返回格式为.gzip的压缩包账单。不传则默认为数据流形式。
   * @example GZIP
   * @typedef String(8)
   */
  tar_type?: string;
}

export interface DownloadFundFlowReturn extends BaseReturn {
  /**
   * 业务结果
   * @description success/fail
   * @example success
   * @typedef string(16)
   */
  result_code: "FAIL";
  /**
   * 错误代码
   * @description 详细参见错误列表
   * @example systemerror
   * @typedef string(32)
   */
  err_code?: string;
  /**
   * 错误代码描述
   * @description 错误返回的信息描述
   * @example 系统错误
   * @typedef string(128)
   */
  err_code_des?: string;
}
