import { LogOutIcon } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useSession } from "../providers/session";
import Button from "./ui/button";
import cn from "../utils/cn";

const Navbar = () => {
  const { pathname } = useLocation();
  const { logout, user, loading } = useSession();

  if (loading || !user) return;

  return (
    <nav className="navbar bg-white shadow flex justify-between items-center px-5">
      <div className="flex gap-16 items-center">
        <Link to="/">
          <img src="/dealsdray.png" width={50} height={50} />
        </Link>
        <div className="flex gap-6 items-center">
          <Link
            className={cn("flex gap-1 items-center", {
              "font-bold": "/dashboard" == pathname,
            })}
            to="/dashboard"
          >
            Home
          </Link>
          <Link
            className={cn("flex gap-1 items-center", {
              "font-bold": "/dashboard/employees-list" == pathname,
            })}
            to="/dashboard/employees-list"
          >
            Employees List
          </Link>
        </div>
      </div>
      <div className="flex gap-4">
        <p className="font-semibold">{user.username}</p>
        <Button onClick={logout}>
          <LogOutIcon size={20} className="text-inherit" />
          Logout
        </Button>
      </div>
    </nav>
  );
};

export default Navbar;
