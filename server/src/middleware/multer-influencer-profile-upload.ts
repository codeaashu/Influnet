import multer from "multer";
import path from "path";

// Define the influencer profile storage configuration
const influencerProfileImageStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Store files in a 'uploads' folder in your project directory
    cb(null, "public/images/uploads/influencer-profiles"); // You can change this path to suit your needs
  },
  filename: (req, file, cb) => {
    // Create a unique filename to avoid conflicts
    const nameWithoutExt = path.parse(file.originalname).name;
    const fileExtension = path.extname(file.originalname); // Get file extension
    const uniqueSuffix = Date.now() + Math.round(Math.random() * 1e9); // Unique suffix
    cb(null, nameWithoutExt + "-" + uniqueSuffix + fileExtension); // Generate filename
  },
});

// Pass the userProfileImageStorage to multer as the `storage` option
const multerInfluencerProfileImageUpload = multer({
  storage: influencerProfileImageStorage,
});

export { multerInfluencerProfileImageUpload };
