import { Suspense, lazy } from "react";
import todoRouter from "./todoRouter";
import postRouter from "./postRouter"; // postRouter 임포트
// import PostList from "../components/post/PostList";


const { createBrowserRouter } = require("react-router-dom");

const Loading = <div>Loading....</div>

const Home = lazy(() => import("../components/common/HomePage"))
const PostList = lazy(() => import("../components/post/PostList"))

const Notice = lazy(() => import("../components/post/NoticePage"))

const TodoIndex = lazy(() => import("../pages/todo/IndexPage"))
const TodoList = lazy(() => import("../pages/todo/ListPage"))

const Login = lazy(() => import("../components/member/LoginPage"))



const root = createBrowserRouter([

  {
    path: "",
    element: <Suspense fallback={Loading}><Home /></Suspense>
  },
  {
    path: "login",
    element: <Suspense fallback={Loading}><Login /></Suspense>
  },
  {
    path: "notice",
    element: <Suspense fallback={Loading}><Notice /></Suspense>
  },
  {
    path: "task",
    element: <Suspense fallback={Loading}><TodoIndex /></Suspense>,
    children: todoRouter()
  },
  {
    path: "home", // post 경로 추가
    element: <Suspense fallback={Loading}><Home /></Suspense>, // 필요한 컴포넌트로 변경 가능
   
  }


]);

export default root;
