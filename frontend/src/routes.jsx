import { createBrowserRouter } from "react-router";
import Register from "./features/auth/pages/Register";
import Login from "./features/auth/pages/Login";
import ProtectedComponent from "./features/auth/components/ProtectedComponent";
import Home from "./features/home/pages/Home";
import UploadSong from "./features/home/pages/UploadSong";


export const router = createBrowserRouter([
  {
    path: "/",
    element: <ProtectedComponent><Home /></ProtectedComponent>
    ,
  },
  {
    path: "/register",
    element: <Register />
  },
  {
    path: "/login",
    element: <Login />
  },
  {
    path : "/upload-song",
    element : <UploadSong />
  }
]);