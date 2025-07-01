const ImageNames = require('../model/imageNames')

const saveNameToDB = async (imageName) => {
    try{     
        console.log("1", imageName)  
        const image = await ImageNames.create({
          imageName: imageName,
        });
        return
    } catch (error){
        console.log(error);
    }
}

module.exports = saveNameToDB
