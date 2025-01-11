import Footer from "./Footer";
import Navbar from "./Navbar";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";

function AppLayout() {
  return (
    <>
      <Navbar />
      <div className="min-h-screen flex">
        <Sidebar />
        <div className="pt-[6rem] w-full">
          <Outlet />
        </div>
      </div>
      <Footer />
    </>
  );
}

export default AppLayout;
