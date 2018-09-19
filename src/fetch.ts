import * as request from "request";
import { CommunicationError, RequestError } from "./errors";
import * as types from "./types";
import { fromXML, sign, toXML } from "./utils";

/**
 * 远程调用
 */
export function fetch<
  U,
  S extends types.BaseReturn,
  F extends types.BaseReturn
>(data: U, extra: types.FetchOptions): Promise<S | F> {
  const options = createRequestOptions<U>(data, extra);
  options.method = "POST";
  return new Promise<S | F>((resolve, reject) => {
    request(options, (err, _, rawBody: string) => {
      if (err) {
        return reject(new RequestError(err));
      }
      fromXML<S | F>(rawBody)
        .then(resBody => {
          if (resBody.return_code === "FAIL") {
            return reject(
              new CommunicationError(resBody.return_code, resBody.return_msg)
            );
          }
          resolve(resBody);
        })
        .catch(parseErr => {
          reject(new RequestError("解析失败: " + rawBody));
        });
    });
  });
}

/**
 * 远程下载
 */
export function download<U, F extends types.BaseReturn>(
  data: U,
  extra: types.FetchOptions
): Promise<string | F> {
  const options = createRequestOptions<U>(data, extra);
  options.method = "POST";
  return new Promise<string | F>((resolve, reject) => {
    request(options, (err, _, rawBody: string) => {
      if (err) {
        return reject(new RequestError(err));
      }
      fromXML<F>(rawBody)
        .then(resBody => {
          if (resBody.return_code === "FAIL") {
            return reject(
              new CommunicationError(resBody.return_code, resBody.return_msg)
            );
          }
          resolve(resBody);
        })
        .catch(parseErr => {
          resolve(rawBody);
        });
    });
  });
}

function createRequestOptions<U>(
  data: U,
  extra: types.FetchOptions
): request.Options {
  const body: any = Object.assign(extra.consts || {}, data, {
    nonce_str: extra.nonce_str
  });
  setBodyAppIdAndMchId(body, extra);
  body.sign = sign(getSignType(data), body, extra.key);
  const options: request.Options = {
    url: extra.url,
    body: toXML(body)
  };
  if (extra.pfx) {
    options.agentOptions = {
      pfx: extra.pfx,
      passphrase: extra.mch_id
    };
  }
  return options;
}

function getSignType(data: any): types.SignType {
  if (data.sign_type) {
    return data.sign_type;
  }
  return types.SignType.MD5;
}

function setBodyAppIdAndMchId(body: any, extra: types.FetchOptions) {
  if (extra.mapAppId) {
    if (extra.mapAppId !== "-") {
      body[extra.mapAppId] = extra.appid;
    }
  } else {
    body.appid = extra.appid;
  }
  if (extra.mapMchId) {
    if (extra.mapMchId !== "-") {
      body[extra.mapMchId] = extra.mch_id;
    }
  } else {
    body.mch_id = extra.mch_id;
  }
}
