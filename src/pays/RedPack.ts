import * as errors from "../errors";
import * as types from "../types";
import { fetch } from "../utils";
import Base from "./Base";

const SEND_RED_PACK_BASE = "/mmpaymkttransfers/sendredpack";
const SEND_GROUP_RED_PACK_BASE = "/mmpaymkttransfers/sendgroupredpack";
const GET_HB_INFO_BASE = "/mmpaymkttransfers/gethbinfo";

/**
 * 现金红包
 * @see {@link https://pay.weixin.qq.com/wiki/doc/api/tools/cash_coupon.php?chapter=13_1}
 */
export class RedPack extends Base {
  /**
   * 发放普通红包
   * @see {@link https://pay.weixin.qq.com/wiki/doc/api/tools/cash_coupon.php?chapter=13_4&index=3}
   */
  public async sendRedPack(options: types.SendRedPackOptions) {
    const url = this.completeURL(SEND_RED_PACK_BASE);
    const extra = await this.createFetchOptions(url, true);
    extra.mapAppId = "wxappid";
    return fetch<types.SendRedPackOptions, types.SendRedPackResult>(
      options,
      extra
    ).then(result => {
      if (result.result_code === "FAIL") {
        throw new errors.BusinessError<types.SendRedPackReturn>(result);
      }
      return result;
    });
  }

  /**
   * 发放裂变红包
   * @see {@link https://pay.weixin.qq.com/wiki/doc/api/tools/cash_coupon.php?chapter=13_5&index=4}
   */
  public async sendGroupGroupRedPack(options: types.SendGroupRedPackOptions) {
    const url = this.completeURL(SEND_GROUP_RED_PACK_BASE);
    const extra = await this.createFetchOptions(url, true);
    extra.mapAppId = "wxappid";
    return fetch<types.SendGroupRedPackOptions, types.SendGroupRedPackResult>(
      options,
      extra
    ).then(result => {
      if (result.result_code === "FAIL") {
        throw new errors.BusinessError<types.SendGroupRedPackReturn>(result);
      }
      return result;
    });
  }

  /**
   * 查询红包记录
   * @see {@link https://pay.weixin.qq.com/wiki/doc/api/tools/cash_coupon.php?chapter=13_6&index=5}
   */
  public async getHbInfo(options: types.GetHbInfoOptions) {
    const url = this.completeURL(GET_HB_INFO_BASE);
    const extra = await this.createFetchOptions(url, true);
    return fetch<types.GetHbInfoOptions, types.GetHbInfoResult>(
      options,
      extra
    ).then(result => {
      if (result.result_code === "FAIL") {
        throw new errors.BusinessError<types.GetHbInfoReturn>(result);
      }
      return result;
    });
  }
}
