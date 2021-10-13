import React, { useEffect } from 'react'
import SingleComments from './SingleComments'

function ReplyComments(props) {

    
    useEffect(() => {
        
       
    }, [props.CommentLists])
    
    const renderReplyComment = (parentCommentId) => 
         props.CommentLists.map((comment, index) => (
          
              <React.Fragment>
                    {comment.responseTo === parentCommentId &&
                    <div style={{ width: '80%', marginLeft: '40px' }}>
                        <SingleComments comment={comment} videoId={props.videoId} userId={props.userId}  refreshFunction={props.refreshFunction} />
                        <ReplyComments CommentLists={props.CommentLists} parentCommentId={comment._id} userId={props.userId} videoId={props.videoId} refreshFunction={props.refreshFunction} />
                    </div>
                }
               
              </React.Fragment>
         ))
          
    

    return (
        <div>
            {/* responseTo가 있는것들만 보여줌 */}
            {renderReplyComment(props.parentCommentId)}
        </div>
    )
}

export default ReplyComments
