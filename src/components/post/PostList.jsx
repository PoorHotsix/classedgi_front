
//  import { getPostBoard } from '../api/postApi';
import React, { useEffect, useState } from "react";
import { getPostBoard } from '../../api/postApi/postApi';
import { useSearchParams } from "react-router-dom";

const initialState = {
    notice: [],
    task: []
};

const PostList = () => {

    const [searchParams] = useSearchParams();
    const [post, setPost] = useState({...initialState});
  
    useEffect(() => {
        
            getPostBoard(5)
                .then(data => {
                    console.log('data : ', data);
                    setPost(data);
                })
                .catch(error => {
                    console.error('Error : ', error);
                });
        }, []);

  

   
    return (
        <>
            <h3>공지/과제</h3>
            <table className="notice">
                <thead>
                    <tr>
                        <th>번호</th>
                        <th>제목</th>
                        <th>email</th>
                        <th>작성일</th>
                    </tr>
                </thead>
                <tbody>
                {
                    post.notice.map((post, index) => {
                        return (
                            <tr key={post.id}>
                                <td>{ index + 1 }</td>
                                <td>{ post.title }</td>
                                <td>{ post.email }</td>
                                <td>{ post.regDate }</td>
                            </tr>
                        );
                    })
                }
                </tbody>
            </table>
            <table className="task">
                <thead>
                    <tr>
                        <th>번호</th>
                        <th>제목</th>
                        <th>email</th>
                        <th>작성일</th>
                    </tr>
                </thead>
                <tbody>
                {
                    post.notice.map((post, index) => {
                        return (
                            <tr key={post.id}>
                                <td>{ index + 1 }</td>
                                <td>{ post.title }</td>
                                <td>{ post.email }</td>
                                <td>{ post.regDate }</td>
                            </tr>
                        );
                    })
                }
                </tbody>
            </table>
        </>
    );
}

export default PostList;