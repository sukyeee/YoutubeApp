import React, {useState, useEffect} from 'react'
import {Icon, Tooltip} from 'antd'
import Axios from 'axios'

function LikeDislike(props) {

    const [likeNumber, setLikeNumber] = useState(0)
    const [liked, setLiked] = useState(false)
    const [disLikeNumber, setDisLikeNumber] = useState(0)
    const [disliked, setDisliked] = useState(false)

    const Variable = {
        userFrom:props.userFrom,
        videoId:props.videoId
    }

    useEffect(() => {
        
      
        //liked 여부와 likenumber, dislike 여부와 dislikenumber 가져오기
        Axios.post('/api/likeDislike/getlikeNumber', {videoId:props.videoId})
            .then(response => {
                if(response.data.success){
                    console.log('...',response.data.number)
                    setLikeNumber(response.data.number)
                } else alert('getlikeNumber 가져오는데 실패')
            })
        Axios.post('/api/likeDislike/getliked', Variable)
        .then(response => {
            if(response.data.success){
                console.log(response.data.result)
                setLiked(response.data.result)
            } else alert('getliked 가져오는데 실패')
        })

        Axios.post('/api/likeDislike/getDislikeNumber', {videoId:props.videoId})
        .then(response => {
            if(response.data.success){
                console.log('...',response.data.number)
                setDisLikeNumber(response.data.number)
            } else alert('getlikeNumber 가져오는데 실패')
        })
        Axios.post('/api/likeDislike/getDisliked', Variable)
        .then(response => {
            if(response.data.success){
                console.log(response.data.result)
                setDisliked(response.data.result)
            } else alert('getliked 가져오는데 실패')
        })


     
    }, [])

    
    const onClickLike = () => {
        if(disliked){
            Axios.post('/api/likeDislike/undisliked', Variable)
            .then(response => {
                if(response.data.success){
                    setDisLikeNumber(disLikeNumber - 1)
                    setDisliked(!disliked)
                } else alert('liked 정보 가져오기 실패')

            })

        }
        if(liked){
            Axios.post('/api/likeDislike/unliked', Variable)
            .then(response => {
                if(response.data.success){
                    setLikeNumber(likeNumber - 1)
                    setLiked(!liked)
                } else alert('liked 정보 가져오기 실패')

            })
        } else {
            Axios.post('/api/likeDislike/liked', Variable)
            .then(response => {
                if(response.data.success){
                    setLikeNumber(likeNumber + 1)
                    setLiked(!liked)
                } else alert('liked 정보 가져오기 실패')

            })
        }
        
    }
    const onClickDisLike = () => {
        if(liked){
            Axios.post('/api/likeDislike/unliked', Variable)
            .then(response => {
                if(response.data.success){
                    setLikeNumber(likeNumber - 1)
                    setLiked(!liked)
                } else alert('liked 정보 가져오기 실패')

            })
        }
        if(disliked){
            Axios.post('/api/likeDislike/undisliked', Variable)
            .then(response => {
                if(response.data.success){
                    setDisLikeNumber(disLikeNumber - 1)
                    setDisliked(!disliked)
                } else alert('liked 정보 가져오기 실패')

            })
        } else {
            Axios.post('/api/likeDislike/disliked', Variable)
            .then(response => {
                if(response.data.success){
                    setDisLikeNumber(disLikeNumber + 1)
                    setDisliked(!disliked)
                } else alert('liked 정보 가져오기 실패')

            })
        }
    }



    return (
        <div>
                <Tooltip title="Like">
                <Icon type="like" theme={liked? 'filled':"outlined"}  onClick={onClickLike} ></Icon>      
                &nbsp; {likeNumber} &nbsp;
                </Tooltip>
                <Tooltip title="DisLike">
                <Icon type="dislike" theme={disliked? 'filled':"outlined"}  onClick={onClickDisLike} ></Icon>      
                &nbsp; {disLikeNumber}  &nbsp;
                </Tooltip>
        </div>
    )
}

export default LikeDislike