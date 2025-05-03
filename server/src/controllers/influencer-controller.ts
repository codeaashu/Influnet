import { Request, Response } from "express";
import { ValidationError, Op, Sequelize, Model } from "sequelize";
import { sequelize } from "../db/sequelize";
import Influencer from "../models/influencer-model";
import InfluencerSocialPlatform from "../models/influencer-social-platform-model";
import InfluencerCategory from "../models/influencer-category-model";
import SocialMediaPlatform from "../models/social-media-platform-model";
import InfluencerReview from "../models/influencer-review-model";
import path from "path";
import fs from "fs";
import { InfluencerReviewAttributes } from "../types/influencer-review";
import User from "../models/user-model";

const createInfluencer = async (req: Request, res: Response): Promise<void> => {
  const transaction = await sequelize.transaction();
  let socialPlatforms: {
    platform_id: string;
    follower_count: number;
    platform_profile_link: string;
  }[] = [];

  const user_id = req?.user?.id;
  if (!user_id) {
    res.status(401).json({ message: "Unauthorized. Missing user ID." });
    return;
  }

  try {
    const { fullname, handle, bio, location } = req.body;

    // Get the uploaded image filename
    const profileImageFile = req.file;
    const profile_image = profileImageFile ? profileImageFile.filename : "";

    // Parse JSON fields
    const platformsFromBody = JSON.parse(req.body.socialPlatforms || "[]");
    const categories = JSON.parse(req.body.categories || "[]");

    // Assign for catch block access
    socialPlatforms = platformsFromBody;

    if (
      !fullname ||
      !handle ||
      !profile_image ||
      !location ||
      !Array.isArray(platformsFromBody) ||
      platformsFromBody.length === 0 ||
      !Array.isArray(categories) ||
      categories.length === 0
    ) {
      res.status(400).json({ message: "Missing required fields." });
      return;
    }

    // Check for duplicate platform_ids
    const seenPlatformIds = new Set<string>();
    const duplicatePlatform = platformsFromBody.find((platform) => {
      if (seenPlatformIds.has(platform.platform_id)) return true;
      seenPlatformIds.add(platform.platform_id);
      return false;
    });

    if (duplicatePlatform) {
      res.status(400).json({
        message: "Can't add same platform multiple times.",
      });
      return;
    }

    // Check for duplicate categories (case-insensitive)
    const seenCategories = new Set<string>();
    const duplicateCategory = categories.find((category) => {
      const lower = category.trim().toLowerCase();
      if (seenCategories.has(lower)) return true;
      seenCategories.add(lower);
      return false;
    });

    if (duplicateCategory) {
      res.status(400).json({
        message: "Can't add the same category multiple times.",
        field: "categories",
        duplicate: duplicateCategory,
      });
      return;
    }

    // Check handle uniqueness
    const existingInfluencer = await Influencer.findOne({
      where: {
        handle: {
          [Op.iLike]: handle,
        },
      },
    });

    if (existingInfluencer) {
      res.status(400).json({
        message: "The handle is already taken.",
        field: "handle",
      });
      return;
    }

    // Create influencer
    const influencer = await Influencer.create(
      {
        user_id,
        fullname,
        handle,
        profile_image,
        bio,
        location,
      },
      { transaction }
    );

    const influencerId = influencer.get("id") as string;

    // Create social platforms
    const socialEntries = platformsFromBody.map((platform) => ({
      ...platform,
      influencer_id: influencerId,
    }));

    await InfluencerSocialPlatform.bulkCreate(socialEntries, { transaction });

    // Create categories
    const categoryEntries = categories.map((name) => ({
      influencer_id: influencerId,
      category_name: name,
    }));

    await InfluencerCategory.bulkCreate(categoryEntries, { transaction });

    await transaction.commit();

    res.status(201).json({
      message: "Welcome aboard! Influencer is now live on InfluencrIn.",
      influencer,
    });
  } catch (error: any) {
    await transaction.rollback();

    // Delete uploaded file if DB creation failed
    if (req.file) {
      const filePath = path.join(
        __dirname,
        "../../public/images/uploads/influencer-profiles",
        req.file.filename
      );
      fs.unlink(filePath, (err) => {
        if (err) {
          console.error("Failed to delete uploaded file:", err);
        } else {
          console.log("Uploaded file deleted due to error.");
        }
      });
    }

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
          description: uniqueError.value,
        });
        return;
      }
    }

    res.status(500).json({
      message: error.message || "Internal server error.",
    });
  }
};

const getAllInfluencers = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const influencers = await Influencer.findAll({
      include: [
        {
          model: InfluencerSocialPlatform,
          as: "InfluencerSocialPlatforms",
          include: [
            {
              model: SocialMediaPlatform,
              as: "SocialMediaPlatform",
            },
          ],
        },
        {
          model: InfluencerCategory,
          as: "InfluencerCategories",
        },
      ],
      order: [["createdAt", "DESC"]],
    });

    // if (influencers.length === 0) {
    //   res.status(404).json({ message: "No influencers found." });
    //   return;
    // }

    res.status(200).json({
      message: "Influencers fetched successfully.",
      influencers,
    });
  } catch (error: any) {
    res.status(500).json({
      message: error.message || "Internal server error.",
    });
  }
};

const searchInfluencers = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const {
      q,
      platform_names,
      category_names,
      min_followers,
      max_followers,
      min_rating,
    } = req.query;

    const whereClause: any = {};
    const include: any = [
      {
        model: InfluencerSocialPlatform,
        as: "socialPlatforms",
        attributes: ["platform_profile_link", "follower_count"],
        include: [
          {
            model: SocialMediaPlatform,
            as: "platform",
            attributes: ["platform_name", "platform_icon_url"],
          },
        ],
      },
      {
        model: InfluencerCategory,
        as: "categories",
        attributes: ["category_name"],
      },
      {
        model: InfluencerReview,
        as: "reviews",
        attributes: [],
      },
    ];

    // 🔍 Search by fullname or handle

    if (q) {
      let normalizedQuery: string | undefined;

      if (typeof q === "string") {
        normalizedQuery = q.toLowerCase().replace(/\s+/g, "");
      }

      whereClause[Op.or] = [
        Sequelize.where(
          Sequelize.fn(
            "REPLACE",
            Sequelize.fn("LOWER", Sequelize.col("fullname")),
            " ",
            ""
          ),
          {
            [Op.like]: `%${normalizedQuery}%`,
          }
        ),
        { handle: { [Op.iLike]: `%${q}%` } },
      ];
    }

    // Filter by multiple platform names
    if (platform_names) {
      const platformList =
        typeof platform_names === "string"
          ? platform_names.split(",").map((name) => name.trim())
          : Array.isArray(platform_names)
          ? platform_names.map((p) => String(p).trim())
          : [];

      include[0].include[0].where = {
        [Op.or]: platformList.map((name) => ({
          platform_name: { [Op.iLike]: name },
        })),
      };

      include[0].required = true;
    }

    // Filter by multiple categories
    if (category_names) {
      const categoryList =
        typeof category_names === "string"
          ? category_names.split(",").map((name) => name.trim())
          : Array.isArray(category_names)
          ? category_names.map((c) => String(c).trim())
          : [];

      include[1].where = {
        [Op.or]: categoryList.map((cat) => ({
          category_name: { [Op.iLike]: cat },
        })),
      };

      include[1].required = true;
    }

    // 🔎 Filter by follower count range
    if (min_followers || max_followers) {
      include[0].where = {
        ...(include[0].where || {}),
        follower_count: {
          ...(min_followers && { [Op.gte]: +min_followers }),
          ...(max_followers && { [Op.lte]: +max_followers }),
        },
      };
      include[0].required = true;
    }

    // 🧮 Define all the necessary attributes & Include avg review score

    const attributes: any = [
      "id",
      "fullname",
      "handle",
      "profile_image",
      "location",
      [
        Sequelize.literal('CAST(AVG("reviews"."rating") AS NUMERIC(10, 1))'),
        "avg_review_score",
      ],
    ];

    // 🔎 Filter by avg review score
    let having: any;

    if (min_rating) {
      having = Sequelize.where(
        Sequelize.fn("AVG", Sequelize.col("reviews.rating")),
        {
          [Op.gte]: +min_rating,
        }
      );
    }

    const influencers = await Influencer.findAll({
      where: whereClause,
      include,
      attributes,
      group: [
        "Influencer.id",
        "socialPlatforms.id",
        "socialPlatforms->platform.id",
        "categories.id",
      ],
      having,
    });

    // if (!influencers.length) {
    //   res.status(404).json({ message: "No influencers found." });
    //   return;
    // }

    res.status(200).json({
      message: "Influencers fetched successfully.",
      influencers,
    });
  } catch (error: any) {
    console.error("Error fetching influencers:", error);
    res.status(500).json({
      message: error.message || "Internal server error.",
    });
  }
};

const getInfluencerByHandle = async (
  req: Request<{ handle: string }, any, any, any>,
  res: Response
): Promise<void> => {
  try {
    const { handle } = req.params;

    if (!handle) {
      res.status(400).json({ message: "Handle is required." });
      return;
    }

    // Find influencer with associated models, including reviews
    const influencer = await Influencer.findOne({
      where: {
        handle: {
          [Op.iLike]: handle, // case-insensitive match
        },
      },
      include: [
        {
          model: InfluencerSocialPlatform,
          as: "socialPlatforms",
          include: [
            {
              model: SocialMediaPlatform,
              as: "platform",
            },
          ],
        },
        {
          model: InfluencerCategory,
          as: "categories",
        },
        {
          model: InfluencerReview,
          as: "reviews",
          attributes: ["id", "rating", "comment", "createdAt"],
          include: [
            {
              model: User,
              as: "author",
              attributes: ["id", "fullname", "profile_image"],
            },
          ],
        },
      ],
    });

    if (!influencer) {
      res
        .status(404)
        .json({ message: `Influencer not found with handle "${handle}".` });
      return;
    }

    // Return influencer data with the calculated average rating and all reviews
    res.status(200).json({
      message: "Influencer fetched successfully.",
      influencer,
    });
  } catch (error: any) {
    res.status(500).json({
      message: error.message || "Internal server error.",
    });
  }
};

const getInfluencersByUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const userId = req.user?.id;

    if (!userId) {
      res.status(401).json({ message: "Unauthorized. User ID missing." });
      return;
    }

    const influencers = await Influencer.findAll({
      where: { user_id: userId },
      attributes: {
        include: [
          [
            Sequelize.literal(
              'CAST(AVG("reviews"."rating") AS NUMERIC(10, 1))'
            ),
            "avg_rating_score",
          ],
        ],
      },
      include: [
        {
          model: InfluencerSocialPlatform,
          as: "socialPlatforms",
          include: [
            {
              model: SocialMediaPlatform,
              as: "platform",
            },
          ],
        },
        {
          model: InfluencerCategory,
          as: "categories",
        },
        {
          model: InfluencerReview,
          as: "reviews",
          attributes: [], // no need to include reviews here, just for aggregation
        },
      ],
      group: [
        "Influencer.id",
        "socialPlatforms.id",
        "socialPlatforms->platform.id",
        "categories.id",
      ],
      order: [["createdAt", "DESC"]],
    });

    res.status(200).json({
      message: "Influencers fetched successfully.",
      influencers,
    });
  } catch (error: any) {
    res.status(500).json({
      message: error.message || "Internal server error.",
    });
  }
};

export {
  createInfluencer,
  getAllInfluencers,
  searchInfluencers,
  getInfluencerByHandle,
  getInfluencersByUser,
};
