import { download, fetch } from "../../fetch";
import * as types from "../../types";
import { decode, toXML } from "../../utils";
import Base from "./Base";

const ORDER_QUERY_BASE = "/pay/orderquery";
const REFUND_BASE = "/secapi/pay/refund";
const REFUND_QUERY_BASE = "/pay/refundquery";
const DOWNLOAD_BILL_BASE = "/pay/downloadbill";
const DOWNLOAD_FUND_FLOW_BASE = "/pay/downloadfundflow";
const BATCH_QUERY_COMMENT_BASE = "/billcommentsp/batchquerycomment";

/**
 * 支付基类
 */
class PayBase extends Base {
  /**
   * 查询订单
   *
   * ```
   * pay.orderQuery({
   *   transaction_id: '1009660380201506130728806387'
   * })
   *
   * pay.orderQuery({
   *   out_trade_no: '120061098828009406'
   * });
   * ```
   * @see {@link https://pay.weixin.qq.com/wiki/doc/api/micropay.php?chapter=9_2}
   */
  public async orderQuery(options: types.OrderQueryOptions) {
    const url = this.completeURL(ORDER_QUERY_BASE);
    const extra = await this.createFetchOptions(url);
    return fetch<
      types.OrderQueryOptions,
      types.OrderQuerySuccess,
      types.OrderQueryFail
    >(options, extra);
  }

  /**
   * 申请退款
   *
   * ```
   * pay.refund({
   *  out_trade_no: '1217752501201407033233368018',
   *  out_refund_no: '1217752501201407033233368019',
   *  total_fee: 100,
   *  refund_fee: 80
   * });
   * ```
   * @see {@link https://pay.weixin.qq.com/wiki/doc/api/micropay.php?chapter=9_4}
   */
  public async refund(options: types.RefundOptions) {
    const url = this.completeURL(REFUND_BASE);
    const extra = await this.createFetchOptions(url, true);
    return fetch<types.RefundOptions, types.RefundSuccess, types.RefundFail>(
      options,
      extra
    );
  }

  /**
   * 查询退款
   *
   * ```
   * pay.refundQuery({
   *   transaction_id: '1009660380201506130728806387'
   * });
   *
   * pay.refundQuery({
   *   out_trade_no: '120061098828009406'
   * });
   * ```
   * @see {@link https://pay.weixin.qq.com/wiki/doc/api/micropay.php?chapter=9_5}
   */
  public async refundQuery(options: types.RefundQueryOptions) {
    const url = this.completeURL(REFUND_QUERY_BASE);
    const extra = await this.createFetchOptions(url);
    return fetch<
      types.RefundQueryOptions,
      types.RefundQuerySuccess,
      types.RefundQueryFail
    >(options, extra);
  }

  /**
   * 下载对账单
   *
   * ```
   * pay.downloadBill({
   *   bill_date: "20140603",
   *   bill_type: "ALL"
   * });
   * ```
   * @see {@link https://pay.weixin.qq.com/wiki/doc/api/micropay.php?chapter=9_6}
   */
  public async downloadBill(options: types.DownloadBillOptions) {
    const url = this.completeURL(DOWNLOAD_BILL_BASE);
    const extra = await this.createFetchOptions(url);
    return download<types.DownloadBillOptions, types.DownloadBillReturn>(
      options,
      extra
    );
  }

  /**
   * 下载资金账单
   *
   * ```
   * pay.downloadFundFlow({
   *   bill_date: "20140603",
   *   account_type: "Basic",
   *   tar_type: "GZIP"
   * });
   * ```
   * @see {@link https://pay.weixin.qq.com/wiki/doc/api/micropay.php?chapter=9_18&index=7}
   */
  public async downloadFundFlow(options: types.DownloadFundFlowOptions) {
    const url = this.completeURL(DOWNLOAD_FUND_FLOW_BASE);
    const extra = await this.createFetchOptions(url);
    return download<
      types.DownloadFundFlowOptions,
      types.DownloadFundFlowReturn
    >(options, extra);
  }

  /**
   * 拉取订单评价数据
   *
   * ```
   * pay.batchQueryComment({
   *   begin_time: "20170724000000",
   *   end_time: "20170725000000",
   *   offset: 0
   * });
   * ```
   * @see {@link https://pay.weixin.qq.com/wiki/doc/api/micropay.php?chapter=9_17&index=12}
   */
  public async batchQueryComment(options: types.BatchQueryCommentOptions) {
    const url = this.completeURL(BATCH_QUERY_COMMENT_BASE);
    const extra = await this.createFetchOptions(url);
    return fetch<
      types.BatchQueryCommentOptions,
      types.BatchQueryCommentSuccess,
      types.BatchQueryCommentFail
    >(options, extra);
  }

  /**
   * 退款结果通知处理
   *
   * ```
   * router.post("/wechatpay/notify/refund", (req, res) => {
   *   getXMLBody(req).then(data => {
   *     pay
   *       .refundNotify(data, async parsedData => {
   *         if (!pay.verifySign(parsedData)) {
   *           // 签名校验失败
   *         }
   *         if (parsedData.parsedDatault_code === "FAIL") {
   *           // 业务逻辑失败
   *         }
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
   * @see {@link https://pay.weixin.qq.com/wiki/doc/api/micropay.php?chapter=9_16&index=11}
   */
  public async refundNotify(
    baseData: types.RefundNotifyBase,
    handler: types.RefundNotifyHandler
  ) {
    if (baseData.return_code === "FAIL") {
      return toXML({
        return_code: baseData.return_code,
        return_msg: baseData.return_msg
      });
    }
    const key = this.getKey();
    const decodeRawData = decode(key, baseData.req_info);
    const decodeData = <types.RefundNotifyDecode> JSON.parse(decodeRawData);
    const result = await handler(Object.assign(baseData, decodeData));
    return toXML(result);
  }
}

export default PayBase;
