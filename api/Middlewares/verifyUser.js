/* */

import { errorHandler } from "./errorHandler.js";

import JWT from "jsonwebtoken";

export const verifyJwtToken = (req, res, next) => {
  /* */

  const cookies = req.headers.cookie;

  if (!cookies) {
    return next(
      errorHandler(
        401,
        "You have deleted your cookie. Please logout and login again"
      )
    );
  }

  const token = cookies.split("=")[1];

  JWT.verify(
    token, // String(token)

    process.env.ACCESS_TOKEN_JWT_SECRET,

    async (error, decodedData) => {
      /* */

      if (error) {
        res.clearCookie("accessToken", {
          httpOnly: true,
          sameSite: "lax",
          path: "/",
        });

        return next(errorHandler(403, "Forbidden : Cookie Mis-Matched"));
      }

      req.user = decodedData;

      next();

      /* */
    }

    /* */
  );

  /* */
};
