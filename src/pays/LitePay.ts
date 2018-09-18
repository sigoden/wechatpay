import * as types from "../types";
import PayBaseX from "./core/PayBaseX";

/**
 * H5支付
 * @see {@link https://pay.weixin.qq.com/wiki/doc/api/wxa/wxa_api.php?chapter=7_3&index=1}
 */
export class LitePay extends PayBaseX {
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
   * @see {@link https://pay.weixin.qq.com/wiki/doc/api/wxa/wxa_api.php?chapter=9_1}
   */
  public async unifiedOrder(options: types.UnifiedOrderOptionsLite) {
    return this.unifiedOrderBase(
      Object.assign({ trade_type: "JSAPI" }, options)
    );
  }
}
