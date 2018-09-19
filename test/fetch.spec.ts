import request = require("request");
import { CommunicationError } from "../src/errors";
import { download, fetch } from "../src/fetch";
import * as types from "../src/types";

jest.mock("request");

describe("fetch", () => {
  beforeAll(() => {
    (request as any).mockImplementation((v, cb) => cb(null, null, v.body));
  });
  test("auto append appid, mch_id, nonce_str, sign to fetch body", async () => {
    const data = {};
    const extra = createFetchOptons({});
    const fetchData = await fetch<any, types.BaseReturn, types.BaseReturn>(
      data,
      extra
    );
    expect(fetchData).toEqual({
      appid: "wxb80e5bddb2d804f3",
      mch_id: "1424712502",
      nonce_str: "K2FN1t1L83aumb5li4ObNwLSmR5vECE7",
      sign: "23CE6C63A55FF68A173609311D78CC05"
    });
  });

  test("remap appid and mch_id", async () => {
    const data = {};
    const extra = createFetchOptons({
      mapAppId: "wxappid",
      mapMchId: "mchid"
    });
    const fetchData = await fetch<any, types.BaseReturn, types.BaseReturn>(
      data,
      extra
    );
    expect(fetchData).toEqual({
      mchid: "1424712502",
      nonce_str: "K2FN1t1L83aumb5li4ObNwLSmR5vECE7",
      sign: "DC258FB46C371D5B408B223C45A5FB05",
      wxappid: "wxb80e5bddb2d804f3"
    });
  });

  test("omit appid or mch_id", async () => {
    const data = {};
    const extra = createFetchOptons({
      mapAppId: "-",
      mapMchId: "-"
    });
    const fetchData = await fetch<any, types.BaseReturn, types.BaseReturn>(
      data,
      extra
    );
    expect(fetchData).toEqual({
      nonce_str: "K2FN1t1L83aumb5li4ObNwLSmR5vECE7",
      sign: "C77F949D8AD20C5327B70F1579BE2BE6"
    });
  });

  test("merge consts", async () => {
    const data = {};
    const extra = createFetchOptons({
      consts: { k: "v" }
    });
    const fetchData = await fetch<any, types.BaseReturn, types.BaseReturn>(
      data,
      extra
    );
    expect(fetchData).toEqual({
      appid: "wxb80e5bddb2d804f3",
      k: "v",
      mch_id: "1424712502",
      nonce_str: "K2FN1t1L83aumb5li4ObNwLSmR5vECE7",
      sign: "61701D3981552634AF521CBB14C11C75"
    });
  });

  test("communication error", async () => {
    const data = { return_code: "FAIL", return_msg: "OPS" };
    const extra = createFetchOptons({});
    try {
      await fetch<any, types.BaseReturn, types.BaseReturn>(data, extra);
    } catch (err) {
      expect(err).toBeInstanceOf(CommunicationError);
    }
  });
});

describe("download", () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });
  test("download csv data", async () => {
    (request as any).mockImplementation((v, cb) => cb(null, null, "csv-data"));
    const data = {};
    const extra = createFetchOptons({});
    const downloadData = await download<any, types.BaseReturn>(data, extra);
    expect(downloadData).toBe("csv-data");
  });
  test("communication error", async () => {
    (request as any).mockImplementation((v, cb) => cb(null, null, v.body));
    const data = { return_code: "FAIL", return_msg: "OPS" };
    const extra = createFetchOptons({});
    try {
      await fetch<any, types.BaseReturn, types.BaseReturn>(data, extra);
    } catch (err) {
      expect(err).toBeInstanceOf(CommunicationError);
    }
  });
});

function createFetchOptons(extra: any) {
  return <types.FetchOptions> Object.assign(
    {
      appid: "wxb80e5bddb2d804f3",
      mch_id: "1424712502",
      key: "6Q9VX4N3WTBM9G9XBL7H1L9PB9ANHLY8",
      url: "https://example.com",
      nonce_str: "K2FN1t1L83aumb5li4ObNwLSmR5vECE7"
    },
    extra
  );
}
