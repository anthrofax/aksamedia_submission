import React, { useState, useEffect } from "react";
import ProductForm from "../components/ProductForm";
import { useSearchParams } from "react-router-dom";

function Home() {
  const [items, setItems] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const [page, setPage] = useState(1);
  const [perPage] = useState(5);
  const [isAddFormOpened, setIsAddFormOpened] = useState(false);
  const [formUpdateOpened, setUpdateFormOpened] = useState({
    isOpen: false,
    id: 0,
  });

  // Fungsi untuk memuat data dari Local Storage
  useEffect(() => {
    const storedItems = JSON.parse(localStorage.getItem("items")) || [];
    setItems(storedItems);
    console.log(storedItems);
  }, []);

  // Fungsi untuk menyimpan data ke Local Storage
  const saveToLocalStorage = (data) => {
    localStorage.setItem("items", JSON.stringify(data));
  };

  const addItem = ({ name, description }) => {
    const newItem = {
      id: Date.now(),
      name,
      description,
    };
    const updatedItems = [...items, newItem];
    setItems(updatedItems);
    saveToLocalStorage(updatedItems);
  };

  // Fungsi untuk menghapus item
  const deleteItem = (id) => {
    const updatedItems = items.filter((item) => item.id !== id);
    setItems(updatedItems);
    saveToLocalStorage(updatedItems);
  };

  // Fungsi untuk memperbarui item
  const updateItem = ({ id, name, description }) => {
    const updatedItems = items.map((item) =>
      item.id === id ? { ...item, name, description } : item
    );
    setItems(updatedItems);
    saveToLocalStorage(updatedItems);
  };

  const openModal = (type: "add" | "update", id: number) => {
    if (type === "update") setUpdateFormOpened({ isOpen: true, id });
    else setIsAddFormOpened(true);
  };

  const closeModal = (type: "add" | "update") => {
    if (type === "update") setUpdateFormOpened({ isOpen: false, id: null });
    else setIsAddFormOpened(false);
  };

  // Filter dan pagination
  const search = searchParams.get("search") || "";
  const filteredItems = items.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  const paginatedItems = filteredItems.slice(
    (page - 1) * perPage,
    page * perPage
  );

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchParams({ search: value });
  };

  return (
    <div className="p-4">
      {isAddFormOpened && (
        <ProductForm
          type="add"
          key="add"
          onClose={() => closeModal("add")}
          onSubmit={addItem}
          id={null}
        />
      )}
      {formUpdateOpened.isOpen && (
        <ProductForm
          type="update"
          key="update"
          onClose={() => closeModal("update")}
          onSubmit={updateItem}
          id={formUpdateOpened.id}
        />
      )}

      <h1 className="text-2xl mb-4">Manajemen Produk</h1>

      {/* Search Bar */}
      <div className="w-full flex justify-between items-center mb-4 flex-wrap gap-2">
        <input
          type="text"
          placeholder="Cari..."
          value={search}
          onChange={handleSearch}
          className="border p-2 w-[30%] min-w-[10rem] bg-secondary dark:bg-secondaryBlack placeholder:text-primaryBlack dark:placeholder:text-primary"
        />
        <button
          onClick={() => {
            openModal("add", null);
          }}
          className="bg-green-500 text-white px-4 py-2"
        >
          Add Item
        </button>
      </div>

      {/* List Items */}
      <div className="w-full overflow-x-auto">
        <table className="border w-full">
          <thead>
            <tr>
              <th className="border p-2">ID</th>
              <th className="border p-2">Name</th>
              <th className="border p-2">Description</th>
              <th className="border p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginatedItems.map((item) => (
              <tr key={item.id}>
                <td className="border p-2">{item.id}</td>
                <td className="border p-2">{item.name}</td>
                <td className="border p-2">{item.description}</td>
                <td className="border p-2 flex justify-center">
                  <button
                    onClick={() => deleteItem(item.id)}
                    className="bg-red-500 text-white px-2 py-1 mr-2"
                  >
                    Delete
                  </button>
                  <button
                    onClick={() => openModal("update", item.id)}
                    className="bg-blue-500 text-white px-2 py-1"
                  >
                    Update
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="mt-4 flex justify-center gap-2">
        {Array.from(
          { length: Math.ceil(filteredItems.length / perPage) },
          (_, i) => (
            <button
              key={i}
              onClick={() => setPage(i + 1)}
              className={`px-4 py-2 ${
                page === i + 1
                  ? "bg-primaryBlack dark:bg-primary text-primary dark:text-primaryBlack"
                  : "bg-secondary dark:bg-secondaryBlack border-2 border-secondaryBlack dark:border-secondary"
              }`}
            >
              {i + 1}
            </button>
          )
        )}
      </div>
    </div>
  );
}

export default Home;
