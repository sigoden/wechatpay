import * as types from "../types";
import PayBaseX from "./core/PayBaseX";

/**
 * 扫码支付
 * @see {@link https://pay.weixin.qq.com/wiki/doc/api/native.php?chapter=6_1}
 */
export class PubQrPay extends PayBaseX {
  /**
   * 统一下单
   * @see {@link https://pay.weixin.qq.com/wiki/doc/api/native.php?chapter=9_1}
   */
  public async unifiedOrder(options: types.UnifiedOrderOptionsPubQr) {
    return this.unifiedOrderBase(
      Object.assign({ trade_type: "NATIVE" }, options)
    );
  }
}
