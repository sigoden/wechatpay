import * as fs from "fs";
import * as wxpay from "../src/";

const app = new wxpay.AppPay({
  appId: "abc",
  mchId: "abc",
  key: "abc",
  pfx: fs.readFileSync("key")
});

app.orderQuery({ out_trade_no: "abc" }).then(res => {
  if (res.result_code === "SUCCESS") {
  } else {
  }
});
