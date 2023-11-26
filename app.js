
const express = require('express')
const app = express()
const dotenv = require("dotenv")
const fileUpload = require('express-fileupload');
dotenv.config()
const { MONGODB_URL, PORT } = process.env;
const multer = require('multer');
const accessAuthentication = require('./src/middleware/authenticate')
const bodyParser = require('body-parser')
const cors = require('cors');
app.set('view engine', 'pug');
app.use(express.json());
TZ = 'Asia/Calcutta';
app.use(fileUpload());
app.use(express.static('public'));
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
const mongoose = require('mongoose')

// mongoose.connect(MONGODB_URL).then(() => {
//     console.log("Connected to DB")
//     app.listen(PORT, () => {
//         console.log("port "+PORT);
//     })
// }).catch((err) => {
//     console.log(err);
// });
mongoose.connect("mongodb://admin54321:AiMind12345@10.160.0.2:27017/aiMinds").then(() => {
    console.log("Connected to DB")
    app.listen(PORT, () => {
        console.log("port "+PORT);
    })
}).catch((err) => {
    console.log(err);
});
const userRouter = require('./src/routers/userRouter')
// app.use('*',accessAuthentication)  jwt middleware
app.use('/user', userRouter)
app.use('*',(req,res)=>{
    res.status(404).json({
        'status': '404',
        'message':'unsuccessful'
    });
});