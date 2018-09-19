import { download, fetch } from "../../../fetch";
import * as types from "../../../types";
import { sign, toXML } from "../../../utils";
import Base from "../../core/Base";

const REFUND_BASE = "/secapi/pay/refund";
const REFUND_QUERY_BASE = "/pay/refundquery";
const CONTRACT_ORDER_BASE = "/pay/orderquery";
const QUERY_CONTRACT_BASE = "/papay/querycontract";
const PAP_PAY_APPLY_BASE = "/pay/pappayapply";
const DELETE_CONTRACT_BASE = "/papay/deletecontract";
const PAP_ORDER_QUERY_BASE = "/pay/paporderquery";
const DOWNLOAD_BILL_BASE = "/pay/downloadbill";

/**
 * 微信代扣基类
 * @see {@link https://pay.weixin.qq.com/wiki/doc/api/pap.php?chapter=17_2}
 */
class EntrustBase extends Base {
  /**
   * 签约，解约结果通知
   *
   * ```
   * router.post("/wechatpay/notify/contract", (req, res) => {
   *   getXMLBody(req, options).then(data => {
   *     pay
   *       .contractNotify(data, async parsedData => {
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
   * @see {@link https://pay.weixin.qq.com/wiki/doc/api/pap.php?chapter=18_17&index=5}
   */
  public async contractNotify(
    info: types.ContractNotifySuccess | types.ContractNotifyFail,
    handler: types.ContractNotifyHandler
  ) {
    if (info.return_code === "FAIL" || info.result_code === "FAIL") {
      return toXML({
        return_code: info.return_code,
        return_msg: info.return_msg
      });
    }
    const result = handler(info);
    return toXML(result);
  }

  /**
   * 查询签约关系
   *
   * ```
   * pay.queryContract({
   *   contract_id: "120061098828009406"
   * });
   *
   * pay.queryContract({
   *   plan_id: 123,
   *   contract_code: "1023658866"
   * });
   * ```
   * @see {@link https://pay.weixin.qq.com/wiki/doc/api/pap.php?chapter=18_2&index=6}
   */
  public async queryContract(options: types.QueryContractOptions) {
    const extra = await this.createFetchOptions(QUERY_CONTRACT_BASE);
    extra.consts = { version: "1.0" };
    return fetch<
      types.QueryContractOptions,
      types.QueryContractSuccess,
      types.QueryContractFail
    >(options, extra);
  }

  /**
   * 申请扣款
   *
   * ```
   * pay.papPayApply({
   *   body: "水电代扣",
   *   out_trade_no: "1217752501201407033233368018",
   *   total_fee: 888,
   *   spbill_create_ip: "8.8.8.8",
   *   notify_url: "https://example.com/wechatpay/pap/notify",
   *   contract_id: "Wx15463511252015071056489715"
   * });
   * ```
   * @see {@link https://pay.weixin.qq.com/wiki/doc/api/pap.php?chapter=18_3&index=7}
   */
  public async papPayApply(options: types.PapPayApplyOptions) {
    const extra = await this.createFetchOptions(PAP_PAY_APPLY_BASE);
    extra.consts = { trade_type: "PAP" };
    return fetch<
      types.PapPayApplyOptions,
      types.PapPayApplySuccess,
      types.PapPayApplyFail
    >(options, extra);
  }

  /**
   * 申请解约
   *
   * ```
   * pay.deleteContract({
   *   contract_id: "120061098828009406",
   *   contract_termination_remark: "解约原因"
   * });
   *
   * pay.deleteContract({
   *   plan_id: "123",
   *   contract_code: "1023658866",
   *   contract_termination_remark: "解约原因"
   * });
   * ```
   * @see {@link https://pay.weixin.qq.com/wiki/doc/api/pap.php?chapter=18_4&index=8}
   */
  public async deleteContract(options: types.DeleteContractOptions) {
    const extra = await this.createFetchOptions(DELETE_CONTRACT_BASE);
    extra.consts = { version: "1.0" };
    return fetch<
      types.DeleteContractOptions,
      types.DeleteContractSuccess,
      types.DeleteContractFail
    >(options, extra);
  }

  /**
   * 下载对账单
   *
   * ```
   * pay.downloadBill({
   *   bill_date: "20140603",
   *   bill_type: "ALL"
   * })
   * ```
   * @see {@link https://pay.weixin.qq.com/wiki/doc/api/pap.php?chapter=18_6&index=9}
   */
  public async downloadBill(options: types.DownloadBillOptions) {
    const url = this.completeURL(DOWNLOAD_BILL_BASE);
    const extra = await this.createFetchOptions(url);
    return download<types.DownloadBillOptions, types.BaseReturn>(
      options,
      extra
    );
  }

  /**
   * 扣款结果通知
   *
   * ```
   * router.post("/wechatpay/notify/refund", (req, res) => {
   *   getXMLBody(req, options).then(data => {
   *     pay
   *       .papPayNotify(data, async parsedData => {
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
   * @see {@link https://pay.weixin.qq.com/wiki/doc/api/pap.php?chapter=18_7&index=10}
   */
  public async papPayNotify(
    info: types.PapPayNotifySuccess | types.PapPayNotifyFail,
    handler: types.PapPayNotifyHandler
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
   * 申请退款
   *
   * ```
   * pay.refund({
   *  out_trade_no: '1217752501201407033233368018',
   *  out_refund_no: '1217752501201407033233368019',
   *  total_fee: 100,
   *  refund_fee: 80
   * })
   * ```
   * @see {@link https://pay.weixin.qq.com/wiki/doc/api/pap.php?chapter=18_8&index=11}
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
   * })
   *
   * pay.refundQuery({
   *   out_trade_no: '120061098828009406'
   * })
   * ```
   * @see {@link https://pay.weixin.qq.com/wiki/doc/api/pap.php?chapter=18_9&index=12}
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
   * 查询订单
   *
   * ```
   * pay.papOrderQuery({
   *   transaction_id: '1009660380201506130728806387'
   * })
   *
   * pay.papOrderQuery({
   *   out_trade_no: '120061098828009406'
   * })
   * ```
   * @see {@link https://pay.weixin.qq.com/wiki/doc/api/pap.php?chapter=18_9&index=12}
   */
  public async papOrderQuery(options: types.PapOrderQueryOptions) {
    const extra = await this.createFetchOptions(PAP_ORDER_QUERY_BASE);
    return fetch<
      types.PapOrderQueryOptions,
      types.PapOrderQuerySuccess,
      types.PapOrderQueryFail
    >(options, extra);
  }

  protected async contractOrderBase(
    options: types.ContractOrderOptions,
    tradeType: string
  ) {
    const url = this.completeURL(CONTRACT_ORDER_BASE);
    const extra = await this.createFetchOptions(url);
    extra.consts = { trade_type: tradeType };
    return fetch<
      types.ContractOrderOptions,
      types.ContractOrderSuccess,
      types.ContractOrderFail
    >(options, extra);
  }

  protected async entrustBase(options: any) {
    const data = Object.assign(
      {
        appid: this.appId,
        mch_id: this.mchId
      },
      options
    );
    const key = this.getKey();
    const signData = sign(types.SignType["HMAC-SHA256"], data, key);
    data.sign = signData;
    data.timestamp = Math.ceil(Date.now() / 1000);
    data.version = "1.0";
    return data;
  }
}

export default EntrustBase;
