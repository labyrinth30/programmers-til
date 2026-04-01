import Layout from "./components/layout/Layout"
import Home from "./pages/Home"
import ThemeSwitcher from "./components/header/ThemeSwitcher"
import { BookStoreThemeProvider } from "./context/themeContext"
import { createBrowserRouter, RouterProvider } from "react-router-dom"

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
])

function App() {
  return (
    <BookStoreThemeProvider>
      <RouterProvider router={router} />
    </BookStoreThemeProvider>
  )
}

export default App;
