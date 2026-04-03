import Layout from "./components/layout/Layout"
import Home from "./pages/Home"
import { BookStoreThemeProvider } from "./context/themeContext"
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import ResetPassword from "./pages/ResetPassword"
import Signup from "./pages/Signup"
import Login from "./pages/Login"

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout><Home /></Layout>,
    errorElement: <div>error</div>
  },
  {
    path: "/books",
    element: <Layout><p>Books</p></Layout>,
    errorElement: <div>error</div>
  },
  {
    path: "/signup",
    element: <Layout><Signup /></Layout>,
    errorElement: <div>error</div>
  },
  {
    path: "/reset",
    element: <Layout><ResetPassword /></Layout>,
    errorElement: <div>error</div>
  },
  {
    path: "/login",
    element: <Layout><Login /></Layout>,
    errorElement: <div>error</div>
  }
])

function App() {
  return (
    <BookStoreThemeProvider>
      <RouterProvider router={router} />
    </BookStoreThemeProvider>
  )
}

export default App;
