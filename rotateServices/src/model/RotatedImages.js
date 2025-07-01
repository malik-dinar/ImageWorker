const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const rotateImagesSchema = new Schema({
    imagePath : String,
    rotatedImagePath : String
})

const RotatedImage = model('RotatedImages', rotateImagesSchema);

module.exports = RotatedImage;