import { fetch } from "../fetch";
import * as types from "../types";
import Base from "./core/Base";

const PAY_BANK_BASE = "/mmpaysptrans/pay_bank";
const QUERY_BANK_BASE = "/mmpaysptrans/query_bank";
const GET_PUBLIC_URL = "https://fraud.mch.weixin.qq.com/risk/getpublickey";
const TRANSFERS_BASE = "/mmpaymkttransfers/promotion/transfers";
const GET_TRANSFER_INFO_BASE = "/mmpaymkttransfers/gettransferinfo";

/**
 * 企业付款
 * @see {@link https://pay.weixin.qq.com/wiki/doc/api/tools/mch_pay.php?chapter=14_1}
 */
export class Bank extends Base {
  /**
   * 企业付款到零钱
   *
   * ```
   * pay.transfers({
   *   partner_trade_no: "10000098201411111234567890",
   *   openid: "oxTWIuGaIt6gTKsQRLau2M0yL16E",
   *   check_name: "FORCE_CHECK",
   *   amount: 10099,
   *   desc: "理赔",
   *   spbill_create_ip: "192.168.0.1"
   * });
   * ```
   * @see {@link https://pay.weixin.qq.com/wiki/doc/api/tools/mch_pay.php?chapter=14_2}
   */
  public async transfers(options: types.TransfersOptions) {
    const url = this.completeURL(TRANSFERS_BASE);
    const extra = await this.createFetchOptions(url, true);
    extra.mapAppId = "mch_appid";
    extra.mapMchId = "mchid";
    return fetch<
      types.TransfersOptions,
      types.TransfersSuccess,
      types.TransfersFail
    >(options, extra);
  }

  /**
   * 查询企业付款到零钱
   *
   * ```
   * pay.getTransferInfo({
   *   partner_trade_no: "10000098201411111234567890"
   * });
   * ```
   * @see {@link https://pay.weixin.qq.com/wiki/doc/api/tools/mch_pay.php?chapter=14_3}
   */
  public async getTransferInfo(options: types.GetTransferInfoOptions) {
    const url = this.completeURL(GET_TRANSFER_INFO_BASE);
    const extra = await this.createFetchOptions(url, true);
    return fetch<
      types.GetTransferInfoOptions,
      types.GetTransferInfoSuccess,
      types.GetTransferInfoFail
    >(options, extra);
  }

  /**
   * 企业付款到银行卡
   *
   * ```
   * pay.payBank({
   *   partner_trade_no: "1212121221227",
   *   enc_bank_no: utils.rsa(pemKey, "6225760017946512"),
   *   enc_true_name: utils.rsa(pemKey, "王小王"),
   *   bank_code: "1001",
   *   amount: 100,
   *   desc: "理财"
   * });
   * // pemKey 通过 `pay.getPublicKey` 获取
   * ```
   * @see {@link https://pay.weixin.qq.com/wiki/doc/api/tools/mch_pay.php?chapter=24_2}
   */
  public async payBank(options: types.PayBankOptions) {
    const url = this.completeURL(PAY_BANK_BASE);
    const extra = await this.createFetchOptions(url, true);
    extra.mapAppId = "-";
    return fetch<types.PayBankOptions, types.PayBankSuccess, types.PayBankFail>(
      options,
      extra
    );
  }
  /**
   * 查询企业付款到银行卡
   *
   * ```
   * pay.queryBank({
   *   partner_trade_no: "1212121221227"
   * });
   * ```
   * @see {@link https://pay.weixin.qq.com/wiki/doc/api/tools/mch_pay.php?chapter=24_3}
   */
  public async queryBank(options: types.QueryBankOptions) {
    const url = this.completeURL(QUERY_BANK_BASE);
    const extra = await this.createFetchOptions(url, true);
    extra.mapAppId = "-";
    return fetch<
      types.QueryBankOptions,
      types.QueryBankSuccess,
      types.QueryBankFail
    >(options, extra);
  }
  /**
   * 获取RSA加密公钥
   *
   * ```
   * pay.getPublicKey({
   *  sign_type: SignType.MD5
   * });
   * ```
   */
  public async getPublicKey(options: types.GetPublicKeyOptions) {
    const extra = await this.createFetchOptions(GET_PUBLIC_URL, true);
    extra.mapAppId = "-";
    return fetch<
      types.GetPublicKeyOptions,
      types.GetPublicKeySuccess,
      types.GetPublicKeyFail
    >(options, extra);
  }
}
