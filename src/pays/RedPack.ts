import { fetch } from "../fetch";
import * as types from "../types";
import Base from "./core/Base";

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
    return fetch<
      types.SendRedPackOptions,
      types.SendRedPackSuccess,
      types.SendRedPackFail
    >(options, extra);
  }

  /**
   * 发放裂变红包
   * @see {@link https://pay.weixin.qq.com/wiki/doc/api/tools/cash_coupon.php?chapter=13_5&index=4}
   */
  public async sendGroupGroupRedPack(options: types.SendGroupRedPackOptions) {
    const url = this.completeURL(SEND_GROUP_RED_PACK_BASE);
    const extra = await this.createFetchOptions(url, true);
    extra.mapAppId = "wxappid";
    return fetch<
      types.SendGroupRedPackOptions,
      types.SendGroupRedPackSuccess,
      types.SendGroupRedPackFail
    >(options, extra);
  }

  /**
   * 查询红包记录
   * @see {@link https://pay.weixin.qq.com/wiki/doc/api/tools/cash_coupon.php?chapter=13_6&index=5}
   */
  public async getHbInfo(options: types.GetHbInfoOptions) {
    const url = this.completeURL(GET_HB_INFO_BASE);
    const extra = await this.createFetchOptions(url, true);
    return fetch<
      types.GetHbInfoOptions,
      types.GetHbInfoSuccess,
      types.GetHbInfoFail
    >(options, extra);
  }
}
