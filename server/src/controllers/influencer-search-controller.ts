// controllers/search-controller.ts
import { Request, Response } from "express";
import { Op, Sequelize } from "sequelize";
import Influencer from "../models/influencer-model";
import InfluencerReview from "../models/influencer-review-model";
import InfluencerSocialPlatform from "../models/influencer-social-platform-model";

export const searchInfluencers = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const {
      q,
      platform_id,
      category,
      min_followers,
      max_followers,
      min_rating,
    } = req.query;

    const whereClause: any = {};

    if (q) {
      whereClause[Op.or] = [
        { fullname: { [Op.iLike]: `%${q}%` } },
        { handle: { [Op.iLike]: `%${q}%` } },
      ];
    }

    if (category) {
      whereClause.category = { [Op.iLike]: `%${category}%` };
    }

    const include: any = [
      {
        model: InfluencerSocialPlatform,
        as: "socialPlatforms",
        where: {},
        required: false,
      },
      {
        model: InfluencerReview,
        as: "reviews",
        attributes: [],
        required: false,
      },
    ];

    // Filter by platform
    if (platform_id) {
      include[0].where.platform_id = platform_id;
      include[0].required = true;
    }

    // Filter by follower range
    if (min_followers || max_followers) {
      include[0].where.follower_count = {
        ...(min_followers && { [Op.gte]: +min_followers }),
        ...(max_followers && { [Op.lte]: +max_followers }),
      };
      include[0].required = true;
    }

    const influencers = await Influencer.findAll({
      where: whereClause,
      include,
      attributes: {
        include: [
          [
            Sequelize.fn("AVG", Sequelize.col("influencerReviews.rating")),
            "avg_review_score",
          ],
        ],
      },
      group: ["Influencer.id", "socialPlatforms.id"],
      having: min_rating
        ? Sequelize.literal(
            `AVG("influencerReviews"."rating") >= ${+min_rating}`
          )
        : undefined,
    });

    res.status(200).json({
      message: "Search successful.",
      influencers,
    });
  } catch (error) {
    console.error("Search error:", error);
    res.status(500).json({ message: "Internal server error." });
  }
};
