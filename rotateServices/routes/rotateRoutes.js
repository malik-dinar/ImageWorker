const express = require('express');
const router = express.Router();
var multer  = require('multer')
const sharp = require('sharp');
const { uploadImageToCloudinary } = require('../service/imgageUploadCloud');

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.post('/', upload.single('image'), async (req, res) => {
    try{
       const origalImage = req.file.buffer
       const data = {
           "sample" : "resposne"
       }
       const rotatedImage = await sharp(origalImage).rotate(90).toBuffer();
       console.log(rotatedImage);
       
        const imageUrl = await uploadImageToCloudinary(origalImage);
        const rotatedImageUrl = await uploadImageToCloudinary(rotatedImage);

       console.log(imageUrl, "image url",rotatedImageUrl);
       
       res.json(data);
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