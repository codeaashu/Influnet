export interface InfluencerAttributes {
  id?: string; // optional because Sequelize auto-generates it
  user_id: string;
  fullname: string;
  handle: string;
  profile_image: string;
  bio?: string;
  location: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface InfluencerCreationAttributes
  extends Omit<InfluencerAttributes, "id" | "createdAt" | "updatedAt"> {}
