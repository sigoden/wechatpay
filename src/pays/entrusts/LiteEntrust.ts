import * as types from "../../types";
import EntrustBase from "./EntrustBase";

/**
 * 小程序签约
 * @see {@link https://pay.weixin.qq.com/wiki/doc/api/pap.php?chapter=18_14&index=2}
 */
class LiteEntrust extends EntrustBase {
  /**
   * 纯签约
   * @see {@link https://pay.weixin.qq.com/wiki/doc/api/pap.php?chapter=18_14&index=2}
   */
  public async entrust(options: types.EntrustLiteOptions) {
    return this.entrustBase(options);
  }
}

export default LiteEntrust;
