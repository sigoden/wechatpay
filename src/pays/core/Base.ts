import { fetch } from "../../fetch";
import * as types from "../../types";
import { nonceStr, sign } from "../../utils";

const GET_SIGN_KEY_BASE = "/pay/getsignkey";

const URL_MCH = "https://api.mch.weixin.qq.com";
const URL_SANBOX = URL_MCH + "/sandboxnew";

/**
 * 基类
 */
class Base {
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
  public debug: boolean = false;

  constructor(options: types.ConstructorOptions) {
    const { appId, mchId, key, pfx } = options;
    this.appId = appId;
    this.mchId = mchId;
    this.key = key;
    this.pfx = pfx;
  }

  /**
   * 仿真模式开关
   * @see {@link https://pay.weixin.qq.com/wiki/doc/api/jsapi.php?chapter=23_1}
   */
  public async setDebug(useDebug: boolean) {
    if (useDebug && !this.keyForDebug) {
      const url = URL_SANBOX + GET_SIGN_KEY_BASE;
      const extra: types.FetchOptions = {
        appid: this.appId,
        mch_id: this.mchId,
        key: this.key,
        url,
        nonce_str: nonceStr(),
        mapAppId: "-"
      };

      return fetch<
        types.GetSignKeyOptions,
        types.GetSignKeySuccess,
        types.GetSignKeyFail
      >({}, extra).then(result => {
        this.keyForDebug = result.sandbox_signkey;
        this.debug = useDebug;
      });
    }
    this.debug = useDebug;
  }

  /**
   * 校验 sign
   */
  public verifySign(
    data: { sign: string },
    signType = types.SignType.MD5
  ): boolean {
    const signData = sign(signType, data, this.getKey());
    return signData === data.sign;
  }

  /**
   * 生成 FetchOptions 数据
   */
  protected async createFetchOptions(url: string, usePfx: boolean = false) {
    const key = this.getKey();
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
    if (this.debug) {
      return URL_SANBOX + base;
    }
    return URL_MCH + base;
  }

  /**
   * 获取私钥
   */
  protected getKey() {
    return this.debug ? this.keyForDebug : this.key;
  }
}

export default Base;
