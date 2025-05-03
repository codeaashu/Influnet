import InfluencerSocialPlatform from "../../models/influencer-social-platform-model";
import { sequelize } from "../sequelize";

const influencerSocialPlatformsData = [
  {
    influencer_id: "4266fef6-735a-412e-8d2d-d864cd206d33", // James Wilson (replaced c0793546...)
    platform_id: "fb8d99e5-4f71-4f88-bf4b-53410cddbc53", // Snapchat
    follower_count: 650000,
    platform_profile_link: "https://snapchat.com/influencer20",
  },
  {
    influencer_id: "1ab21f6b-2f85-4247-8a16-e808f74a073d", // Sarah Johnson (replaced 62915cb9...)
    platform_id: "bba9e74f-5716-4dbb-a56d-1a09c9332f01", // Instagram
    follower_count: 500000,
    platform_profile_link: "https://instagram.com/influencer1",
  },
  {
    influencer_id: "1ab21f6b-2f85-4247-8a16-e808f74a073d", // Sarah Johnson
    platform_id: "e213f5b7-d36b-44f5-a51a-bd46d9ecb3df", // Facebook
    follower_count: 300000,
    platform_profile_link: "https://facebook.com/influencer1",
  },
  {
    influencer_id: "1afb0e29-39ba-4c67-b469-c46537776ea7", // Michael Chen (replaced 9f25491f...)
    platform_id: "f0d7e7b8-6f04-4a0c-9a94-2faaf110292f", // Twitter
    follower_count: 1200000,
    platform_profile_link: "https://twitter.com/influencer2",
  },
  {
    influencer_id: "1afb0e29-39ba-4c67-b469-c46537776ea7", // Michael Chen
    platform_id: "a05d3cd4-f254-4d09-8774-cd18733f9c7e", // TikTok
    follower_count: 900000,
    platform_profile_link: "https://tiktok.com/influencer2",
  },
  {
    influencer_id: "28d0ead9-bb2d-4875-97a8-3c01467ef2e5", // Emma Wilson (replaced dbc9bcac...)
    platform_id: "c9f3f1db-5bcb-4c44-9b92-02fd7157dc9d", // YouTube
    follower_count: 800000,
    platform_profile_link: "https://youtube.com/influencer3",
  },
  {
    influencer_id: "28d0ead9-bb2d-4875-97a8-3c01467ef2e5", // Emma Wilson
    platform_id: "fa4ec1a2-8397-4f03-aaf2-5f58096a6fdf", // LinkedIn
    follower_count: 150000,
    platform_profile_link: "https://linkedin.com/influencer3",
  },
  {
    influencer_id: "392fa3af-e277-495e-a503-cc43a04f21f0", // David Rodriguez (replaced c0bcafe1...)
    platform_id: "fb8d99e5-4f71-4f88-bf4b-53410cddbc53", // Snapchat
    follower_count: 400000,
    platform_profile_link: "https://snapchat.com/influencer4",
  },
  {
    influencer_id: "392fa3af-e277-495e-a503-cc43a04f21f0", // David Rodriguez
    platform_id: "56f15e2e-d5f0-40f3-910e-cb85d6b2d738", // Pinterest
    follower_count: 200000,
    platform_profile_link: "https://pinterest.com/influencer4",
  },
  {
    influencer_id: "40ed4e32-8702-437d-9913-160ed995ec8a", // Olivia Martinez (replaced 22f334ee...)
    platform_id: "a0e5cd21-c6ff-45d4-a299-c087e2417d25", // Reddit
    follower_count: 600000,
    platform_profile_link: "https://reddit.com/influencer5",
  },
  {
    influencer_id: "40ed4e32-8702-437d-9913-160ed995ec8a", // Olivia Martinez
    platform_id: "694a897f-7d10-4071-baf1-1088aef51c69", // Twitch
    follower_count: 700000,
    platform_profile_link: "https://twitch.com/influencer5",
  },
  {
    influencer_id: "5696eecc-395d-4fd1-b341-9d934d1b5850", // Sophia Lee (replaced 0138461d...)
    platform_id: "fa4ec1a2-8397-4f03-aaf2-5f58096a6fdf", // LinkedIn
    follower_count: 550000,
    platform_profile_link: "https://linkedin.com/influencer6",
  },
  {
    influencer_id: "6858ddb9-3a3d-4dd8-aa61-6293942462d2", // Daniel Brown (replaced d1f3c2df...)
    platform_id: "bba9e74f-5716-4dbb-a56d-1a09c9332f01", // Instagram
    follower_count: 900000,
    platform_profile_link: "https://instagram.com/influencer7",
  },
  {
    influencer_id: "75ec372c-1624-4bb0-a1c2-a159b4fcea6c", // Ava Garcia (replaced 25f900e7...)
    platform_id: "36e05b3c-e1b7-4e0f-9c58-289c38ee8c2b", // Clubhouse
    follower_count: 100000,
    platform_profile_link: "https://clubhouse.com/influencer8",
  },
  {
    influencer_id: "76294436-4f3d-47cf-99a0-e96e26749db4", // Ethan Moore (replaced 057d2599...)
    platform_id: "694a897f-7d10-4071-baf1-1088aef51c69", // Twitch
    follower_count: 450000,
    platform_profile_link: "https://twitch.com/influencer9",
  },
  {
    influencer_id: "8145c29d-e6df-44e9-8a19-ca7bdfa0e2cd", // Mia Thompson (replaced b9f5dfe8...)
    platform_id: "e213f5b7-d36b-44f5-a51a-bd46d9ecb3df", // Facebook
    follower_count: 200000,
    platform_profile_link: "https://facebook.com/influencer10",
  },
  {
    influencer_id: "86abce82-b9f3-42d2-af19-3a3c167f8a96", // Noah Anderson (replaced fb24fc91...)
    platform_id: "a05d3cd4-f254-4d09-8774-cd18733f9c7e", // TikTok
    follower_count: 700000,
    platform_profile_link: "https://tiktok.com/influencer11",
  },
  {
    influencer_id: "8e979230-3969-4dc9-a28a-8148b8effa7f", // Isabella Clark (replaced 1d795213...)
    platform_id: "c9f3f1db-5bcb-4c44-9b92-02fd7157dc9d", // YouTube
    follower_count: 550000,
    platform_profile_link: "https://youtube.com/influencer12",
  },
  {
    influencer_id: "b3aabef9-e98b-4d4c-a4a4-e5728690634a", // Liam White (replaced 738ae5f0...)
    platform_id: "56f15e2e-d5f0-40f3-910e-cb85d6b2d738", // Pinterest
    follower_count: 450000,
    platform_profile_link: "https://pinterest.com/influencer13",
  },
  {
    influencer_id: "b6bac9d8-0535-4200-a97f-50f8c572a685", // Charlotte Hall (replaced 7b36a323...)
    platform_id: "a9cefc95-4416-41ad-b20a-6bbdff62d18f", // Quora
    follower_count: 300000,
    platform_profile_link: "https://quora.com/influencer14",
  },
  {
    influencer_id: "cb1ec6f3-0410-4851-8cdc-9b55c98f6f09", // Benjamin Young (replaced 19d7b423...)
    platform_id: "a0e5cd21-c6ff-45d4-a299-c087e2417d25", // Reddit
    follower_count: 250000,
    platform_profile_link: "https://reddit.com/influencer15",
  },
  {
    influencer_id: "cf7a5d62-6d21-400e-829b-f6ee8a54a291", // Amelia King (replaced 82c5339e...)
    platform_id: "694a897f-7d10-4071-baf1-1088aef51c69", // Twitch
    follower_count: 600000,
    platform_profile_link: "https://twitch.com/influencer16",
  },
  {
    influencer_id: "e8db2dee-3fcc-4ec8-9721-b52ff1103e16", // Lucas Scott (replaced 071627d8...)
    platform_id: "a05d3cd4-f254-4d09-8774-cd18733f9c7e", // TikTok
    follower_count: 350000,
    platform_profile_link: "https://tiktok.com/influencer17",
  },
  {
    influencer_id: "ecc8183d-b2b4-4d34-8bfc-d307144d0c3a", // Harper Adams (replaced 02c7c4b8...)
    platform_id: "bba9e74f-5716-4dbb-a56d-1a09c9332f01", // Instagram
    follower_count: 900000,
    platform_profile_link: "https://instagram.com/influencer18",
  },
  {
    influencer_id: "f0305997-c602-4132-8efe-044254cfa29f", // Henry Baker (replaced 50cfcdd7...)
    platform_id: "bba9e74f-5716-4dbb-a56d-1a09c9332f01", // Instagram
    follower_count: 1000000,
    platform_profile_link: "https://instagram.com/influencer19",
  },
];

// const socialMediaPlatformIds = [
//     "bba9e74f-5716-4dbb-a56d-1a09c9332f01", // Instagram
//     "e213f5b7-d36b-44f5-a51a-bd46d9ecb3df", // Facebook
//     "f0d7e7b8-6f04-4a0c-9a94-2faaf110292f", // Twitter
//     "a05d3cd4-f254-4d09-8774-cd18733f9c7e", // TikTok
//     "c9f3f1db-5bcb-4c44-9b92-02fd7157dc9d", // YouTube
//     "fa4ec1a2-8397-4f03-aaf2-5f58096a6fdf", // LinkedIn
//     "fb8d99e5-4f71-4f88-bf4b-53410cddbc53", // Snapchat
//     "56f15e2e-d5f0-40f3-910e-cb85d6b2d738", // Pinterest
//     "a0e5cd21-c6ff-45d4-a299-c087e2417d25", // Reddit
//     "694a897f-7d10-4071-baf1-1088aef51c69", // Twitch
//     "ae2b1e11-1625-429f-8109-351267d4cc8f", // Telegram
//     "ac3a1ee2-8eeb-472b-aafe-782bc9284a58", // WhatsApp
//     "1d6815e0-c241-46bb-b8b9-548c5206ae51", // Threads
//     "d0171868-cb1d-4a9d-ae3d-11ec3e9ae582", // WeChat
//     "37cf96cd-5e60-4174-8673-1a5e316fdc92", // LINE
//     "56ba64e0-0733-4e3e-a9c4-e3149f397c25", // VK
//     "9bff95b9-5b75-4a46-ae62-4c6cb9e1e70e", // Douyin
//     "a9cefc95-4416-41ad-b20a-6bbdff62d18f", // Quora
//     "36e05b3c-e1b7-4e0f-9c58-289c38ee8c2b", // Clubhouse
//     "129a7a30-f11a-4d88-83f4-002eebfcb52f"  // Tumblr
//   ];

export const seedInfluencerSocialPlatforms = async () => {
  try {
    // Check if influencers already exist
    const count = await InfluencerSocialPlatform.count();
    if (count > 0) {
      console.log("Influencers already exist in database");
      return;
    }

    // Create all influencers in a transaction
    await sequelize.transaction(async (transaction) => {
      await InfluencerSocialPlatform.bulkCreate(influencerSocialPlatformsData, {
        transaction,
      });
    });

    console.log("✅ Influencer social platforms seeded successfully");
  } catch (error) {
    console.error("❌ Failed to seed Influencer social platforms:", error);
    throw error;
  }
};
