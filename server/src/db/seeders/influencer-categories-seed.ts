import InfluencerCategory from "../../models/influencer-category-model";
import { sequelize } from "../sequelize";

const influencerCategoriesData = [
  // Sarah Johnson (Travel/Food)
  {
    influencer_id: "1ab21f6b-2f85-4247-8a16-e808f74a073d",
    category_name: "Travel",
  },
  {
    influencer_id: "1ab21f6b-2f85-4247-8a16-e808f74a073d",
    category_name: "Food",
  },

  // Michael Chen (Tech/Gadgets)
  {
    influencer_id: "1afb0e29-39ba-4c67-b469-c46537776ea7",
    category_name: "Technology",
  },
  {
    influencer_id: "1afb0e29-39ba-4c67-b469-c46537776ea7",
    category_name: "Gadgets",
  },

  // Emma Wilson (Fitness/Wellness)
  {
    influencer_id: "28d0ead9-bb2d-4875-97a8-3c01467ef2e5",
    category_name: "Fitness",
  },
  {
    influencer_id: "28d0ead9-bb2d-4875-97a8-3c01467ef2e5",
    category_name: "Wellness",
  },

  // David Rodriguez (Photography/Art)
  {
    influencer_id: "392fa3af-e277-495e-a503-cc43a04f21f0",
    category_name: "Photography",
  },
  {
    influencer_id: "392fa3af-e277-495e-a503-cc43a04f21f0",
    category_name: "Art",
  },

  // Olivia Martinez (Fashion/Lifestyle)
  {
    influencer_id: "40ed4e32-8702-437d-9913-160ed995ec8a",
    category_name: "Fashion",
  },
  {
    influencer_id: "40ed4e32-8702-437d-9913-160ed995ec8a",
    category_name: "Lifestyle",
  },

  // James Wilson (Finance/Investing)
  {
    influencer_id: "4266fef6-735a-412e-8d2d-d864cd206d33",
    category_name: "Finance",
  },
  {
    influencer_id: "4266fef6-735a-412e-8d2d-d864cd206d33",
    category_name: "Investing",
  },

  // Sophia Lee (Food/Vegan)
  {
    influencer_id: "5696eecc-395d-4fd1-b341-9d934d1b5850",
    category_name: "Food",
  },
  {
    influencer_id: "5696eecc-395d-4fd1-b341-9d934d1b5850",
    category_name: "Vegan",
  },

  // Daniel Brown (Travel/Adventure)
  {
    influencer_id: "6858ddb9-3a3d-4dd8-aa61-6293942462d2",
    category_name: "Travel",
  },
  {
    influencer_id: "6858ddb9-3a3d-4dd8-aa61-6293942462d2",
    category_name: "Adventure",
  },

  // Ava Garcia (Beauty/Makeup)
  {
    influencer_id: "75ec372c-1624-4bb0-a1c2-a159b4fcea6c",
    category_name: "Beauty",
  },
  {
    influencer_id: "75ec372c-1624-4bb0-a1c2-a159b4fcea6c",
    category_name: "Makeup",
  },

  // Ethan Moore (Lifestyle/Productivity)
  {
    influencer_id: "76294436-4f3d-47cf-99a0-e96e26749db4",
    category_name: "Lifestyle",
  },
  {
    influencer_id: "76294436-4f3d-47cf-99a0-e96e26749db4",
    category_name: "Productivity",
  },

  // Mia Thompson (Parenting/Family)
  {
    influencer_id: "8145c29d-e6df-44e9-8a19-ca7bdfa0e2cd",
    category_name: "Parenting",
  },
  {
    influencer_id: "8145c29d-e6df-44e9-8a19-ca7bdfa0e2cd",
    category_name: "Family",
  },

  // Noah Anderson (DIY/Home Improvement)
  {
    influencer_id: "86abce82-b9f3-42d2-af19-3a3c167f8a96",
    category_name: "DIY",
  },
  {
    influencer_id: "86abce82-b9f3-42d2-af19-3a3c167f8a96",
    category_name: "Home Improvement",
  },

  // Isabella Clark (Sustainability/Eco-Friendly)
  {
    influencer_id: "8e979230-3969-4dc9-a28a-8148b8effa7f",
    category_name: "Sustainability",
  },
  {
    influencer_id: "8e979230-3969-4dc9-a28a-8148b8effa7f",
    category_name: "Eco-Friendly",
  },

  // Liam White (Music/Entertainment)
  {
    influencer_id: "b3aabef9-e98b-4d4c-a4a4-e5728690634a",
    category_name: "Music",
  },
  {
    influencer_id: "b3aabef9-e98b-4d4c-a4a4-e5728690634a",
    category_name: "Entertainment",
  },

  // Charlotte Hall (Books/Literature)
  {
    influencer_id: "b6bac9d8-0535-4200-a97f-50f8c572a685",
    category_name: "Books",
  },
  {
    influencer_id: "b6bac9d8-0535-4200-a97f-50f8c572a685",
    category_name: "Literature",
  },

  // Benjamin Young (Automotive/Cars)
  {
    influencer_id: "cb1ec6f3-0410-4851-8cdc-9b55c98f6f09",
    category_name: "Automotive",
  },
  {
    influencer_id: "cb1ec6f3-0410-4851-8cdc-9b55c98f6f09",
    category_name: "Cars",
  },

  // Amelia King (Yoga/Wellness)
  {
    influencer_id: "cf7a5d62-6d21-400e-829b-f6ee8a54a291",
    category_name: "Yoga",
  },
  {
    influencer_id: "cf7a5d62-6d21-400e-829b-f6ee8a54a291",
    category_name: "Wellness",
  },

  // Lucas Scott (Gaming/Esports)
  {
    influencer_id: "e8db2dee-3fcc-4ec8-9721-b52ff1103e16",
    category_name: "Gaming",
  },
  {
    influencer_id: "e8db2dee-3fcc-4ec8-9721-b52ff1103e16",
    category_name: "Esports",
  },

  // Harper Adams (Art/Culture)
  {
    influencer_id: "ecc8183d-b2b4-4d34-8bfc-d307144d0c3a",
    category_name: "Art",
  },
  {
    influencer_id: "ecc8183d-b2b4-4d34-8bfc-d307144d0c3a",
    category_name: "Culture",
  },

  // Henry Baker (Food/Cooking)
  {
    influencer_id: "f0305997-c602-4132-8efe-044254cfa29f",
    category_name: "Food",
  },
  {
    influencer_id: "f0305997-c602-4132-8efe-044254cfa29f",
    category_name: "Cooking",
  },
];

export const seedInfluencerCategories = async () => {
  try {
    // Check if categories already exist
    const count = await InfluencerCategory.count();
    if (count > 0) {
      console.log("Influencer categories already exist in database");
      return;
    }

    // Create all categories in a transaction
    await sequelize.transaction(async (transaction) => {
      await InfluencerCategory.bulkCreate(influencerCategoriesData, {
        transaction,
      });
    });

    console.log("✅ Influencer categories seeded successfully");
  } catch (error) {
    console.error("❌ Failed to seed influencer categories:", error);
    throw error;
  }
};
