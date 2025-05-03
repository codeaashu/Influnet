import { Request, Response } from "express";
import Influencer from "../models/influencer-model";
import InfluencerReview from "../models/influencer-review-model";
import User from "../models/user-model";

const getReviewsForInfluencer = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { influencer_id } = req.params;

    if (!influencer_id) {
      res.status(400).json({ message: "Influencer ID is required." });
      return;
    }

    const influencer = await Influencer.findByPk(influencer_id);

    if (!influencer) {
      res.status(404).json({ message: "Influencer not found." });
      return;
    }

    const reviews = await InfluencerReview.findAll({
      where: { influencer_id },
      include: [
        {
          model: User,
          attributes: ["id", "fullname", "profile_image"], // include basic user info
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
    res.status(500).json({ message: "Internal server error." });
  }
};

const createReviewForInfluencer = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { influencer_id } = req.params;
    const user_id = req?.user?.id;
    const { rating, comment } = req.body;

    if (!influencer_id || !user_id) {
      res.status(400).json({ message: "Missing influencer ID or user ID." });
      return;
    }

    if (typeof rating !== "number" || rating < 1 || rating > 5) {
      res
        .status(400)
        .json({ message: "Rating must be a number between 1 and 5." });
      return;
    }

    if (!comment || typeof comment !== "string") {
      res
        .status(400)
        .json({ message: "Comment is required and must be a string." });
      return;
    }

    const influencer = await Influencer.findByPk(influencer_id);
    if (!influencer) {
      res.status(404).json({ message: "Influencer not found." });
      return;
    }

    // Check if review already exists for this user and influencer
    const existingReview = await InfluencerReview.findOne({
      where: { influencer_id, user_id },
    });

    if (existingReview) {
      res.status(400).json({
        message: "You have already submitted a review for this influencer.",
      });
      return;
    }

    const review = await InfluencerReview.create({
      influencer_id,
      user_id,
      rating,
      comment,
    });

    res.status(201).json({
      message: "Review added successfully.",
      review,
    });
  } catch (error) {
    res.status(500).json({ message: "Internal server error." });
  }
};

const updateInfluencerReview = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { influencer_id } = req.params;
    const user_id = req.body?.user?.id;
    const { rating, comment } = req.body;

    if (!influencer_id || !user_id) {
      res.status(400).json({ message: "Missing influencer or user ID." });
      return;
    }

    if (typeof rating !== "number" || rating < 1 || rating > 5) {
      res
        .status(400)
        .json({ message: "Rating must be a number between 1 and 5." });
      return;
    }

    if (!comment || typeof comment !== "string") {
      res
        .status(400)
        .json({ message: "Comment is required and must be a string." });
      return;
    }

    const influencer = await Influencer.findByPk(influencer_id);
    if (!influencer) {
      res.status(404).json({ message: "Influencer not found." });
      return;
    }

    const review = await InfluencerReview.findOne({
      where: {
        user_id,
        influencer_id,
      },
    });

    if (!review) {
      res.status(404).json({ message: "Review not found for this user." });
      return;
    }

    review.set("rating", rating);
    review.set("comment", comment);
    await review.save();

    res.status(200).json({
      message: "Review updated successfully.",
      review,
    });
  } catch (error) {
    console.error("Error updating influencer review:", error);
    res.status(500).json({ message: "Internal server error." });
  }
};

export {
  getReviewsForInfluencer,
  createReviewForInfluencer,
  updateInfluencerReview,
};
