/**
 * 微信调用返回值 `return_code` 为 FAIL 时抛出
 */
export class CommunicationError extends Error {
  /**
   * 状态码
   */
  public readonly returnCode: string;
  /**
   * 信息
   */
  public readonly returnMsg: string;

  constructor(code: string, msg: string) {
    super(`${code}: ${msg}`);
    this.returnCode = code;
    this.returnMsg = msg;
  }
}

/**
 * 远程调用微信 API 失败
 */
export class RequestError extends Error {
  public readonly err: any;
  constructor(err) {
    super(err.message ? err.message : "请求失败");
    this.err = err;
  }
}

/**
 * 签名错误
 */
export class ValidateSignError extends Error {
  public data: any;
  constructor(data: any) {
    super(`签名不匹配`);
    this.data = data;
  }
}

/**
 * 业务错误
 */
export class BusinessError extends Error {
  public code: string;
  public codeDes: string;
  constructor(ret: { err_code?: string; err_code_des?: string }) {
    super(
      `业务失败，err_code:${ret.err_code},err_code_des:${ret.err_code_des}`
    );
    this.code = ret.err_code;
    this.codeDes = ret.err_code_des;
  }
}
