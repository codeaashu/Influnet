export interface InfluencerReviewAttributes {
  id?: string; // Optional because Sequelize auto-generates it
  user_id: string;
  influencer_id: string;
  rating: number;
  comment: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface InfluencerReviewCreationAttributes
  extends Omit<InfluencerReviewAttributes, "id" | "createdAt" | "updatedAt"> {}
