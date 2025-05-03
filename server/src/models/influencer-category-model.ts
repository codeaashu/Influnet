import { DataTypes, Model } from "sequelize";
import { sequelize } from "../db/sequelize";
import Influencer from "./influencer-model";
import {
  InfluencerCategoryAttributes,
  InfluencerCategoryCreationAttributes,
} from "../types/influencer-category";

// This represents a category or niche that an influencer belongs to (e.g., Fashion, Tech, Fitness)
const InfluencerCategory = sequelize.define<
  Model<InfluencerCategoryAttributes, InfluencerCategoryCreationAttributes>
>(
  "InfluencerCategory",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },

    // Foreign key - Links this category to a specific influencer
    influencer_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: Influencer, // References the Influencer model
        key: "id",
      },
      onDelete: "CASCADE", // Delete this category entry if the associated influencer is deleted
      onUpdate: "CASCADE", // Update if the influencer ID changes
    },

    category_name: {
      type: DataTypes.STRING(100),
      allowNull: false,
      // set(value: string) {
      //   this.setDataValue("category_name", value.toLowerCase());
      // },
    },
  },
  {
    timestamps: false,
  }
);

export default InfluencerCategory;
