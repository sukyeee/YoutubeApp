import React , {useEffect}from 'react'
import {Menu, Icon, Dropdown, Button} from 'antd'
import Axios from 'axios';

function VideoMenu(props) {
    useEffect(() => {
        console.log('history', props.history)

    }, [])
    const onClickDelete = () => {
        Axios.post('/api/video/deleteVideo', {videoId : props.videoId})
            .then(response => {
                if(response.data.success){
                    console.log(response.data.delete)
                    alert('비디오가 삭제되었습니다')
                    props.history.push('/');

                } else alert('video delete 실패')
            })
    }

    const onClickEdit = () => {
        
        props.history.push({pathname:`/video/${props.videoId}/edit` , state:{Video:props.Video} });

    }


    const menu = (
        <Menu>
          <Menu.Item key="1" >
            <span>Delete</span><Icon type="close" style={{color:'red',}} onClick={onClickDelete}></Icon>
          </Menu.Item>
          <Menu.Item key="2" >
            <span>Edit </span><Icon type="edit" style={{color:'blue',}} onClick={onClickEdit}></Icon>
          </Menu.Item>
         
        </Menu>
   
      );

    return (
        <div>
            <div style={{marginBottom:'0.5rem', display:'flex', justifyContent:'right'}}>
             <Dropdown overlay={menu} >
                    <Button>
                     <Icon type="more"></Icon>
                    </Button>
                     </Dropdown>
            </div>
        </div>
    )
}

export default VideoMenu
