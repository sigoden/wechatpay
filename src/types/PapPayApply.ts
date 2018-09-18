/**
 * 申请代扣
 * @see {@link https://pay.weixin.qq.com/wiki/doc/api/pap.php?chapter=18_3&index=7}
 */

import { FailT, SuccessT } from "./Base";

export interface PapPayApplyOptions {
  /**
   * 商品描述
   * @description 商品或支付单简要描述
   * @example 水电代扣
   * @typedef String(32)
   */
  body: string;
  /**
   * 商品详情
   * @description 商品名称明细列表
   * @example
   * - 水电代扣：A
   * - 水电代扣：B
   * - 水电代扣：C
   * @typedef String(8192)
   */
  detail?: string;
  /**
   * 附加数据
   * @description 附加数据，在查询API和支付通知中原样返回，该字段主要用于商户携带订单的自定义数据
   * @example 自定义参数
   * @typedef String(128)
   */
  attach?: string;
  /**
   * 商户订单号
   * @description 商户系统内部的订单号,32个字符内、可包含字母, 其他说明见商户订单号
   * @example 1217752501201407033233368018
   * @typedef String(32)
   */
  out_trade_no: string;
  /**
   * 总金额
   * @description 订单总金额，单位为分，只能为整数，详见支付金额
   * @example 888
   * @typedef int
   */
  total_fee: number;
  /**
   * 货币类型
   * @description 符合ISO 4217标准的三位字母代码，默认人民币：CNY
   * @example CNY
   * @typedef String(16)
   */
  fee_type?: string;
  /**
   * 终端IP
   * @description 调用微信支付API的机器IP
   * @example 8.8.8.8
   * @typedef String(16)
   */
  spbill_create_ip: string;
  /**
   * 商品标记
   * @description 商品标记，代金券或立减优惠功能的参数，说明详见代金券或立减优惠
   * @example WXG
   * @typedef String(32)
   */
  goods_tag?: string;
  /**
   * 回调通知url
   * @description 接受扣款结果异步回调通知的url
   * @example http://yoursite.com/wxpay.html
   * @typedef String
   */
  notify_url: string;
  /**
   * 委托代扣协议id
   * @description 签约成功后，微信返回的委托代扣协议id
   * @example Wx15463511252015071056489715
   * @typedef String
   */
  contract_id: string;
  /**
   * 客户端 IP
   * @description 点分IP格式(客户端IP)
   * @example 119.145.83.6
   * @typedef String
   */
  clientip?: string;
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
   * @typedef String
   */
  outerid?: string;
  /**
   * 时间戳
   * @description 10位时间戳
   * @example 1239878956
   * @typedef Int
   */
  timestamp?: number;
}

export interface PapPayApplyResponseCommon {
  /**
   * 公众账号id
   * @description 微信支付分配的公众账号id
   * @example wxcbda96de0b165486
   * @typedef String(32)
   */
  appid: string;
  /**
   * 商户号
   * @description 微信支付分配的商户号
   * @example 10000098
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
   * @description 生成签名方式详见签名生成详见签名生成算法
   * @example C380BEC2BFD727A4B6845133519F3AD6
   * @typedef String(32)
   */
  sign: string;
}

export interface PapPayApplyResponseSuccess extends PapPayApplyResponseCommon {}
export interface PapPayApplyResponseFail extends PapPayApplyResponseCommon {}

export type PapPayApplySuccess = SuccessT<PapPayApplyResponseSuccess>;
export type PapPayApplyFail = FailT<PapPayApplyResponseFail>;
