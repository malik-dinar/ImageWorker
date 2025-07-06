const express = require('express');
const axios = require('axios');
const multer  = require('multer')
const FormData = require('form-data');
const saveNameToDB = require('../service/saveNameToDB');
require('dotenv').config();

const router = express.Router();
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.post('/', upload.single('image'), async (req, res) => {
     try{
          const createFormData = () =>{
               const formData = new FormData();
               formData.append('image', req.file.buffer, {
                 filename: req.file.originalname,
                 contentType: req.file.mimetype,
               });
               return formData
          }

          const formDataRotate = createFormData();
          const formDataGray = createFormData();

          await saveNameToDB(req.file.originalname);  
          

          const [rotateResponse, grayResponse] =await Promise.all([
               axios.post(`${process.env.ROTATE_IMAGE_URL}`, formDataRotate , {
                    headers: formDataRotate.getHeaders(),
               }),
                axios.post(process.env.GRAY_IMAGE_URL, formDataGray, {
                 headers: formDataGray.getHeaders(),
               }),
          ])

          res.status(200).json({
               success: true,
               rotatedImage: rotateResponse.data,
               grayScaleImage: grayResponse.data
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