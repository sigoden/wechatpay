/**
 * fetch 函数调用失败时抛出，如网络连接
 */
export class FetchError extends Error {
  public readonly err: any;
  constructor(err) {
    super(err.message ? err.message : "请求失败");
    this.err = err;
  }
}
