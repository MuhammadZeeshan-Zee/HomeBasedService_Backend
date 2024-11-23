import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
const uploadOnCloudinary = async function (localFilePath) {
  // Configuration
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET, // Click 'View API Keys' above to copy your API secret
  });

  // Upload an image
  const uploadResult = await cloudinary.uploader
    .upload(localFilePath, {
      resource_type: "auto",
    })
    .catch((error) => {
      console.log(error);
      fs.unlinkSync(localFilePath); //remove locally saved temporary file as the upload operation got failed
      return null;
    });

  // console.log("uploadResult", uploadResult);

  // Optimize delivery by resizing and applying auto-format and auto-quality
  const optimizeUrl = cloudinary.url("shoes", {
    fetch_format: "auto",
    quality: "auto",
  });

  // console.log("optimizeUrl",optimizeUrl);

  // Transform the image: auto-crop to square aspect_ratio
  const autoCropUrl = cloudinary.url("shoes", {
    crop: "auto",
    gravity: "auto",
    width: 500,
    height: 500,
  });

  // console.log("autoCropUrl",autoCropUrl);
  fs.unlinkSync(localFilePath);
  return uploadResult;
};
export { uploadOnCloudinary };
