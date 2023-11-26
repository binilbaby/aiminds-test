const jwt = require('jsonwebtoken')

const {isTokenIncluded,getAccessToken} = require('../helpers/auth/authHelper')


const accessAuthentication = (req,res,next) =>{
    if(!isTokenIncluded(req)){
        return res.status(401).json({'status':'401','message':'unsuccessful'});
    }

    const token = getAccessToken(req);
    jwt.verify(token,process.env.JWT_SECRET_KEY,(err,decoded)=>{
        if(err){
            console.log(err)
            return res.status(401).json({'status':'401','message':'unsuccessful'});
        }
        next()
    })
}

module.exports = accessAuthentication