import { FailT, SignType, SuccessT } from "./Base";

/**
 * 统一下单通用选项
 */
export interface UnifiedOrderOptionsBase {
  /**
   * 签名类型
   * @description 签名类型，默认为MD5，支持HMAC-SHA256和MD5。
   * @example MD5
   * @typedef String(32)
   */
  sign_type?: SignType;
  /**
   * 商品描述
   * @description 商品简单描述，该字段请按照规范传递，具体请见参数规定
   * @example 腾讯充值中心-QQ会员充值
   * @typedef String(128)
   */
  body: string;
  /**
   * 商品详情
   * @description 商品详细描述，对于使用单品优惠的商户，改字段必须按照规范上传，详见“单品优惠参数说明”
   * @typedef String(6000)
   */
  detail?: string;
  /**
   * 附加数据
   * @description 附加数据，在查询API和支付通知中原样返回，可作为自定义参数使用。
   * @example 深圳分店
   * @typedef String(127)
   */
  attach?: string;
  /**
   * 商户订单号
   * @description 商户系统内部订单号，要求32个字符内，只能是数字、大小写字母_-|* 且在同一个商户号下唯一。详见商户订单号
   * @example 20150806125346
   * @typedef String(32)
   */
  out_trade_no: string;
  /**
   * 标价币种
   * @description 符合ISO 4217标准的三位字母代码，默认人民币：CNY，详细列表请参见货币类型
   * @example CNY
   * @typedef String(16)
   */
  fee_type?: string;
  /**
   * 标价金额
   * @description 订单总金额，单位为分，详见支付金额
   * @example 88
   * @typedef Int
   */
  total_fee: number;
  /**
   * 终端IP
   * @description APP和网页支付提交用户端ip，Native支付填调用微信支付API的机器IP。
   * @example 123.12.12.123
   * @typedef String(16)
   */
  spbill_create_ip: string;
  /**
   * 交易起始时间
   * @description 订单生成时间，格式为yyyyMMddHHmmss，如2009年12月25日9点10分10秒表示为20091225091010。其他详见时间规则
   * @example 20091225091010
   * @typedef String(14)
   */
  time_start?: string;
  /**
   * 交易结束时间
   * @description 订单失效时间，格式为yyyyMMddHHmmss，如2009年12月27日9点10分10秒表示为20091227091010。
   *   订单失效时间是针对订单号而言的，由于在请求支付的时候有一个必传参数prepay_id只有两小时的有效期，
   *   所以在重入时间超过2小时的时候需要重新请求下单接口获取新的prepay_id。其他详见时间规则建议：最短失效时间间隔大于1分钟
   * @example 20091227091010
   * @typedef String(14)
   */
  time_expire?: string;
  /**
   * 订单优惠标记
   * @description 订单优惠标记，使用代金券或立减优惠功能时需要的参数，说明详见代金券或立减优惠
   * @example WXG
   * @typedef String(32)
   */
  goods_tag?: string;
  /**
   * 通知地址
   * @description 异步接收微信支付结果通知的回调地址，通知url必须为外网可访问的url，不能携带参数。
   * @example http://www.weixin.qq.com/wxpay/pay.php
   * @typedef String(256)
   */
  notify_url: string;
  /**
   * 指定支付方式
   * @description 上传此参数no_credit--可限制用户不能使用信用卡支付
   * @example no_credit
   * @typedef String(32)
   */
  limit_pay?: string;
}

/**
 * 统一下单选项，所有支付方式通用
 */
export interface UnifiedOrderOptionsGeneral extends UnifiedOrderOptionsBase {
  /**
   * 设备号
   * @description 自定义参数，可以为终端设备号(门店号或收银设备ID)，PC网页或公众号内支付可以传"WEB"
   * @example 013467007045764
   * @typedef String(32)
   */
  device_info?: string;
  /**
   * 交易类型
   * @description
   * - JSAPI 公众号支付
   * - NATIVE 扫码支付
   * - APP APP支付
   * @example JSAPI
   * @typedef String(16)
   */
  trade_type: string;
  /**
   * 商品ID
   * @description trade_type=NATIVE时（即扫码支付），此参数必传。此参数为二维码中包含的商品ID，商户自行定义。
   * @example 12235413214070356458058
   * @typedef String(32)
   */
  product_id?: string;
  /**
   * 用户标识
   * @description trade_type=JSAPI时（即公众号支付），此参数必传，此参数为微信用户在商户对应appid下的唯一标识。
   *   openid如何获取，可参考【获取openid】。企业号请使用【企业号OAuth2.0接口】获取企业号内成员userid，再调用【企业号userid转openid接口】进行转换
   * @example oUpF8uMuAJO_M2pxb1Q9zNjWeS6o
   * @typedef String(128)
   */
  openid?: string;
  /**
   * 场景信息
   * @description 该字段用于上报场景信息，目前支持上报实际门店信息。该字段为JSON对象数据
   * @example {"store_info" : {"id": "SZTX001","name": "腾大餐厅","area_code": "440305","address": "科技园中一路腾讯大厦" }}
   * @typedef String(256)
   */
  scene_info?: string;
}

/**
 * 统一下单选项，限公众号支付
 * @see {@link https://pay.weixin.qq.com/wiki/doc/api/jsapi.php?chapter=9_1}
 */
export interface UnifiedOrderOptionsPub extends UnifiedOrderOptionsBase {
  trade_type: "JSAPI";
  device_info: "WEB";
  /**
   * 用户标识
   * @description trade_type=JSAPI时（即公众号支付），此参数必传，此参数为微信用户在商户对应appid下的唯一标识。
   *   openid如何获取，可参考【获取openid】。企业号请使用【企业号OAuth2.0接口】获取企业号内成员userid，再调用【企业号userid转openid接口】进行转换
   * @example oUpF8uMuAJO_M2pxb1Q9zNjWeS6o
   * @typedef String(128)
   */
  openid: string;
  /**
   * 场景信息
   * @description 该字段用于上报场景信息，目前支持上报实际门店信息。该字段为JSON对象数据
   * @example {"store_info" : {"id": "SZTX001","name": "腾大餐厅","area_code": "440305","address": "科技园中一路腾讯大厦" }}
   * @typedef String(256)
   */
  scene_info?: string;
}

/**
 * 统一下单选项，限扫码支付
 * @see {@link https://pay.weixin.qq.com/wiki/doc/api/native.php?chapter=9_1}
 */
export interface UnifiedOrderOptionsPubQr extends UnifiedOrderOptionsBase {
  trade_type: "NATIVE";
  /**
   * 设备号
   * @description 自定义参数，可以为终端设备号(门店号或收银设备ID)，PC网页或公众号内支付可以传"WEB"
   * @example 013467007045764
   * @typedef String(32)
   */
  device_info?: string;
  /**
   * 商品ID
   * @description trade_type=NATIVE时（即扫码支付），此参数必传。此参数为二维码中包含的商品ID，商户自行定义。
   * @example 12235413214070356458058
   * @typedef String(32)
   */
  product_id: string;
  /**
   * 场景信息
   * @description 该字段用于上报场景信息，目前支持上报实际门店信息。该字段为JSON对象数据
   * @example {"store_info" : {"id": "SZTX001","name": "腾大餐厅","area_code": "440305","address": "科技园中一路腾讯大厦" }}
   * @typedef String(256)
   */
  scene_info?: string;
}

/**
 * 统一下单选项，限 APP 支付
 * @see {@link https://pay.weixin.qq.com/wiki/doc/api/app/app.php?chapter=9_1}
 */
export interface UnifiedOrderOptionsApp extends UnifiedOrderOptionsBase {
  trade_type: "APP";
  /**
   * 设备号
   * @description 自定义参数，可以为终端设备号(门店号或收银设备ID)，PC网页或公众号内支付可以传"WEB"
   * @example 013467007045764
   * @typedef String(32)
   */
  device_info?: string;
  /**
   * 商品ID
   * @description trade_type=NATIVE时（即扫码支付），此参数必传。此参数为二维码中包含的商品ID，商户自行定义。
   * @example 12235413214070356458058
   * @typedef String(32)
   */
  product_id: string;
  /**
   * 场景信息
   * @description 该字段用于上报场景信息，目前支持上报实际门店信息。该字段为JSON对象数据
   * @example {"store_info" : {"id": "SZTX001","name": "腾大餐厅","area_code": "440305","address": "科技园中一路腾讯大厦" }}
   * @typedef String(256)
   */
  scene_info?: string;
}

/**
 * 统一下单选项，限 H5 支付
 * @see {@link https://pay.weixin.qq.com/wiki/doc/api/H5.php?chapter=9_20&index=1}
 */
export interface UnifiedOrderOptionsWap extends UnifiedOrderOptionsBase {
  trade_type: "MWEB";
  device_info: "WEB";
  /**
   * 场景信息
   * @description 该字段用于上报场景信息，目前支持上报实际门店信息。该字段为JSON对象数据
   * @example
   * ```
   * //IOS移动应用
   * {"h5_info": {"type":"IOS","app_name": "王者荣耀","bundle_id": "com.tencent.wzryIOS"}}
   * //安卓移动应用
   * {"h5_info": {"type":"Android","app_name": "王者荣耀","package_name": "com.tencent.tmgp.sgame"}}
   * //WAP网站应用
   * {"h5_info": {"type":"Wap","wap_url": "https://pay.qq.com","wap_name": "腾讯充值"}}
   * ```
   * @typedef String(256)
   */
  scene_info: string;
}

/**
 * 统一下单选项，限小程序支付
 * @see {@link https://pay.weixin.qq.com/wiki/doc/api/wxa/wxa_api.php?chapter=9_1}
 */
export interface UnifiedOrderOptionsLite extends UnifiedOrderOptionsBase {
  trade_type: "JSAPI";
}

/**
 * 统一下单 `return_code` SUCCESS时返回
 * @see {@link https://pay.weixin.qq.com/wiki/doc/api/jsapi.php?chapter=9_1}
 */
export interface UnifiedOrderResponseCommon {
  /**
   * 公众账号ID
   * @description 调用接口提交的公众账号ID
   * @example wx8888888888888888
   * @typedef String(32)
   */
  appid: string;
  /**
   * 商户号
   * @description 调用接口提交的商户号
   * @example 1900000109
   * @typedef String(32)
   */
  mch_id: string;
  /**
   * 设备号
   * @description 自定义参数，可以为请求支付的终端设备号等
   * @example 013467007045764
   * @typedef String(32)
   */
  device_info?: string;
  /**
   * 随机字符串
   * @description 微信返回的随机字符串
   * @example 5K8264ILTKCH16CQ2502SI8ZNMTM67VS
   * @typedef String(32)
   */
  nonce_str: string;
  /**
   * 签名
   * @description 微信返回的签名值，详见签名算法
   * @example C380BEC2BFD727A4B6845133519F3AD6
   * @typedef String(32)
   */
  sign: string;
}

export interface UnifiedOrderResponseFail extends UnifiedOrderResponseCommon {}

export interface UnifiedOrderResponseSuccess extends UnifiedOrderResponseCommon {
  /**
   * 交易类型
   * @description
   * - JSAPI 公众号支付
   * - NATIVE 扫码支付
   * - APP APP支付
   * @example JSAPI
   * @typedef String(16)
   */
  trade_type: string;
  /**
   * 预支付交易会话标识
   * @description 微信生成的预支付会话标识，用于后续接口调用中使用，该值有效期为2小时
   * @example wx201410272009395522657a690389285100
   * @typedef String(64)
   */
  prepay_id: string;
  /**
   * 二维码链接
   * @description trade_type为NATIVE时有返回，用于生成二维码，展示给用户进行扫码支付
   * @example URl：weixin：//wxpay/s/An4baqw
   * @typedef String(64)
   */
  code_url?: string;
}

export type UnifiedOrderSuccess = SuccessT<UnifiedOrderResponseSuccess>;
export type UnifiedOrderFail = FailT<UnifiedOrderResponseFail>;
