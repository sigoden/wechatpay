export interface EntrustCommon {
  /**
   * 模板id
   * @description 协议模板id
   * @example 123
   * @typedef String
   */
  plan_id: string;
  /**
   * 签约协议号
   * @example 100001256
   * @typedef String
   */
  contract_code: string;
  /**
   * 请求序列号
   * @description 商户请求签约时的序列号，商户侧须唯一
   * @example 1695
   * @typedef Int(64)
   */
  request_serial: number;
  /**
   * 用户账户展示名称
   * @description 签约用户的名称，用于页面展示
   * @example 123
   * @typedef String
   */
  contract_display_account: string;
  /**
   * 回调通知url
   * @description 回调通知的url,传输需要url encode
   * @example http://yoursite.com
   * @typedef String
   */
  notify_url: string;
  /**
   * 设备ID
   * @description android填imei的一次md5; ios填idfa的一次md5
   * @example baf04e6bbbd06f7b1a197d18ed53b7f1
   * @typedef String
   */
  deviceid?: string;
  /**
   * 手机号
   * @description 用户手机号
   * @example 18933432355
   * @typedef String
   */
  mobile?: string;
  /**
   * 邮箱地址
   * @description 用户邮箱地址
   * @example aobama@whitehouse.com
   * @typedef String
   */
  email?: string;
  /**
   * QQ号
   * @description 用户QQ号
   * @example 100243
   * @typedef String
   */
  qq?: string;
  /**
   * 微信open ID
   * @description 用户微信open ID
   * @example baf04e6bbbd06f7b1a197d18ed53b7f1
   * @typedef String
   */
  openid?: string;
  /**
   * 身份证号
   * @description 用户身份证号
   * @example 110102199701011000
   * @typedef String
   */
  creid?: string;
  /**
   * 商户侧用户标识
   * @description 用户在商户侧的标识
   * @example user123
   * @typedef String
   */
  outerid?: string;
}

/**
 * H5纯签约
 * @see {@link https://pay.weixin.qq.com/wiki/doc/api/pap.php?chapter=18_16&index=3}
 */
export interface EntrustWapOptions extends EntrustCommon {
  /**
   * 客户端 IP
   * @description 用户客户端的真实IP地址
   * @example 119.145.83.6
   * @typedef String
   */
  clientip: string;
  /**
   * 回调应用appid
   * @description 当指定该字段时，且商户模版标注商户具有指定返回app的权限时，签约成功将返回return_appid指定的app应用，
   *   如果不填且签约发起时的浏览器UA可被微信识别，则跳转到浏览器，否则留在微信
   * @example wxcbda96de0b165486
   * @typedef String(32)
   */
  return_appid?: string;
}

/**
 * APP纯签约
 * @see {@link https://pay.weixin.qq.com/wiki/doc/api/pap.php?chapter=18_1&index=1}
 */
export interface EntrustAppOptions extends EntrustCommon {
  /**
   * 客户端 IP
   * @description 用户客户端的真实IP地址
   * @example 119.145.83.6
   * @typedef String
   */
  clientip?: string;
  /**
   * 返回app
   * @description 1表示返回app, 0 或不填则不返回 注：签约参数appid必须为发起APP的注册appid
   * @example 1
   * @typedef int
   */
  return_app?: string;
}

/**
 * 公众号纯签约
 * @see {@link https://pay.weixin.qq.com/wiki/doc/api/pap.php?chapter=18_1&index=1}
 */
export interface EntrustPubOptions extends EntrustCommon {
  /**
   * 客户端 IP
   * @description 用户客户端的真实IP地址
   * @example 119.145.83.6
   * @typedef String
   */
  clientip?: string;
  /**
   * 返回web
   * @description 表示返回签约页面的referrer url, 0 或不填或获取不到referrer则不返回; 跳转referrer url时会自动带上参数from_wxpay=1
   * @example 1
   * @typedef int
   */
  return_web?: string;
}

/**
 * 小程序签约
 * @see {@link https://pay.weixin.qq.com/wiki/doc/api/pap.php?chapter=18_14&index=2}
 */
export interface EntrustLiteOptions extends EntrustCommon {
  /**
   * 客户端 IP
   * @description 用户客户端的真实IP地址
   * @example 119.145.83.6
   * @typedef String
   */
  clientip?: string;
}
