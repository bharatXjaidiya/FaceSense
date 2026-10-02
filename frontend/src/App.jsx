import { RouterProvider } from "react-router/dom";
import { router } from './routes.jsx'
import { AuthProvider } from "../src/features/auth/auth.context.jsx"
import "./shared/styles/global.scss"
import { ExpressionProvider } from "./features/expression/expression.context.jsx";

function App() {

  return (
    <AuthProvider>
        <ExpressionProvider>
          <RouterProvider router={router} />
        </ExpressionProvider>
    </AuthProvider>
  )
}

export default App
