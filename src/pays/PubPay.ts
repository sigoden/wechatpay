import * as types from "../types";
import PayBaseX from "./core/PayBaseX";

/**
 * 公众号支付
 * @see {@link https://pay.weixin.qq.com/wiki/doc/api/jsapi.php?chapter=7_1}
 */
export class PubPay extends PayBaseX {
  /**
   * 统一下单
   * @see {@link https://pay.weixin.qq.com/wiki/doc/api/jsapi.php?chapter=9_1}
   */
  public async unifiedOrder(options: types.UnifiedOrderOptionsPub) {
    return this.unifiedOrderBase(
      Object.assign({ trade_type: "JSAPI" }, options)
    );
  }
}
