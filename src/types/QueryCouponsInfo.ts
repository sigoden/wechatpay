import { BaseReturn, BusinessReturn, SignType } from "./Base";

/**
 * 查询代金券信息选项
 * @see {@link https://pay.weixin.qq.com/wiki/doc/api/tools/sp_coupon.php?chapter=12_5&index=6}
 */
export interface QueryCouponsInfoOptions {
  /**
   * 代金券id
   * @example 1565
   * @typedef String
   */
  coupon_id: string;
  /**
   * 用户openid
   * @description Openid信息，用户在appid下的openid。
   * @example onqOjjrXT-776SpHnfexGm1_P7iE
   * @typedef String
   */
  openid: string;
  /**
   * 批次号
   * @description 代金劵对应的批次号
   * @example 58818
   * @typedef String(32)
   */
  stock_id: string;
  /**
   * 操作员
   * @description 操作员帐号, 默认为商户号。可在商户平台配置操作员对应的api权限
   * @example 10000098
   * @typedef String(32)
   */
  op_user_id?: string;
  /**
   * 设备号
   * @description 微信支付分配的终端设备号
   * @typedef String(32)
   */
  device_info?: string;
  /**
   * 协议版本
   * @description 默认1.0
   * @example 1.0
   * @typedef String(32)
   */
  version?: string;
  /**
   * 协议类型
   * @description XML【目前仅支持默认XML】
   * @example XML
   * @typedef String(32)
   */
  type?: string;
}

/**
 * 查询代金券信息 `return_code` SUCCESS时返回
 * @see {@link https://pay.weixin.qq.com/wiki/doc/api/tools/sp_coupon.php?chapter=12_5&index=6}
 */
export interface QueryCouponsInfoReturn extends BaseReturn, BusinessReturn {
  /**
   * 公众账号ID
   * @description 微信为发券方商户分配的公众账号ID，接口传入的所有appid应该为公众号的appid（在mp.weixin.qq.com申请的），不能为APP的appid（在open.weixin.qq.com申请的）。
   * @example wx5edab3bdfba3dc1c
   * @typedef String(32)
   */
  appid: string;
  /**
   * 商户号
   * @description 微信为发券方商户分配的商户号
   * @example 10000098
   * @typedef String(32)
   */
  mch_id: string;
  /**
   * 子商户号
   * @description 微信支付分配的子商户号，受理模式下必填
   * @example 10000098
   * @typedef String(32)
   */
  sub_mch_id?: string;
  /**
   * 设备号
   * @description 微信支付分配的终端设备号，
   * @example 123456sb
   * @typedef String(32)
   */
  device_info?: string;
  /**
   * 随机字符串
   * @description 随机字符串，不长于32位
   * @example 1417574675
   * @typedef String(32)
   */
  nonce_str: string;
  /**
   * 签名
   * @description 签名，详见签名生成算法
   * @example 841B3002FE2220C87A2D08ABD8A8F791
   * @typedef String(32)
   */
  sign: string;
}

/**
 * 查询代金券信息  `return_code` 和 `result_code` 均为 SUCCESS 时返回
 * @see {@link https://pay.weixin.qq.com/wiki/doc/api/tools/sp_coupon.php?chapter=12_5&index=6}
 */
export interface QueryCouponsInfoReturnSuccess extends QueryCouponsInfoReturn {
  /**
   * 批次ID
   * @description 代金券批次Id
   * @example 1567
   * @typedef String
   */
  coupon_stock_id: string;
  /**
   * 代金券id
   * @example 4242
   * @typedef String
   */
  coupon_id: string;
  /**
   * 代金券面额
   * @description 代金券面值,单位是分
   * @example 4
   * @typedef Unsinged    int
   */
  coupon_value: number;
  /**
   * 代金券使用门槛
   * @description 代金券使用最低限额,单位是分
   * @example 10
   * @typedef Unsinged    int
   */
  coupon_mininum: number;
  /**
   * 代金券名称
   * @example 测试代金券
   * @typedef String
   */
  coupon_name: string;
  /**
   * 代金券状态
   * @description 代金券状态：SENDED-可用，USED-已实扣，EXPIRED-已过期
   * @example SENDED
   * @typedef String
   */
  coupon_state: string;
  /**
   * 代金券描述
   * @example 微信支付-代金券
   * @typedef String
   */
  coupon_desc: string;
  /**
   * 实际优惠金额
   * @description 代金券实际使用金额
   * @example 0
   * @typedef Unsinged    int
   */
  coupon_use_value: number;
  /**
   * 优惠剩余可用额
   * @description 代金券剩余金额：部分使用情况下，可能会存在券剩余金额
   * @example 4
   * @typedef Unsinged    int
   */
  coupon_remain_value: number;
  /**
   * 发放来源
   * @description 代金券发放来源：FULL_SEND-满送 NORMAL-普通发放场景
   * @example FULL_SEND
   * @typedef String
   */
  send_source: string;
  /**
   * 是否允许部分使用
   * @description 该代金券是否允许部分使用标识：1-表示支持部分使用
   * @example 1
   * @typedef String
   */
  is_partial_use?: string;
}

/**
 * 查询代金券信息返回值
 */
export type QueryCouponsInfoResult =
  | QueryCouponsInfoReturn
  | QueryCouponsInfoReturnSuccess;
