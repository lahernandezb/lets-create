import jwt from "jsonwebtoken";
// export const verifyToken = token =>
//   new Promise((resolve, reject) => {
//     jwt.verify(token, process.env.jwtToken, (err, payload) => {
//       if (err) {
//         reject(err);
//       }

//       resolve(payload);
//     });
//   });

export function verifyToken(token) {
  return new Promise((resolve, reject) => {
    jwt.verify(token, process.env.jwtToken, (err, payload) => {
      if (err) {
        reject(err);
      }

      resolve(payload);
    });
  });
}
