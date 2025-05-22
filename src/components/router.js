import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Register from "./auth/register";
import Login from "./auth/Login";
import CreatePost from "./blog/CreatePost";
import ListPost from "./blog/ListPost";
import ViewPost from "./blog/Viewpost";
import EditPost from "./blog/EditPost";

const router = createBrowserRouter([
    { path: '/', element: <App /> },
    { path: '/auth/register', element: <Register /> },
    { path: '/login', element: <Login /> },
    { path: '/blog/posts', element: <ListPost /> },
    { path: '/blog/posts/create', element: <CreatePost /> },
    { path: '/blog/posts/:postId', element: <ViewPost /> },
    { path: '/blog/posts/:postId/edit', element: <EditPost /> },
]);

export default router;