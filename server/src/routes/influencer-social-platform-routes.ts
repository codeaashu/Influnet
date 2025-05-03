// Import necessary modules and controllers
import express from "express";
import * as InfluencerSocialPlatformController from "../controllers/influencer-social-platform-controller";
import authenticate from "../middleware/authenticate";

// Create router instance
const influencerSocialPlatformRoutes = express.Router();

/**
 * @route   GET /api/influencers/social-platforms
 * @desc    Fetch all social media platforms used by influencers
 * @access  Public
 * @body    None
 */
influencerSocialPlatformRoutes.get(
  "/",
  InfluencerSocialPlatformController.getAllSocialMediaPlatforms
);

influencerSocialPlatformRoutes.get(
  "/highest-followers",
  InfluencerSocialPlatformController.getHighestFollowerCount
);

/**
 * @route   POST /api/influencers/social-platforms/:influencer_id
 * @desc    Create a social media platform entry for a specific influencer
 * @access  Private
 * @body    {
 *            platform_id: string (required),
 *            platform_profile_link: string (required),
 *            follower_count?: number (optional)
 *          }
 */
influencerSocialPlatformRoutes.post(
  "/:influencer_id",
  authenticate,
  InfluencerSocialPlatformController.createInfluencerSocialPlatform
);

/**
 * @route   PUT /api/influencers/social-platforms/:influencer_id
 * @desc    Update a social media platform entry for a specific influencer
 * @access  Private
 * @body    {
 *            platform_id: string (required),
 *            platform_profile_link: string (required),
 *            follower_count?: number (optional)
 *          }
 */
influencerSocialPlatformRoutes.put(
  "/:influencer_id",
  authenticate,
  InfluencerSocialPlatformController.updateInfluencerSocialPlatform
);

/**
 * @route   DELETE /api/influencers/social-platforms/:influencer_id
 * @desc    Delete a social media platform entry for a specific influencer
 * @access  Private
 * @body    {
 *            platform_id: string (required)
 *          }
 */
influencerSocialPlatformRoutes.delete(
  "/:influencer_id",
  authenticate,
  InfluencerSocialPlatformController.deleteInfluencerSocialPlatform
);

export default influencerSocialPlatformRoutes;
