import { fetch } from "../fetch";
import * as types from "../types";
import Base from "./core/Base";

const SEND_RED_PACK_BASE = "/mmpaymkttransfers/sendredpack";
const SEND_GROUP_RED_PACK_BASE = "/mmpaymkttransfers/sendgroupredpack";
const GET_HB_INFO_BASE = "/mmpaymkttransfers/gethbinfo";

/**
 * 现金红包
 *
 * ```
 * const pay = new RedPack({
 *   appId: "wxb80e5bddb2d804f3",
 *   key: "6Q9VX4N3WTBM9G9XBL7H1L9PB9ANHLY7",
 *   mchId: "1434712502",
 *   pfx: fs.readFileSync(path.resolve(__dirname, "cert.p12"))
 * });
 * ```
 * @see {@link https://pay.weixin.qq.com/wiki/doc/api/tools/cash_coupon.php?chapter=13_1}
 */
export class RedPack extends Base {
  /**
   * 发放普通红包
   *
   * ```
   * pay.sendRedPack({
   *   mch_billno: "10000098201411111234567890",
   *   send_name: "天虹百货",
   *   re_openid: "oxTWIuGaIt6gTKsQRLau2M0yL16E",
   *   total_amount: 1000,
   *   total_num: 1,
   *   wishing: "红包祝福语",
   *   client_ip: "192.168.0.1",
   *   act_name: "猜灯谜抢红包活动",
   *   remark: "猜越多得越多，快来抢！"
   * });
   * ```
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
   *
   * ```
   * pay.sendGroupGroupRedPack({
   *   mch_billno: "10000098201411111234567890",
   *   send_name: "天虹百货",
   *   re_openid: "oxTWIuGaIt6gTKsQRLau2M0yL16E",
   *   total_amount: 1000,
   *   total_num: 1,
   *   wishing: "红包祝福语",
   *   act_name: "猜灯谜抢红包活动",
   *   remark: "猜越多得越多，快来抢！"
   * });
   * ```
   * @see {@link https://pay.weixin.qq.com/wiki/doc/api/tools/cash_coupon.php?chapter=13_5&index=4}
   */
  public async sendGroupGroupRedPack(options: types.SendGroupRedPackOptions) {
    const url = this.completeURL(SEND_GROUP_RED_PACK_BASE);
    const extra = await this.createFetchOptions(url, true);
    extra.mapAppId = "wxappid";
    extra.consts = { amt_type: "ALL_RAND" };
    return fetch<
      types.SendGroupRedPackOptions,
      types.SendGroupRedPackSuccess,
      types.SendGroupRedPackFail
    >(options, extra);
  }

  /**
   * 查询红包记录
   *
   * ```
   * pay.getHbInfo({
   *   mch_billno: "10000098201411111234567890"
   * });
   * ```
   * @see {@link https://pay.weixin.qq.com/wiki/doc/api/tools/cash_coupon.php?chapter=13_6&index=5}
   */
  public async getHbInfo(options: types.GetHbInfoOptions) {
    const url = this.completeURL(GET_HB_INFO_BASE);
    const extra = await this.createFetchOptions(url, true);
    extra.consts = { bill_type: "MCHT" };
    return fetch<
      types.GetHbInfoOptions,
      types.GetHbInfoSuccess,
      types.GetHbInfoFail
    >(options, extra);
  }
}
