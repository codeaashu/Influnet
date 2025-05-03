import InfluencerReview from "../../models/influencer-review-model";
import { sequelize } from "../sequelize";

const reviewsData = [
  // Sarah Johnson (2 reviews)
  {
    user_id: "2c23b6e6-f41a-4c72-8596-e5db067ad478",
    influencer_id: "1ab21f6b-2f85-4247-8a16-e808f74a073d",
    rating: 5,
    comment:
      "Sarah's travel tips completely transformed my vacation experience! Her food recommendations were spot on.",
  },
  {
    user_id: "334d6ac3-3b6c-4071-a028-9eb0ba55fee7",
    influencer_id: "1ab21f6b-2f85-4247-8a16-e808f74a073d",
    rating: 4,
    comment:
      "Great content overall, though I wish she posted more frequently about budget travel options.",
  },

  // Michael Chen (3 reviews)
  {
    user_id: "334d6ac3-3b6c-4071-a028-9eb0ba55fee7",
    influencer_id: "1afb0e29-39ba-4c67-b469-c46537776ea7",
    rating: 5,
    comment:
      "Michael's tech reviews are the most thorough and unbiased I've found. Saved me from several bad purchases!",
  },
  {
    user_id: "2c23b6e6-f41a-4c72-8596-e5db067ad478",
    influencer_id: "1afb0e29-39ba-4c67-b469-c46537776ea7",
    rating: 5,
    comment:
      "The software tutorials are incredibly helpful for beginners. Clear explanations and practical examples.",
  },
  {
    user_id: "334d6ac3-3b6c-4071-a028-9eb0ba55fee7",
    influencer_id: "1afb0e29-39ba-4c67-b469-c46537776ea7",
    rating: 4,
    comment:
      "Would love to see more content about emerging technologies, but overall excellent quality.",
  },

  // Emma Wilson (2 reviews)
  {
    user_id: "2c23b6e6-f41a-4c72-8596-e5db067ad478",
    influencer_id: "28d0ead9-bb2d-4875-97a8-3c01467ef2e5",
    rating: 5,
    comment:
      "Emma's fitness program helped me lose 20 pounds in 3 months. Life-changing!",
  },
  {
    user_id: "334d6ac3-3b6c-4071-a028-9eb0ba55fee7",
    influencer_id: "28d0ead9-bb2d-4875-97a8-3c01467ef2e5",
    rating: 4,
    comment:
      "Great workouts, though some moves are challenging for absolute beginners.",
  },

  // David Rodriguez (3 reviews)
  {
    user_id: "334d6ac3-3b6c-4071-a028-9eb0ba55fee7",
    influencer_id: "392fa3af-e277-495e-a503-cc43a04f21f0",
    rating: 5,
    comment:
      "David's photography tutorials improved my skills dramatically. His composition tips are gold.",
  },
  {
    user_id: "2c23b6e6-f41a-4c72-8596-e5db067ad478",
    influencer_id: "392fa3af-e277-495e-a503-cc43a04f21f0",
    rating: 5,
    comment:
      "The most inspiring photography account I follow. Every post is a masterpiece.",
  },
  {
    user_id: "334d6ac3-3b6c-4071-a028-9eb0ba55fee7",
    influencer_id: "392fa3af-e277-495e-a503-cc43a04f21f0",
    rating: 4,
    comment: "Would love to see more behind-the-scenes of his editing process.",
  },

  // Olivia Martinez (2 reviews)
  {
    user_id: "2c23b6e6-f41a-4c72-8596-e5db067ad478",
    influencer_id: "40ed4e32-8702-437d-9913-160ed995ec8a",
    rating: 5,
    comment:
      "Olivia has an incredible eye for fashion. Her styling tips helped revamp my entire wardrobe.",
  },
  {
    user_id: "334d6ac3-3b6c-4071-a028-9eb0ba55fee7",
    influencer_id: "40ed4e32-8702-437d-9913-160ed995ec8a",
    rating: 3,
    comment:
      "Great style, though many recommendations are quite expensive for the average person.",
  },

  // James Wilson (3 reviews)
  {
    user_id: "334d6ac3-3b6c-4071-a028-9eb0ba55fee7",
    influencer_id: "4266fef6-735a-412e-8d2d-d864cd206d33",
    rating: 5,
    comment:
      "James explains complex financial concepts in a way anyone can understand. My investments have improved thanks to him.",
  },
  {
    user_id: "2c23b6e6-f41a-4c72-8596-e5db067ad478",
    influencer_id: "4266fef6-735a-412e-8d2d-d864cd206d33",
    rating: 4,
    comment:
      "Solid advice, though sometimes the stock picks are a bit too conservative for my risk tolerance.",
  },
  {
    user_id: "334d6ac3-3b6c-4071-a028-9eb0ba55fee7",
    influencer_id: "4266fef6-735a-412e-8d2d-d864cd206d33",
    rating: 5,
    comment:
      "The budgeting spreadsheet he shared was a game-changer for my personal finances.",
  },

  // Sophia Lee (2 reviews)
  {
    user_id: "2c23b6e6-f41a-4c72-8596-e5db067ad478",
    influencer_id: "5696eecc-395d-4fd1-b341-9d934d1b5850",
    rating: 5,
    comment:
      "As someone new to veganism, Sophia's recipes made the transition so much easier. Delicious and simple!",
  },
  {
    user_id: "334d6ac3-3b6c-4071-a028-9eb0ba55fee7",
    influencer_id: "5696eecc-395d-4fd1-b341-9d934d1b5850",
    rating: 4,
    comment:
      "Love the content, though some ingredients can be hard to find in smaller towns.",
  },

  // Daniel Brown (3 reviews)
  {
    user_id: "334d6ac3-3b6c-4071-a028-9eb0ba55fee7",
    influencer_id: "6858ddb9-3a3d-4dd8-aa61-6293942462d2",
    rating: 5,
    comment:
      "Daniel's adventure guides helped me discover places I never would have found on my own.",
  },
  {
    user_id: "2c23b6e6-f41a-4c72-8596-e5db067ad478",
    influencer_id: "6858ddb9-3a3d-4dd8-aa61-6293942462d2",
    rating: 5,
    comment:
      "The production quality of his travel videos is outstanding. Feels like I'm right there with him.",
  },
  {
    user_id: "334d6ac3-3b6c-4071-a028-9eb0ba55fee7",
    influencer_id: "6858ddb9-3a3d-4dd8-aa61-6293942462d2",
    rating: 4,
    comment:
      "Would love to see more budget-friendly travel options in future content.",
  },

  // Ava Garcia (2 reviews)
  {
    user_id: "2c23b6e6-f41a-4c72-8596-e5db067ad478",
    influencer_id: "75ec372c-1624-4bb0-a1c2-a159b4fcea6c",
    rating: 5,
    comment:
      "Ava's makeup tutorials are the best! She explains techniques so clearly.",
  },
  {
    user_id: "334d6ac3-3b6c-4071-a028-9eb0ba55fee7",
    influencer_id: "75ec372c-1624-4bb0-a1c2-a159b4fcea6c",
    rating: 4,
    comment:
      "Great skincare advice, though some recommended products are quite pricey.",
  },

  // Ethan Moore (3 reviews)
  {
    user_id: "334d6ac3-3b6c-4071-a028-9eb0ba55fee7",
    influencer_id: "76294436-4f3d-47cf-99a0-e96e26749db4",
    rating: 5,
    comment:
      "Ethan's productivity tips helped me organize my life and reduce stress significantly.",
  },
  {
    user_id: "2c23b6e6-f41a-4c72-8596-e5db067ad478",
    influencer_id: "76294436-4f3d-47cf-99a0-e96e26749db4",
    rating: 5,
    comment:
      "The minimalist living guide was exactly what I needed to declutter my home and mind.",
  },
  {
    user_id: "334d6ac3-3b6c-4071-a028-9eb0ba55fee7",
    influencer_id: "76294436-4f3d-47cf-99a0-e96e26749db4",
    rating: 4,
    comment:
      "Would love to see more content about maintaining productivity in busy family environments.",
  },

  // Mia Thompson (2 reviews)
  {
    user_id: "2c23b6e6-f41a-4c72-8596-e5db067ad478",
    influencer_id: "8145c29d-e6df-44e9-8a19-ca7bdfa0e2cd",
    rating: 5,
    comment:
      "Mia's parenting advice is practical and non-judgmental. A breath of fresh air!",
  },
  {
    user_id: "334d6ac3-3b6c-4071-a028-9eb0ba55fee7",
    influencer_id: "8145c29d-e6df-44e9-8a19-ca7bdfa0e2cd",
    rating: 4,
    comment:
      "Great tips overall, though some activities require more time than working parents have.",
  },

  // Noah Anderson (3 reviews)
  {
    user_id: "334d6ac3-3b6c-4071-a028-9eb0ba55fee7",
    influencer_id: "86abce82-b9f3-42d2-af19-3a3c167f8a96",
    rating: 5,
    comment:
      "Noah's DIY projects helped me save thousands in home repairs. Clear instructions!",
  },
  {
    user_id: "2c23b6e6-f41a-4c72-8596-e5db067ad478",
    influencer_id: "86abce82-b9f3-42d2-af19-3a3c167f8a96",
    rating: 5,
    comment:
      "The woodworking tutorials are fantastic. I've built several pieces of furniture thanks to his guidance.",
  },
  {
    user_id: "334d6ac3-3b6c-4071-a028-9eb0ba55fee7",
    influencer_id: "86abce82-b9f3-42d2-af19-3a3c167f8a96",
    rating: 4,
    comment:
      "Would be helpful to include more beginner-friendly projects with minimal tools required.",
  },

  // Isabella Clark (2 reviews)
  {
    user_id: "2c23b6e6-f41a-4c72-8596-e5db067ad478",
    influencer_id: "8e979230-3969-4dc9-a28a-8148b8effa7f",
    rating: 5,
    comment:
      "Isabella's zero waste tips are practical and actually achievable. Reduced my household waste by 60%!",
  },
  {
    user_id: "334d6ac3-3b6c-4071-a028-9eb0ba55fee7",
    influencer_id: "8e979230-3969-4dc9-a28a-8148b8effa7f",
    rating: 4,
    comment:
      "Great content, though some solutions aren't accessible in all areas.",
  },

  // Liam White (3 reviews)
  {
    user_id: "334d6ac3-3b6c-4071-a028-9eb0ba55fee7",
    influencer_id: "b3aabef9-e98b-4d4c-a4a4-e5728690634a",
    rating: 5,
    comment:
      "Liam's music production breakdowns are incredibly insightful. Learned so much about mixing.",
  },
  {
    user_id: "2c23b6e6-f41a-4c72-8596-e5db067ad478",
    influencer_id: "b3aabef9-e98b-4d4c-a4a4-e5728690634a",
    rating: 5,
    comment:
      "The way he explains complex music theory concepts is genius. My tracks have improved dramatically.",
  },
  {
    user_id: "334d6ac3-3b6c-4071-a028-9eb0ba55fee7",
    influencer_id: "b3aabef9-e98b-4d4c-a4a4-e5728690634a",
    rating: 4,
    comment:
      "Would love to see more content about working with vocalists and lyricists.",
  },

  // Charlotte Hall (2 reviews)
  {
    user_id: "2c23b6e6-f41a-4c72-8596-e5db067ad478",
    influencer_id: "b6bac9d8-0535-4200-a97f-50f8c572a685",
    rating: 5,
    comment:
      "Charlotte's book recommendations introduced me to so many amazing authors. My reading list has tripled!",
  },
  {
    user_id: "334d6ac3-3b6c-4071-a028-9eb0ba55fee7",
    influencer_id: "b6bac9d8-0535-4200-a97f-50f8c572a685",
    rating: 4,
    comment:
      "Great reviews, though I'd love to see more genre variety beyond literary fiction.",
  },

  // Benjamin Young (3 reviews)
  {
    user_id: "334d6ac3-3b6c-4071-a028-9eb0ba55fee7",
    influencer_id: "cb1ec6f3-0410-4851-8cdc-9b55c98f6f09",
    rating: 5,
    comment:
      "Benjamin's car reviews are the most comprehensive I've found. His attention to detail is unmatched.",
  },
  {
    user_id: "2c23b6e6-f41a-4c72-8596-e5db067ad478",
    influencer_id: "cb1ec6f3-0410-4851-8cdc-9b55c98f6f09",
    rating: 5,
    comment:
      "The modification guides helped me upgrade my car safely and effectively. Saved me thousands in mechanic fees.",
  },
  {
    user_id: "334d6ac3-3b6c-4071-a028-9eb0ba55fee7",
    influencer_id: "cb1ec6f3-0410-4851-8cdc-9b55c98f6f09",
    rating: 4,
    comment:
      "Would be great to see more content about electric vehicles and their maintenance.",
  },

  // Amelia King (2 reviews)
  {
    user_id: "2c23b6e6-f41a-4c72-8596-e5db067ad478",
    influencer_id: "cf7a5d62-6d21-400e-829b-f6ee8a54a291",
    rating: 5,
    comment:
      "Amelia's yoga routines helped me relieve chronic back pain. Grateful beyond words!",
  },
  {
    user_id: "334d6ac3-3b6c-4071-a028-9eb0ba55fee7",
    influencer_id: "cf7a5d62-6d21-400e-829b-f6ee8a54a291",
    rating: 4,
    comment:
      "Excellent instruction, though some poses need more modifications for different body types.",
  },

  // Lucas Scott (3 reviews)
  {
    user_id: "334d6ac3-3b6c-4071-a028-9eb0ba55fee7",
    influencer_id: "e8db2dee-3fcc-4ec8-9721-b52ff1103e16",
    rating: 5,
    comment:
      "Lucas's gaming streams are both entertaining and educational. Learned so many pro strategies!",
  },
  {
    user_id: "2c23b6e6-f41a-4c72-8596-e5db067ad478",
    influencer_id: "e8db2dee-3fcc-4ec8-9721-b52ff1103e16",
    rating: 5,
    comment:
      "The esports commentary is top-notch. Provides insights I haven't heard anywhere else.",
  },
  {
    user_id: "334d6ac3-3b6c-4071-a028-9eb0ba55fee7",
    influencer_id: "e8db2dee-3fcc-4ec8-9721-b52ff1103e16",
    rating: 4,
    comment:
      "Would love to see more variety in the games covered, but excellent content overall.",
  },

  // Harper Adams (2 reviews)
  {
    user_id: "2c23b6e6-f41a-4c72-8596-e5db067ad478",
    influencer_id: "ecc8183d-b2b4-4d34-8bfc-d307144d0c3a",
    rating: 5,
    comment:
      "Harper's art curation introduced me to incredible emerging artists I now collect. Exceptional eye for talent!",
  },
  {
    user_id: "334d6ac3-3b6c-4071-a028-9eb0ba55fee7",
    influencer_id: "ecc8183d-b2b4-4d34-8bfc-d307144d0c3a",
    rating: 4,
    comment:
      "Would love to see more content about the business side of being an artist.",
  },

  // Henry Baker (3 reviews)
  {
    user_id: "334d6ac3-3b6c-4071-a028-9eb0ba55fee7",
    influencer_id: "f0305997-c602-4132-8efe-044254cfa29f",
    rating: 5,
    comment:
      "Henry's gourmet-on-a-budget recipes are restaurant quality without breaking the bank. My dinner parties have leveled up!",
  },
  {
    user_id: "2c23b6e6-f41a-4c72-8596-e5db067ad478",
    influencer_id: "f0305997-c602-4132-8efe-044254cfa29f",
    rating: 5,
    comment:
      "The knife skills tutorial alone was worth following. My prep time has been cut in half.",
  },
  {
    user_id: "334d6ac3-3b6c-4071-a028-9eb0ba55fee7",
    influencer_id: "f0305997-c602-4132-8efe-044254cfa29f",
    rating: 4,
    comment:
      "Would be helpful to include more substitutions for hard-to-find ingredients.",
  },
];

export const seedReviews = async () => {
  try {
    const count = await InfluencerReview.count();
    if (count > 0) {
      console.log("Reviews already exist in database");
      return;
    }

    await sequelize.transaction(async (transaction) => {
      await InfluencerReview.bulkCreate(reviewsData, {
        transaction,
        ignoreDuplicates: true,
      });
    });

    console.log("✅ Reviews seeded successfully");
  } catch (error) {
    console.error("❌ Failed to seed reviews:", error);
    throw error;
  }
};
