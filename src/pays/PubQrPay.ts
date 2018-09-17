import * as types from "../types";
import PayFund from "./PayFund";

/**
 * 扫码支付
 * @see {@link https://pay.weixin.qq.com/wiki/doc/api/native.php?chapter=6_1}
 */
export class PubQrPay extends PayFund {
  constructor(options: types.PayerOptions) {
    super(options);
  }

  /**
   * 统一下单
   * @see {@link https://pay.weixin.qq.com/wiki/doc/api/native.php?chapter=9_1}
   */
  public async unifiedOrder(options: types.UnifiedOrderOptionsPubQr) {
    return this.unifiedOrderBase<types.UnifiedOrderOptionsPubQr>(options);
  }
}
