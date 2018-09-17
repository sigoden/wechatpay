/**
 * 交易保障
 * @see {@link https://pay.weixin.qq.com/wiki/doc/api/micropay.php?chapter=9_14&index=8}
 */

import { FailT, SuccessT } from "./Base";

export interface ReportOptions {
  /**
   * 设备号
   * @description 微信支付分配的终端设备号，商户自定义
   * @example 013467007045764
   * @typedef String(32)
   */
  device_info?: string;
  /**
   * 接口URL
   * @description 刷卡支付终端上报统一填：https://api.mch.weixin.qq.com/pay/batchreport/micropay/total
   * @example https://api.mch.weixin.qq.com/pay/batchreport/micropay/total
   * @typedef String(127)
   */
  interface_url: string;
  /**
   * 访问接口IP
   * @description 发起接口调用时的机器IP
   * @example 8.8.8.8
   * @typedef String(16)
   */
  user_ip: string;
  /**
   * 上报数据包
   * @description POS机采集的交易信息列表，使用JSON格式的数组, 每条交易包含：
   * 1. out_trade_no 商户订单号
   * 2. begin_time 交易开始时间（扫码时间)
   * 3. end_time 交易完成时间
   * 4. state 交易结果 OK   -成功  FAIL -失败  CANCLE-取消
   * 5. err_msg 自定义的错误描述信息
   *
   * 注意，将JSON数组的文本串放到XML节点中时，需要使用!CDATA[]标签将JSON文本串保护起来
   * @example
   * ```
   * !CDATA[
   * [
   *   {
   *     out_trade_no: "out_trade_no_test_1",
   *     begin_time: "20160602203256",
   *     end_time: "20160602203257",
   *     state: "OK",
   *     err_msg: ""
   *   },
   *   {
   *     out_trade_no: "out_trade_no_test_2",
   *     begin_time: "20160602203260",
   *     end_time: "20160602203262",
   *     state: "FAIL",
   *     err_msg: "SYSTEMERROR"
   *   }
   * ];
   * ]
   * ```
   * @typedef String(1024)
   */
  trades: string;
}

interface ReportResponseCommon {}

interface ReportResponseFail extends ReportResponseCommon {}

interface ReportResponseSuccess extends ReportResponseCommon {}

export type ReportSuccess = SuccessT<ReportResponseSuccess>;
export type ReportFail = FailT<ReportResponseFail>;
