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
