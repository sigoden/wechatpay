import * as types from "../types";
import PayFund from "./PayFund";

/**
 * APP支付
 * @see {@link https://pay.weixin.qq.com/wiki/doc/api/app/app.php?chapter=8_1}
 */
export class AppPay extends PayFund {
  /**
   * 统一下单
   * @see {@link https://pay.weixin.qq.com/wiki/doc/api/app/app.php?chapter=9_1}
   */
  public async unifiedOrder(options: types.UnifiedOrderOptionsApp) {
    return this.unifiedOrderBase<types.UnifiedOrderOptionsApp>(options);
  }
}
