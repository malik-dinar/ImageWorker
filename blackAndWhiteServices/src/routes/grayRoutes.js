const express = require('express');
const router = express.Router();
var multer  = require('multer')
const sharp = require('sharp');
const { uploadImageToCloudinary } = require('../service/imgageUploadCloud');
const saveImageToDB = require('../service/saveImageToDB');
const { getImageBuffer } = require('../service/getImageBuffer');

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.post('/', async (req, res) => {
    try{
        const { imageUrl } = req.body;
        getImageBuffer(imageUrl)
        .then(async(origalImage) => {
            const grayscaleImage = await sharp(origalImage).grayscale().toBuffer();
            const grayScaleImageUrl = await uploadImageToCloudinary(grayscaleImage);
            await saveImageToDB(imageUrl, grayScaleImageUrl);
            res.json(grayScaleImageUrl);
        })
        .catch(error => {
            console.error('Failed to get image buffer:', error);
        });   
    } catch (error){
       console.log(error);
       return res.sendStatus(400);
    }
})

router.get('/', async (req, res) => {
    const data = {
        "sample" : "resposne"
    }

    res.json(data);
})

module.exports = router;