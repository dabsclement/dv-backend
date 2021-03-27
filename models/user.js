import mongoose from "mongoose";
import validator from "validator";

const UserSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
    trim: true,
    minlength: 3
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    validate (value) {
      if (!validator.isEmail(value)) {
        throw new Error("Email is invalid");
      }
    }
  },
  isAdmin: {
    type: Boolean,
    default: false
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
    trim: true
  }
},

{
  timestamps: true
}
);

module.exports = mongoose.model("user", UserSchema);
