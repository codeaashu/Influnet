// Import necessary modules and the auth controller
import express from "express";
import * as authController from "../controllers/auth-controller";
import authenticate from "../middleware/authenticate";
import { multerUserProfileImageUpload } from "../middleware/multer-user-profile-upload";

const authRoutes = express.Router();

/**
 * @route   POST /api/auth/register
 * @desc    Register a new user
 * @access  Public
 * @form    multipart/form-data
 *
 * @body
 * - fullname: string (required) - Full name of the user
 * - email: string (required) - Email address of the user
 * - password: string (required) - Password for the account
 * - profile_image: file (optional) - Profile image file
 */
authRoutes.post(
  "/register",
  multerUserProfileImageUpload.single("profile_image"),
  authController.register
);

/**
 * @route   POST /api/auth/login
 * @desc    Log in an existing user
 * @access  Public
 * @requiredBody {
 *   email: string,
 *   password: string
 * }
 */
authRoutes.post("/login", authController.login);

/**
 * @route   POST /api/auth/logout
 * @desc    Log out the currently authenticated user
 * @access  Private (Requires Authorization Header with token)
 * @body    None
 */

export default authRoutes;
