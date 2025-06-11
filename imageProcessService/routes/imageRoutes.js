const express = require('express');
const axios = require('axios');
const multer  = require('multer')
const FormData = require('form-data');
require('dotenv').config();

const router = express.Router();
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.post('/', upload.single('image'), async (req, res) => {
     try{
          const formData = new FormData();
          formData.append('image', req.file.buffer, {
            filename: req.file.originalname,
            contentType: req.file.mimetype,
          });

          console.log(req.file);
          const response = await axios.post(`${process.env.ROTATE_IMAGE_URL}`, formData , {
            headers: formData.getHeaders(),
          });
          // console.log(response);         
          res.status(200).json({
            orders: response.data.sample,
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