import { Request, Response } from "express";
import User from "../models/user-model";
import InfluencerReview from "../models/influencer-review-model";
import Influencer from "../models/influencer-model";
import fs from "fs";
import path from "path";

const getMe = async (req: Request, res: Response): Promise<void> => {
  if (!req.user) {
    res
      .status(401)
      .json({ message: "You are not authorized to access this resource." });
    return;
  }

  const userId = req.user.id;

  try {
    const user = await User.findByPk(userId);

    if (!user) {
      res.status(404).json({
        message: "No user account found with the provided credentials.",
      });
      return;
    }

    const { id, email, fullname, profile_image } = user.get();

    res.status(200).json({
      message: "Your account details were retrieved successfully.",
      user: {
        id,
        email,
        fullname,
        profile_image,
      },
    });
  } catch (error) {
    res.status(500).json({
      message:
        "An unexpected error occurred while retrieving your information.",
    });
  }
};

const getReviewsByUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { user_id } = req.params;
    const loggedInUserId = req.user?.id;

    if (user_id !== loggedInUserId) {
      res.status(403).json({ message: "Unauthorized access to reviews." });
      return;
    }

    const reviews = await InfluencerReview.findAll({
      where: { user_id },
      include: [
        {
          model: Influencer,
          attributes: ["id", "fullname", "handle", "profile_image", "location"],
        },
      ],
      order: [["createdAt", "DESC"]],
    });

    if (reviews.length === 0) {
      res.status(404).json({ message: "No reviews yet." });
      return;
    }

    res.status(200).json({
      message: "Reviews fetched successfully.",
      reviews,
    });
  } catch (error) {
    console.error("Error fetching reviews by user:", error);
    res.status(500).json({ message: "Internal server error." });
  }
};

const updateMe = async (req: Request, res: Response): Promise<void> => {
  const userId = req.user!.id;
  const { fullname } = req.body;
  const file = req.file;

  try {
    const user = await User.findByPk(userId);
    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    if (fullname !== undefined) user.set("fullname", fullname);

    const previousImage = user.get("profile_image") as string;

    if (file) {
      user.set("profile_image", file.filename);
    }

    try {
      await user.save(); // Only save now
    } catch (error) {
      if (file) {
        deleteUserProfileImageFromDisk(file.filename);
      }

      res.status(500).json({ message: "Failed to update user profile." });
      return;
    }

    // Delete old image only after successful update
    if (file && previousImage && previousImage !== file.filename) {
      deleteUserProfileImageFromDisk(previousImage);
    }

    res.status(200).json({
      message: "Your profile has been updated successfully",
      user: {
        fullname: user.get("fullname"),
        profile_image: user.get("profile_image"),
      },
    });
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ message: "Internal server error!" });
  }
};

/**
 * Deletes a file if it exists, logs errors if any.
 */
const deleteUserProfileImageFromDisk = (filename: string) => {
  const fullPath = path.join(
    __dirname,
    "../../public/images/uploads/user-profiles",
    filename
  );
  if (fs.existsSync(fullPath)) {
    try {
      fs.unlinkSync(fullPath);
      console.log(`Deleted file: ${fullPath}`);
    } catch (err) {
      console.error(`Failed to delete file: ${fullPath}`, err);
    }
  }
};

export { getMe, updateMe, getReviewsByUser };
