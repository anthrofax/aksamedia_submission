import { Link } from "react-router-dom";

function Brand({ className = "" }: { className?: string }) {
  return (
    <Link className={`flex items-center gap-3 ${className}`} to="/">
      <span className="text-[4rem]">*</span>
      <h1 className="text-[2rem] tracking-widest">Workify</h1>
    </Link>
  );
}

export default Brand;
