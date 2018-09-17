import * as errors from "errors";
import * as types from "types";
import { fetch } from "utils";
import Base from "./Base";

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
   * @see {@link https://pay.weixin.qq.com/wiki/doc/api/tools/mch_pay.php?chapter=14_2}
   */
  public async transfers(options: types.TransfersOptions) {
    const url = this.completeURL(TRANSFERS_BASE);
    const extra = await this.createFetchOptions(url, true);
    extra.mapAppId = "mch_appid";
    extra.mapMchId = "mchid";
    return fetch<types.TransfersOptions, types.TransfersResult>(
      options,
      extra
    ).then(result => {
      if (result.result_code === "FAIL") {
        throw new errors.BusinessError<types.TransfersReturn>(result);
      }
      return result;
    });
  }
  /**
   * 查询企业付款到零钱
   * @see {@link https://pay.weixin.qq.com/wiki/doc/api/tools/mch_pay.php?chapter=14_3}
   */
  public async getTransferInfo(options: types.GetTransferInfoOptions) {
    const url = this.completeURL(GET_TRANSFER_INFO_BASE);
    const extra = await this.createFetchOptions(url, true);
    return fetch<types.GetTransferInfoOptions, types.GetTransferInfoResult>(
      options,
      extra
    ).then(result => {
      if (result.result_code === "FAIL") {
        throw new errors.BusinessError<types.GetTransferInfoReturn>(result);
      }
      return result;
    });
  }
  /**
   * 企业付款到银行卡
   * @see {@link https://pay.weixin.qq.com/wiki/doc/api/tools/mch_pay.php?chapter=24_2}
   */
  public async payBank(options: types.PayBankOptions) {
    const url = this.completeURL(PAY_BANK_BASE);
    const extra = await this.createFetchOptions(url, true);
    extra.mapAppId = "-";
    return fetch<types.PayBankOptions, types.PayBankResult>(
      options,
      extra
    ).then(result => {
      if (result.result_code === "FAIL") {
        throw new errors.BusinessError<types.PayBankReturn>(result);
      }
      return result;
    });
  }
  /**
   * 查询企业付款到银行卡
   * @see {@link https://pay.weixin.qq.com/wiki/doc/api/tools/mch_pay.php?chapter=24_3}
   */
  public async queryBank(options: types.QueryBankOptions) {
    const url = this.completeURL(QUERY_BANK_BASE);
    const extra = await this.createFetchOptions(url, true);
    extra.mapAppId = "-";
    return fetch<types.QueryBankOptions, types.QueryBankResult>(
      options,
      extra
    ).then(result => {
      if (result.result_code === "FAIL") {
        throw new errors.BusinessError<types.QueryBankReturn>(result);
      }
      return result;
    });
  }
  /**
   * 获取RSA加密公钥
   */
  public async getPublicKey(options: types.GetPublicKeyOptions) {
    const extra = await this.createFetchOptions(GET_PUBLIC_URL, true);
    extra.mapAppId = "-";
    return fetch<types.GetPublicKeyOptions, types.GetPublicKeyResult>(
      options,
      extra
    ).then(result => {
      if (result.result_code === "FAIL") {
        throw new errors.BusinessError<types.GetPublicKeyReturn>(result);
      }
      return result;
    });
  }
}
