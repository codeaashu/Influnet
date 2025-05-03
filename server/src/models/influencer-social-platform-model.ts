// models/InfluencerSocialPlatform.ts

// Import Sequelize components and related models
import { DataTypes, Model } from "sequelize";
import { sequelize } from "../db/sequelize";
import Influencer from "./influencer-model";
import SocialMediaPlatform from "./social-media-platform-model";
import {
  InfluencerSocialPlatformAttributes,
  InfluencerSocialPlatformCreationAttributes,
} from "../types/influencer-social-platform";

// This model represents a specific influencer's profile on a specific social media platform
const InfluencerSocialPlatform = sequelize.define<
  Model<
    InfluencerSocialPlatformAttributes,
    InfluencerSocialPlatformCreationAttributes
  >
>(
  "InfluencerSocialPlatform",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },

    influencer_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: Influencer,
        key: "id",
      },
      onUpdate: "CASCADE", // If the influencer's ID changes, update it here as well to maintain referential integrity
      onDelete: "CASCADE", // If the influencer is deleted, also delete this associated social profile record
    },

    platform_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: SocialMediaPlatform,
        key: "id",
      },
      onUpdate: "CASCADE", // If the platform's ID changes, update it here as well to maintain referential integrity
      // No cascade delete for platform (typically platforms are static and not user-generated)
    },

    platform_profile_link: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        name: "unique_platform_profile_link",
        msg: "This influencer profile link is already taken.",
      },
    },

    follower_count: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  },
  {
    timestamps: true,
  }
);

export default InfluencerSocialPlatform;
