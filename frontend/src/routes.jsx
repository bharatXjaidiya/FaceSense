import { createBrowserRouter } from "react-router";
import Register from "./features/auth/pages/Register";
import Login from "./features/auth/pages/Login";
import ProtectedComponent from "./features/auth/components/protectedComponent";
import Home from "./features/home/pages/Home";

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
  }
]);