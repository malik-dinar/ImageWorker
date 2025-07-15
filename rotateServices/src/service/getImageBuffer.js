const axios = require('axios');

async function getImageBuffer(imageUrl) {
    try {
        const response = await axios.get(imageUrl, {
            responseType: 'arraybuffer'
        });
        return Buffer.from(response.data); 
    } catch (error) {
        console.error('Error fetching image:', error);
        throw error;
    }
}

module.exports = { getImageBuffer }