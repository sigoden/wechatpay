/**
 * 支付中签约
 * @see {@link https://pay.weixin.qq.com/wiki/doc/api/pap.php?chapter=18_13&index=4}
 */

import { FailT, SuccessT } from "./Base";

export interface ContractOrderOptions {
  /**
   * 签约商户号
   * @description 签约商户号，必须与mch_id一致
   * @example 1200009811
   * @typedef String(32)
   */
  contract_mchid: string;
  /**
   * 签约appid
   * @description 签约公众号，必须与appid一致
   * @example wxcbda96de0b165486
   * @typedef String(32)
   */
  contract_appid: string;
  /**
   * 商户订单号
   * @description 商户系统内部的订单号,32个字符内、可包含字母, 其他说明见商户订单号
   * @example 123456
   * @typedef String(32)
   */
  out_trade_no: string;
  /**
   * 设备号
   * @description 终端设备号(门店号或收银设备ID)，注意：PC网页或公众号内支付请传"WEB"
   * @example 013467007045764
   * @typedef String(32)
   */
  device_info?: string;
  /**
   * 商品描述
   * @description 商品或支付单简要描述
   * @example Ipad mini  16G  白色
   * @typedef String(128)
   */
  body: string;
  /**
   * 商品详情
   * @description 商品名称明细列表
   * @example Ipad mini  16G  白色
   * @typedef String(8192)
   */
  detail?: string;
  /**
   * 附加数据
   * @description 附加数据,在查询API和支付通知中原样返回,该字段主要用于商户携带订单的自定义数据
   * @example 深圳分店
   * @typedef String(127)
   */
  attach?: string;
  /**
   * 回调通知ur
   * @description 回调通知的url
   * @example http://yoursite.com
   * @typedef String(32)
   */
  notify_url: string;
  /**
   * 总金额
   * @description 订单总金额，单位为分
   * @example 888
   * @typedef Int
   */
  total_fee: number;
  /**
   * 终端IP
   * @description APP和网页支付提交用户端ip,Native支付填调用微信支付API的机器IP.
   * @example 123.12.12.123
   * @typedef String(16)
   */
  spbill_create_ip: string;
  /**
   * 交易起始时间
   * @description 订单生成时间,格式为yyyyMMddHHmmss,如2009年12月25日9点10分10秒表示为20091225091010. 其他详见时间规则
   * @example 20091225091010
   * @typedef String(14)
   */
  time_start?: string;
  /**
   * 交易结束时间
   * @description 订单失效时间,格式为yyyyMMddHHmmss,如2009年12月27日9点10分10秒表示为20091227091010. 其他详见时间规则 注意：最短失效时间间隔必须大于5分钟
   * @example 20091227091010
   * @typedef String(14)
   */
  time_expire?: string;
  /**
   * 商品标记
   * @description 商品标记,代金券或立减优惠功能的参数
   * @example WXG
   * @typedef String(32)
   */
  goods_tag?: string;
  /**
   * 交易类型
   * @description 取值如下：JSAPI,NATIVE,APP,MWEB
   * @example JSAPI
   * @typedef String(16)
   */
  trade_type: string;
  /**
   * 商品ID
   * @description trade_type=NATIVE,此参数必传. 此id为二维码中包含的商品ID,商户自行定义.
   * @example 12235413214070356458058
   * @typedef String(32)
   */
  product_id?: string;
  /**
   * 指定支付方式
   * @description no_credit--指定不能使用信用卡支付
   * @example no_credit
   * @typedef String(32)
   */
  limit_pay?: string;
  /**
   * 用户标识
   * @description trade_type=JSAPI,此参数必传，用户在商户appid下的唯一标识.
   * @example oUpF8uMuAJO_M2pxb1Q9zNjWeS6o
   * @typedef String(128)
   */
  openid?: string;
  /**
   * 模板id
   * @description 协议模板id
   * @example 123
   * @typedef int
   */
  plan_id: number;
  /**
   * 签约协议号
   * @example 100001256
   * @typedef String(32)
   */
  contract_code: string;
  /**
   * 请求序列号
   * @description 商户请求签约时的序列号,商户侧须唯一
   * @example 1695
   * @typedef Uint64
   */
  request_serial: number;
  /**
   * 用户账户展示名称
   * @description 签约用户的名称,用于页面展示，参数值不支持UTF8非3字节编码的字符，例如表情符号，所以请勿传微信昵称到该字段
   * @example 123
   * @typedef String
   */
  contract_display_account: string;
  /**
   * 签约信息通知url
   * @description 签约信息回调通知的url
   * @example http://yoursite.com
   * @typedef String
   */
  contract_notify_url: string;
}

interface ContractOrderResponseCommon {
  /**
   * 请求appid
   * @description appid是商户在微信申请公众号或移动应用成功后分配的帐号ID，登录平台为mp.weixin.qq.com或open.weixin.qq.com
   * @example wxcbda96de0b165486
   * @typedef String(32)
   */
  appid: string;
  /**
   * 商户号
   * @description 商户号是商户在微信申请微信支付成功后分配的帐号ID，登录平台为pay.weixin.qq.com
   * @example 1200009811
   * @typedef String(32)
   */
  mch_id: string;
  /**
   * 随机字符串
   * @description 随机字符串,不长于32位.
   * @example 5K8264ILTKCH16CQ2502SI8ZNMTM67VS
   * @typedef String(32)
   */
  nonce_str: string;
  /**
   * 签名
   * @description 签名规则详见签名生成算法 注：所有参数都是encode前做签名.
   * @example E1EE61A91C8E90F299DE6AE075D60A2D
   * @typedef String(32)
   */
  sign: string;
  /**
   * 预签约结果
   * @example SUCCESS
   * @typedef String
   */
  contract_result_code: string;
  /**
   * 预签约错误代码
   * @example Fail
   * @typedef String
   */
  contract_err_code?: string;
  /**
   * 预签约错误描述
   * @example 已签约
   * @typedef String
   */
  contract_err_code_des?: string;
}

interface ContractOrderResponseFail extends ContractOrderResponseCommon {}

interface ContractOrderResponseSuccess extends ContractOrderResponseCommon {
  /**
   * 预支付交易会话标识
   * @description 微信生成的预支付回话标识,用于后续接口调用中使用,该值有效期为2小时.
   * @example wx201410272009395522657a690389285100
   * @typedef String(64)
   */
  prepay_id: string;
  /**
   * 交易类型
   * @description 调用接口提交的交易类型，取值如下：JSAPI,NATIVE,APP
   * @example JSAPI
   * @typedef String(16)
   */
  trade_type: string;
  /**
   * 二维码链接
   * @description trade_type为NATIVE是有返回,可将该参数值生成二维码展示出来进行扫码支付
   * @example weixin：//wxpay/s/An4baqw
   * @typedef String(64)
   */
  code_url?: string;
  /**
   * 模板id
   * @description 商户在微信商户平台设置的代扣协议模板id
   * @example 123
   * @typedef Int
   */
  plan_id?: number;
  /**
   * 请求序列号
   * @description 商户请求签约时的序列号,商户侧须唯一
   * @example 1695
   * @typedef Uint64
   */
  request_serial?: number;
  /**
   * 签约协议号
   * @description 商户请求签约时传入的签约协议号,商户侧须唯一
   * @example 1023658866
   * @typedef String
   */
  contract_code?: string;
  /**
   * 用户账户展示名称
   * @description 签约用户的名称,用于页面展示
   * @example 张三
   * @typedef String
   */
  contract_display_account?: string;
  /**
   * 支付跳转链接
   * @description mweb_url为拉起微信支付收银台的中间页面，可通过访问该url来拉起微信客户端，完成支付,mweb_url的有效期为5分钟。
   * @example
   * https://wx.tenpay.com/cgi-bin/mmpayweb-bin/checkmweb
   * ?prepay_id=wx2016121516420242444321ca0631331346&package=1405458241
   * @typedef String(64)
   */
  mweb_url?: string;
  /**
   * 商户订单号
   * @example 123456
   * @typedef String(32)
   */
  out_trade_no: string;
}

export type ContractOrderSuccess = SuccessT<ContractOrderResponseSuccess>;
export type ContractOrderFail = FailT<ContractOrderResponseFail>;
