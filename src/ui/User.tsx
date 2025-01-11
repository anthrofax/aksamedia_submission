import React, { useEffect } from "react";
import { store } from "../lib/redux/store";
import { getCurrentUser, updateUser } from "../lib/redux/slices/user";
import { useSelector } from "react-redux";

function UserSettings() {
  const user = useSelector(getCurrentUser);
  const storedUser = JSON.parse(localStorage.getItem("account") || "null");

  useEffect(() => {
    if (storedUser) {
      store.dispatch(
        updateUser({
          ...storedUser,
        })
      );
    }
  }, []);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();

    if (!user.nama || !user.email)
      return alert("Masih ada kolom yang belum diisi");

    if (user.nama === storedUser.nama || !user.email === storedUser.email)
      return alert("Tidak ada perubahan yang anda lakukan");

    const form = document.getElementById("user-form") as HTMLFormElement;
    const formValue = new FormData(form);
    console.log(formValue);

    if (!user) return;

    const updatedUser = { ...user, nama: user.nama, email: user.email };
    localStorage.setItem("account", JSON.stringify(updatedUser));
    store.dispatch(updateUser(updatedUser));
    alert("Data akun berhasil diperbarui!");
  };

  return (
    <div className="p-5 w-full h-full">
      <h1 className="text-2xl font-bold mb-2">Pengaturan Akun</h1>
      <p className="mb-6">Ubah data akunmu disini.</p>

      <form
        onSubmit={handleSave}
        className="space-y-4"
        method="POST"
        id="user-form"
      >
        <div>
          <label htmlFor="name" className="block text-sm font-medium mb-1">
            Nama Lengkap
          </label>
          <input
            type="text"
            id="name"
            value={user.nama}
            onChange={(e) =>
              store.dispatch(updateUser({ nama: e.target.value }))
            }
            className="border border-secondaryBlack dark:border-secondary bg-secondary dark:bg-secondaryBlack rounded p-2 w-full lg:w-[40%]"
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium mb-1">
            Email
          </label>
          <input
            type="email"
            id="email"
            value={user.email}
            onChange={(e) =>
              store.dispatch(updateUser({ email: e.target.value }))
            }
            className="border border-secondaryBlack dark:border-secondary bg-secondary dark:bg-secondaryBlack rounded p-2 w-full lg:w-[40%]"
          />
        </div>

        <div className="mt-4">
          <button
            type="submit"
            className="bg-accent text-white px-4 py-2 rounded hover:bg-accent/90"
          >
            Simpan Perubahan
          </button>
        </div>
      </form>
    </div>
  );
}

export default UserSettings;
