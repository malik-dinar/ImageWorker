const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const grayImageSchema = new Schema({
    imagePath : String,
    grayImagePath : String
})

const GrayImage = model('GrayImages', grayImageSchema);

module.exports = GrayImage;