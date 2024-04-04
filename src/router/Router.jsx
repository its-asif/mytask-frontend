import {
    createBrowserRouter
} from "react-router-dom";
import Main from "../layout/Main";
import ErrorPage from "../pages/shared/ErrorPage";
import Login from "../pages/userAuthentication/Login";
import Register from "../pages/userAuthentication/Register";
  
const router = createBrowserRouter([
    {
      path: "/",
      element: <Main />,
      errorElement: <ErrorPage />,
      children: [
        {
          path: "/",
          element: <h1>Hello</h1>,
        },
        {
          path: '/login',
          element: <Login/>
        },
        {
          path: '/register',
          element: <Register/>
        },
      ],
    },
  ]);


export default router;