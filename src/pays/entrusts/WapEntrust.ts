import * as qs from "querystring";
import * as types from "../../types";
import EntrustBase from "./core/EntrustBase";

const ENTRUST_BASE = "https://api.mch.weixin.qq.com/papay/h5entrustweb";

/**
 * H5签约
 *
 * ```
 * const pay = new WapEntrust({
 *   appId: "wxb80e5bddb2d804f3",
 *   key: "6Q9VX4N3WTBM9G9XBL7H1L9PB9ANHLY7",
 *   mchId: "1434712502",
 *   pfx: fs.readFileSync(path.resolve(__dirname, "cert.p12"))
 * });
 * ```
 * @see {@link https://pay.weixin.qq.com/wiki/doc/api/pap.php?chapter=18_16&index=3}
 */
export class WapEntrust extends EntrustBase {
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
    return this.contractOrderBase(options, "MWEB");
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
   *   notify_url: "https://example.com/wechatpay/notify/contract",
   *   clientip: "119.145.83.6",
   * });
   * ```
   * @see {@link https://pay.weixin.qq.com/wiki/doc/api/pap.php?chapter=18_16&index=3}
   */
  public async entrust(options: types.EntrustWapOptions) {
    const data = await this.entrustBase(options);
    return ENTRUST_BASE + "?" + qs.stringify(data);
  }
}
