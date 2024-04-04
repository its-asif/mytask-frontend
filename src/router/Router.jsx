import {
    createBrowserRouter
} from "react-router-dom";
import Main from "../layout/Main";
import ErrorPage from "../pages/shared/ErrorPage";
import Login from "../pages/userAuthentication/Login";
import Register from "../pages/userAuthentication/Register";
import Dashboard from "../layout/Dashboard";
import PrivateRouter from "./PrivateRouter";
import Home from "../pages/Home";
import Dash from "../pages/dashboard/Dash";
import Tasks from "../pages/dashboard/Tasks";
  
const router = createBrowserRouter([
    {
      path: "/",
      element: <Main />,
      errorElement: <ErrorPage />,
      children: [
        {
          path: "/",
          element: <Home/>,
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
    {
      path: 'dashboard',
      element: <PrivateRouter><Dashboard /></PrivateRouter>,
      errorElement: <ErrorPage/>,
      children: [
        {
          path: '',
          element: <Dash/>
        },
        {
          path: 'tasks',
          element: <Tasks/>
        },
      ]

    }
  ]);


export default router;