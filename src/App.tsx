import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./css/output.css";
import AppLayout from "./components/AppLayout.tsx";
import Home from "./ui/Home.tsx";
import Login from "./ui/Login.tsx";
import ProtectedRoute from "./components/ProtectedRoute.tsx";
import { Provider as ReduxProvider } from "react-redux";
import { store } from "./lib/redux/store.ts";
import { useEffect } from "react";
import {
  addLocalStorageData,
  getLocalStorageData,
} from "./util/localstorage.ts";
import UserSettings from "./ui/User.tsx";
import { updateUser } from "./lib/redux/slices/user.ts";
import { ThemeProvider } from "./context/DarkMode.tsx";
import ErrorComponent from "./components/Error.tsx";

const route = createBrowserRouter([
  {
    element: <ProtectedRoute />,
    children: [
      {
        element: <AppLayout />,
        children: [
          {
            path: "/",
            element: <Home />,
          },
          {
            path: "/user/:id",
            element: <UserSettings />,
          },
          {
            path: "*",
            element: <ErrorComponent />,
          },
        ],
      },
      {
        path: "/auth",
        element: <Login />,
      },
    ],
  },
  {
    path: "*",
    errorElement: <ErrorComponent />,
  },
]);

function App() {
  useEffect(function () {
    const user = getLocalStorageData("account");

    if (!user) {
      addLocalStorageData("account", {
        id: Date.now(),
        email: "afridhoikhsan@gmail.com",
        nama: "Afridho Ikhsan",
        fotoProfil:
          "https://media.licdn.com/dms/image/v2/D5603AQHjWJhVy1R24g/profile-displayphoto-shrink_800_800/B56ZOieZiIGcAg-/0/1733597699830?e=1741824000&v=beta&t=nBDNhZrCz6PVoTxWIZT4ULC036embkTPFBIV-pbUYVA",
        password: "123123",
      });

      store.dispatch(
        updateUser({
          email: "afridhoikhsan@gmail.com",
          nama: "Afridho Ikhsan",
        })
      );
    }
  }, []);

  return (
    <ReduxProvider store={store}>
      <ThemeProvider>
        <RouterProvider router={route}></RouterProvider>;
      </ThemeProvider>
    </ReduxProvider>
  );
}

export default App;
