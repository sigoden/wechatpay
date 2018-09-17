/**
 * 微信调用返回值 `return_code` 为 FAIL 时抛出
 */
export class ReturnError extends Error {
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
