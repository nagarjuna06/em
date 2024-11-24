import { Outlet } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import SessionProvider from "../providers/session";

const Layout = () => {
  return (
    <SessionProvider>
      <Outlet />
      <Toaster />
    </SessionProvider>
  );
};

export default Layout;
