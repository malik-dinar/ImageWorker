const cloudinary = require('cloudinary')
require('dotenv').config();

async function uploadImageToCloudinary(origalImage) {
    try{
        cloudinary.config({ 
            cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
            api_key: process.env.CLOUDINARY_API_KEY, 
            api_secret: process.env.CLOUDINARY_API_SECRET,  
        });
    
        const folderName = "images-grayscale";
    
        const uploadResultOriginalImage = await new Promise((resolve) => {
          cloudinary.v2.uploader.upload_stream({ folder: folderName },(error, uploadResult) => {
              return resolve(uploadResult.url);
          }).end(origalImage);
        });
    
        return uploadResultOriginalImage
    } catch(error){
        console.log(error)
    }
}

module.exports = {
    uploadImageToCloudinary
}