import { MdLightMode, MdDarkMode } from "react-icons/md";
import { IoLogOut } from "react-icons/io5";
import { useEffect, useState } from "react";
import { getAuthIsLoading, logout } from "../lib/redux/slices/auth";
import { store } from "../lib/redux/store";
import { useSelector } from "react-redux";
import Button from "./Button";
import { getLocalStorageData } from "../util/localstorage";
import { useTheme } from "../context/DarkMode";
import { Link } from "react-router-dom";
import Brand from "./Brand";

function Navbar() {
  const [openDropDown, setOpenDropDown] = useState(false);
  const isLoading = useSelector(getAuthIsLoading);
  const [user, setUser] = useState(null);
  const { toggleTheme, isDarkMode } = useTheme();

  useEffect(function () {
    const storedUser = getLocalStorageData("account");
    if (storedUser) setUser(storedUser);
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    if (isDarkMode) {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, [isDarkMode]);

  function toggleDropdown() {
    setOpenDropDown((val) => !val);
  }

  function logOutHandler() {
    store.dispatch(logout());
  }

  if (!user && !isLoading) return null;

  return (
    <nav className="w-full bg-primary dark:bg-primaryBlack/90 flex justify-between lg:justify-end items-center text-primaryBlack dark:text-primary px-[2.5rem] fixed top-0 left-0 border-b-2 border-secondary/50 dark:border-secondaryBlack/50 z-10 flex-wrap min-h-[6rem] h-fit">
      <Brand  className="block lg:hidden"/>
      <div className="relative flex gap-5 text-2xl items-center">
        <button onClick={toggleTheme} className="focus:outline-none">
          {isDarkMode ? <MdDarkMode /> : <MdLightMode />}
        </button>

        <button
          type="button"
          className="relative w-10 aspect-square"
          onClick={toggleDropdown}
        >
          <img
            src={`${user?.fotoProfil || ""}`}
            alt={user.nama}
            className="rounded-full w-full border-2 border-primary"
          />

          {openDropDown && (
            <ul className="w-fit border-2 border-secondary dark:border-secondaryBlack bg-primary dark:bg-primaryBlack z-50 h-fit rounded-lg absolute -right-[30%] lg:right-full py-2 flex flex-col gap-2">
              <li className="dropdown-link border-b-2 border-secondary dark:border-secondaryBlack flex flex-col text-start cursor-auto">
                <p>{user.nama}</p>
                <p>{user.email}</p>
              </li>
              <li className="dropdown-link items-center gap-2 hover:bg-secondary dark:hover:bg-secondaryBlack block lg:hidden">
                <Link to={"/"}>Produk</Link>
              </li>
              <li className="dropdown-link items-center gap-2 hover:bg-secondary dark:hover:bg-secondaryBlack block lg:hidden">
                <Link to={`/user/${user.id}`}>Pengaturan Akun</Link>
              </li>
              <li
                className="dropdown-link border-t-2 lg:border-t-0 border-secondary dark:border-secondaryBlack items-center gap-2 hover:bg-secondary dark:hover:bg-secondaryBlack"
                onClick={logOutHandler}
              >
                <IoLogOut />
                <Button type="button">Keluar</Button>
              </li>
            </ul>
          )}
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
