import { fetch } from "../../fetch";
import * as types from "../../types";
import { toXML } from "../../utils";
import PayBase from "./PayBase";

const REPORT_BASE = "/payitil/report";
const CLOSE_ORDER_BASE = "/pay/closeorder";
const UNIFIED_ORDER_BASE = "/pay/unifiedorder";
/**
 * `PayBase` 基础上添加方法 `closeOrder`, `payNotify`，是公众号支付，扫码支付，APP支付，H5支付，和小程序支付的基类
 */
export default class PayBaseX extends PayBase {
  /**
   * 关闭订单
   *
   * ```
   * pay.closeOrder({
   *   out_trade_no: '120061098828009406'
   * })
   * ```
   * @see {@link https://pay.weixin.qq.com/wiki/doc/api/jsapi.php?chapter=9_3}
   */
  public async closeOrder(options: types.CloseOrderOptions) {
    const url = this.completeURL(CLOSE_ORDER_BASE);
    const extra = await this.createFetchOptions(url);
    return fetch<
      types.CloseOrderOptions,
      types.CloseOrderSuccess,
      types.CloseOrderFail
    >(options, extra);
  }

  /**
   * 交易保障
   *
   * ```
   * pay.report({
   *   interface_url: "https://api.mch.weixin.qq.com/pay/unifiedorder",
   *   execute_time: 1000,
   *   return_code: "SUCCESS",
   *   return_msg: "OK",
   *   result_code: "SUCCESS",
   *   user_ip: "8.8.8.8"
   * });
   * ```
   * @see {@link https://pay.weixin.qq.com/wiki/doc/api/jsapi.php?chapter=9_8&index=9}
   */
  public async report(options: types.ReportOptionsGeneral) {
    const url = this.completeURL(REPORT_BASE);
    const extra = await this.createFetchOptions(url);
    return fetch<
      types.ReportOptionsGeneral,
      types.ReportSuccess,
      types.ReportFail
    >(options, extra);
  }

  /**
   * 支付结果通知
   *
   * ```
   * router.post("/wechatpay/notify/refund", (req, res) => {
   *   getXMLBody(req, options).then(data => {
   *     pay
   *       .payNotify(data, async parsedData => {
   *         // ...
   *         return {
   *           return_code: "SUCCESS",
   *           return_msg: "OK"
   *         };
   *       })
   *       .then(returnData => {
   *         res.set("Content-Type", "application/xml; charset=utf-8");
   *         res.end(returnData);
   *       });
   *   });
   * });
   * ```
   * @see {@link https://pay.weixin.qq.com/wiki/doc/api/jsapi.php?chapter=9_7&index=8}
   */
  public async payNotify(
    info: types.PayNotifySuccess | types.PayNotifyFail,
    handler: types.PayNotifyHandler
  ) {
    if (info.return_code === "FAIL") {
      return toXML({
        return_code: info.return_code,
        return_msg: info.return_msg
      });
    }
    const result = await handler(info);
    return toXML(result);
  }

  /**
   * 统一下单
   */
  protected async unifiedOrderBase(options: types.UnifiedOrderOptionsGeneral) {
    const url = this.completeURL(UNIFIED_ORDER_BASE);
    const extra = await this.createFetchOptions(url);
    return fetch<
      types.UnifiedOrderOptionsGeneral,
      types.UnifiedOrderSuccess,
      types.UnifiedOrderFail
    >(options, extra);
  }
}
