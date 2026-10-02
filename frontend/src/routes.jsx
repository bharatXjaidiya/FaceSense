import { createBrowserRouter } from "react-router";
import FaceExpression from "./features/expression/pages/FaceExpression";
import Register from "./features/auth/pages/Register";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <FaceExpression />,
  },
  {
    path : "/register",
    element : <Register />
  }
]);