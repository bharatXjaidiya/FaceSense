import { RouterProvider } from "react-router/dom";
import { router } from './routes.jsx'
import { AuthProvider } from "../src/features/auth/auth.context.jsx"
import "./global/global.scss"
import { ExpressionProvider } from "./features/expression/expression.context.jsx";

function App() {

  return (
    <ExpressionProvider>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </ExpressionProvider>
  )
}

export default App
