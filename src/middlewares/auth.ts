import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import userModel from "@models/user";

const checkAdmin = async (req: Request, res: Response, next: NextFunction) => {
  const AuthorizationHeader: any = req?.headers?.authorization;
  const token = AuthorizationHeader?.split(" ")[1];

  const decode: any = jwt.verify(token, process.env.secretKey || "defaultKey");
  console.log(decode);
  if (!decode) {
    throw new Error("Auth failed");
  }
  const userMail = decode.email;
  await userModel
    .findOne({ email: userMail })
    .then((data) => {
      if (data.email !== userMail) {
        throw new Error("Auth failed");
      }

      if (!data.isAdmin) {
        res.status(401).json({
          status: "error",
          message: "Access Forbidden",
        });
      }
      next();
    })

    .catch((err) => {
      console.log("hiii");
      res.status(500).json({
        status: "error",
        message: err.message,
      });
    });
};

const checkAuth = async (req: Request, res: Response, next: NextFunction) => {
  const token: any | undefined = req.headers.authorization;
  const decode: any = jwt.verify(token, process.env.secretKey || "defaultKey");
  const userMail = decode.email;
  await userModel
    .findOne({ email: userMail })
    .then((data) => {
      if (data.email !== userMail) {
        throw new Error("Auth failed");
      }
      next();
    })
    .catch((err) => {
      res.status(500).json({
        status: "error",
        message: err.message,
      });
    });
};

export { checkAdmin, checkAuth };
