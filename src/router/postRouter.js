// import { Suspense, lazy } from "react";

// import { Navigate } from "react-router-dom";

// const Loading = <div>Loading....</div>;
// const PostList = lazy(() => import("../components/post/PostList"));
// // const BoardWrite = lazy(() => import("../component/BoardWrite"));
// // const BoardView = lazy(() => import("../component/BoardView"));
// // const BoardModify = lazy(() => import("../component/BoardModify"));

// const postRouter = () => {
//   return [
//     {
//       path: "list",
//       element: <Suspense fallback={Loading}><BoardList /></Suspense>
//     },
//     {
//       path: "",
//       element: <Navigate replace to="list" />
//     },
//     // {
//     //   path: "write",
//     //   element: <Suspense fallback={Loading}><BoardWrite /></Suspense>
//     // },
//     // {
//     //   path: "view/:id",
//     //   element: <Suspense fallback={Loading}><BoardView /></Suspense>
//     // },
//     // {
//     //   path: "modify/:id",
//     //   element: <Suspense fallback={Loading}><BoardModify /></Suspense>
//     // }
//   ];
// };

// export default postRouter;