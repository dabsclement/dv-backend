import "regenerator-runtime/runtime";
// const { Login } = require("../../controllers/userController");
const { Admin } = require("../../models/user");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");

describe("user.checkAdmin", () => {
  it("should return a valid JWT", () => {
    const payload = { _id: new mongoose.Types.ObjectId().toHexString(), isAdmin: true };
    const user = new Admin(payload);
    const token = user.checkAdmin();
    const decoded = jwt.verify(token, process.env.secretKey);
    expect(decoded).toMatchObject(payload);
  });
});
