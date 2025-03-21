import { useNavigate } from "react-router-dom";
import BasicLayout from "../common/BasicLayout";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import NoticeList from "./NoticeList";




const NoticePage = () => {
  const navi = useNavigate();

  const id = useSelector(state => state.loginSlicer.id);

  useEffect(()=>{
    console.log(id);
    if (!id)
      navi('/login', { replace: true });
  },[])


  return (
    <BasicLayout>    
        <NoticeList />  
    </BasicLayout>
  );
}

export default NoticePage;
