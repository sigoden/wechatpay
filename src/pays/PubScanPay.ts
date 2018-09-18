import { fetch } from "../fetch";
import * as types from "../types";
import PayBase from "./core/PayBase";

const REVERSE_BASE = "/secapi/pay/reverse";
const MICRO_PAY_BASE = "/pay/micropay";
const REPORT_BASE = "/payitil/report";
const SHORT_URL_BASE = "/tools/shorturl";
const AUTH_CODE_TO_OPENID_BASE = "/tools/authcodetoopenid";
/**
 * 刷卡支付
 * @see {@link https://pay.weixin.qq.com/wiki/doc/api/micropay.php?chapter=5_1}
 */
export class PubScanPay extends PayBase {
  /**
   * 提交刷卡支付
   *
   * ```
   * pay.microPay({
   *   device_info: "013467007045764",
   *   body: "深圳腾大- QQ公仔",
   *   out_trade_no: "1217752501201407033233368018",
   *   total_fee: 888,
   *   spbill_create_ip: "8.8.8.8",
   *   auth_code: "120061098828009406"
   * });
   * ```
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
   *
   * ```
   * pay.reverse({
   *   transaction_id: '1009660380201506130728806387'
   * })
   *
   * pay.reverse({
   *   out_trade_no: '120061098828009406'
   * })
   * ```
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
   * 交易保障
   *
   * ```
   * pay.report({
   *   interface_url: "https://api.mch.weixin.qq.com/pay/unifiedorder",
   *   user_ip: "8.8.8.8",
   *   trades: `!CDATA[
   *   [
   *     {
   *       out_trade_no: "out_trade_no_test_1",
   *       begin_time: "20160602203256",
   *       end_time: "20160602203257",
   *       state: "OK",
   *       err_msg: ""
   *     },
   *     {
   *       out_trade_no: "out_trade_no_test_2",
   *       begin_time: "20160602203260",
   *       end_time: "20160602203262",
   *       state: "FAIL",
   *       err_msg: "SYSTEMERROR"
   *     }
   *   ]
   * ];`
   * });
   * ```
   * @see {@link https://pay.weixin.qq.com/wiki/doc/api/micropay.php?chapter=9_14&index=8}
   */
  public async report(options: types.ReportOptionsPubScan) {
    const url = this.completeURL(REPORT_BASE);
    const extra = await this.createFetchOptions(url);
    return fetch<
      types.ReportOptionsPubScan,
      types.ReportSuccess,
      types.ReportFail
    >(options, extra);
  }

  /**
   * 短链接转换
   *
   * ```
   * pay.shortURL({
   *   long_url:
   *     "weixin://wxpay/bizpayurl?sign=XXX&appid=XX&mch_id=XX&product_id=XX&time_stamp=XX&nonce_str=XX"
   * });
   * ```
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
   *
   * ```
   * pay.authCodeToOpenId({
   *   auth_code: "120061098828009406"
   * });
   * ```
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
