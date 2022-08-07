import jwt from "jsonwebtoken";

export const generateToken = (user) => {
  // jwt is jason web token
  return jwt.sign(
    {
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    },
    //   the second parameter of sign is a secret to encrypt the data and generate a token. We don't want to expose it so we have it in .env.
    process.env.JWT_SECRET || "somethingsecret",
    {
      expiresIn: "30d",
    }
  );
};

export const isAuth = (req, res, next) => {
  const authorization = req.headers.authorization;
  if (authorization) {
    const token = authorization.slice(7, authorization.length); //Bearer XXXXXXX ===> we slice out the "Bearer "
    jwt.verify(
      token,
      process.env.JWT_SECRET || "somethingsecret",
      (err, decode) => {
        if (err) {
          res.status(401).send({ message: "Invalid Token" });
        } else {
          req.user = decode;
          next(); // we now have in req the user field to use in the next endpoint
        }
      }
    );
  } else {
    res.status(401).send({ message: "No Token" });
  }
};
