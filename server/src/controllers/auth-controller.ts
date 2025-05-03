import { Response, Request } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import User from "../models/user-model";
import { UserAttributes } from "../types/user";
const JWT_SECRET = process.env.JWT_SECRET as string;

import { ValidationError } from "sequelize";
import path from "path";
import fs from "fs";

const isProduction = process.env.NODE_ENV === "production";

const register = async (req: Request, res: Response): Promise<void> => {
  const { fullname, email, password } = req.body;
  const file = req.file;

  if (!fullname || !email || !password) {
    res.status(400).json({
      message: "Fullname, email, and password are required.",
    });
    return;
  }

  // const passwordRegex =
  //   /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  // if (!passwordRegex.test(password)) {
  //   res.status(400).json({
  //     message:
  //       "Password must be at least 8 characters long and include uppercase, lowercase, number, and special character.",
  //   });
  //   return;
  // }

  try {
    const userDataToSave: any = {
      fullname,
      email,
      password_hash: password,
    };

    if (file) {
      userDataToSave.profile_image = file.filename;
    }

    const newUser = await User.create(userDataToSave);

    const userData = newUser.get() as UserAttributes;

    res.status(201).json({
      message:
        "Your account has been created successfully. You can now log in to InfluencrIn.",
      user: {
        id: userData.id,
        fullname: userData.fullname,
        email: userData.email,
        profile_image: userData.profile_image,
      },
    });
  } catch (error: any) {
    // delete the profile image that already upload to the disk
    if (file) {
      const newImagePath = path.join(
        __dirname,
        "../../public/images/uploads/user-profiles",
        file.filename
      );
      if (fs.existsSync(newImagePath)) {
        fs.unlinkSync(newImagePath); // Clean up failed upload
      }
    }

    if (error instanceof ValidationError) {
      res.status(400).json({
        message: error.errors[0].message,
        path: error.errors[0].path,
      });
      return;
    }

    res.status(500).json({
      message: error.message || "Server error during registration.",
    });
  }
};

const login = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400).json({ error: "Email and password are required." });
    return;
  }

  try {
    const user = await User.findOne({ where: { email } });

    if (!user) {
      res.status(401).json({ message: "Invalid email or password." });
      return;
    }

    const userData = user.get() as UserAttributes;

    const isPasswordValid = await bcrypt.compare(
      password,
      userData.password_hash
    );
    if (!isPasswordValid) {
      res.status(401).json({ message: "Invalid email or password." });
      return;
    }

    // Generate JWT
    const token = jwt.sign(
      {
        id: userData.id,
        fullname: userData.fullname,
        email: userData.email,
        profile_image: userData.profile_image,
      },
      JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.status(200).json({
      message: "You're logging into InfluencrIn",
      token: token,
    });
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(400).json({ message: error.message });
    } else {
      res.status(500).json({ message: "Server error during login." });
    }
  }
};

export { register, login };
