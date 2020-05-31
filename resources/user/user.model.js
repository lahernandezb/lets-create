import { Schema, model } from "mongoose";
import bcrypt from "bcrypt";

const UserSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

UserSchema.pre("save", function(next) {
  if (!this.isModified("password")) {
    return next();
  }

  bcrypt.hash(this.password, 10, (err, hash) => {
    if (err) {
      return next(err);
    }
    this.password = hash;
    next();
  });
});

UserSchema.method("checkpassword", function(password) {
  const passwrodHash = this.password;

  return new Prommise((resolve, reject) => {
    bcrypt.compare(password, passwrodHash, (err, same) => {
      err ? reject(err) : resolve(same);
    });
  });
});

export const User = model("user", UserSchema);
