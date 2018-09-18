/**
 * 拉取订单评价数据
 * @see {@link https://pay.weixin.qq.com/wiki/doc/api/micropay.php?chapter=9_17&index=12}
 */

import { FailT, SignType, SuccessT } from "./Base";

export interface BatchQueryCommentOptions {
  /**
   * 签名类型
   * @description 签名类型，目前仅支持`HMAC-SHA256`，默认就是`HMAC-SHA256`
   * @example HMAC-SHA256
   * @typedef String(32)
   */
  sign_type?: SignType;
  /**
   * 开始时间
   * @description 按用户评论时间批量拉取的起始时间，格式为yyyyMMddHHmmss
   * @example 20170724000000
   * @typedef String(19)
   */
  begin_time?: string;
  /**
   * 结束时间
   * @description 按用户评论时间批量拉取的结束时间，格式为yyyyMMddHHmmss
   * @example 20170725000000
   * @typedef String(19)
   */
  end_time?: string;
  /**
   * 位移
   * @description 指定从某条记录的下一条开始返回记录。接口调用成功时，会返回本次查询最后一条数据的offset。 商户需要翻页时，
   *   应该把本次调用返回的offset作为下次调用的入参。注意offset是评论数据在微信支付后台保存的索引，未必是连续的
   * @example 0
   * @typedef uint(64)
   */
  offset?: number;
  /**
   * 条数
   * @description 一次拉取的条数, 最大值是200，默认是200
   * @example 100
   * @typedef uint(32)
   */
  limit?: number;
}

export interface BatchQueryCommentResponseCommon {}

export interface BatchQueryCommentResponseFail
  extends BatchQueryCommentResponseCommon {}

export interface BatchQueryCommentResponseSuccess
  extends BatchQueryCommentResponseCommon {}

export type BatchQueryCommentSuccess = SuccessT<
  BatchQueryCommentResponseSuccess
>;
export type BatchQueryCommentFail = FailT<BatchQueryCommentResponseFail>;
