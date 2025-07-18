const { getImageBuffer } = require("./getImageBuffer");
const { uploadImageToCloudinary } = require("./imgageUploadCloud");
const saveImageToDB = require("./saveImageToDB");
const sharp = require('sharp');

const rotateImage = async (imageUrl) => {
    try{
        getImageBuffer(imageUrl)
        .then(async(origalImage) => {
            const rotatedImage = await sharp(origalImage).rotate(90).toBuffer();
            const rotatedImageUrl = await uploadImageToCloudinary(rotatedImage);
            await saveImageToDB(imageUrl, rotatedImageUrl);
            console.log(imageUrl, rotatedImageUrl, "image stored")
        })
        .catch(error => {
            console.error('Failed to get image buffer:', error);
        });       
    } catch (error){
       console.log(error);
    }
}

module.exports = rotateImage
