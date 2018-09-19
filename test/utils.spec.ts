import * as fs from "fs";
import * as path from "path";
import * as types from "../src/types";
import * as utils from "../src/utils";

describe("nonceStr", () => {
  test("generate nonce string", () => {
    expect(utils.nonceStr()).toMatch(/^[a-zA-Z0-9]{32}$/);
    expect(utils.nonceStr()).not.toEqual(utils.nonceStr());
  });
});

describe("toXML", () => {
  test("convert plain object to xml", () => {
    const obj = {
      mch_id: "1900000109",
      partner_trade_no: "1212121221227",
      nonce_str: "5K8264ILTKCH16CQ2502SI8ZNMTM67Vs",
      sign: "C380BEC2BFD727A4B6845133519F3AD6"
    };
    const result = [
      "<xml>",
      "  <mch_id>1900000109</mch_id>",
      "  <partner_trade_no>1212121221227</partner_trade_no>",
      "  <nonce_str>5K8264ILTKCH16CQ2502SI8ZNMTM67Vs</nonce_str>",
      "  <sign>C380BEC2BFD727A4B6845133519F3AD6</sign>",
      "</xml>"
    ].join("\n");
    expect(utils.toXML(obj)).toEqual(result);
  });
});

describe("fromXML", () => {
  test("convert xml to plain object", async () => {
    const xml = [
      "<xml>",
      "  <mch_id>1900000109</mch_id>",
      "  <partner_trade_no>1212121221227</partner_trade_no>",
      "  <nonce_str>5K8264ILTKCH16CQ2502SI8ZNMTM67Vs</nonce_str>",
      "  <sign>C380BEC2BFD727A4B6845133519F3AD6</sign>",
      "</xml>"
    ].join("\n");
    const result = {
      mch_id: "1900000109",
      partner_trade_no: "1212121221227",
      nonce_str: "5K8264ILTKCH16CQ2502SI8ZNMTM67Vs",
      sign: "C380BEC2BFD727A4B6845133519F3AD6"
    };
    const value = await utils.fromXML(xml);
    expect(value).toEqual(result);
  });
});

describe("sign", () => {
  test("sign with md5", () => {
    const obj = { a: 3, b: 4 };
    expect(utils.sign(types.SignType.MD5, obj, "abc")).toEqual(
      "85566166DABF8B84307C0AF0A7699366"
    );
  });
  test("sign with sha256", () => {
    const obj = { a: 3, b: 4 };
    expect(utils.sign(types.SignType["HMAC-SHA256"], obj, "abc")).toEqual(
      "AAF907CA1B2239E0187A4BD73331DCD840F84748C6905B7FD857688BED84ACF7"
    );
  });
  test("no change when object key order changed", () => {
    const obj = { a: 3, b: 4 };
    const obj2 = { b: 4, a: 3 };
    expect(utils.sign(types.SignType.MD5, obj, "abc")).toEqual(
      utils.sign(types.SignType.MD5, obj2, "abc")
    );
  });
  test("ignore key sign", () => {
    const obj = { a: 3, b: 4, sign: "85566166DABF8B84307C0AF0A7699366" };
    const obj2 = { b: 4, a: 3 };
    expect(utils.sign(types.SignType.MD5, obj, "abc")).toEqual(
      utils.sign(types.SignType.MD5, obj2, "abc")
    );
  });
  test("ignore property which is undefined or null or empty string", () => {
    const obj = { a: 3, b: 4, c: undefined, d: null, e: "" };
    const obj2 = { b: 4, a: 3 };
    expect(utils.sign(types.SignType.MD5, obj, "abc")).toEqual(
      utils.sign(types.SignType.MD5, obj2, "abc")
    );
  });
});

describe("decode", () => {
  test("decode refund data", () => {
    const data = "/Pe2X0sgRcndZWNJQQmcPw==";
    expect(utils.decode("6Q9VX4N3WTBM9G9XBL7H1L9PB9ANHLY8", data)).toEqual(
      '{"a":3}'
    );
  });
});

describe("rsa", () => {
  test("encrypt data with rsa", () => {
    const pemKey = [
      "-----BEGIN RSA PUBLIC KEY-----",
      "MIIBCgKCAQEArT82k67xybiJS9AD8nNAeuDYdrtCRaxkS6cgs8L9h83eqlDTlrdw",
      "zBVSv5V4imTq/URbXn4K0V/KJ1TwDrqOI8hamGB0fvU13WW1NcJuv41RnJVua0QA",
      "lS3tS1JzOZpMS9BEGeFvyFF/epbi/m9+2kUWG94FccArNnBtBqqvFncXgQsm98JB",
      "3a62NbS1ePP/hMI7Kkz+JNMyYsWkrOUFDCXAbSZkWBJekY4nGZtK1erqGRve8Jbx",
      "TWirAm/s08rUrjOuZFA21/EI2nea3DidJMTVnXVPY2qcAjF+595shwUKyTjKB8v1",
      "REPB3hPF1Z75O6LwuLfyPiCrCTmVoyfqjwIDAQAB",
      "-----END RSA PUBLIC KEY-----"
    ].join("\n");
    const data = "张三";
    expect(utils.rsa(pemKey, data)).toBeDefined();
  });
});

describe("getXMLBody", () => {
  test("get and parse xml data", async () => {
    const xmlStream = fs.createReadStream(
      path.resolve(__dirname, "fixtures/refund-notify.xml")
    );
    const result = {
      appid: "wx2421b1c4370ec43b",
      mch_id: "10000100",
      nonce_str: "TeqClE3i0mvn3DrK",
      req_info:
        "T87GAHG17TGAHG1TGHAHAHA1Y1CIOA9UGJH1GAHV871HAGAGQYQQPOOJMXNBCXBVNMNMAJAA",
      return_code: "SUCCESS"
    };
    const data = await utils.getXMLBody(xmlStream, {
      encoding: "utf8"
    });
    expect(data).toEqual(result);
  });
});
