import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import createError from "http-errors";
import path from "path";
import cookieParser from "cookie-parser";
import logger from "morgan";
import errorHandler from "../middlewares/errorHandler";
import { connect } from "./connect";
import { AddressInfo } from "net";

const createserver = (): express.Application => {
  const app = express();
  const host: string | number = process.env.HOST || "localhost";
  const port: string | number = process.env.PORT || 5000;

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
  app.use(errorHandler);

  // view engine setup
  app.set("views", path.join(__dirname, "views"));
  app.set("view engine", "jade");

  app.get("/", (_req: Request, res: Response) => {
    res.send({ success: true, message: "server is up and running" });
  });

  const server = app.listen({ host, port }, () => {
    const addressInfo = server.address() as AddressInfo;
    console.log(
      `Server ready at http:${addressInfo.address}:${addressInfo.port}`
    );
  });

  const signalTraps: NodeJS.Signals[] = ["SIGTERM", "SIGINT", "SIGUSR2"];
  signalTraps.forEach((type) => {
    process.once(type, async () => {
      console.log(`process.once ${type}`);

      server.close(() => {
        console.log("HTTP Server close");
      });
    });
  });

  // connect database
  connect();

  return app;
};

export default createserver;
