import * as types from "types";
import { fetch, nonceStr } from "utils";

const GET_SIGN_KEY_BASE = "/pay/getsignkey";

/**
 * 基类
 */
class Base {
  set debug(debugMode: boolean) {
    this._debug = debugMode;
  }

  /**
   * 公众账号ID
   */
  public readonly appId: string;
  /**
   * 商户号
   */
  public readonly mchId: string;
  /**
   * 密钥
   */
  public readonly key: string;
  /**
   * 证书
   */
  public readonly pfx: Buffer;
  /**
   * 测试用验签密钥
   */
  public keyForDebug: string;
  /**
   * 仿真模式开关
   */
  public _debug: boolean = false;

  constructor(options: types.PayerOptions) {
    const { appId, mchId, key, pfx } = options;
    this.appId = appId;
    this.mchId = mchId;
    this.key = key;
    this.pfx = pfx;
  }

  /**
   * 生成 FetchOptions 数据
   */
  protected async createFetchOptions(url: string, usePfx: boolean = false) {
    const key = await this.getKey();
    const ret: types.FetchOptions = {
      appid: this.appId,
      mch_id: this.mchId,
      key,
      url,
      nonce_str: nonceStr()
    };
    if (usePfx) {
      ret.pfx = this.pfx;
    }
    return ret;
  }

  /**
   * 拼接路径
   */
  protected completeURL(base: string) {
    if (this._debug) {
      return types.URL_SANBOX + base;
    }
    return types.URL_MCH + base;
  }

  /**
   * 获取私钥
   */
  protected async getKey() {
    return this._debug ? await this.getDebugKey() : this.key;
  }

  /**
   * 获取仿真系统 API 验签密钥
   * @see {@link https://pay.weixin.qq.com/wiki/doc/api/jsapi.php?chapter=23_1}
   */
  private async getDebugKey() {
    if (this.keyForDebug) {
      return this.keyForDebug;
    }
    const url = types.URL_MCH + GET_SIGN_KEY_BASE;
    const extra: types.FetchOptions = {
      appid: this.appId,
      mch_id: this.mchId,
      key: this.key,
      url,
      nonce_str: nonceStr(),
      mapAppId: "-"
    };

    return fetch<types.GetSignKeyOptions, types.GetSignKeyResult>(
      {},
      extra
    ).then(result => {
      return result.sandbox_signkey;
    });
  }
}

export default Base;
