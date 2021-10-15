import React, { useEffect, useState } from 'react'
import { List, Avatar, Row, Col, Button, Icon, Dropdown, Menu ,message} from 'antd';
import Axios from 'axios';
import SideVideo from './Sections/SideVideo';
import Subscriber from './Sections/Subscriber';
import LikeDislike from './Sections/LikeDislike';
import Comments from './Sections/Comments'
import { DownOutlined, UserOutlined } from '@ant-design/icons';
import VideoMenu from './Sections/VideoMenu';


function VideoDetailPage(props) {

    const userId = localStorage.getItem('userId')
    const videoId = props.match.params.videoId
    const [Video, setVideo] = useState([])
    const [CommentLists, setCommentLists] = useState([])

    const videoVariable = {
        videoId: videoId
    }
    const Variable = {
        videoId: videoId,
        userId: userId
    }
    const refreshFunction = (newComment) => {
        setCommentLists(CommentLists.concat(newComment) )
    }
    useEffect(() => {

        Axios.post('/api/comment/getComments', Variable)
        .then(response => {
            if(response.data.success){
                setCommentLists(response.data.comments)
                console.log('comments',response.data.comments)

            } else {
                alert('getComments 받아오는데 실패')
            }
        })


        Axios.post('/api/video/getVideoDetail', videoVariable)
            .then(response => {
                if (response.data.success) {
                    console.log('videoDetail',response.data.detail)
                    setVideo(response.data.detail)
                } else {
                    alert('Failed to get video Info')
                }
            })

       


    }, [])

   
    
      

    if (Video.writer) {
        return (
            <Row>
                <Col lg={18} xs={24}>
                    <div className="postPage" style={{ width: '100%', padding: '3rem 4em' }}>
                   <VideoMenu videoId={videoId} history={props.history} Video={Video} userId={userId} />
                   
  
                        <video style={{ width: '100%' }} src={`http://localhost:5000/${Video.filePath}`} controls></video>

                        <List.Item
                            actions = {[<Subscriber userTo={Video.writer._id} userFrom={localStorage.getItem('userId')}>subscriber</Subscriber>],
                                    [<LikeDislike userFrom={localStorage.getItem('userId')} videoId={videoId} />]} 
                        >
                            <List.Item.Meta
                                avatar={<Avatar src={Video.writer && Video.writer.image} />}
                                title={<a href="https://ant.design">{Video.title}</a>}
                                description={Video.description}
                            />

                        </List.Item>
                        <br />
                        <Comments videoId={videoId} CommentLists={CommentLists} userId={userId} refreshFunction={refreshFunction} />

                    </div>
                </Col>
                <Col lg={6} xs={24}>

                    <SideVideo />

                </Col>


            </Row>
        )

    } else {
        return (
            <div>Loading...</div>
        )
    }


}

export default VideoDetailPage