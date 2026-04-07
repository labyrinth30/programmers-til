import Layout from "./components/layout/Layout"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import Home from "./pages/Home"
import { BookStoreThemeProvider } from "./context/themeContext"
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import ResetPassword from "./pages/ResetPassword"
import Signup from "./pages/Signup"
import Login from "./pages/Login"
import BookDetail from "./pages/BookDetail"
import Cart from "./pages/Cart"
import Order from "./pages/Order"
import OrderList from "./pages/OrderList"

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
  },
  {
    path: "/book/:bookId",
    element: (
      <Layout>
        <BookDetail />
      </Layout>
    )
  },
  {
    path: "/cart",
    element: (
      <Layout>
        <Cart />
      </Layout>
    )
  },
  {
    path: "/order",
    element: (
      <Layout>
        <Order />
      </Layout>
    )
  },
  {
    path: "/orderlist",
    element: (
      <Layout>
        <OrderList />
      </Layout>
    )
  }
])

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BookStoreThemeProvider>
        <RouterProvider router={router} />
      </BookStoreThemeProvider>
    </QueryClientProvider>
  )
}

export default App;
