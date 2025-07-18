const { getImageBuffer } = require("./getImageBuffer");
const { uploadImageToCloudinary } = require("./imgageUploadCloud");
const saveImageToDB = require("./saveImageToDB");
const sharp = require('sharp');

const grayScale = (imageUrl)=>{
    try{
        getImageBuffer(imageUrl)
        .then(async(origalImage) => {
            const grayscaleImage = await sharp(origalImage).grayscale().toBuffer();
            const grayScaleImageUrl = await uploadImageToCloudinary(grayscaleImage);
            await saveImageToDB(imageUrl, grayScaleImageUrl);
            console.log(imageUrl, grayScaleImageUrl, "image stored")
        })
        .catch(error => {
            console.error('Failed to get image buffer:', error);
        });   
    } catch (error){
       console.log(error);
    }
}

module.exports = grayScale