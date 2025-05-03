import Influencer from "../../models/influencer-model";
import { sequelize } from "../sequelize";

const influencersData = [
  {
    user_id: "334d6ac3-3b6c-4071-a028-9eb0ba55fee7",
    fullname: "Sarah Johnson",
    handle: "sarahj",
    profile_image: "https://randomuser.me/api/portraits/women/1.jpg",
    bio: "Travel enthusiast and food lover exploring the world one bite at a time",
    location: "New York",
  },
  {
    user_id: "2c23b6e6-f41a-4c72-8596-e5db067ad478",
    fullname: "Michael Chen",
    handle: "mikechen",
    profile_image: "https://randomuser.me/api/portraits/men/2.jpg",
    bio: "Tech geek sharing the latest gadgets and software tips",
    location: "San Francisco",
  },
  {
    user_id: "334d6ac3-3b6c-4071-a028-9eb0ba55fee7",
    fullname: "Emma Wilson",
    handle: "emmaw",
    profile_image: "https://randomuser.me/api/portraits/women/3.jpg",
    bio: "Fitness coach helping people transform their lives through exercise",
    location: "London",
  },
  {
    user_id: "2c23b6e6-f41a-4c72-8596-e5db067ad478",
    fullname: "David Rodriguez",
    handle: "davidr",
    profile_image: "https://randomuser.me/api/portraits/men/4.jpg",
    bio: "Professional photographer capturing life's beautiful moments",
    location: "Miami",
  },
  {
    user_id: "334d6ac3-3b6c-4071-a028-9eb0ba55fee7",
    fullname: "Olivia Martinez",
    handle: "oliviam",
    profile_image: "https://randomuser.me/api/portraits/men/5.jpg",
    bio: "Fashion influencer showcasing the latest trends and styles",
    location: "Paris",
  },
  {
    user_id: "2c23b6e6-f41a-4c72-8596-e5db067ad478",
    fullname: "James Wilson",
    handle: "jamesw",
    profile_image: "https://randomuser.me/api/portraits/men/6.jpg",
    bio: "Finance expert helping people make smart money decisions",
    location: "Chicago",
  },
  {
    user_id: "334d6ac3-3b6c-4071-a028-9eb0ba55fee7",
    fullname: "Sophia Lee",
    handle: "sophial",
    profile_image: "https://randomuser.me/api/portraits/women/7.jpg",
    bio: "Vegan chef creating delicious plant-based recipes",
    location: "Los Angeles",
  },
  {
    user_id: "2c23b6e6-f41a-4c72-8596-e5db067ad478",
    fullname: "Daniel Brown",
    handle: "danielb",
    profile_image: "https://randomuser.me/api/portraits/men/8.jpg",
    bio: "Adventure traveler documenting off-the-beaten-path destinations",
    location: "Denver",
  },
  {
    user_id: "334d6ac3-3b6c-4071-a028-9eb0ba55fee7",
    fullname: "Ava Garcia",
    handle: "avag",
    profile_image: "https://randomuser.me/api/portraits/women/9.jpg",
    bio: "Beauty influencer sharing makeup tutorials and skincare routines",
    location: "Toronto",
  },
  {
    user_id: "2c23b6e6-f41a-4c72-8596-e5db067ad478",
    fullname: "Ethan Moore",
    handle: "ethanm",
    profile_image: "https://randomuser.me/api/portraits/men/10.jpg",
    bio: "Minimalist lifestyle advocate and productivity coach",
    location: "Seattle",
  },
  {
    user_id: "334d6ac3-3b6c-4071-a028-9eb0ba55fee7",
    fullname: "Maria Thompson",
    handle: "miat",
    profile_image: "https://randomuser.me/api/portraits/women/11.jpg",
    bio: "Parenting blogger sharing tips for raising happy kids",
    location: "Austin",
  },
  {
    user_id: "2c23b6e6-f41a-4c72-8596-e5db067ad478",
    fullname: "Noah Anderson",
    handle: "noaha",
    profile_image: "https://randomuser.me/api/portraits/men/12.jpg",
    bio: "DIY home improvement expert and woodworking enthusiast",
    location: "Portland",
  },
  {
    user_id: "334d6ac3-3b6c-4071-a028-9eb0ba55fee7",
    fullname: "Isabella Clark",
    handle: "isabellac",
    profile_image: "https://randomuser.me/api/portraits/women/13.jpg",
    bio: "Sustainable living advocate and zero waste practitioner",
    location: "Vancouver",
  },
  {
    user_id: "2c23b6e6-f41a-4c72-8596-e5db067ad478",
    fullname: "Liam White",
    handle: "liamw",
    profile_image: "hhttps://randomuser.me/api/portraits/women/14.jpg",
    bio: "Music producer sharing behind-the-scenes of song creation",
    location: "Nashville",
  },
  {
    user_id: "334d6ac3-3b6c-4071-a028-9eb0ba55fee7",
    fullname: "Charlotte Hall",
    handle: "charlotteh",
    profile_image: "https://randomuser.me/api/portraits/men/15.jpg",
    bio: "Book reviewer and literary enthusiast",
    location: "Boston",
  },
  {
    user_id: "2c23b6e6-f41a-4c72-8596-e5db067ad478",
    fullname: "Benjamin Young",
    handle: "benjaminy",
    profile_image: "https://randomuser.me/api/portraits/men/16.jpg",
    bio: "Car enthusiast reviewing the latest models and mods",
    location: "Detroit",
  },
  {
    user_id: "334d6ac3-3b6c-4071-a028-9eb0ba55fee7",
    fullname: "Amelia King",
    handle: "ameliak",
    profile_image: "https://randomuser.me/api/portraits/women/17.jpg",
    bio: "Yoga instructor promoting mindfulness and wellness",
    location: "Sedona",
  },
  {
    user_id: "2c23b6e6-f41a-4c72-8596-e5db067ad478",
    fullname: "Lucas Scott",
    handle: "lucass",
    profile_image: "https://randomuser.me/api/portraits/men/18.jpg",
    bio: "Gaming streamer and esports commentator",
    location: "Las Vegas",
  },
  {
    user_id: "334d6ac3-3b6c-4071-a028-9eb0ba55fee7",
    fullname: "Harper Adams",
    handle: "harpera",
    profile_image: "https://randomuser.me/api/portraits/men/19.jpg",
    bio: "Art curator showcasing emerging artists and exhibitions",
    location: "Berlin",
  },
  {
    user_id: "2c23b6e6-f41a-4c72-8596-e5db067ad478",
    fullname: "Henry Baker",
    handle: "henryb",
    profile_image: "https://randomuser.me/api/portraits/men/20.jpg",
    bio: "Home chef specializing in gourmet cooking on a budget",
    location: "New Orleans",
  },
];

export const seedInfluencers = async () => {
  try {
    // Check if influencers already exist
    const count = await Influencer.count();
    if (count > 0) {
      console.log("Influencers already exist in database");
      return;
    }

    // Create all influencers in a transaction
    await sequelize.transaction(async (transaction) => {
      await Influencer.bulkCreate(influencersData, { transaction });
    });

    console.log("✅ Influencers seeded successfully");
  } catch (error) {
    console.error("❌ Failed to seed influencers:", error);
    throw error;
  }
};
