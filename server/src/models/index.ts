import User from "./user-model";
import Influencer from "./influencer-model";
import InfluencerPlatform from "./influencer-social-platform-model";
import Review from "./influencer-review-model";
import SocialMediaPlatform from "./social-media-platform-model";
import InfluencerCategory from "./influencer-category-model";

// Import and run associations
import { associateModels } from "./associate-models";
associateModels();

const models = {
  User,
  Influencer,
  InfluencerPlatform,
  Review,
  SocialMediaPlatform,
  InfluencerCategory,
};

export default models;
