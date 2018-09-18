/**
 * 交易保障
 * @see {@link https://pay.weixin.qq.com/wiki/doc/api/micropay.php?chapter=9_14&index=8}
 */

import { FailT, SignType, SuccessT } from "./Base";

/**
 * 刷卡支付交易保障
 */
export interface ReportOptionsPubScan {
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

/**
 * 其它支付交易保障
 */
export interface ReportOptionsGeneral {
  /**
   * 设备号
   * @description 微信支付分配的终端设备号，商户自定义
   * @example 013467007045764
   * @typedef String(32)
   */
  device_info?: string;
  /**
   * 签名类型
   * @description 签名类型，目前支持HMAC-SHA256和MD5，默认为MD5
   * @example HMAC-SHA256
   * @typedef String(32)
   */
  sign_type?: SignType;
  /**
   * 接口URL
   * @description 报对应的接口的完整URL
   * @example https://api.mch.weixin.qq.com/pay/unifiedorder
   * @typedef String(127)
   */
  interface_url: string;
  /**
   * 接口耗时
   * @description 接口耗时情况，单位为毫秒
   * @example 1000
   * @typedef Int
   */
  execute_time: number;
  /**
   * 返回状态码
   * @description SUCCESS/FAIL。此字段是通信标识，非交易标识，交易是否成功需要查看trade_state来判断
   * @example SUCCESS
   * @typedef String(16)
   */
  return_code: string;
  /**
   * 返回信息
   * @description 当return_code为FAIL时返回信息为错误原因 ，例如 签名失败，参数格式校验错误
   * @example OK
   * @typedef String(128)
   */
  return_msg: string;
  /**
   * 业务结果
   * @description SUCCESS/FAIL
   * @example SUCCESS
   * @typedef String(16)
   */
  result_code: string;
  /**
   * 错误代码
   * @description ORDERNOTEXIST—订单不存在，SYSTEMERROR—系统错误
   * @example SYSTEMERROR
   * @typedef String(32)
   */
  err_code?: string;
  /**
   * 错误代码描述
   * @description 结果信息描述
   * @example 系统错误
   * @typedef String(128)
   */
  err_code_des?: string;
  /**
   * 商户订单号
   * @description 商户系统内部的订单号,商户可以在上报时提供相关商户订单号方便微信支付更好的提高服务质量。
   * @example 1217752501201407033233368018
   * @typedef String(32)
   */
  out_trade_no?: string;
  /**
   * 访问接口IP
   * @description 发起接口调用时的机器IP
   * @example 8.8.8.8
   * @typedef String(16)
   */
  user_ip: string;
  /**
   * 商户上报时间
   * @description 系统时间，格式为yyyyMMddHHmmss，如2009年12月27日9点10分10秒表示为20091227091010。其他详见时间规则
   * @example 20091227091010
   * @typedef String(14)
   */
  time?: string;
}

export interface ReportResponseCommon {}

export interface ReportResponseFail extends ReportResponseCommon {}

export interface ReportResponseSuccess extends ReportResponseCommon {}

export type ReportSuccess = SuccessT<ReportResponseSuccess>;
export type ReportFail = FailT<ReportResponseFail>;
