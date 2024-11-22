import { v2 as cloudinary } from "cloudinary";
import vars from "../core/config.js";

cloudinary.config({
  cloud_name: vars.cloudinaryCloudName,
  api_key: vars.cloudinaryApiKey,
  api_secret: vars.cloudinaryApiSecret,
});

class cloudinaryService {
  static async upload(image) {
    const result = await cloudinary.uploader.upload(image.path, {
      public_id: `employee_db/${crypto.randomUUID()}`,
      resource_type: "image",
      transformation: [{ width: 1200, crop: "scale" }, { quality: "auto" }],
    });
    return result.secure_url;
  }
  static extractPublicId(url) {
    const match = url.match(/\/image\/upload\/(?:v\d+\/)?([^\.]+)/);
    return match ? match[1] : null;
  }
  static async delete(url) {
    const publicId = this.extractPublicId(url);

    await cloudinary.uploader.destroy(publicId);
  }
}

export default cloudinaryService;
