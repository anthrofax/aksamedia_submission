import { useEffect, useState } from "react";
import Button from "./Button";
import { createPortal } from "react-dom";
import { IoClose } from "react-icons/io5";
import { getLocalStorageData } from "../util/localstorage";

interface ProductDataType {
  id: number;
  name: string;
  description: string;
}

interface PropsType {
  type: "add" | "update";
  onClose(): void;
  onSubmit({ id }: { id?: number; name: string; description: string }): void;
  id: number | null;
}

function ProductForm({ type, onClose, onSubmit, id }: PropsType) {
  const [productName, setProductName] = useState("");
  const [desc, setDesc] = useState("");

  useEffect(
    function () {
      if (type === "update" && typeof id === "number") {
        const productData = getLocalStorageData("items") as
          | ProductDataType[]
          | null;

        if (productData && Array.isArray(productData)) {
          const currentData = productData.find((val) => val.id === id);

          setProductName(currentData.name);
          setDesc(currentData.description);
        }
      }
    },
    [id, type]
  );

  function handleClose() {
    onClose();

    setProductName("");
    setDesc("");
  }

  function handleSubmit() {
    if (type === "update")
      onSubmit({
        name: productName,
        description: desc,
        id,
      });
    else {
      onSubmit({
        name: productName,
        description: desc,
      });
    }

    handleClose();
  }

  return createPortal(
    <>
      <form className="w-[80%] h-fit max-w-[25rem] z-50 bg-primary dark:bg-primaryBlack absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-md text-primaryBlack dark:text-primary grid grid-cols-4 items-start justify-items-center gap-y-5 gap-x-3 p-10">
        <button
          className="absolute aspect-square w-16 top-[3%] left-[80%]"
          onClick={onClose}
          type="button"
        >
          <IoClose className="w-full aspect-square text-5xl" />
        </button>
        <div className="col-span-4">
          <h3 className="text-[2rem]">
            {type === "add" ? "Tambah" : "Update"} Produk
          </h3>
          <p>{type === "add" ? "Masukkan" : "Ubah"} data produkmu disini.</p>
        </div>
        <label htmlFor="nama" className="self-end text-end w-full h-full">
          Nama Produk
        </label>
        <input
          type="text"
          name="nama"
          className="col-span-3 p-2 w-full bg-secondary dark:bg-secondaryBlack"
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
        />

        <label htmlFor="desc" className="self-end text-end w-full h-full">
          Deskripsi
        </label>
        <textarea
          name="desc"
          className="col-span-3 p-2 w-full bg-secondary dark:bg-secondaryBlack h-full"
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
        />

        <Button
          className="bg-primaryBlack dark:bg-primary text-primary dark:text-primaryBlack rounded-md col-span-2 col-start-2 w-fit px-10 py-1 mx-auto disabled:bg-primaryBlack/60 dark:disabled:bg-primary/60"
          onClick={handleSubmit}
          type="button"
        >
          {type === "add" ? "Tambah" : "Perbarui"}
        </Button>
      </form>
      <div
        className="bg-secondaryBlack/40 fixed top-0 bottom-0 left-0 right-0 z-40 cursor-pointer"
        onClick={onClose}
      />
    </>,
    document.body
  );
}

export default ProductForm;
