import * as types from "../types";
import PayBaseX from "./core/PayBaseX";

/**
 * 公众号支付
 *
 * ```
 * const pay = new PubPay({
 *   appId: "wxb80e5bddb2d804f3",
 *   key: "6Q9VX4N3WTBM9G9XBL7H1L9PB9ANHLY7",
 *   mchId: "1434712502",
 *   pfx: fs.readFileSync(path.resolve(__dirname, "cert.p12"))
 * });
 * ```
 * @see {@link https://pay.weixin.qq.com/wiki/doc/api/jsapi.php?chapter=7_1}
 */
export class PubPay extends PayBaseX {
  /**
   * 统一下单
   *
   * ```
   * pay.unifiedOrder({
   *   openid: "oUpF8uMuAJO_M2pxb1Q9zNjWeS6o",
   *   body: "腾讯充值中心-QQ会员充值",
   *   out_trade_no: "1217752501201407033233368018",
   *   total_fee: 888,
   *   spbill_create_ip: "8.8.8.8",
   *   notify_url: "https://example.com/wechatpay/notify"
   * });
   * ```
   * @see {@link https://pay.weixin.qq.com/wiki/doc/api/jsapi.php?chapter=9_1}
   */
  public async unifiedOrder(options: types.UnifiedOrderOptionsPub) {
    return this.unifiedOrderBase(
      Object.assign({ trade_type: "JSAPI" }, options)
    );
  }
}
