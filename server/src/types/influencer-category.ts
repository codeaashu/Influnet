export interface InfluencerCategoryAttributes {
  id: string;
  influencer_id: string;
  category_name: string;
}

export interface InfluencerCategoryCreationAttributes
  extends Omit<InfluencerCategoryAttributes, "id"> {}
