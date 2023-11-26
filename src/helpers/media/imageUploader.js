const cloudinary = require("../../config/cloudinary.js");

async function uploadImage (id, folderPath,imageName) {
    try{

    
    let res = null;
    await cloudinary.v2.uploader.upload("src/uploads/" + imageName,
    {folder: folderPath},function (error, result) { res = result});
    return res;
    }catch(err){
        console.log(err)
    }
}
module.exports = uploadImage;