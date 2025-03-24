import React,{ useEffect, useState } from "react";
import { getComment} from "../../api/postApi/postApi";
import SubCommentForm from "./SubCommentForm";
import FileDownload from "./FileDownload";


const initialState = {
  contents: '',
  nickname: '',
  fileItems:[]
};



const CommentList = ({id, refreshTrigger, onCommentAdded}) =>{

    const [comments, setComments] = useState([]);
    const [replyVisible, setReplyVisible] = useState(null);

    useEffect(() => {
        //댓글 정보
        getComment(id)
        .then((data) => {
          console.log(data);
            setComments(data);
        })
        .catch((error) => {
        console.error("Error: ", error);
        });

    },[id, refreshTrigger]);

    //답글작성
    const handleReplyChange = (commentId) => {
    setReplyVisible(replyVisible === commentId ? null : commentId)
    }


    return(

    <>
    
    <div className="comments-section">
          <h3>댓글 목록</h3>
          <ul>
          
          {console.log("hiih " +comments.length)}
        {comments.length > 0 ? (
          comments.map((comment) => (
            <li key={comment.id} style={{ marginLeft: `${comment.level * 20}px` }}>

              <div><strong>작성자:</strong> {comment.nickname}</div>
              <div><strong>작성일:</strong> {comment.regDate}</div>
              <div><strong>내용:</strong> {comment.content}</div>

              {comment.fileItems && comment.fileItems.length > 0 && (
              <div>
                <h3>첨부파일</h3>
                {comment.fileItems.map((file) => (
                <FileDownload key={file.id} file={file} />
              ))}
              </div>
            )}

            {/* 답글 버튼 */}
            <button onClick={() => handleReplyChange(comment.id)}>답글 달기</button>
            {replyVisible === comment.id && (
                <SubCommentForm id={id} parentId={comment.id} onCommentAdded={onCommentAdded} />
              )}

              {/* 답글 내용 표시 */}
              {comment.subComments && comment.subComments.length > 0 && (
                <ul>
                  {comment.subComments.map((subComment) => (
                    <li key={subComment.id} style={{ marginLeft: `${subComment.level * 20}px` }}>
                      <div><span style={{ fontWeight: 'bold' }}>작성자 : </span>{subComment.nickname}</div>
                      <div><span style={{ fontWeight: 'bold' }}>작성일 : </span>{subComment.regDate}</div>
                      <div><span style={{ fontWeight: 'bold' }}>내용 : </span>{subComment.content}</div>
                    </li>
                  ))}
                </ul>
                  )}
                </li>
              ))
            ) : (
              <p>댓글이 없습니다.</p> 
            )}
          </ul>
        
          </div>

    </>
)
}
    export default CommentList;


