import * as types from "../types";
import PayBaseX from "./core/PayBaseX";

/**
 * H5支付
 * @see {@link https://pay.weixin.qq.com/wiki/doc/api/wxa/wxa_api.php?chapter=7_3&index=1}
 */
export class LitePay extends PayBaseX {
  /**
   * 统一下单
   * @see {@link https://pay.weixin.qq.com/wiki/doc/api/wxa/wxa_api.php?chapter=9_1}
   */
  public async unifiedOrder(options: types.UnifiedOrderOptionsLite) {
    return this.unifiedOrderBase<types.UnifiedOrderOptionsLite>(options);
  }
}
