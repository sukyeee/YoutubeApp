const express = require('express');
const router = express.Router();
const { Like } = require("../models/Like");
const { DisLike } = require("../models/DisLike");

//=================================
//             likeDislike
//=================================

router.post('/getlikeNumber', (req, res) => {

    if(req.body.commentId){
        Like.find({'commentId' : req.body.commentId}, (err, info) => {
            if(err) return res.status(400).json({success:false})
            return res.status(200).json({success:true, number:info.length})
    
        })
    } else {
        Like.find({'videoId' : req.body.videoId}, (err, info) => {
            if(err) return res.status(400).json({success:false})
            return res.status(200).json({success:true, number:info.length})
    
        })
    }
    
})

router.post('/getliked', (req, res) => {
    
    if(req.body.commentId){
        Like.find({'userFrom' : req.body.userFrom, 'commentId' : req.body.commentId}, (err, info) => {
            if(err) return res.status(400).json({success:false})
            let result = false
            if(info.length != 0) result = true
            return res.status(200).json({success:true, result})
    
        })
    } else {
        Like.find({'userFrom' : req.body.userFrom, 'videoId' : req.body.videoId}, (err, info) => {
            if(err) return res.status(400).json({success:false})
            let result = false
            if(info.length != 0) result = true
            return res.status(200).json({success:true, result})
    
        })
    }
   
 
})


router.post('/getDislikeNumber', (req, res) => {
    if(req.body.commentId){
        DisLike.find({ 'commentId' : req.body.commentId}, (err, info) => {
            if(err) return res.status(400).json({success:false})
            return res.status(200).json({success:true, number:info.length})
    
        })
    } else {
        DisLike.find({ 'videoId' : req.body.videoId}, (err, info) => {
            if(err) return res.status(400).json({success:false})
            return res.status(200).json({success:true, number:info.length})
    
        })
    }
    
})

router.post('/getDisliked', (req, res) => {
    if(req.body.commentId){
        DisLike.find({'userFrom' : req.body.userFrom, 'commentId' : req.body.commentId}, (err, info) => {
            if(err) return res.status(400).json({success:false})
            let result = false
            if(info.length != 0) result = true
            return res.status(200).json({success:true, result})
    
        })
    } else {
        DisLike.find({'userFrom' : req.body.userFrom, 'videoId' : req.body.videoId}, (err, info) => {
            if(err) return res.status(400).json({success:false})
            let result = false
            if(info.length != 0) result = true
            return res.status(200).json({success:true, result})
    
        })
    }
    
 
})

router.post('/liked', (req, res) => {
   
    const like = new Like(req.body)
    like.save((err, liked) => {
        if(err) return res.status(400).json({success:false, err})
        return res.status(200).json({success:true, liked})
    })
})

router.post('/unliked', (req, res) => {
    if(req.body.commentId){
        Like.findOneAndDelete({'userFrom' : req.body.userFrom, 'commentId' : req.body.commentId }, (err, liked) => {
            if(err) return res.status(400).json({success:false, err})
            return res.status(200).json({success:true, liked})
        })
    } else {
        Like.findOneAndDelete({'userFrom' : req.body.userFrom, 'videoId' : req.body.videoId }, (err, liked) => {
            if(err) return res.status(400).json({success:false, err})
            return res.status(200).json({success:true, liked})
        })
    }
   
    

})

router.post('/disliked', (req, res) => {
   
    const dislike = new DisLike(req.body)
    dislike.save((err, liked) => {
        if(err) return res.status(400).json({success:false, err})
        return res.status(200).json({success:true, liked})
    })
})

router.post('/undisliked', (req, res) => {
    if(req.body.commentId){
        DisLike.findOneAndDelete({'userFrom' : req.body.userFrom, 'commentId' : req.body.commentId }, (err, liked) => {
            if(err) return res.status(400).json({success:false, err})
            return res.status(200).json({success:true, liked})
        })
    } else {
        DisLike.findOneAndDelete({'userFrom' : req.body.userFrom, 'videoId' : req.body.videoId }, (err, liked) => {
            if(err) return res.status(400).json({success:false, err})
            return res.status(200).json({success:true, liked})
        })
    }
    
    

})

module.exports = router;
