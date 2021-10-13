import React, {useState} from 'react'
import {Comment, Avatar, Button, Input} from 'antd'
import Axios from 'axios'

const {Textarea} = 'Input'

function SingleComments(props) {

    const [CommentValue, setCommentValue] = useState("")
    const [openReply, setopenReply] = useState(false)

    const onChangeComment = (e) => {
        setCommentValue(e.target.value)
    }
    const Variable = {
        responseTo:props.comment._id,
        writer : props.userId,
        videoId : props.videoId,
        content : CommentValue
    }
    const onClickSubmit = (e) => {
        e.preventDefault()
        Axios.post('/api/comment/addComment', Variable)
            .then(response => {
                if(response.data.success){
                    console.log(response.data.result)
                    setCommentValue("")
                    setopenReply(!openReply)
                    props.refreshFunction(response.data.result)
                
                } else alert('addComment하는데 실패')

            })
    }
    const OpenReplybutton = () => {
        setopenReply(!openReply)
    }

   const actions = [
       <span onClick={OpenReplybutton}>Reply to</span>
   ]

    return (
       
        <div>
            <Comment
                actions = {actions}
                author = {props.comment.writer.name}
                avatar = {<Avatar img={props.comment.writer.image} alt />}
                content = {props.comment.content}

            />
 
           { openReply && 
           <form onSubmit={onClickSubmit}>
                <div style={{'display':'flex', 'margin':'1rem 0'}}>
                <Input onChange={onChangeComment} value={CommentValue} /><Button onClick={onClickSubmit}>Submit</Button>
                </div>

            </form>

            
            }
        </div>
    )
}

export default SingleComments
