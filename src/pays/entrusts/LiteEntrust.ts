import * as types from "../../types";
import EntrustBase from "./core/EntrustBase";

/**
 * 小程序签约
 * @see {@link https://pay.weixin.qq.com/wiki/doc/api/pap.php?chapter=18_14&index=2}
 */
export class LiteEntrust extends EntrustBase {
  /**
   * 支付中签约
   *
   * ```
   * pay.contractOrder({
   *   contract_mchid: "1223816102",
   *   contract_appid: "wx426a3015555a46be",
   *   out_trade_no: "1217752501201407033233368018",
   *   body: "腾讯充值中心-QQ会员充值",
   *   notify_url: "https://example.com/wechatpay/notify",
   *   total_fee: 888,
   *   spbill_create_ip: "8.8.8.8",
   *   plan_id: 12535,
   *   contract_code: "100000",
   *   request_serial: 1000,
   *   contract_display_account: "微信代扣",
   *   contract_notify_url: "https://example.com/wechatpay/pap/notify"
   * });
   * ```
   * @see {@link https://pay.weixin.qq.com/wiki/doc/api/pap.php?chapter=18_13&index=4}
   */
  public async contractOrder(options: types.ContractOrderOptions) {
    return this.contractOrderBase(options, "JSAPI");
  }
  /**
   * 纯签约
   *
   * ```
   * pay.entrust({
   *   plan_id: "12535",
   *   contract_code: "100000",
   *   request_serial: 1000,
   *   contract_display_account: "微信代扣",
   *   notify_url: "https://example.com/wechatpay/notify/contract"
   * });
   * ```
   * @see {@link https://pay.weixin.qq.com/wiki/doc/api/pap.php?chapter=18_14&index=2}
   */
  public async entrust(options: types.EntrustLiteOptions) {
    return this.entrustBase(options);
  }
}
