// const jwt = require("jsonwebtoken");
const jwt = require("jsonwebtoken");
var User = require("../models/user");
var bcrypt = require("bcrypt");
var saltRounds = 10;
exports.signup = async (req, res) => {
  var newUser = new User(req.body);

  // ensures no duplicate user
  await User.findOne({ email: newUser.email })
    .then(async (profile) => {
      if (!profile) {
        // hash password using bcrypt
        bcrypt.hash(newUser.password, saltRounds, async (err, hash) => {
          if (err) {
            res.status(401).json({
              status: "error",
              message: err.message
            });
          } else {
            newUser.password = hash;
            await newUser
              .save()
              .then(() => {
                return res.status(201).json({
                  status: "success",
                  message: "Signup successful",
                  data: {
                    email: newUser.email,
                    username: newUser.username

                  }
                });
              })
              .catch((err) => {
                res.status(401).json({
                  status: "error",
                  message: err.message
                });
              });
          }
        });
      } else if (profile) {
        res.status(401).json({
          status: "error",
          message: "This profile already exists"
        });
      }
    })
    .catch((err) => {
      res.status(500).json({
        status: "error",
        error: err.message
      });
    });
};

exports.login = async (req, res) => {
  var newUser = {
    email: req.body.email,
    password: req.body.password
  };

  await User.findOne({ email: newUser.email })
    .then((profile) => {
      if (!profile) {
        res.status(500).json({
          status: "error",
          error: "profile does not exist"
        });
      } else {
        bcrypt.compare(
          newUser.password,
          profile.password,
          async (err, result) => {
            if (err) {
              res.status(401).json({
                status: "error",
                message: err.message
              });
            } else if (result) {
              const token = jwt.sign({
                email: profile.email,
                userId: profile._id,
                username: profile.username
              }, process.env.secretKey || "defaultKey", { expiresIn: "24h" });
              return res.status(201).json({
                message: "login successful",
                data: {
                  email: profile.email,
                  username: profile.username,
                  token
                }
              });
            } else {
              res.status(401).json({
                status: "error",
                message: "Password is invalid"
              });
            }
          }
        );
      }
    })
    .catch((err) => {
      res.status(500).json({
        status: "error",
        error: err
      });
    });
};
