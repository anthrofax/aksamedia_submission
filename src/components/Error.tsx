import { Link } from "react-router-dom";

function ErrorComponent({ message = "Yang ada cari tidak ditemukan!" }) {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-secondary dark:bg-primaryBlack text-primaryBlack dark:text-secondary">
      <h1 className="text-3xl font-bold mb-4">Error</h1>
      <p className="text-lg mb-6">{message}</p>
      {
        <Link
          to={"/"}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Retry
        </Link>
      }
    </div>
  );
}

export default ErrorComponent;
