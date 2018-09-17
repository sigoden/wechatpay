import { BaseReturn, BusinessReturn, SignType } from "./Base";

/**
 * 转换短链接选项
 * @see {@link https://pay.weixin.qq.com/wiki/doc/api/micropay.php?chapter=9_9&index=9}
 */
export interface ShortURLOptions {
  /**
   * URL链接
   * @description 需要转换的URL，签名用原串，传输需URLencode
   * @example
   * weixin：//wxpay/bizpayurl?sign=XXXXX&appid=XXXXX&mch_id=XXXXX&product_id=XXXXXX&time_stamp=XXXXXX&nonce_str=XXXXX
   * @typedef String(512、
   */
  long_url: string;
  /**
   * 签名类型
   * @description 签名类型，目前支持HMAC-SHA256和MD5，默认为MD5
   * @example HMAC-SHA256
   * @typedef String(32)
   */
  sign_type?: SignType;
}

/**
 * 转换短链接 `return_code` SUCCESS时返回
 * @see {@link https://pay.weixin.qq.com/wiki/doc/api/micropay.php?chapter=9_9&index=9}
 */
export interface ShortURLReturn extends BaseReturn, BusinessReturn {
  /**
   * 公众账号ID
   * @description 微信分配的公众账号ID
   * @example wx8888888888888888
   * @typedef String(32)
   */
  appid: string;
  /**
   * 商户号
   * @description 微信支付分配的商户号
   * @example 1900000109
   * @typedef String(32)
   */
  mch_id: string;
  /**
   * 随机字符串
   * @description 随机字符串，不长于32位。推荐随机数生成算法
   * @example 5K8264ILTKCH16CQ2502SI8ZNMTM67VS
   * @typedef String(32)
   */
  nonce_str: string;
  /**
   * 签名
   * @description 签名，详见签名生成算法
   * @example C380BEC2BFD727A4B6845133519F3AD6
   * @typedef String(32)
   */
  sign: string;
  /**
   * URL链接
   * @description 转换后的URL
   * @example weixin：//wxpay/s/XXXXXX
   * @typedef String(64)
   */
  short_url: string;
}

/**
 * 提交刷卡支付返回值
 */
export type ShortURLResult = ShortURLReturn;
