import { fetch } from "../fetch";
import * as types from "../types";
import PayBase from "./PayBase";

const REVERSE_BASE = "/secapi/pay/reverse";
const MICRO_PAY_BASE = "/pay/micropay";
const SHORT_URL_BASE = "/tools/shorturl";
const AUTH_CODE_TO_OPENID_BASE = "/tools/authcodetoopenid";
/**
 * 刷卡支付
 * @see {@link https://pay.weixin.qq.com/wiki/doc/api/micropay.php?chapter=5_1}
 */
export class PubScanPay extends PayBase {
  /**
   * 提交刷卡支付
   * @see {@link https://pay.weixin.qq.com/wiki/doc/api/micropay.php?chapter=9_10&index=1}
   */
  public async microPay(options: types.MicroPayOptions) {
    const url = this.completeURL(MICRO_PAY_BASE);
    const extra = await this.createFetchOptions(url);
    return fetch<
      types.MicroPayOptions,
      types.MicroPaySuccess,
      types.MicroPayFail
    >(options, extra);
  }

  /**
   * 撤销订单
   * @see {@link https://pay.weixin.qq.com/wiki/doc/api/micropay.php?chapter=9_11&index=3}
   */
  public async reverse(options: types.ReverseOptions) {
    const url = this.completeURL(REVERSE_BASE);
    const extra = await this.createFetchOptions(url, true);
    return fetch<types.ReverseOptions, types.ReverseSuccess, types.ReverseFail>(
      options,
      extra
    );
  }
  /**
   * 短链接转换
   * @see {@link https://pay.weixin.qq.com/wiki/doc/api/micropay.php?chapter=9_9&index=9}
   */
  public async shortURL(options: types.ShortURLOptions) {
    const url = this.completeURL(SHORT_URL_BASE);
    const extra = await this.createFetchOptions(url);
    options.sign_type = types.SignType["HMAC-SHA256"];
    return fetch<
      types.ShortURLOptions,
      types.ShortURLSuccess,
      types.ShortURLFail
    >(options, extra);
  }

  /**
   * 授权码查询 OpenId
   * @see {@link https://pay.weixin.qq.com/wiki/doc/api/micropay.php?chapter=9_13&index=10}
   */
  public async authCodeToOpenId(options: types.AuthCodeToOpenIdOptions) {
    const url = this.completeURL(AUTH_CODE_TO_OPENID_BASE);
    const extra = await this.createFetchOptions(url);
    return fetch<
      types.AuthCodeToOpenIdOptions,
      types.AuthCodeToOpenIdSuccess,
      types.AuthCodeToOpenIdFail
    >(options, extra);
  }
}
