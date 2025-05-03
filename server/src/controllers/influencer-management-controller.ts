import { Request, Response } from "express";
import { Op, ValidationError } from "sequelize";
import Influencer from "../models/influencer-model";
import { sequelize } from "../db/sequelize";

import fs from "fs";
import path from "path";

const updateInfluencer = async (req: Request, res: Response): Promise<void> => {
  const uploadedFile = req.file;
  let previousImageFilename: string | null = null;

  try {
    const { influencer_id } = req.params;
    const userId = req?.user?.id;
    const { fullname, bio, location } = req.body;

    if (!influencer_id) {
      res.status(400).json({ message: "Influencer ID is required." });
      return;
    }

    // Find influencer by ID and user_id
    const influencer = await Influencer.findOne({
      where: {
        id: influencer_id,
        user_id: userId,
      },
    });

    if (!influencer) {
      // Clean up uploaded image if influencer not found
      if (uploadedFile) {
        deleteInfluencerProfileImageFromDisk(uploadedFile.filename);
      }

      res.status(404).json({
        message: `Influencer not found or unauthorized.`,
      });
      return;
    }

    // Save old image name to delete after update
    previousImageFilename = (influencer.get("profile_image") as string) || null;

    // Prepare update data
    const updateData: Partial<Record<string, any>> = {};
    if (fullname) updateData.fullname = fullname;
    if (bio) updateData.bio = bio;
    if (location) updateData.location = location;
    if (uploadedFile) updateData.profile_image = uploadedFile.filename;

    await influencer.update(updateData);

    // Delete old image if a new one was uploaded and update succeeded
    if (uploadedFile && previousImageFilename) {
      deleteInfluencerProfileImageFromDisk(previousImageFilename);
    }

    res.status(200).json({
      message: "Influencer updated successfully.",
      influencer,
    });
  } catch (error: any) {
    // Delete newly uploaded image if update fails
    if (uploadedFile) {
      deleteInfluencerProfileImageFromDisk(uploadedFile.filename);
    }

    if (error instanceof ValidationError) {
      res.status(400).json({
        message: error.errors[0].message,
        path: error.errors[0].path,
      });
      return;
    }

    res.status(500).json({
      message: error.message || "Internal server error.",
    });
  }
};

// Helper to delete a file
function deleteInfluencerProfileImageFromDisk(filename: string) {
  const filePath = path.join(
    __dirname,
    "../../public/images/uploads/influencer-profiles",
    filename
  );
  fs.unlink(filePath, (err) => {
    if (err) {
      console.error("Failed to delete file:", filename, err);
    } else {
      console.log("Deleted file:", filename);
    }
  });
}

const deleteInfluencer = async (req: Request, res: Response): Promise<void> => {
  const transaction = await sequelize.transaction();
  try {
    const { influencer_id } = req.params;
    const user_id = req.user?.id;

    if (!influencer_id) {
      res.status(400).json({ message: "Handle is required." });
      return;
    }

    const influencer = await Influencer.findOne({
      where: { id: influencer_id, user_id },
      transaction,
    });

    if (!influencer) {
      res.status(404).json({
        message: `Influencer not found or unauthorized.`,
      });
      return;
    }

    /** 
     This will automatically delete associated records 
    (InfluencerCategory, InfluencerSocialPlatform) due to onDelete: "CASCADE".
    */
    await influencer.destroy({ transaction });

    await transaction.commit();

    res.status(200).json({
      message: `Influencer and related data deleted successfully.`,
    });
  } catch (error: any) {
    await transaction.rollback();
    res.status(500).json({
      message: error.message || "Internal server error.",
    });
  }
};

export { updateInfluencer, deleteInfluencer };
