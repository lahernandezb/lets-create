import { validationResult } from "express-validator";

import { User } from "../../resources/user/user.model";
import { newToken } from "./createToken";

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
    res.status(201).send({ token });
  } catch (err) {
    return res.status(500).send({ errors: errors.array() });
  }
}
