import { DataTypes, Model } from "sequelize";
import { sequelize } from "../db/sequelize";
import User from "./user-model";
import {
  InfluencerAttributes,
  InfluencerCreationAttributes,
} from "../types/influencer";

// Each Influencer belongs to a User and represents a public-facing profile
const Influencer = sequelize.define<
  Model<InfluencerAttributes, InfluencerCreationAttributes>
>(
  "Influencer",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },

    // Foreign key - Link to the User who owns this influencer profile
    user_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: User, // References the User model
        key: "id",
      },
      onDelete: "CASCADE", // Delete influencer if the associated user is deleted
      onUpdate: "CASCADE", // Update foreign key if user ID changes
    },

    fullname: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },

    handle: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: true,
    },

    profile_image: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },

    bio: {
      type: DataTypes.TEXT(),
      allowNull: true,
    },

    location: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
  },
  {
    timestamps: true,
  }
);

Influencer.addHook(
  "beforeCreate",
  async (
    influencer: Model<InfluencerAttributes, InfluencerCreationAttributes>
  ) => {
    const handle = influencer.get("handle") as string;
    if (handle) {
      influencer.set("handle", handle.toLowerCase());
    }
  }
);
export default Influencer;
