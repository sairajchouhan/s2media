import { v2 as cloudinary } from 'cloudinary'

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

export const cloudinaryPostImageUpload = (file: string, folder: string = 's2media/posts') =>
  cloudinary.uploader.upload(file, {
    folder,
  })

export const cloudinaryUserProfileImageUpload = (
  file: string,
  folder: string = 's2media/user_profile_images'
) =>
  cloudinary.uploader.upload(file, {
    folder,
  })

export { cloudinary }
