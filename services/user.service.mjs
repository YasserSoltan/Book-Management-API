import User from "../models/user.model.mjs";
import bcrypt from "bcryptjs";
import generateJWT from "../utils/generateJWT.mjs";
import jwt from "jsonwebtoken";

export const registerUser = async (userData) => {
  const { firstName, lastName, email, password, role } = userData;
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new Error("User already exists");
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = new User({
    firstName,
    lastName,
    email,
    password: hashedPassword,
    role,
  });
  const token = await generateJWT(
    { email: newUser.email, role: newUser.role, _id: newUser._id },
    "1h"
  );
  if (!token) {
    throw new Error("Failed to generate token");
  }
  newUser.token = token;
  await newUser.save();
  const userObject = newUser.toObject();
  delete userObject.password;
  return userObject;
};

export const loginUser = async (email, password) => {
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error("Invalid credentials");
  }
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    throw new Error("Invalid credentials");
  }
  const token = await generateJWT({ email, role: user.role, _id: user.id }, "1h");
  return {
    token,
    user: {
      _id: user._id,
      email: user.email,
      role: user.role,
      firstName: user.firstName,
      lastName: user.lastName,
    },
  };
};
