import * as qs from "querystring";
import * as types from "../../types";
import EntrustBase from "./EntrustBase";

const ENTRUST_BASE = "https://api.mch.weixin.qq.com/papay/h5entrustweb";

/**
 * H5签约
 * @see {@link https://pay.weixin.qq.com/wiki/doc/api/pap.php?chapter=18_16&index=3}
 */
class WapEntrust extends EntrustBase {
  /**
   * 纯签约
   * @see {@link https://pay.weixin.qq.com/wiki/doc/api/pap.php?chapter=18_16&index=3}
   */
  public async entrust(options: types.EntrustWapOptions) {
    const data = await this.entrustBase(options);
    return ENTRUST_BASE + "?" + qs.stringify(data);
  }
}

export default WapEntrust;
