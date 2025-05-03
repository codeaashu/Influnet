// Import necessary modules and controllers
import express from "express";
import * as InfluencerCategoryController from "../controllers/influencer-category-controller";
import authenticate from "../middleware/authenticate";

// Create a new router instance for influencer categories
const influencerCategoryRoutes = express.Router();

/**
 * @route   GET /api/influencers/categories
 * @desc    Get all unique influencer categories (case-insensitive)
 * @access  Public
 * @body    None
 */
influencerCategoryRoutes.get(
  "/",
  InfluencerCategoryController.getAllInfluencerCategories
);

/**
 * @route   POST /api/influencers/categories/:influencer_id
 * @desc    Create a single category for a specific influencer
 * @access  Private (Requires authentication)
 * @requiredBody {
 *   category: string
 * }
 */
influencerCategoryRoutes.post(
  "/:influencer_id",
  authenticate,
  InfluencerCategoryController.createCategoryForInfluencer
);

/**
 * @route   DELETE /api/influencers/categories/:influencer_id
 * @desc    Delete a specific category for a given influencer
 * @access  Private (Requires authentication)
 * @requiredBody {
 *   category_id: string
 * }
 */
influencerCategoryRoutes.delete(
  "/:influencer_id",
  authenticate,
  InfluencerCategoryController.deleteCategoryForInfluencer
);

// Export the routes for use in the main app
export default influencerCategoryRoutes;
