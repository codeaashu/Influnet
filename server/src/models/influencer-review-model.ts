// Import necessary Sequelize modules and models
import { DataTypes, Model } from "sequelize";
import { sequelize } from "../db/sequelize";
import User from "./user-model";
import Influencer from "./influencer-model";
import {
  InfluencerReviewAttributes,
  InfluencerReviewCreationAttributes,
} from "../types/influencer-review";

const InfluencerReview = sequelize.define<
  Model<InfluencerReviewAttributes, InfluencerReviewCreationAttributes>
>(
  "Review",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },

    // Foreign key - References the user who wrote the review
    user_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: User,
        key: "id",
      },
      onDelete: "CASCADE", // Delete review if user is deleted
      onUpdate: "CASCADE", // Update user_id if user's id changes
    },

    // Foreign key - References the influencer being reviewed
    influencer_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: Influencer,
        key: "id",
      },
      onDelete: "CASCADE", // Delete review if influencer is deleted
      onUpdate: "CASCADE", // Update influencer_id if influencer's id changes
    },
    rating: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 1,
        max: 5,
      },
    },
    comment: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
  {
    timestamps: true,
  }
);

export default InfluencerReview;
