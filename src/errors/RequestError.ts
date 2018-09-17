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
