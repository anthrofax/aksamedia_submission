import Brand from "./Brand";

function Footer() {
  return (
    <footer className="bg-primary dark:bg-primaryBlack text-primaryBlack dark:text-primary flex flex-col lg:flex-row gap-3 border-t-2 border-secondary/50 dark:border-secondaryBlack/50 py-3 px-16 justify-between w-full h-fit">
      <Brand />

      <div className="flex flex-wrap gap-8 py-5">
        <ul>
            <li>Home</li>
            <li>Layanan</li>
            <li>Pendaftaran</li>
        </ul>
        <ul>
            <li>Toko Online</li>
            <li>Pemasaran</li>
            <li>Dukungan</li>
        </ul>
        <ul>
            <li>Antar Jemput</li>
            <li>Kontak</li>
            <li>Login</li>
        </ul>
      </div>
    </footer>
  );
}

export default Footer;
