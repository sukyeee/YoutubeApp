const express = require('express');
const router = express.Router();
const { Like } = require("../models/Like");
const { DisLike } = require("../models/DisLike");

//=================================
//             likeDislike
//=================================

router.post('/getlikeNumber', (req, res) => {

    Like.find({'videoId' : req.body.videoId}, (err, info) => {
        if(err) return res.status(400).json({success:false})
        return res.status(200).json({success:true, number:info.length})

    })
})

router.post('/getliked', (req, res) => {
    
    Like.find({'userFrom' : req.body.userFrom, 'videoId' : req.body.videoId}, (err, info) => {
        if(err) return res.status(400).json({success:false})
        let result = false
        if(info.length != 0) result = true
        return res.status(200).json({success:true, result})

    })
 
})


router.post('/getDislikeNumber', (req, res) => {

    DisLike.find({ 'videoId' : req.body.videoId}, (err, info) => {
        if(err) return res.status(400).json({success:false})
        return res.status(200).json({success:true, number:info.length})

    })
})

router.post('/getDisliked', (req, res) => {
    
    DisLike.find({'userFrom' : req.body.userFrom, 'videoId' : req.body.videoId}, (err, info) => {
        if(err) return res.status(400).json({success:false})
        let result = false
        if(info.length != 0) result = true
        return res.status(200).json({success:true, result})

    })
 
})

router.post('/liked', (req, res) => {

    const like = new Like(req.body)
    like.save((err, liked) => {
        if(err) return res.status(400).json({success:false, err})
        return res.status(200).json({success:true, liked})
    })
})

router.post('/unliked', (req, res) => {

    Like.findOneAndDelete({'userFrom' : req.body.userFrom, 'videoId' : req.body.videoId }, (err, liked) => {
        if(err) return res.status(400).json({success:false, err})
        return res.status(200).json({success:true, liked})
    })
    

})

router.post('/disliked', (req, res) => {

    const dislike = new DisLike(req.body)
    dislike.save((err, liked) => {
        if(err) return res.status(400).json({success:false, err})
        return res.status(200).json({success:true, liked})
    })
})

router.post('/undisliked', (req, res) => {

    DisLike.findOneAndDelete({'userFrom' : req.body.userFrom, 'videoId' : req.body.videoId }, (err, liked) => {
        if(err) return res.status(400).json({success:false, err})
        return res.status(200).json({success:true, liked})
    })
    

})

module.exports = router;
