const cloudinary = require('cloudinary')
require('dotenv').config();

async function uploadImageToCloudinary(origalImage, rotatedImage) {
    console.log('upload function cloud');

     cloudinary.config({ 
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
        api_key: process.env.CLOUDINARY_API_KEY, 
        api_secret: process.env.CLOUDINARY_API_SECRET 
    });
  
    const uploadResultOriginalImage = await new Promise((resolve) => {
      cloudinary.v2.uploader.upload_stream((error, uploadResult) => {
          return resolve(uploadResult.url);
      }).end(origalImage);
    });

    console.log(uploadResultOriginalImage);

    return uploadResultOriginalImage
    
}

module.exports = {
    uploadImageToCloudinary
}