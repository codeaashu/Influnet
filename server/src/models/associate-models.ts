import User from "./user-model";
import Influencer from "./influencer-model";

import SocialMediaPlatform from "./social-media-platform-model";
import InfluencerCategory from "./influencer-category-model";
import InfluencerSocialPlatform from "./influencer-social-platform-model";
import InfluencerReview from "./influencer-review-model";

export function associateModels() {
  // Influencer and InfluencerPlatform relationship
  Influencer.hasMany(InfluencerSocialPlatform, {
    foreignKey: "influencer_id",
    as: "socialPlatforms",
  });
  InfluencerSocialPlatform.belongsTo(Influencer, {
    foreignKey: "influencer_id",
    as: "influencer",
  });

  // InfluencerSocialPlatform and SocialMediaPlatform relationship
  SocialMediaPlatform.hasMany(InfluencerSocialPlatform, {
    foreignKey: "platform_id",
    as: "influencerPlatformData",
  });
  InfluencerSocialPlatform.belongsTo(SocialMediaPlatform, {
    foreignKey: "platform_id",
    as: "platform",
  });

  // Influencer and InfluencerCategory relationship
  Influencer.hasMany(InfluencerCategory, {
    foreignKey: "influencer_id",
    as: "categories",
  });
  InfluencerCategory.belongsTo(Influencer, {
    foreignKey: "influencer_id",
    as: "influencer",
  });

  // User and Review relationship
  InfluencerReview.belongsTo(User, { foreignKey: "user_id", as: "author" });
  InfluencerReview.belongsTo(Influencer, {
    foreignKey: "influencer_id",
    as: "influencer",
  });

  User.hasMany(InfluencerReview, { foreignKey: "user_id", as: "reviews" });
  Influencer.hasMany(InfluencerReview, {
    foreignKey: "influencer_id",
    as: "reviews",
  });
}
