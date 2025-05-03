import { Request, Response } from "express";
import InfluencerCategory from "../models/influencer-category-model";
import { Op, fn, col, where } from "sequelize";
import { sequelize } from "../db/sequelize";
import Influencer from "../models/influencer-model";

const getAllInfluencerCategories = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const categoriesRaw = (await InfluencerCategory.findAll({
      attributes: [
        [
          sequelize.fn("LOWER", sequelize.col("category_name")),
          "category_name",
        ],
      ],
      group: [sequelize.fn("LOWER", sequelize.col("category_name"))],
      order: [[sequelize.fn("LOWER", sequelize.col("category_name")), "ASC"]],
      raw: true,
    })) as unknown as Array<{ category_name: string }>;

    const categories = categoriesRaw.map((item) => item.category_name);

    if (categories.length === 0) {
      res.status(404).json({ message: "No categories found." });
      return;
    }

    res.status(200).json({
      message: "Unique categories retrieved successfully.",
      categories: categories,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error." });
  }
};

const createCategoryForInfluencer = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { influencer_id } = req.params;
    const userId = req?.user?.id;
    const { category } = req.body;

    if (!influencer_id) {
      res.status(400).json({ message: "Influencer ID is required." });
      return;
    }

    if (!category || typeof category !== "string") {
      res.status(400).json({ message: "A valid category is required." });
      return;
    }

    // Step 1: Check if influencer exists and belongs to the user
    const influencer = await Influencer.findOne({
      where: { id: influencer_id, user_id: userId },
    });

    if (!influencer) {
      res.status(404).json({
        message: "Influencer not found or unauthorized.",
      });
      return;
    }

    // Step 2: Check if the category already exists for this influencer (case-insensitive)
    const existingCategory = await InfluencerCategory.findOne({
      where: {
        influencer_id,
        [Op.and]: where(
          fn("LOWER", col("category_name")),
          category.toLowerCase()
        ),
      },
    });

    if (existingCategory) {
      console.log(existingCategory);
      res.status(409).json({
        message: "Category already exists for this influencer.",
      });
      return;
    }

    // Step 3: Create the category
    const createdCategory = await InfluencerCategory.create({
      influencer_id,
      category_name: category,
    });

    res.status(201).json({
      message: "New category added.",
      category: createdCategory,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error." });
  }
};

const deleteCategoryForInfluencer = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { influencer_id } = req.params;
    const userId = req?.user?.id;
    const { category_id } = req.body;

    if (!influencer_id || !category_id) {
      res
        .status(400)
        .json({ message: "Influencer ID and category ID are required." });
      return;
    }

    // Check if the influencer belongs to the authenticated user
    const influencer = await Influencer.findOne({
      where: { id: influencer_id, user_id: userId },
    });

    if (!influencer) {
      res
        .status(404)
        .json({ message: "Influencer not found or unauthorized." });
      return;
    }

    // Delete the specific category
    const deleted = await InfluencerCategory.destroy({
      where: {
        id: category_id,
        influencer_id,
      },
    });

    if (deleted === 0) {
      res
        .status(404)
        .json({ message: "Category not found for this influencer." });
      return;
    }

    res.status(200).json({ message: "Category removed from the list." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error." });
  }
};

export {
  getAllInfluencerCategories,
  createCategoryForInfluencer,
  deleteCategoryForInfluencer,
};
