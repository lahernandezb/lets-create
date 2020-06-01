import { validationResult } from "express-validator";
import { newToken } from "./createToken";
import { User } from "../../resources/user/user.model";

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
