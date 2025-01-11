import { Link, useLocation } from "react-router-dom";
import Brand from "./Brand";
import { getLocalStorageData } from "../util/localstorage";

function Sidebar() {
  const { pathname } = useLocation();
  const user = getLocalStorageData('account')
  return (
    <aside className="bg-primary dark:bg-primaryBlack z-30 w-[20%] h-screen relative rounded-lg border-r-2 border-secondary dark:border-secondaryBlack hidden lg:grid grid-rows-12 grid-cols-1 justify-center text-center gap-3 items-center">
      <Brand className="row-[2_/_span_1] h-fit flex justify-center" />
      <Link
        to={""}
        className={`row-[3_/_span_1] hover:bg-secondary dark:hover:bg-secondaryBlack h-full flex items-center justify-center ${
          pathname === "/" ? "bg-secondary dark:bg-secondaryBlack" : ""
        }`}
      >
        Daftar Produk
      </Link>
      <Link
        to={`/user/${user.id}`}
        className={`row-[4_/_span_1] hover:bg-secondary dark:hover:bg-secondaryBlack h-full flex items-center justify-center ${
          pathname.startsWith("/user") ? "bg-secondary dark:bg-secondaryBlack" : ""
        }`}
      >
        Pengaturan Akun
      </Link>
    </aside>
  );
}

export default Sidebar;
