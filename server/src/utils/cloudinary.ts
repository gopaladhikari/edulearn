import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
  api_key: process.env.CLOUDINARY_API_KEY!,
  api_secret: process.env.CLOUDINARY_API_SECRET!,
  secure: true,
});

export const uploadMedia = async (mediaPath: string) => {
  try {
    const result = await cloudinary.uploader.upload(mediaPath, {
      resource_type: "auto",
    });
    console.log(result);
    return result;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const deleteMedia = async (mediaId: string) => {
  try {
    const result = await cloudinary.uploader.destroy(mediaId, {
      resource_type: "auto",
    });
    return result;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const deleteVideo = async (mediaId: string) => {
  try {
    const result = await cloudinary.uploader.destroy(mediaId, {
      resource_type: "video",
    });
    return result;
  } catch (error) {
    console.error(error);
    return null;
  }
};
