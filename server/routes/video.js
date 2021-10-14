const express = require('express');
const router = express.Router();
const { Video } = require("../models/Video");

const { auth } = require("../middleware/auth");
const multer = require("multer");
const ffmpeg = require("fluent-ffmpeg");
const { User } = require('../models/User');
const { Subscriber } = require('../models/Subscriber');
//=================================
//             Video
//=================================

var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/')
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}_${file.originalname}`)
    },
    fileFilter: (req, file, cb) => {
        const ext = path.extname(file.originalname)
        if (ext !== '.mp4' || ext !== '.mov' || ext !== '.png') {
            return cb(res.status(400).end('only jpg, png, mp4 is allowed'), false);
        }
        cb(null, true)
    }
})

var upload = multer({ storage: storage }).single("file")

router.post('/uploadfiles', (req, res) => {
    //비디오를 서버에 저장한다.
    upload(req, res, err => {
        if(err){
            return res.json({ success: false, err})
        }
        return res.json({success:true, url:res.req.file.path, filename: res.req.file.filename})
    })

})

router.post("/thumbnail", (req, res) => {

    let filePath ="";
    let fileDuration ="";

    //비디오 정보 가져오기
    ffmpeg.ffprobe(req.body.url, function(err, metadata){
        console.dir(metadata);
        console.log(metadata.format.duration);

        fileDuration = metadata.format.duration;
    })

    //썸네일 생성
    ffmpeg(req.body.url)
        .on('filenames', function (filenames) {
            console.log('Will generate ' + filenames.join(', '))
            filePath = "uploads/thumbnails/" + filenames[0];
        })
        .on('end', function () {
            console.log('Screenshots taken');
            return res.json({ success: true, url: filePath, fileDuration: fileDuration})
        })
        .screenshots({
            // Will take screens at 20%, 40%, 60% and 80% of the video
            count: 3,
            folder: 'uploads/thumbnails',
            size:'320x240',
            // %b input basename ( filename w/o extension )
            filename:'thumbnail-%b.png'
        });

});

router.post("/uploadVideo", (req, res) => {

    const video = new Video(req.body)

    video.save((err, video) => {
        if(err) return res.status(400).json({ success: false, err })
        return res.status(200).json({
            success: true 
        })
    })

});

router.get("/getVideos", (req, res) => {

    Video.find()
        .populate('writer')
        .exec((err, videos) => {
            if(err) return res.status(400).send(err);
            res.status(200).json({ success: true, videos })
        })

});

router.post("/getVideoDetail", (req, res) => {

    Video.findOne({"_id": req.body.videoId})
        .populate('writer')
        .exec((err, detail) => {
            if(err) return res.status(400).send(err);
            res.status(200).json({ success: true, detail })
        })
        

});

router.post("/deleteVideo", (req, res) => {

    Video.findOneAndDelete({"_id": req.body.videoId}, ((err, video) => {
        if(err) return res.status(400).send(err);
        res.status(200).json({ success: true, video })
    }))
       
        

});

router.post("/editVideo", (req, res) => {

    Video.findOneAndUpdate({"_id": req.body.videoId},
    {"title" : req.body.title, "description" : req.body.description, 
    "privacy" : req.body.privacy, "category" : req.body.category},
     ((err, video) => {
        if(err) return res.status(400).json({success:false});
        res.status(200).json({ success: true, video })

      
        
    }))
        

});


module.exports = router;
