import { ErrorCode } from "@slack/web-api/dist/errors";
import { IncomingHttpHeaders } from "http";

type SlackError = {
  code: string;
  original: Error;
  statusCode?: number;
  statusMessage?: string;
  body?: any;
  headers?: IncomingHttpHeaders;
  retryAfter?: number;
  data?: object & {
    error: string;
  };
};

export const errorDescription = (error: SlackError): void => {
  const {
    body,
    code,
    data,
    headers,
    original,
    retryAfter,
    statusCode,
    statusMessage
  } = error;
  if (code === ErrorCode.RequestError) {
    console.error("ErrorCode.RequestError ", code, "original: ", original);
  } else if (code === ErrorCode.PlatformError) {
    console.error("ErrorCode.PlatformError", code, "data: ", data);
  } else if (error.code === ErrorCode.HTTPError) {
    // Some other error, oh no!
    console.error(
      "ErrorCode.HTTPError ",
      code,
      "statusCode: ",
      statusCode,
      "statusMessage: ",
      statusMessage,
      "headers: ",
      headers,
      "body: ",
      body
    );
  } else if (error.code === ErrorCode.RateLimitedError) {
    console.error(
      "ErrorCode.RateLimitedError: ",
      code,
      "retryAfter: ",
      retryAfter
    );
  } else {
    console.error("Well that was unexpected! ", error);
  }
};
