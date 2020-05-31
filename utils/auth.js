import jwt from "jsonwebtoken";
import { validationResult } from "express-validator";

import { User } from "../resources/user/user.model";

export function newToken(user) {
  return jwt.sign({ id: user.id }, process.env.jwtToken, { expriesIn: 360000 });
}

export async function signUp(req, res) {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).send({ errors: errors.array() });
  }

  const { email } = req.body;

  try {
    const isAlreadyUser = await User.findOne({ email });

    if (isAlreadyUser) {
      return res
        .status(400)
        .send({ errors: [{ message: "User already exists" }] });
    }
    const user = await User.create(req.body);
    const token = newToken(user);
    return res.status(200).send({ token });
  } catch (err) {}

  res.status(200).send(req.body);
}
