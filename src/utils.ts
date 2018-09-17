import * as buffer from "buffer";
import * as crypto from "crypto";
import * as xml2js from "xml2js";
import * as types from "./types";

/**
 * 生成随机字符串
 */
export function nonceStr(length: number = 32): string {
  const chars =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  const len = chars.length;
  let result = "";
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * len));
  }
  return result;
}

/**
 * 转换成 XML 格式
 */
export function toXML(data: any): string {
  const builder = new xml2js.Builder({
    rootName: "xml",
    headless: true
  });
  return builder.buildObject(data);
}

/**
 * 从 XML 格式字符串生成对象
 */
export function fromXML(data: string): any {
  const parser = new xml2js.Parser({
    trim: true,
    explicitArray: false,
    explicitRoot: false
  });
  return new Promise<any>((resolve, reject) => {
    parser.parseString(data, (err, ret) => {
      if (err) {
        return reject(err);
      }
      resolve(ret);
    });
  });
}

/**
 * 签名
 */
export function sign(signType: types.SignType, data: object, secret: string) {
  const combined =
    Object.keys(data)
      .filter(
        key =>
          key !== "sign" &&
          data.hasOwnProperty(key) &&
          data[key] !== undefined &&
          data[key] !== null &&
          data[key] !== ""
      )
      .sort()
      .map(key => key + "=" + data[key])
      .join("&") +
    "&key=" +
    secret;
  if (signType === types.SignType.MD5) {
    return md5(combined).toUpperCase();
  } else {
    return hmacSha256(secret, combined).toUpperCase();
  }
}

/**
 * md5 加密
 */
export function md5(data: string): string {
  return crypto
    .createHash("md5")
    .update(data)
    .digest("hex");
}

/**
 * HMAC-SHA256 加密
 */
export function hmacSha256(secret: string, data: string): string {
  return crypto
    .createHmac("sha256", secret)
    .update(data)
    .digest("hex");
}

/**
 * RSA 加密
 */
export function rsa(pemKey: string, data: string) {
  return crypto
    .publicEncrypt(pemKey, buffer.Buffer.from(data))
    .toString("base64");
}

/**
 * 解密
 */
export function decode(key: string, data: string) {
  const secret = exports.signMethods.MD5(key).toLowerCase();
  const decipher = crypto.createDecipheriv("aes-256-ecb", secret, "");
  decipher.setAutoPadding(true);
  const decipherChunks = [];
  decipherChunks.push(decipher.update(data, "base64", "utf8"));
  decipherChunks.push(decipher.final("utf8"));
  return decipherChunks.join("");
}
