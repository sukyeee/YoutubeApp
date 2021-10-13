import { Avatar, Button, Input } from 'antd'
import Axios from 'axios'
import React, {useEffect, useState} from 'react'
import ReplyComments from './ReplyComments'
import SingleComments from './SingleComments'

//Comments 불러오고 저장
function Comments(props) {
    //props.videoId props.CommentLists

    const [commentValue, setCommentValue] = useState("")
   

    const Variable = {
        writer : props.userId,
        videoId : props.videoId,
        content : commentValue
    }
    const onClickSubmit = (e) => {
        e.preventDefault()
        Axios.post('/api/comment/addComment', Variable)
            .then(response => {
                if(response.data.success){
                    console.log(response.data.result)
                    setCommentValue("")
                    props.refreshFunction(response.data.result)
                  
                } else alert('addComment하는데 실패')

            })
    }

    const onChangeComment = (e) => {
        setCommentValue(e.target.value)
    }
 


    return (
    <div>
    <p>replies</p>
    <hr/>
    {console.log('props.CommentLists',props.CommentLists)}
   { props.CommentLists && props.CommentLists.map((comment, index) => (
      ( !comment.responseTo && 
        <React.Fragment>
            <SingleComments comment={comment} videoId={props.videoId} userId={props.userId} refreshFunction={props.refreshFunction} />
            <ReplyComments userId={props.userId} parentCommentId={comment._id} CommentLists={props.CommentLists} videoId={props.videoId} refreshFunction={props.refreshFunction} />
        </React.Fragment>
      )
        
   ))
    }
             <div>
            <form onSubmit={onClickSubmit}>
                <div style={{'display':'flex', 'margin':'1rem 0'}}>
                <Input onChange={onChangeComment} value={commentValue} /><Button onClick={onClickSubmit}>Submit</Button>
                </div>

            </form>
            </div>
       

        </div>
    )
}

export default Comments
