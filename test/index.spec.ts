import * as fs from "fs";
import * as path from "path";
import request = require("request");
import * as wxpay from "../src/";
import * as utils from "../src/utils";

jest.mock("request");

(utils as any).nonceStr = jest.fn(() => "K2FN1t1L83aumb5li4ObNwLSmR5vECE7");

describe("api", () => {
  const pay = new wxpay.PubPay(createPayOptions());
  test("check request body", async () => {
    (request as any).mockImplementation((v, cb) => cb(null, null, v.body));
    const options = await pay.unifiedOrder({
      openid: "oUpF8uMuAJO_M2pxb1Q9zNjWeS6o",
      body: "腾讯充值中心-QQ会员充值",
      out_trade_no: "1217752501201407033233368018",
      total_fee: 888,
      spbill_create_ip: "8.8.8.8",
      notify_url: "https://example.com/wechatpay/notify"
    });
    expect(options).toEqual({
      appid: "wxb80e5bddb2d804f3",
      body: "腾讯充值中心-QQ会员充值",
      mch_id: "1424712502",
      nonce_str: "K2FN1t1L83aumb5li4ObNwLSmR5vECE7",
      notify_url: "https://example.com/wechatpay/notify",
      openid: "oUpF8uMuAJO_M2pxb1Q9zNjWeS6o",
      out_trade_no: "1217752501201407033233368018",
      sign: "FD9B3671CFECE726A43B5AB686721886",
      spbill_create_ip: "8.8.8.8",
      total_fee: "888",
      trade_type: "JSAPI"
    });
  });
});

function createPayOptions() {
  const p12Data = fs.readFileSync(
    path.resolve(__dirname, "./fixtures/cert.p12")
  );
  return {
    appId: "wxb80e5bddb2d804f3",
    mchId: "1424712502",
    key: "6Q9VX4N3WTBM9G9XBL7H1L9PB9ANHLY8",
    pfx: p12Data
  };
}
