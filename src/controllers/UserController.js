const UserModel = require('../models/UserModel');
const jwtDecode = require('jwt-decode');
const jwt = require('jsonwebtoken')
const momentObj = require('moment-timezone')
const uploadImage = require("../helpers/media/imageUploader.js")
const deleteImage = require("../helpers/media/imageDeleter.js")
const path = require('path');
const fs = require('fs')
module.exports = {
    registerUser: async (req, res) => {
        try {
            console.log(req.body)
            const user = await UserModel.findOne({ registration_id: req.body.registration_id }, { registration_id: true });
            console.log(req.body.registration_id);
            if (user == null) {
                const newUser = new UserModel({
                    registration_id: req.body.registration_id,
                    full_name: req.body.full_name,
                    mobile_number: req.body.mobile_number,
                    email_id: req.body.email_id,
                    school_details: {
                        class: req.body.class,
                        school_state: req.body.school_state,
                        school_city: req.body.school_city,
                        pincode: req.body.pincode,
                        school_name: req.body.school_name,
                        school_uuid: req.body.school_uuid,
                        school_address: req.body.school_address
                    },
                    product_id: req.body.product_id,
                    product_name: req.body.product_name,

                    amount: req.body.amount,
                    payment_mode: req.body.payment_mode,
                    payment_status: req.body.payment_status,
                    payment_id: req.body.payment_id,
                    timestamp: req.body.timestamp,
                    status: req.body.status
                });
                console.log(newUser);
                await newUser.save()
                res.status(200).json({
                    'status': '200',
                    'message': 'successful'
                });
            } else {
                res.status(400).json({
                    'status': '400',
                    'message': 'unsuccessful'
                });
            }
            // res.send("ok")
        } catch (error) {
            // console.log(error)
            res.status(500).json({
                'status': '500'
            });

        }
    },
    getActiveUsers: async (req, res) => {
        try {
            const user = await UserModel.find({ status: "1" }, {});
            console.log(user)
            if (user.length != 0) {
                res.status(200).json({
                    'status': '200',
                    'message': 'successful',
                    'active_users': user
                });
            } else {
                res.status(200).json({
                    'status': '200',
                    'message': 'successful',
                    'active_users': "user_not_found"
                });
            }
        } catch (error) {
            res.status(500).json({
                'status': '500'
            });
        }
    },
    getUserByMobile: async (req, res) => {
        try {
            const num = req.body.mobile_number;
            if (num.length == 10) {
                if (req.body.mobile_number != "undefined" || req.body.mobile_number != null || req.body.mobile_number != " ") {
                    const user = await UserModel.findOne({ mobile_number: req.body.mobile_number, status: "1" }, {});
                    console.log(user)
                    if (user != null) {
                        res.status(200).json({
                            'status': '200',
                            'message': 'successful',
                            'user': user
                        });
                    } else {
                        res.status(200).json({
                            'status': '200',
                            'message': 'successful',
                            'user': "user_not_found"
                        });
                    }
                }
                else {
                    res.status(400).json({
                        'status': '400',
                        'message': 'unsuccessful',
                        'error': 'invalid mobile number'
                    });
                }
            } else {
                res.status(400).json({
                    'status': '400',
                    'message': 'unsuccessful',
                    'error': 'invalid mobile number'
                });
            }
        } catch (error) {
            console.log(error)
            res.status(500).json({
                'status': '500'
            });

        }
    },
    getUserBySchoolUUID: async (req, res) => {
        try {
            if (req.body.school_uuid != "undefined" && req.body.school_uuid != null && req.body.school_uuid != "") {
                const user = await UserModel.find({ "school_details.school_uuid": req.body.school_uuid, status: "1" }, {});
                console.log(req.body.school_uuid)
                if (user.length != 0) {
                    res.status(200).json({
                        'status': '200',
                        'message': 'successful',
                        'user': user
                    });
                } else {
                    res.status(200).json({
                        'status': '200',
                        'message': 'successful',
                        'user': "user_not_found"
                    });
                }
            }
            else {
                res.status(400).json({
                    'status': '400',
                    'message': 'unsuccessful',
                    'error': 'invalid school_uuid'
                });
            }
        } catch (error) {
            console.log(error)
            res.status(500).json({
                'status': '500'
            });

        }
    },
    uploadProfilePic: async (req, res) => {
        try {
            const userId = req.body.userId;
            if (userId === "undefined" || userId == null || userId == '') {
                return res.status(400).json({ 'status': '400' });
            }
            const user = await UserModel.findById(userId);
            if (user == null) {
                return res.status(400).json({ 'status': '400' });
            }
            const image = req.files.image;
            const id = momentObj.utc().unix()
            let ext = image.name;
            ext = ext.substring(ext.indexOf(".") + 1);
            image.name = id + "." + ext;
            folderPath = "ProfilePicture";
            const uploadPath = 'src/uploads/' + image.name;
            image.mv(uploadPath, async (err) => {
                if (err) {
                    return res.status(400).json({ 'status': '400' });
                }
                const result = await uploadImage(id, folderPath, image.name);
                const old_image_id = user.profile_pic_id;
                user.profile_pic_url = result.secure_url;
                user.profile_pic_id = result.public_id;
                await user.save();
                await fs.unlinkSync(uploadPath)
                if (old_image_id != null) {
                    await deleteImage(old_image_id);
                }
            })
            res.status(200).json({
                'status': '200',
                'message': 'successful'
            });
        } catch (error) {
            console.log(error)
            res.status(500).json({
                'status': '500'
            });

        }
    },
    reomveProfilePic: async (req, res) => {
        try {
            const userId = req.body.userId;
            if (userId === "undefined" || userId == null || userId == '') {
                return res.status(400).json({ 'status': '400' });
            }
            const user = await UserModel.findById(userId);
            if (user == null) {
                return res.status(400).json({ 'status': '400' });
            }


            await deleteImage(user.profile_pic_id);
            user.profile_pic_id = null;
            user.profile_pic_url = null;
            await user.save()
            res.status(200).json({
                'status': '200',
                'message': 'successful'
            });
        } catch (error) {
            console.log(error)
            res.status(500).json({
                'status': '500'
            });

        }
    },
    /////////////////////////////////////////////////////////////Under-Development/////////////////////////////////////////////////////

    registerUserNew: async (req, res) => {
        try {
            
            const check = await UserModel.findOne({ registration_id: req.body.registration_id?? "null" }, { registration_id: true });
            const mobile_number = req.body.mobile_number;
            if(mobile_number.length != 10){
                return res.status(400).json({
                    'status': '400',
                    'message': 'unsuccessful'
                });
            }
            console.log(req.body.registration_id);
            if (check == null) {
                const user = await UserModel.findOne({ mobile_number: mobile_number });
                if (user == null) {
                    // new user
                    const newUser = new UserModel({
                        registration_id: req.body.registration_id,
                        full_name: req.body.full_name,
                        mobile_number: req.body.mobile_number,
                        email_id: req.body.email_id,
                        school_details: {
                            class: req.body.class,
                            school_state: req.body.school_state,
                            school_city: req.body.school_city,
                            pincode: req.body.pincode,
                            school_name: req.body.school_name,
                            school_uuid: req.body.school_uuid,
                            school_address: req.body.school_address
                        },
                        product_details: {
                            product_id: req.body.product_id,
                            product_name: req.body.product_name,

                            amount: req.body.amount,
                            payment_mode: req.body.payment_mode,
                            payment_status: req.body.payment_status,
                            payment_id: req.body.payment_id,
                            timestamp: req.body.timestamp
                        },
                        status: req.body.status
                    });
                    console.log(newUser);
                    await newUser.save()
                    res.status(200).json({
                        'status': '200',
                        'message': 'successful'
                    });
                } else {
                    // user has purchanced new product
                    const productDetails = user.product_details;
                    console.log(productDetails)
                    for (let i = 0; i < productDetails.length; i++) {
                        console.log(productDetails[i])
                        if (productDetails[i].product_id == req.body.product_id) {
                            return res.status(400).json({
                                'status': '400',
                                'message': 'unsuccessful'
                            });
                        }
                    }
                    const newProduct = {
                        product_id: req.body.product_id,
                        product_name: req.body.product_name,
                        amount: req.body.amount,
                        payment_mode: req.body.payment_mode,
                        payment_status: req.body.payment_status,
                        payment_id: req.body.payment_id,
                        timestamp: req.body.timestamp
                    }
                    
                    productDetails.push(newProduct);
                    user.product_details = productDetails
                    await user.save()
                    res.status(200).json({
                        'status': '200',
                        'message': 'successful'
                    });
                }
            } else {
                res.status(400).json({
                    'status': '400',
                    'message': 'unsuccessful'
                });
            }
            // res.send("ok")
        } catch (error) {
            console.log(error)
            res.status(500).json({
                'status': '500',
                'error':error
            });

        }
    },



    // test: async (req, res) => {
    //     try {

    //         const bearer = req.headers['authorization'];
    //         const token = bearer.split(" ");
    //         const reqData = jwtDecode.jwtDecode(token[1]);
    //         const user = await UserModel.findOne({ registration_id: reqData.registration_id }, { registration_id: true });
    //         if (user == null) {
    //             const newUser = new UserModel({
    //                 registration_id: reqData.registration_id,
    //                 full_name: reqData.full_name,
    //                 mobile_number: reqData.mobile_number,
    //                 email_id: reqData.email_id,
    //                 school_details: {
    //                     class: reqData.class,
    //                     school_state: reqData.school_state,
    //                     school_city: reqData.school_city,
    //                     pincode: reqData.pincode,
    //                     school_name: reqData.school_name,
    //                     school_uuid: reqData.school_uuid,
    //                     school_address: reqData.school_address
    //                 },
    //                 product_id: reqData.product_id,
    //                 product_name: reqData.product_name,

    //                 amount: reqData.amount,
    //                 payment_mode: reqData.payment_mode,
    //                 payment_status: reqData.payment_status,
    //                 payment_id: reqData.payment_id,
    //                 timestamp: reqData.timestamp
    //             });
    //             console.log(newUser);
    //             await newUser.save()
    //             res.status(200).json({
    //                 'status': '200',
    //                 'message': 'successful'
    //             });
    //         } else {
    //             res.status(400).json({
    //                 'status': '400',
    //                 'message': 'unsuccessful'
    //             });
    //         }
    //         // res.send("ok")
    //     } catch (error) {
    //         res.status(500).json({
    //             'status': '500',
    //             'server_error': error
    //         });
    //     }
    // }
}