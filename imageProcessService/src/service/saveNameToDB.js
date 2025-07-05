const ImageNames = require('../model/imageNames')

const saveNameToDB = async (imageName) => {
    try{     
        const image = await ImageNames.create({
          imageName: imageName,
        });
        return
    } catch (error){
        console.log(error);
    }
}

module.exports = saveNameToDB
