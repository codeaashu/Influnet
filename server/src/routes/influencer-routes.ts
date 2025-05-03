// Import necessary modules and controllers
import express from "express";
import * as InfluencerController from "../controllers/influencer-controller";
import * as InfluencerManagementController from "../controllers/influencer-management-controller";
import authenticate from "../middleware/authenticate";
import { multerInfluencerProfileImageUpload } from "../middleware/multer-influencer-profile-upload";

// Create a new router instance for influencer
const influencerRoutes = express.Router();

/**
 * @route   GET /api/influencers
 * @desc    Fetch all influencers (public access)
 * @access  Public
 */
influencerRoutes.get("/", InfluencerController.getAllInfluencers);

// routes/search-routes.ts

const searchRoutes = express.Router();

/**
 * @route   GET /api/search
 * @desc    Search and filter influencers
 * @access  Public
 * @query   {
 *            q?: string,
 *            platform_names?: string,
 *            category_names?: string,
 *            min_followers?: number,
 *            max_followers?: number,
 *            min_rating?: number
 *          }
 */
influencerRoutes.get("/search", InfluencerController.searchInfluencers);

/**
 * @route   GET /api/influencers/me
 * @desc    Get influencers created by the authenticated user
 * @access  Private
 * @body    None
 */
influencerRoutes.get(
  "/me",
  authenticate,
  InfluencerController.getInfluencersByUser
);

/**
 * @route   GET /api/influencers/:handle
 * @desc    Get a specific influencer by their unique handle
 * @access  Public
 * @body    None
 */
influencerRoutes.get("/:handle", InfluencerController.getInfluencerByHandle);

/**
 * @route   POST /api/influencers
 * @desc    Create a new influencer
 * @access  Private
 * @body    multipart/form-data:
 *            - fullname: string (required)
 *            - handle: string (required)
 *            - profile_image: File (required)
 *            - location: string (required)
 *            - socialPlatforms: stringified JSON array of objects (required)
 *                e.g. [{"platform_id":"1","follower_count":1000,"platform_profile_link":"..."}]
 *            - categories: stringified JSON array (required)
 *                e.g. ["fashion", "travel"]
 *            - bio: string (optional, character limit 204)
 */
influencerRoutes.post(
  "/",
  multerInfluencerProfileImageUpload.single("profile_image"),
  authenticate,
  InfluencerController.createInfluencer
);

/**
 * @route   PUT /api/influencers/:influencer_id
 * @desc    Update an existing influencer by ID
 * @access  Private
 * @body    {
 *            fullname?: string (optional),
 *            profile_image?: string (optional),
 *            location?: string (optional),
 *            bio?: string (optional, character limit 204)
 *          }
 */
influencerRoutes.put(
  "/:influencer_id",
  multerInfluencerProfileImageUpload.single("profile_image"),
  authenticate,
  InfluencerManagementController.updateInfluencer
);

/**
 * @route   DELETE /api/influencers/:influencer_id
 * @desc    Delete an influencer by ID
 * @access  Private
 * @body    None
 */
influencerRoutes.delete(
  "/:influencer_id",
  authenticate,
  InfluencerManagementController.deleteInfluencer
);

export default influencerRoutes;
