const cloudinary = require("../../config/cloudinary.js");

async function deleteImage(id) {
    try {
        await cloudinary.v2.uploader.destroy(id);
    } catch (err) {
        console.log(err)
    }
}
module.exports = deleteImage;