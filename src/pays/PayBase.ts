import { download, fetch } from "../fetch";
import * as types from "../types";
import { decode, toXML } from "../utils";
import Base from "./Base";

const ORDER_QUERY_BASE = "/pay/orderquery";
const REFUND_BASE = "/secapi/pay/refund";
const REFUND_QUERY_BASE = "/pay/refundquery";
const DOWNLOAD_BILL_BASE = "/pay/downloadbill";
const DOWNLOAD_FUND_FLOW_BASE = "/pay/downloadfundflow";
const REPORT_BASE = "/payitil/report";
const BATCH_QUERY_COMMENT_BASE = "/billcommentsp/batchquerycomment";

/**
 * 支付基类
 */
class PayBase extends Base {
  /**
   * 查询订单
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
   * 交易保障
   * @see {@link https://pay.weixin.qq.com/wiki/doc/api/micropay.php?chapter=9_14&index=8}
   */
  public async report(options: types.ReportOptions) {
    const url = this.completeURL(REPORT_BASE);
    const extra = await this.createFetchOptions(url);
    return fetch<types.ReportOptions, types.ReportSuccess, types.ReportFail>(
      options,
      extra
    );
  }

  /**
   * 拉取订单评价数据
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
