/**
 * 查询企业付款到零钱
 * @see {@link https://pay.weixin.qq.com/wiki/doc/api/tools/mch_pay.php?chapter=14_3}
 */
import { FailT, SuccessT } from "./Base";

export interface GetTransferInfoOptions {
  /**
   * 商户订单号
   * @description 商户调用企业付款API时使用的商户订单号
   * @example 10000098201411111234567890
   * @typedef String(28)
   */
  partner_trade_no: string;
}

interface GetTransferInfoResponseCommon {}

interface GetTransferInfoResponseFail extends GetTransferInfoResponseCommon {}

interface GetTransferInfoResponseSuccess extends GetTransferInfoResponseCommon {
  /**
   * 商户单号
   * @description 商户使用查询API填写的单号的原路返回.
   * @example 10000098201411111234567890
   * @typedef String(28)
   */
  partner_trade_no: string;
  /**
   * 商户号
   * @description 微信支付分配的商户号
   * @example 10000098
   * @typedef String(32)
   */
  mch_id: string;
  /**
   * 付款单号
   * @description 调用企业付款API时，微信系统内部产生的单号
   * @example 1000000000201503283103439304
   * @typedef String(32)
   */
  detail_id: string;
  /**
   * 转账状态
   * @description SUCCESS:转账成功 FAILED:转账失败 PROCESSING:处理中
   * @example SUCCESS
   * @typedef string(16)
   */
  status: string;
  /**
   * 失败原因
   * @description 如果失败则有失败原因
   * @example 余额不足
   * @typedef String
   */
  reason?: string;
  /**
   * 收款用户openid
   * @description 转账的openid
   * @example oxTWIuGaIt6gTKsQRLau2M0yL16E
   */
  openid: string;
  /**
   * 收款用户姓名
   * @example 马华
   * @typedef String
   */
  transfer_name?: string;
  /**
   * 付款金额
   * @description 付款金额单位分）
   * @example 5000
   * @typedef int
   */
  payment_amount: number;
  /**
   * 转账时间
   * @description 发起转账的时间
   * @example 2015-04-21 20:00:00
   * @typedef String
   */
  transfer_time: string;
  /**
   * 付款描述
   * @description 付款时候的描述
   * @example 车险理赔
   * @typedef String
   */
  desc: string;
}

export type GetTransferInfoSuccess = SuccessT<GetTransferInfoResponseSuccess>;
export type GetTransferInfoFail = FailT<GetTransferInfoResponseFail>;
