import express from "express";
import { json, urlencoded } from "body-parser";
import { check } from "express-validator";
import morgan from "morgan";

import { signUp } from "./utils/auth/signUp";
import { signIn } from "./utils/auth/signIn";
import { protect } from "./middleware/protectRoute";
import userRouter from "./resources/user/user.router";
import database from "./utils/db";

const app = express();
app.use(json());
app.use(urlencoded({ extended: true }));
app.use(morgan("dev"));

const PORT = process.env.PORT || 5000;

database().catch(err => console.log(err));

app.post(
  "/signup",
  [
    check("email", "Please enter a valid email")
      .isEmail()
      .normalizeEmail(),
    check(
      "password",
      "Please enter a password of 6 characters or more"
    ).isLength({ min: 6 }),
  ],
  signUp
);

app.post(
  "/signin",
  [
    check("email", "Email is required")
      .isEmail()
      .normalizeEmail(),
    check("password", "Valid password is required")
      .not()
      .isEmpty()
      .trim()
      .escape(),
  ],
  signIn
);

app.listen(PORT, () => console.log(`Listening at http://localhost:${PORT}`));
