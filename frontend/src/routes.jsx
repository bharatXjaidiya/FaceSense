import { createBrowserRouter } from "react-router";
import FaceExpression from "./features/expression/pages/FaceExpression";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <FaceExpression />,
  },
  {
    path : "/login"
  }
]);