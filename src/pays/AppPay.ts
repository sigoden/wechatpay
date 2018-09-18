import * as types from "../types";
import PayBaseX from "./core/PayBaseX";

/**
 * APP支付
 * @see {@link https://pay.weixin.qq.com/wiki/doc/api/app/app.php?chapter=8_1}
 */
export class AppPay extends PayBaseX {
  /**
   * 统一下单
   *
   * ```
   * pay.unifiedOrder({
   *   body: "腾讯充值中心-QQ会员充值",
   *   out_trade_no: "1217752501201407033233368018",
   *   total_fee: 888,
   *   spbill_create_ip: "8.8.8.8",
   *   notify_url: "https://example.com/wechatpay/notify"
   * });
   * ```
   * @see {@link https://pay.weixin.qq.com/wiki/doc/api/app/app.php?chapter=9_1}
   */
  public async unifiedOrder(options: types.UnifiedOrderOptionsApp) {
    return this.unifiedOrderBase(Object.assign({ trade_type: "APP" }, options));
  }
}
