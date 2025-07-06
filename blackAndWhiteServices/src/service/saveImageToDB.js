const GrayImage = require('../model/GrayImages')

const saveImageToDB = async (ogImageUrl, grayscaleImage) =>{
    try{       
        const image = await GrayImage.create({
          imagePath: ogImageUrl,
          grayImagePath: grayscaleImage,
        });
        return
    } catch (error){
        console.log(error);
    }
}

module.exports = saveImageToDB
