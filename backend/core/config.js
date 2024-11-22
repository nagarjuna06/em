import { config } from "dotenv";

config();

const vars = {
  databaseUrl: process.env.DATABASE_URL,
  secretKey: process.env.SECRET_KEY,
  port: parseInt(process.env.PORT) || 8000,
  tokenExpiration: process.env.TOKEN_EXPIRATION || "30d",
  cloudinaryCloudName: process.env.CLOUDINARY_CLOUD_NAME,
  cloudinaryApiKey: process.env.CLOUDINARY_API_KEY,
  cloudinaryApiSecret: process.env.CLOUDINARY_API_SECRET,
};

export default vars;
