import { Outlet } from "react-router-dom";
import Navbar from "../../components/Navbar";

const DashboardLayout = () => {
  return (
    <div className="font-poppins">
      <Navbar />
      <div className="h-[90vh] p-5">
        <Outlet />
      </div>
    </div>
  );
};

export default DashboardLayout;
