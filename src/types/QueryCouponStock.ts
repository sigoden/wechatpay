/**
 * 查询代金券批次
 * @see {@link https://pay.weixin.qq.com/wiki/doc/api/tools/sp_coupon.php?chapter=12_4&index=5}
 */

import { FailT, SuccessT } from "./Base";

export interface QueryCouponStockOptions {
  /**
   * 代金券批次id
   * @example 1757
   * @typedef String
   */
  coupon_stock_id: string;
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

interface QueryCouponStockResponseCommon {
  /**
   * 公众账号ID
   * @description 微信为发券方商户分配的公众账号ID，接口传入的所有appid应该为公众号的appid（在mp.weixin.qq.com申请的），
   *   不能为APP的appid（在open.weixin.qq.com申请的）。
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

interface QueryCouponStockResponseFail extends QueryCouponStockResponseCommon {}

interface QueryCouponStockResponseSuccess
  extends QueryCouponStockResponseCommon {
  /**
   * 代金券批次ID
   * @description 代金券批次Id
   * @example 1757
   * @typedef String
   */
  coupon_stock_id: string;
  /**
   * 代金券名称
   * @example 测试代金券
   * @typedef String
   */
  coupon_name?: string;
  /**
   * 代金券面额
   * @description 代金券面值,单位是分
   * @example 5
   * @typedef Unsinged    int
   */
  coupon_value: number;
  /**
   * 代金券使用最低限额
   * @description 代金券使用最低限额,单位是分
   * @example 10
   * @typedef Unsinged    int
   */
  coupon_mininumn?: number;
  /**
   * 代金券批次状态
   * @description 批次状态： 1-未激活；2-审批中；4-已激活；8-已作废；16-中止发放；
   * @example 4
   * @typedef int
   */
  coupon_stock_status: number;
  /**
   * 代金券数量
   * @example 100
   * @typedef UnsignedInt
   */
  coupon_total: number;
  /**
   * 代金券最大领取数量
   * @description 代金券每个人最多能领取的数量, 如果为0，则表示没有限制
   * @example 1
   * @typedef UnsignedInt
   */
  max_quota?: number;
  /**
   * 代金券已经发送的数量
   * @example 0
   * @typedef UnsignedInt
   */
  is_send_num?: number;
  /**
   * 生效开始时间
   * @description 格式为时间戳
   * @example 1943787483
   * @typedef String
   */
  begin_time: string;
  /**
   * 生效结束时间
   * @description 格式为时间戳
   * @example 1943787490
   * @typedef String
   */
  end_time: string;
  /**
   * 创建时间
   * @description 格式为时间戳
   * @example 1943787420
   * @typedef String
   */
  create_time: string;
  /**
   * 代金券预算额度
   * @example 500
   * @typedef UnsignedInt
   */
  coupon_budget?: number;
}

export type QueryCouponStockSuccess = SuccessT<QueryCouponStockResponseSuccess>;
export type QueryCouponStockFail = FailT<QueryCouponStockResponseFail>;
