import { BaseReturn, SignType } from "./Base";

/**
 * 下载对账单选项
 * @see {@link https://pay.weixin.qq.com/wiki/doc/api/micropay.php?chapter=9_6}
 */
export interface DownloadBillOptions {
  /**
   * 签名类型
   * @description 签名类型，目前支持HMAC-SHA256和MD5，默认为MD5
   * @example HMAC-SHA256
   * @typedef String(32)
   */
  sign_type?: SignType;
  /**
   * 对账单日期
   * @description 下载对账单的日期，格式：20140603
   * @example 20140603
   * @typedef String(8)
   */
  bill_date: string;
  /**
   * 账单类型
   * @description
   * - ALL，返回当日所有订单信息；
   * - SUCCESS，默认值，返回当日成功支付的订单
   * - REFUND，返回当日退款订单
   * - RECHARGE_REFUND，返回当日充值退款订单
   * @example ALL
   * @typedef String(8)
   */
  bill_type: string;
  /**
   * 压缩账单
   * @description 非必传参数，固定值：GZIP，返回格式为`.gzip`的压缩包账单。不传则默认为数据流形式。
   * @example GZIP
   * @typedef String(8)
   */
  tar_type?: string;
}

/**
 * 下载对账单返回值
 * @see {@link https://pay.weixin.qq.com/wiki/doc/api/micropay.php?chapter=9_6}
 */
export type DownloadBillResult = BaseReturn;
