import { download, fetch } from "../../fetch";
import * as types from "../../types";
import { sign, toXML } from "../../utils";
import Base from "../Base";

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
   * 支付中签约
   * @see {@link https://pay.weixin.qq.com/wiki/doc/api/pap.php?chapter=18_13&index=4}
   */
  public async contractOrder(options: types.ContractOrderOptions) {
    const url = this.completeURL(CONTRACT_ORDER_BASE);
    const extra = await this.createFetchOptions(url);
    return fetch<
      types.ContractOrderOptions,
      types.ContractOrderSuccess,
      types.ContractOrderFail
    >(options, extra);
  }
  /**
   * 签约，解约结果通知
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
    const key = this.getKey();
    const checkSign = sign(types.SignType.MD5, info, key);
    if (checkSign !== info.sign) {
      return toXML({
        return_code: "FAIL",
        return_msg: "签名失败"
      });
    }
    const result = handler(info);
    return toXML(result);
  }

  /**
   * 查询签约关系
   * @see {@link https://pay.weixin.qq.com/wiki/doc/api/pap.php?chapter=18_2&index=6}
   */
  public async queryContract(options: types.QueryContractOptions) {
    const extra = await this.createFetchOptions(QUERY_CONTRACT_BASE);
    return fetch<
      types.QueryContractOptions,
      types.QueryContractSuccess,
      types.QueryContractFail
    >(options, extra);
  }
  /**
   * 申请扣款
   * @see {@link https://pay.weixin.qq.com/wiki/doc/api/pap.php?chapter=18_3&index=7}
   */
  public async papPayApply(options: types.PapPayApplyOptions) {
    const extra = await this.createFetchOptions(PAP_PAY_APPLY_BASE);
    return fetch<
      types.PapPayApplyOptions,
      types.PapPayApplySuccess,
      types.PapPayApplyFail
    >(options, extra);
  }
  /**
   * 申请解约
   * @see {@link https://pay.weixin.qq.com/wiki/doc/api/pap.php?chapter=18_4&index=8}
   */
  public async deleteContract(options: types.DeleteContractOptions) {
    const extra = await this.createFetchOptions(DELETE_CONTRACT_BASE);
    return fetch<
      types.DeleteContractOptions,
      types.DeleteContractSuccess,
      types.DeleteContractFail
    >(options, extra);
  }
  /**
   * 下载对账单
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
   * 扩款结果通知
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
    const key = this.getKey();
    const checkSign = sign(types.SignType.MD5, info, key);
    if (checkSign !== info.sign) {
      return toXML({
        return_code: "FAIL",
        return_msg: "签名失败"
      });
    }
    const result = await handler(info);
    return toXML(result);
  }
  /**
   * 申请退款
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
   * @see {@link https://pay.weixin.qq.com/wiki/doc/api/pap.php?chapter=18_9&index=12}
   */
  public async papOrderquery(options: types.PapOrderQueryOptions) {
    const extra = await this.createFetchOptions(PAP_ORDER_QUERY_BASE);
    return fetch<
      types.PapOrderQueryOptions,
      types.PapOrderQuerySuccess,
      types.PapOrderQueryFail
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
    return data;
  }
}

export default EntrustBase;
