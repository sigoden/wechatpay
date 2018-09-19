import * as types from "../types";
import PayBaseX from "./core/PayBaseX";

/**
 * H5支付
 *
 * ```
 * const pay = new WapPay({
 *   appId: "wxb80e5bddb2d804f3",
 *   key: "6Q9VX4N3WTBM9G9XBL7H1L9PB9ANHLY7",
 *   mchId: "1434712502",
 *   pfx: fs.readFileSync(path.resolve(__dirname, "cert.p12"))
 * });
 * ```
 * @see {@link https://pay.weixin.qq.com/wiki/doc/api/H5.php?chapter=15_1}
 */
export class WapPay extends PayBaseX {
  /**
   * 统一下单
   *
   * ```
   * pay.unifiedOrder({
   *   body: "腾讯充值中心-QQ会员充值",
   *   out_trade_no: "1217752501201407033233368018",
   *   total_fee: 888,
   *   spbill_create_ip: "8.8.8.8",
   *   notify_url: "https://example.com/wechatpay/notify",
   *   scene_info: '{"h5_info": {"type":"Wap","wap_url": "https://pay.qq.com","wap_name": "腾讯充值"}}'
   * });
   * ```
   * @see {@link https://pay.weixin.qq.com/wiki/doc/api/H5.php?chapter=9_20&index=1}
   */
  public async unifiedOrder(options: types.UnifiedOrderOptionsWap) {
    return this.unifiedOrderBase(
      Object.assign({ trade_type: "MWEB" }, options)
    );
  }
}
