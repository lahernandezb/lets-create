import express from "express";
import { json, urlencoded } from "body-parser";
import { check } from "express-validator";

import { signUp } from "./utils/auth";
import database from "./utils/db";

const app = express();
app.use(json());
app.use(urlencoded({ extended: true }));

const PORT = process.env.PORT || 5000;

database().catch(err => console.log(err));

app.post(
  "/signup",
  [
    check("email", "Please enter a valid email").isEmail(),
    check(
      "password",
      "Please enter a password of 6 characters or more"
    ).isLength({ min: 6 }),
  ],
  signUp
);

app.listen(PORT, () => console.log(`Listening at http://localhost:${PORT}`));
