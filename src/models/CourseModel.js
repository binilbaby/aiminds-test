const mongoose = require('mongoose')

const CourseSchema = new mongoose.Schema({
    course_name: {
        type: String,
        required: true,
    },
    price: {
        type: String,
        required: true,
    },
    thumbnail_url: {
        type: String,
        required: true,
    },
    thumbnail_id: {
        type: Number,
        required: true,
    },
    course_category: {
        type: Number,
        required: true,
    },
    course_duration: {
        type: Number,
        required: true,
    },
    topic: [{
        topic_name: {
            type: String,
            require: true
        },
        topic_sequence: {
            type: Number,
            require: true
        },
        topic_tag: {
            type: String,
            require: true
        },
        topic_uri_key: {
            type: String,
            require: true
        },
        language_id: {
            type: String,
            require: true
        },
        subtopic: [{
            subtopic_name: {
                type: String,
                require: true
            },
            subtopic_sequence: {
                type: Number,
                require: true
            },
            subtopic_type: {
                type: String,
                require: true
            },
            unlock_type: {
                type: String,
                require: true
            },
            time_to_complete: {
                type: String,
                require: true
            },
            subtopic_uri_key: {
                type: String,
                require: true
            },
            screen_content: [{
                type: {
                    type: String,
                    require: true
                },
                sequence: {
                    type: Number,
                    require: true
                },
                uri_key: {
                    type: String,
                    require: true
                },
                info_content: [{
                    type: {
                        type: String,
                        require: true
                    },
                    display_order: {
                        type: Number,
                        require: true
                    },
                    data: {
                        type: String,

                    },
                    url: {
                        type: String,

                    },
                    highlight: [{
                        highlight_type: {
                            type: String,
                            require: true
                        },
                        key_titile: {
                            type: String,

                        },
                        url: {
                            type: String,

                        }
                    }]
                }],
                interaction_content: [{
                    type: {
                        type: String,
                        require: true
                    },
                    question_text: {
                        type: String,

                    },
                    content_type: {
                        type: String,

                    },
                    content: {
                        type: String,

                    },
                    fib_type: {
                        type: String,

                    },
                    corrent_explaination: {
                        type: String,
                        require: true
                    },
                    incorrect_explaination: {
                        type: String,
                        require: true
                    },
                    tap_option: [
                        String
                    ],
                    answer_list: [Number],
                    option_type: {
                        type: String,

                    },
                    question: [
                        {
                            question_type: {
                                type: String
                            },
                            info_text: {
                                type: String
                            },
                            highlight: [
                                {
                                    highlight_type: {
                                        type: String,
                                        require: true
                                    },
                                    key_titile: {
                                        type: String,

                                    },
                                    url: {
                                        type: String,
                                    }
                                }
                            ]
                        }
                    ],
                    option: [String],
                    answer_index: {
                        type: Number
                    }
                }]
            }]
        }]
    }],

})
const CourseModel = mongoose.model('course', CourseSchema)
module.exports = CourseModel