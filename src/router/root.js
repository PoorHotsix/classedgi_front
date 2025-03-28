import { Suspense, lazy } from "react";
import ViewPage from "../components/post/ViewPage";
import WritePage from "../components/post/WritePage"
import ModifyPage from "../components/post/ModifyPage";

const { createBrowserRouter } = require("react-router-dom");

const Loading = <div>Loading....</div>
const Home = lazy(() => import("../components/post/HomePage"))

const Login = lazy(() => import("../components/member/LoginPage"))
const SignUp = lazy(()=> import("../components/member/SignupPage"))

const Task = lazy(()=>import("../components/post/TaskPage"))

const KakaoRedirect = lazy(() => import("../components/member/KakaoRedirect"))
const AdminPage = lazy(() => import("../components/member/AdminPage"));

const root = createBrowserRouter([

  {
    path: "",
    element: <Suspense fallback={Loading}><Home /></Suspense>
  },
  {
    path: "task",
    element: <Suspense fallback={Loading}><Task /></Suspense>
  },
  {
    path: "login",
    element: <Suspense fallback={Loading}><Login /></Suspense>
  },
  {
    path: "signup",
    element: <Suspense fallback={Loading}><SignUp /></Suspense>
  },
  {
    path: "view/:id",
    element: <Suspense fallback={Loading}><ViewPage /></Suspense>
  },
  {
    path: "write",
    element: <Suspense fallback={Loading}><WritePage /></Suspense>
  },
  {
    path: "modify/:id",
    element: <Suspense fallback={Loading}><ModifyPage /></Suspense>
  },
  {
    path: "oauth/kakao",// 이 부분 확인
    element: <Suspense fallback={Loading}><KakaoRedirect /></Suspense> // 카카오 리다이렉트 경로 추가
  },
  {
    path: "admin",
    element: <Suspense fallback={Loading}><AdminPage /></Suspense>
  }

])

export default root;
