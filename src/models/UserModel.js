const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    registration_id: {
        type: String,
        required: true,
    },
    full_name: {
        type: String,
        required: true,
    },
    email_id: {
        type: String,
        required: true,
    },
    mobile_number: {
        type: Number,
        required: true,
    },
    school_details: {
        class: {
            type: String,
            required: true,
        },
        school_state: {
            type: String,
            required: true,
        },
        school_city: {
            type: String,
            required: true,
        },
        pincode: {
            type: String,
            required: true,
        },
        school_name: {
            type: String,
            required: true,
        },
        school_uuid: {
            type: String,
            required: true,
        },
        school_address: {
            type: String,
            required: true,
        },
    },
    product_details: [{
        product_id: {
            type: String,
            required: true,
        },
        product_name: {
            type: String,
            required: true,
        },
        amount: {
            type: Number,
            required: true,
        },
        payment_mode: {
            type: String,
            required: true,
        },
        payment_status: {
            type: Boolean,
            required: true,
        },
        payment_id: {
            type: String,
            required: true,
        },
        timestamp: {
            type: String,
            required: true,
        },
        
    }],

    otp: [String],
    whatsApp_number: {
        type: String
    },
    password: {
        type: String
    },
    isLoggedIn: {
        type: Boolean
    },
    profile_pic_url: {
        type: String
    },
    profile_pic_id: {
        type: String
    },
    courseDetails: {
        type: String
    },
    voucherDetails: {
        type: String
    },
    status: {
        type: Number,
        required: true,
    }
})


const UserModel = mongoose.model('user', UserSchema)
module.exports = UserModel