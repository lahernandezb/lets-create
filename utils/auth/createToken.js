import jwt from "jsonwebtoken";

export function newToken(user) {
  return jwt.sign({ user: { id: user.id } }, process.env.jwtToken, {
    expiresIn: 360000,
  });
}
