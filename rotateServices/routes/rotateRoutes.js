const express = require('express');
const router = express.Router();
var multer  = require('multer')

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.post('/', upload.single('image'), async (req, res) => {
    try{
       console.log(req.file);
       const data = {
           "sample" : "resposne"
       }   
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