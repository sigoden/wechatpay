/**
 * 场景信息, `microPay` 和 `unifiedOrder` 使用
 */
export interface SceneInfo {
  /**
   * 门店id
   * @description 门店唯一标识
   * @example SZTX001
   * @typedef String(32)
   */
  id?: string;
  /**
   * 门店名称
   * @description 门店名称
   * @example 腾讯大厦腾大餐厅
   * @typedef String(64)
   */
  name?: string;
  /**
   * 门店行政区划码
   * @description 门店所在地行政区划码，详细见《最新县及县以上行政区划代码》
   * @example 440305
   * @typedef String(6)
   */
  area_code?: string;
  /**
   * 门店详细地址
   * @description 门店详细地址
   * @example 科技园中一路腾讯大厦
   * @typedef String(128)
   */
  address?: string;
}
