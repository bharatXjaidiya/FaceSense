import { createBrowserRouter } from "react-router";
import FaceExpression from "./features/expression/pages/FaceExpression";
import Register from "./features/auth/pages/Register";
import Login from "./features/auth/pages/Login";
import ProtectedComponent from "./features/auth/components/protectedComponent";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <ProtectedComponent><FaceExpression /></ProtectedComponent>
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