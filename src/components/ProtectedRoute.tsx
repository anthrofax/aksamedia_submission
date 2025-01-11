import { Outlet, useLocation, useNavigate } from "react-router-dom";
import Loader from "./Loader";
import { useEffect } from "react";
import { store } from "../lib/redux/store";
import {
  authorize,
  getAuthIsLoading,
  getIsLoggedIn,
} from "../lib/redux/slices/auth";
import { useSelector } from "react-redux";

function ProtectedRoute() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const isLoggedIn = useSelector(getIsLoggedIn);
  const isLoading = useSelector(getAuthIsLoading);

  useEffect(function () {
    const storedUser = JSON.parse(localStorage.getItem("isLoggedIn") || "null");

    console.log(storedUser)
    if (storedUser) {
      store.dispatch(authorize(true));
    } else store.dispatch(authorize(false));
  }, []);

  useEffect(
    function () {
      async function checkAuth() {
        if (pathname !== "/auth") {
          if (!isLoggedIn && !isLoading)
            navigate("/auth", {
              replace: true,
            });
        } else {
          if (isLoggedIn)
            navigate("/", {
              replace: true,
            });
        }
      }

      checkAuth();
    },
    [isLoggedIn, navigate, pathname, isLoading]
  );

  return isLoading  ? <Loader /> : <Outlet />;
}

export default ProtectedRoute;
