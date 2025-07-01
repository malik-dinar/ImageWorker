const RotatedImage = require('../model/RotatedImages')

const saveImageToDB = async (ogImageUrl, rotateImageUrl) =>{
    try{       
        const image = await RotatedImage.create({
          imagePath: ogImageUrl,
          rotatedImagePath: rotateImageUrl,
        });
        return
    } catch (error){
        console.log(error);
    }
}

module.exports = saveImageToDB
