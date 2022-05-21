const jwt = require("jsonwebtoken");
const userModel = require("../models/user");

const checkAdmin = async (req, res, next) => {
  const AuthorizationHeader = req.headers.authorization;
  const token = AuthorizationHeader.split(" ")[1];

  const decode = jwt.verify(token, process.env.secretKey || "defaultKey");
  console.log(decode);
  if (!decode) {
    throw new Error("Auth failed");
  }
  const userMail = decode.email;
  await userModel.findOne({ email: userMail })
    .then(data => {
      if (data.email !== userMail) {
        throw new Error("Auth failed");
      }

      if (!data.isAdmin) {
        res.status(401).json({
          status: "error",
          message: "Access Forbidden"
        });
      }
      next();
    })

    .catch((err) => {
      console.log("hiii");
      res.status(500).json({
        status: "error",
        message: err.message
      });
    });
};

const checkAuth = async (req, res, next) => {
  const token = req.headers.authorization;
  const decode = jwt.verify(token, process.env.secretKey || "defaultKey");
  const userMail = decode.email;
  await userModel.findOne({ email: userMail })
    .then(data => {
      if (data.email !== userMail) {
        throw new Error("Auth failed");
      }
      next();
    })
    .catch((err) => {
      res.status(500).json({
        status: "error",
        message: err.message
      });
    });
};

module.exports = { checkAdmin, checkAuth };
