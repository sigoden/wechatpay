import * as types from "../types";
import PayFund from "./PayFund";

/**
 * 公众号支付
 * @see {@link https://pay.weixin.qq.com/wiki/doc/api/jsapi.php?chapter=7_1}
 */
export class PubPay extends PayFund {
  /**
   * 统一下单
   * @see {@link https://pay.weixin.qq.com/wiki/doc/api/jsapi.php?chapter=9_1}
   */
  public async unifiedOrder(options: types.UnifiedOrderOptionsPub) {
    return this.unifiedOrderBase<types.UnifiedOrderOptionsPub>(options);
  }
}
