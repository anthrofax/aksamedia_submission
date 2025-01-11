import { useState } from "react";
import { Link } from "react-router-dom";
import { MdWorkHistory } from "react-icons/md";
import Button from "../components/Button";
import { addLocalStorageData, getLocalStorageData } from "../util/localstorage";
import { authorize } from "../lib/redux/slices/auth";
import { store } from "../lib/redux/store";

function Login() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const user = await getLocalStorageData("account");

      if (user && user.password === password) {
        alert("Login berhasil!");

        addLocalStorageData("isLoggedIn", true);
        store.dispatch(authorize(true));
      } else {
        alert("Email atau password salah!");
      }
    } catch (error) {
      console.error("Error saat login:", error);
      alert("Terjadi kesalahan, coba lagi.");
    }
  };

  return (
    <div className="min-h-screen pt-[6rem] bg-primary dark:bg-primaryBlack text-secondaryBlack dark:text-secondary">
      <div className="w-[90%] max-w-[25rem] h-fit absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-md px-3 py-10 flex flex-col items-center shadow-lg">
        <div className="text-center space-y-1">
          <Link
            className="flex gap-2 items-center justify-center text-2xl"
            to={"/"}
          >
            <MdWorkHistory />
            <span>
              <h1>Workify</h1>
            </span>
          </Link>
          <p className="font-bold text-primaryBlack dark:text-primary">
            Masukkan data akunmu disini
          </p>
        </div>

        <form
          className="space-y-2 grid grid-cols-4 gap-x-5 gap-y-3 mt-5 pr-6"
          onSubmit={handleLogin}
        >
          <label htmlFor="email" className="login-label">
            Email
          </label>
          <input
            type="email"
            name="email"
            className="login-input"
            defaultValue={"afridhoikhsan@gmail.com"}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <label htmlFor="password" className="login-label">
            Kata Sandi
          </label>
          <input
            type="password"
            name="password"
            defaultValue={"123123"}
            className="login-input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <Button
            className="bg-primaryBlack dark:bg-primary text-primary dark:text-primaryBlack rounded-md col-span-2 col-start-2 w-fit px-10 py-1 mx-auto disabled:bg-primaryBlack/60 dark:disabled:bg-primary/60"
            type="submit"
          >
            Login
          </Button>
        </form>
      </div>
    </div>
  );
}

export default Login;
