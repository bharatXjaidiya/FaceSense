import { RouterProvider } from "react-router/dom";
import { router } from './routes.jsx'
import {AuthProvider} from "../src/features/auth/auth.context.jsx"
import "./global/global.scss"

function App() {

  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  )
}

export default App
