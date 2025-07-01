const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const imageNamesSchema = new Schema({
    imageName : String
})

const ImageNames = model('ImageNames', imageNamesSchema);

module.exports = ImageNames;