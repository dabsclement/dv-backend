import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import createError from "http-errors";
import path from "path";
import cookieParser from "cookie-parser";
import logger from "morgan";

interface IErrorHandler {
  message?: string;
  status?: number;
}
const createserver = (): express.Application => {
  const app = express();

  app.use(express.urlencoded({ extended: true }));
  app.use(cors());
  app.use(express.json());
  app.use(cookieParser());
  app.use(express.static(path.join(__dirname, "public")));
  app.use(logger("dev"));

  app.disable("x-powered-by");

  // catch 404 and forward to error handler
  app.use(function (_req: Request, _res: Response, next: NextFunction) {
    next(createError(404));
  });

  // error handler
  app.use(function (
    err: IErrorHandler,
    req: Request,
    res: Response,
    _next: NextFunction
  ) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get("env") === "development" ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render("error");
  });

  // view engine setup
  app.set("views", path.join(__dirname, "views"));
  app.set("view engine", "jade");

  app.get("/", (_req: Request, res: Response) => {
    res.send({ success: true, message: "server is up and running" });
  });

  return app;
};

export { createserver };
