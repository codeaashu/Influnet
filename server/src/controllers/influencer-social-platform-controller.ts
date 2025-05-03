import { Request, Response } from "express";
import { sequelize } from "../db/sequelize";
import Influencer from "../models/influencer-model";
import InfluencerSocialPlatform from "../models/influencer-social-platform-model";
import { ValidationError } from "sequelize";
import SocialMediaPlatform from "../models/social-media-platform-model";

const getAllSocialMediaPlatforms = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const platforms = await SocialMediaPlatform.findAll();

    if (platforms.length === 0) {
      res.status(404).json({ message: "No platforms found." });
      return;
    }
    res.status(200).json({
      message: "Social platforms fetched successfully.",
      socialMediaPlatforms: platforms,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error.",
    });
  }
};

const getHighestFollowerCount = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const topPlatform = await InfluencerSocialPlatform.findOne({
      order: [["follower_count", "DESC"]],
      attributes: ["follower_count"],
    });

    if (!topPlatform) {
      res.status(404).json({ message: "No social platform records found." });
      return;
    }

    res.status(200).json({
      message: "Highest global follower count retrieved successfully.",
      higest_followers: topPlatform,
    });
  } catch (error: any) {
    res.status(500).json({
      message: error.message || "Internal server error.",
    });
  }
};

const createInfluencerSocialPlatform = async (
  req: Request,
  res: Response
): Promise<void> => {
  const transaction = await sequelize.transaction();

  try {
    const { influencer_id } = req.params;
    const user_id = req?.user?.id;

    const { platform_id, platform_profile_link, follower_count } = req.body;

    if (!platform_id || !platform_profile_link) {
      res
        .status(400)
        .json({ message: "Platform ID and profile link are required." });
      return;
    }

    if (!influencer_id) {
      res.status(400).json({ message: "Influencer ID is required." });
      return;
    }

    // Check if influencer exists and belongs to the authenticated user
    const influencer = await Influencer.findOne({
      where: { id: influencer_id, user_id },
      transaction,
    });

    if (!influencer) {
      res
        .status(404)
        .json({ message: "Influencer not found or unauthorized." });
      return;
    }

    // Check if the platform already exists for this influencer
    // const existingPlatform = await InfluencerSocialPlatform.findOne({
    //   where: {
    //     influencer_id,
    //     platform_id,
    //   },
    //   transaction,
    // });

    // if (existingPlatform) {
    //   res.status(400).json({
    //     message: "This platform is already linked to the influencer.",
    //     field: "platform_id",
    //     platform_id,
    //   });
    //   return;
    // }

    // Create the new social platform for the influencer
    const newSocialPlatform = await InfluencerSocialPlatform.create(
      {
        influencer_id,
        platform_id,
        platform_profile_link,
        follower_count,
      },
      { transaction }
    );

    await transaction.commit();

    res.status(201).json({
      message: "New social platform added.",
      influencerSocialPlatform: newSocialPlatform,
    });
  } catch (error: any) {
    await transaction.rollback();

    if (error instanceof ValidationError) {
      const uniqueError = error.errors.find(
        (err) =>
          err.type === "unique violation" &&
          err.path === "platform_profile_link"
      );
      console.log(uniqueError);
      if (uniqueError) {
        res.status(400).json({
          message: uniqueError.message,
          field: "platform_profile_link",
          description: uniqueError.value,
        });
        return;
      }
    }
    res
      .status(500)
      .json({ message: error.message || "Internal server error." });
  }
};

const updateInfluencerSocialPlatform = async (
  req: Request,
  res: Response
): Promise<void> => {
  const transaction = await sequelize.transaction();

  try {
    const { influencer_id } = req.params;
    const user_id = req?.user?.id;

    const { platform_id, platform_profile_link, follower_count } = req.body;

    if (!influencer_id) {
      res.status(400).json({ message: "Influencer ID is required." });
      return;
    }

    if (!platform_id || !platform_profile_link) {
      res.status(400).json({
        message: "Platform ID and profile link are required.",
      });
      return;
    }

    // Check if influencer exists and belongs to the authenticated user
    const influencer = await Influencer.findOne({
      where: { id: influencer_id, user_id },
      transaction,
    });

    if (!influencer) {
      res
        .status(404)
        .json({ message: "Influencer not found or unauthorized." });
      return;
    }

    // Check if the platform exists for this influencer
    const existingPlatform = await InfluencerSocialPlatform.findOne({
      where: {
        influencer_id,
        platform_id,
      },
      transaction,
    });

    if (!existingPlatform) {
      res.status(404).json({
        message: "Platform not linked to this influencer.",
      });
      return;
    }

    // Update the existing social platform
    const updatedSocialPlatform = await existingPlatform.update(
      {
        platform_profile_link,
        follower_count:
          follower_count ?? existingPlatform.get("follower_count"),
      },
      { transaction }
    );

    await transaction.commit();

    res.status(200).json({
      message: "Social platform updated.",
      influencerSocialPlatform: updatedSocialPlatform,
    });
  } catch (error: any) {
    await transaction.rollback();

    if (error instanceof ValidationError) {
      const uniqueError = error.errors.find(
        (err) =>
          err.type === "unique violation" &&
          err.path === "platform_profile_link"
      );

      if (uniqueError) {
        res.status(400).json({
          message: uniqueError.message,
          field: "platform_profile_link",
          platform_profile_link: uniqueError.value,
        });
        return;
      }
    }

    res
      .status(500)
      .json({ message: error.message || "Internal server error." });
  }
};

const deleteInfluencerSocialPlatform = async (
  req: Request,
  res: Response
): Promise<void> => {
  const transaction = await sequelize.transaction();

  try {
    const { influencer_id } = req.params;
    const { platform_id } = req.body;
    const user_id = req?.user?.id;

    if (!influencer_id || !platform_id) {
      res
        .status(400)
        .json({ message: "Influencer ID and platform ID are required." });
      return;
    }

    // Check if influencer exists and belongs to the authenticated user
    const influencer = await Influencer.findOne({
      where: { id: influencer_id, user_id },
      transaction,
    });

    if (!influencer) {
      res
        .status(404)
        .json({ message: "Influencer not found or unauthorized." });
      return;
    }

    // Check if the platform exists for this influencer
    const existingPlatform = await InfluencerSocialPlatform.findOne({
      where: {
        influencer_id,
        id: platform_id,
      },
      transaction,
    });

    if (!existingPlatform) {
      res
        .status(404)
        .json({ message: "Platform not linked to this influencer." });
      return;
    }

    // Delete the platform
    await existingPlatform.destroy({ transaction });
    await transaction.commit();

    res.status(200).json({
      message: "Social platform deleted.",
    });
  } catch (error: any) {
    await transaction.rollback();
    res
      .status(500)
      .json({ message: error.message || "Internal server error." });
  }
};

export {
  getAllSocialMediaPlatforms,
  getHighestFollowerCount,
  createInfluencerSocialPlatform,
  updateInfluencerSocialPlatform,
  deleteInfluencerSocialPlatform,
};
