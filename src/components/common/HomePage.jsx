import { useNavigate } from "react-router-dom";
import BasicLayout from "./BasicLayout";
import { useEffect, useState } from "react";
import { getCookie } from "../../utils/cookieUtils";
import { useSelector } from "react-redux";
import PostList from "../post/PostList";

const HomePage = () => {
  const navi = useNavigate();

  const id = useSelector(state => state.loginSlicer.id);

  useEffect(()=>{
    console.log(id);
    if (!id)
      navi('/login', { replace: true });
  },[])


  return (
    <BasicLayout>    
        <PostList />  
    </BasicLayout>
  );
}

export default HomePage;
