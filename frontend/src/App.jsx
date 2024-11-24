import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import Home from "./pages/dashboard/Home";
import Login from "./pages/Login";
import Layout from "./pages/layout";
import DashboardLayout from "./pages/dashboard/layout";
import EmployeesList from "./pages/dashboard/EmployeesList";
import Authenticate from "./auth/authenticate";

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Navigate to="/dashboard" />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        element: <Authenticate />,
        children: [
          {
            element: <DashboardLayout />,
            children: [
              {
                path: "/dashboard",
                element: <Home />,
              },
              {
                path: "/dashboard/employees-list",
                element: <EmployeesList />,
              },
            ],
          },
        ],
      },
    ],
  },
]);

const App = () => <RouterProvider router={router} />;

export default App;
