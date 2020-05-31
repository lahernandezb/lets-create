import jwt from "jsonwebtoken";
import { validationResult } from "express-validator";

import { User } from "../resources/user/user.model";

const newToken = user =>
  jwt.sign({ user: { id: user.id } }, process.env.jwtToken, {
    expiresIn: 360000,
  });

const verifyToken = token =>
  new Promise((resolve, reject) => {
    jwt.verify(token, process.env.jwtToken, (err, payload) => {
      if (err) {
        reject(err);
      }

      resolve(payload);
    });
  });

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

export async function signIn(req, res) {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).send({ errors: errors.array() });
  }

  const invalid = { message: "Invalid email and password combination" };

  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email })
      .select("email password")
      .exec();

    if (!user) {
      return res.status(401).send(invalid);
    }

    const match = await user.checkPassword(password);

    if (!match) {
      return res.status(401).send(invalid);
    }

    const token = newToken(user);

    return res.status(201).send({ token });
  } catch (err) {
    console.error(err);
    res.status(500).end();
  }
}
