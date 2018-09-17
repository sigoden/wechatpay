import * as qs from "querystring";
import * as types from "../../types";
import EntrustBase from "./EntrustBase";

const ENTRUST_BASE = "https://api.mch.weixin.qq.com/papay/entrustweb";

/**
 * APP签约
 * @see {@link https://pay.weixin.qq.com/wiki/doc/api/pap.php?chapter=18_1&index=1}
 */
class AppEntrust extends EntrustBase {
  /**
   * 纯签约
   * @see {@link https://pay.weixin.qq.com/wiki/doc/api/pap.php?chapter=18_1&index=1}
   */
  public async entrust(options: types.EntrustAppOptions) {
    const data = await this.entrustBase(options);
    return ENTRUST_BASE + "?" + qs.stringify(data);
  }
}

export default AppEntrust;
