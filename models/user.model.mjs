import mongoose from "mongoose";
import userRoles from "../utils/userRoles.mjs";

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: [userRoles.USER, userRoles.ADMIN, userRoles.OWNER],
    default: userRoles.USER,
  }
});

const User = mongoose.model("User", userSchema);
export default User;