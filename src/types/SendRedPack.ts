/**
 * 发放普通红包
 * @see {@link https://pay.weixin.qq.com/wiki/doc/api/tools/cash_coupon.php?chapter=13_4&index=3}
 */

import { FailT, SuccessT } from "./Base";

export interface SendRedPackOptions {
  /**
   * 商户订单号
   * @description 商户订单号（每个订单号必须唯一。取值范围：0~9，a~z，A~Z）。接口根据商户订单号支持重入，如出现超时可再调用。
   * @example 10000098201411111234567890
   * @typedef String(28)
   */
  mch_billno: string;
  /**
   * 商户名称
   * @description 红包发送者名称
   * @example 天虹百货
   * @typedef String(32)
   */
  send_name: string;
  /**
   * 用户openid
   * @description 接受红包的用户openid
   *   openid为用户在wxappid下的唯一标识（获取openid参见微信公众平台开发者文档：网页授权获取用户基本信息）
   * @example oxTWIuGaIt6gTKsQRLau2M0yL16E
   * @typedef String(32)
   */
  re_openid: string;
  /**
   * 付款金额
   * @description 付款金额，单位分
   * @example 1000
   * @typedef int
   */
  total_amount: number;
  /**
   * 红包发放总人数
   * @description 红包发放总人数              total_num=1
   * @example 1
   * @typedef int
   */
  total_num: number;
  /**
   * 红包祝福语
   * @example 感谢您参加猜灯谜活动，祝您元宵节快乐！
   * @typedef String(128)
   */
  wishing: string;
  /**
   * Ip地址
   * @description 调用接口的机器Ip地址
   * @example 192.168.0.1
   * @typedef String(15)
   */
  client_ip: string;
  /**
   * 活动名称
   * @example 猜灯谜抢红包活动
   * @typedef String(32)
   */
  act_name: string;
  /**
   * 备注
   * @description 备注信息
   * @example 猜越多得越多，快来抢！
   * @typedef String(256)
   */
  remark: string;
  /**
   * 场景id
   * @description 发放红包使用场景，红包金额大于200或者小于1元时必传
   * - PRODUCT_1:商品促销
   * - PRODUCT_2:抽奖
   * - PRODUCT_3:虚拟物品兑奖
   * - PRODUCT_4:企业内部福利
   * - PRODUCT_5:渠道分润
   * - PRODUCT_6:保险回馈
   * - PRODUCT_7:彩票派奖
   * - PRODUCT_8:税务刮奖
   * @example PRODUCT_8
   * @typedef String(32)
   */
  scene_id?: string;
  /**
   * 活动信息
   * @description
   * - posttime:用户操作的时间戳
   * - mobile:业务系统账号的手机号，国家代码-手机号。不需要+号
   * - deviceid :mac 地址或者设备唯一标识
   * - clientversion :用户操作的客户端版本
   *
   * 把值为非空的信息用key=value进行拼接，再进行urlencode。如 urlencode(posttime=xx& mobile =xx&deviceid=xx)
   * @example posttime%3d123123412%26clientversion%3d234134%26mobile%3d122344545%26deviceid%3dIOS
   * @typedef String(128)
   */
  risk_info?: string;
  /**
   * 资金授权商户号
   * @description 资金授权商户号 服务商替特约商户发放时使用
   * @example 1222000096
   * @typedef String(32)
   */
  consume_mch_id?: string;
}

export interface SendRedPackResponseCommon {}

export interface SendRedPackResponseFail extends SendRedPackResponseCommon {}

export interface SendRedPackResponseSuccess extends SendRedPackResponseCommon {
  /**
   * 商户订单号
   * @description 商户订单号（每个订单号必须唯一）  组成：mch_id+yyyymmdd+10位一天内不能重复的数字
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
   * 公众账号appid
   * @description 商户appid，接口传入的所有appid应该为公众号的appid（在mp.weixin.qq.com申请的），
   *   不能为APP的appid（在open.weixin.qq.com申请的）。
   * @example wx8888888888888888
   * @typedef String(32)
   */
  wxappid: string;
  /**
   * 用户openid
   * @description 接受收红包的用户  用户在wxappid下的openid
   * @example oxTWIuGaIt6gTKsQRLau2M0yL16E
   * @typedef String(32)
   */
  re_openid: string;
  /**
   * 付款金额
   * @description 付款金额，单位分
   * @example 1000
   * @typedef int
   */
  total_amount: number;
  /**
   * 微信单号
   * @description 红包订单的微信单号
   * @example 100000000020150520314766074200
   * @typedef String(32)
   */
  send_listid: string;
}

export type SendRedPackSuccess = SuccessT<SendRedPackResponseSuccess>;
export type SendRedPackFail = FailT<SendRedPackResponseFail>;
