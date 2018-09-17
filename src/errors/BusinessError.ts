import * as types from "../types";
/**
 * 微信调用返回值 `result_code` 为 FAIL 时抛出
 */
export class BusinessError<U extends types.BusinessReturn> extends Error {
  /**
   * 状态码
   */
  public readonly err: U;

  constructor(err: U) {
    super(`${err.err_code}: ${err.err_code_des}`);
    this.err = err;
  }
}
