import * as types from "../types";
import PayFund from "./PayFund";

/**
 * H5支付
 * @see {@link https://pay.weixin.qq.com/wiki/doc/api/H5.php?chapter=15_1}
 */
export class WapPay extends PayFund {
  /**
   * 统一下单
   * @see {@link https://pay.weixin.qq.com/wiki/doc/api/H5.php?chapter=9_20&index=1}
   */
  public async unifiedOrder(options: types.UnifiedOrderOptionsWap) {
    return this.unifiedOrderBase<types.UnifiedOrderOptionsWap>(options);
  }
}
