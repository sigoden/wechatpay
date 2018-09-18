/**
 * 查询红包记录
 * @see {@link https://pay.weixin.qq.com/wiki/doc/api/tools/cash_coupon.php?chapter=13_6&index=5}
 */

import { FailT, SuccessT } from "./Base";

export interface GetHbInfoOptions {
  /**
   * 商户订单号
   * @description 商户发放红包的商户订单号
   * @example 10000098201411111234567890
   * @typedef String(28)
   */
  mch_billno: string;
}

export interface GetHbInfoResponseCommon {}

export interface GetHbInfoResponseFail extends GetHbInfoResponseCommon {}

export interface GetHbInfoResponseSuccess extends GetHbInfoResponseCommon {
  /**
   * 商户订单号
   * @description 商户使用查询API填写的商户单号的原路返回
   * @example 10000098201411111234567890
   * @typedef String(28)
   */
  mch_billno: string;
  /**
   * 商户号
   * @description 微信支付分配的商户号
   * @example 10000098
   * @typedef String(32)
   */
  mch_id: string;
  /**
   * 红包单号
   * @description 使用API发放现金红包时返回的红包单号
   * @example 1000000000201503283103439304
   * @typedef String(32)
   */
  detail_id: string;
  /**
   * 红包状态
   * @description
   * - SENDING:发放中
   * - SENT:已发放待领取
   * - FAILED：发放失败
   * - RECEIVED:已领取
   * - RFUND_ING:退款中
   * - REFUND:已退款
   * @example RECEIVED
   * @typedef string(16)
   */
  status: string;
  /**
   * 发放类型
   * @description
   * - API:通过API接口发放
   * - UPLOAD:通过上传文件方式发放
   * - ACTIVITY:通过活动方式发放
   * @example API
   * @typedef String(32)
   */
  send_type: string;
  /**
   * 红包类型
   * @description
   * - GROUP:裂变红包
   * - NORMAL:普通红包
   * @example GROUP
   * @typedef String(32)
   */
  hb_type: string;
  /**
   * 红包个数
   * @example 1
   * @typedef int
   */
  total_num: number;
  /**
   * 红包金额
   * @description 红包总金额（单位分）
   * @example 5000
   * @typedef int
   */
  total_amount: number;
  /**
   * 失败原因
   * @description 发送失败原因
   * @example 余额不足
   * @typedef String(32)
   */
  reason?: string;
  /**
   * 红包发送时间
   * @example 2015-04-21 20:00:00
   * @typedef String(32)
   */
  send_time: string;
  /**
   * 红包退款时间
   * @description 红包的退款时间（如果其未领取的退款）
   * @example 2015-04-21 23:03:00
   * @typedef String(32)
   */
  refund_time?: string;
  /**
   * 红包退款金额
   * @example 8000
   * @typedef Int
   */
  refund_amount?: number;
  /**
   * 祝福语
   * @example 新年快乐
   * @typedef String(128)
   */
  wishing?: string;
  /**
   * 活动描述
   * @description 活动描述，低版本微信可见
   * @example 新年红包
   * @typedef String(256)
   */
  remark?: string;
  /**
   * 活动名称
   * @description 发红包的活动名称
   * @example 新年红包
   * @typedef String(32)
   */
  act_name?: string;
  /**
   * 裂变红包领取列表
   * @description 裂变红包的领取列表
   * @example 内容如下表
   * @typedef
   */
  hblist?: string;
  /**
   * 领取红包的Openid
   * @description 领取红包的openid
   * @example ohO4GtzOAAYMp2yapORH3dQB3W18
   * @typedef String(32)
   */
  openid: string;
  /**
   * 金额
   * @description 领取金额
   * @example 100
   * @typedef int
   */
  amount: number;
  /**
   * 接收时间
   * @description 领取红包的时间
   * @example 2015-04-21 20:00:00
   * @typedef String(32)
   */
  rcv_time: string;
}

export type GetHbInfoSuccess = SuccessT<GetHbInfoResponseSuccess>;
export type GetHbInfoFail = FailT<GetHbInfoResponseFail>;
