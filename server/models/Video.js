const mongoose = require('mongoose');
const { User } = require('./User');
const Schema = mongoose.Schema;

const videoSchema = mongoose.Schema({
    writer: {
        type:Schema.Types.ObjectId,
        // id만넣어도 Usermodel에서 정보를 가져올수있음
        ref: 'User'
    },
    title: {
        type:String,
        maxlength:50,
    },
    description: {
        type: String,
    },
    privacy: {
        type: Number,
    },
    filePath : {
        type: String,
    },
    category: {
        type:Number
    },
    views : {
        type: Number,
        default: 0 
    },
    duration :{
        type: String
    },
    thumbnail: {
        type: String
    }
}, { timestamps: true })



const Video = mongoose.model('Video', videoSchema);

module.exports = { Video }