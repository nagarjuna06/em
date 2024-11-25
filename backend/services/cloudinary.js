import { v2 as cloudinary } from "cloudinary";
import vars from "../core/config.js";

cloudinary.config({
  cloud_name: vars.cloudinaryCloudName,
  api_key: vars.cloudinaryApiKey,
  api_secret: vars.cloudinaryApiSecret,
});

class cloudinaryService {
  static async upload(image, url) {
    let public_id = `employee_db/${crypto.randomUUID()}`;

    if (url) {
      public_id = this.extractPublicId(url);
    }

    console.log(public_id);

    try {
      const result = await cloudinary.uploader.upload(image.path, {
        public_id,
        resource_type: "image",
        transformation: [{ width: 1200, crop: "scale" }, { quality: "auto" }],
      });
      return result.secure_url;
    } catch (error) {
      console.log(error);
      return null;
    }
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
