import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isAdmin: { type: Boolean, default: false, required: true },
  },
  {
    // it will add 2 fields to the user of created at and updated at
    timestamps: true,
  }
);
// the second parameter of schema is options

const User = mongoose.model("User", userSchema);
export default User;
