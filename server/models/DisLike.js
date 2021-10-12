const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const DisLikeSchema = mongoose.Schema({
    userFrom : {
        type:Schema.Types.ObjectId,
        ref:'User'
    },
    videoId : {
        type:String
    },
    commentId : {
        type:String
    }
   
}, { timestamps: true })



const DisLike = mongoose.model('DisLike', DisLikeSchema);

module.exports = { DisLike }