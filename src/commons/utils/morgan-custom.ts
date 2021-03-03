import morgan from "morgan";
import { logger } from "./winston-logger";

export const morganCustom = morgan((tokens: any, req: any, res: any): any => {
  const message = [
    tokens.method(req, res),
    tokens.url(req, res),
    tokens.status(req, res),
    tokens.res(req, res, "content-length"),
    "-",
    tokens["response-time"](req, res),
    "ms",
  ].join(" ");
  logger.info(message, {
    body: req.body,
    ...(req.user ? { user_id: req.user.id } : {}),
  });
});
