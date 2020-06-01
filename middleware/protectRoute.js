import { User } from "../resources/user/user.model";
import { verifyToken } from "../utils/auth/verifyToken";

export async function protect(req, res, next) {
  const bearer = req.headers.authorization;

  if (!bearer || !bearer.startsWith("Bearer ")) {
    return res.status(401).send({ message: "Authorization required" });
  }

  const token = bearer.split("Bearer ")[1];

  let payload;
  try {
    payload = await verifyToken(token);

    const user = await User.findById(payload.user.id)
      .select("-password")
      .lean()
      .exec();

    if (!user) {
      return res.status(401).send({ message: "Token is not valid" });
    }

    req.user = user;
    next();
  } catch (err) {
    return res.status(401).send({ message: "Token is not valid" });
  }
}
