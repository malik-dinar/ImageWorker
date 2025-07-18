const express = require('express');
const axios = require('axios');
const multer  = require('multer')
const FormData = require('form-data');
const saveNameToDB = require('../service/saveNameToDB');
const { uploadImageToCloudinary } = require('../service/imageUploadCloud');
const publishMessage = require('../service/kafka');
require('dotenv').config();

const router = express.Router();
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.post('/', upload.single('image'), async (req, res) => {
     try{
          const origalImage = req.file.buffer;

          await saveNameToDB(req.file.originalname);  

          const imageUrl = await uploadImageToCloudinary(origalImage);
          const data = { imageUrl }
          
          publishMessage('test-topic',imageUrl)

          // const [rotateResponse, grayResponse] =await Promise.all([
          //      axios.post(process.env.ROTATE_IMAGE_URL, data ),
          //      axios.post(process.env.GRAY_IMAGE_URL, data),
          // ])

          res.status(200).json({
               success: true,
               // rotatedImage: rotateResponse.data,
               // grayScaleImage: grayResponse.data
          });

     } catch (error){
          console.log(error);
          return res.sendStatus(400);
     }
})

router.get('/', async (req, res) => {
     res.send('microservoice test');
})

module.exports = router;