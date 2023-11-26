const express = require("express");
const router = express.Router();
const userController = require("../controllers/UserController");
// User Routes
    router.post("/registerUser", userController.registerUser); // User Registration Route // args : User Model details
    router.post("/registerUserNew", userController.registerUserNew); // User Registration Route // args : User Model details
    router.post("/getActiveUsers", userController.getActiveUsers); // Get Active Users  // args : No args 
    router.post("/getUserByMobile", userController.getUserByMobile); // Get Active User By Mobile Number // args : users.mobile_number
    router.post("/getUserBySchoolUUID", userController.getUserBySchoolUUID); // Get Active User By School UUID // args : users.school_uuid
    router.post("/uploadProfilePic", userController.uploadProfilePic); // Get Active User By School UUID // args : users.school_uuid
    router.post("/reomveProfilePic", userController.reomveProfilePic); // Get Active User By School UUID // args : users.school_uuid
    




module.exports = router