import { DataTypes, Model } from "sequelize";
import { sequelize } from "../db/sequelize";
import bcrypt from "bcrypt";
import { UserAttributes, UserCreationAttributes } from "../types/user";

// Profile image
// Fullname
// Bio
// Role/Permission
// Account status
// Signup date
// Last login

// Define the User model
const User = sequelize.define<Model<UserAttributes, UserCreationAttributes>>(
  "User",
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
    },
    fullname: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: {
        name: "unique_email",
        msg: "This email is already taken.",
      },
      validate: {
        isEmail: {
          msg: "Please enter a valid email address.",
        },
      },
    },
    password_hash: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    profile_image: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
  },
  {
    timestamps: true,
  }
);

// Hook to hash password before creating a user
User.addHook(
  "beforeCreate",
  async (user: Model<UserAttributes, UserCreationAttributes>) => {
    const passwordHash = user.get("password_hash") as string;

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(passwordHash, salt);

    user.set("password_hash", hashedPassword);
  }
);

export default User;
