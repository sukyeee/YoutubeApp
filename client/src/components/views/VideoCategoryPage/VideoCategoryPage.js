import React, {useState, useEffect} from 'react'
import { Card, Avatar, Col, Typography, Row } from 'antd';
import Axios from 'axios'
import moment from 'moment';
const { Title } = Typography;
const { Meta } = Card;


function VideoCategoryPage(props) {
    console.log(props.match.params.categoryNumber)
    const categoryNumber = props.match.params.categoryNumber
    const [Videos, setVideos] = useState([])
    const CategoryOption = [
        {value: 0, label: "Film & Animation"},
        {value: 1, label: "Autos & Vehicles"},
        {value: 2, label: "Music"},
        {value: 3, label: "Pets & Animals"},
        {value: 4, label: "Study"},
        {value: 5, label: "GrandChase"},
        {value: 6, label: "etc"},
    ]
    useEffect(() => {
        
        Axios.post('/api/video/getCategoryVideo', {category : categoryNumber})
            .then(response => {
                if(response.data.success){
                    setVideos(response.data.videos)
                } else alert('CategoryVideo 가져오는데 실패')
            })

    }, [])

    const renderCards = Videos.map((video, index) => {

        var minutes = Math.floor(video.duration / 60);
        var seconds = Math.floor(video.duration - minutes * 60);

        return <Col lg={6} md={8} xs={24}>
            <div style={{ position: 'relative' }}>
                <a href={`/video/${video._id}`} >
                <img style={{ width: '100%' }} alt="thumbnail" src={`http://localhost:5000/${video.thumbnail}`} />
                <div className="duration"
                    style={{ bottom: 0, right:0, position: 'absolute', margin: '4px', 
                    color: '#fff', backgroundColor: 'rgba(17, 17, 17, 0.8)', opacity: 0.8, 
                    padding: '2px 4px', borderRadius:'2px', letterSpacing:'0.5px', fontSize:'12px',
                    fontWeight:'500', lineHeight:'12px' }}>
                    <span>{minutes} : {seconds}</span>
                </div>
                </a>
            </div><br />
            <Meta
                avatar={
                    <Avatar src={video.writer.image} />
                }
                title={video.title}
            />
            <span>{video.writer.name} </span><br />
            <span style={{ marginLeft: '3rem' }}> {video.views}</span>
            view - <span> {moment(video.createdAt).format("MMM Do YY")} </span>
        </Col>

    })

    return (
       <div style={{ width: '85%', margin: '3rem auto' }}>
            <Title level={2} > {CategoryOption[categoryNumber].label} </Title>
            <hr />

            <Row gutter={16}>
                {renderCards}
            </Row>
        </div>
    )
}

export default VideoCategoryPage
