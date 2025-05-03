import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

const sequelize = new Sequelize(process.env.DATABASE_URL!, {
  dialect: "postgres",
  dialectOptions: {
    ssl: {
      require: false,
      rejectUnauthorized: false, // for development only. change it to 'true' for production.
    },
  },
});

export const connectToDatabase = async () => {
  try {
    await sequelize.authenticate();
    console.log("✅ Connected to the database.");
  } catch (error) {
    console.error("❌ Unable to connect to the database:", error);
    throw new Error("Database connection failed!");
  }
};

const syncDatabase = async () => {
  try {
    await sequelize.sync({ alter: true, logging: false }); // or force: true in dev
    console.log("✅ Database synced.");
  } catch (error) {
    // await transaction.rollback(); // <- you NEED this or Postgres locks
    console.error("❌ Error during database synchronization:", error);
    throw new Error("Database sync failed!");
  }
};

export { sequelize, syncDatabase };
