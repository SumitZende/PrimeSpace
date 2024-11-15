import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <div className="bg-footer-color p-[10px] flex items-center justify-center fixed bottom-0 w-full">
      <Link
        to={`mailto:sumitzende1012@gmail.com?subject=Inquiry%20Regarding%20PrimeSpace%20Development`}
      >
        <p className="text-white font-semibold">©sumitzende1012@gmail.com</p>
      </Link>
    </div>
  );
}

