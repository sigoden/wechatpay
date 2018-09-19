import { fetch } from "../fetch";
import * as types from "../types";
import Base from "./core/Base";

const SEND_COUPON_BASE = "/mmpaymkttransfers/send_coupon";
const QUERY_COUPON_STOCK_BASE = "/mmpaymkttransfers/query_coupon_stock";
const QUERY_COUPONS_INFO_BASE = "/mmpaymkttransfers/querycouponsinfo";

/**
 * 代金券
 *
 * ```
 * const pay = new Coupon({
 *   appId: "wxb80e5bddb2d804f3",
 *   key: "6Q9VX4N3WTBM9G9XBL7H1L9PB9ANHLY7",
 *   mchId: "1434712502",
 *   pfx: fs.readFileSync(path.resolve(__dirname, "cert.p12"))
 * });
 * ```
 * @see {@link https://pay.weixin.qq.com/wiki/doc/api/tools/sp_coupon.php?chapter=12_1}
 */
export class Coupon extends Base {
  /**
   * 发放代金券
   *
   * ```
   * pay.sendCoupon({
   *   coupon_stock_id: "1757",
   *   openid_count: 1,
   *   partner_trade_no: "1000009820141203515766",
   *   openid: "onqOjjrXT-776SpHnfexGm1_P7iE"
   * });
   * ```
   * @see {@link https://pay.weixin.qq.com/wiki/doc/api/tools/sp_coupon.php?chapter=12_3&index=4}
   */
  public async sendCoupon(options: types.SendCouponOptions) {
    const url = this.completeURL(SEND_COUPON_BASE);
    const extra = await this.createFetchOptions(url, true);
    return fetch<
      types.SendCouponOptions,
      types.SendCouponSuccess,
      types.SendCouponFail
    >(options, extra);
  }

  /**
   * 查询代金券批次
   *
   * ```
   * pay.queryCouponStock({
   *   coupon_stock_id: "1757"
   * });
   * ```
   * @see {@link https://pay.weixin.qq.com/wiki/doc/api/tools/sp_coupon.php?chapter=12_4&index=5}
   */
  public async queryCouponStock(options: types.QueryCouponStockOptions) {
    const url = this.completeURL(QUERY_COUPON_STOCK_BASE);
    const extra = await this.createFetchOptions(url);
    return fetch<
      types.QueryCouponStockOptions,
      types.QueryCouponStockSuccess,
      types.QueryCouponStockFail
    >(options, extra);
  }

  /**
   * 查询代金券信息
   *
   * ```
   * pay.queryCouponsInfo({
   *   coupon_id: "1565",
   *   openid: "onqOjjrXT-776SpHnfexGm1_P7iE",
   *   stock_id: "58818"
   * });
   * ```
   * @see {@link https://pay.weixin.qq.com/wiki/doc/api/tools/sp_coupon.php?chapter=12_5&index=6}
   */
  public async queryCouponsInfo(options: types.QueryCouponsInfoOptions) {
    const url = this.completeURL(QUERY_COUPONS_INFO_BASE);
    const extra = await this.createFetchOptions(url);
    return fetch<
      types.QueryCouponsInfoOptions,
      types.QueryCouponsInfoSuccess,
      types.QueryCouponsInfoFail
    >(options, extra);
  }
}
