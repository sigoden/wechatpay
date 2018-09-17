/**
 * 基础返回数据
 */
export interface BaseReturn {
  /**
   * 返回状态码
   * @description SUCCESS/FAIL 此字段是通信标识，非交易标识，交易是否成功需要查看trade_state来判断
   * @example SUCCESS
   * @typedef String(16)
   */
  return_code: string;
  /**
   * 返回信息
   * @description 当return_code为FAIL时返回信息为错误原因 ，例如 签名失败 参数格式校验错误
   * @example OK
   * @typedef String(128)
   */
  return_msg: string;
}

/**
 * 业务逻辑返回
 */
export interface BusinessReturn {
  /**
   * 业务结果
   * @description success/fail
   * @example success
   * @typedef string(16)
   */
  result_code: string;
  /**
   * 错误代码
   * @description 详细参见错误列表
   * @example systemerror
   * @typedef string(32)
   */
  err_code?: string;
  /**
   * 错误代码描述
   * @description 错误返回的信息描述
   * @example 系统错误
   * @typedef string(128)
   */
  err_code_des?: string;
}

/**
 * 支付类构造函数选项
 */
export interface PayerOptions {
  appId: string;
  mchId: string;
  key: string;
  pfx: Buffer;
}

export const enum SignType {
  MD5 = "MD5",
  "HMAC-SHA256" = "HMAC-SHA256"
}

/**
 * 额外请求参数，支付实例自带或自动生成，不需要随 options 传递
 */
export interface FetchOptions {
  appid: string;
  mch_id: string;
  key: string;
  nonce_str: string;
  url: string;
  pfx?: Buffer;
  /**
   * appid 键名映射， 比如有些接口使用 app_id, wxappid
   */
  mapAppId?: string;
  /**
   * mch_id 键名映射
   */
  mapMchId?: string;
}

/**
 * 基础路径
 */
export const URL_MCH = "https://api.mch.weixin.qq.com";
/**
 * 仿真模式基础路径
 */
export const URL_SANBOX = URL_MCH + "/sandboxnew";
/**
 * 统一下单接口路径
 */
export const UNIFIED_ORDER_BASE = "/pay/unifiedorder";

/**
 * 银行编号
 */
export const enum BankCode {
  "工商银行" = "1002",
  "农业银行" = "1005",
  "中国银行" = "1026",
  "建设银行" = "1003",
  "招商银行" = "1001",
  "邮储银行" = "1066",
  "浦发银行" = "1004",
  "民生银行" = "1006",
  "兴业银行" = "1009",
  "平安银行" = "1010",
  "中信银行" = "1021",
  "华夏银行" = "1025",
  "广发银行" = "1027",
  "光大银行" = "1022",
  "北京银行" = "1032",
  "宁波银行" = "1056"
}
