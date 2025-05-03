// models/SocialMediaPlatform.ts
import { DataTypes, Model } from "sequelize";
import { sequelize } from "../db/sequelize";
import {
  SocialMediaPlatformAttributes,
  SocialMediaPlatformCreationAttributes,
} from "../types/social-media-platform";

const SocialMediaPlatform = sequelize.define<
  Model<SocialMediaPlatformAttributes, SocialMediaPlatformCreationAttributes>
>(
  "SocialMediaPlatform",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    platform_name: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: true,
    },
    platform_icon_url: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    domain_name: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: true,
    },
  },
  {
    timestamps: false,
  }
);

export default SocialMediaPlatform;
