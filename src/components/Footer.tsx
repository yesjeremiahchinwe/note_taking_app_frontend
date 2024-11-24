import { MobileNavLinks } from "@/lib/constants";
import { Link } from "react-router-dom";

const Footer = () => (
  <footer className="block bg-white fixed bottom-0 z-10 h-[70px] sm:h-[90px] lg:hidden w-full px-[2rem]">
    <nav className="pt-3 sm:pt-4">
      <ul className="flex items-center gap-1 justify-between w-full flex-grow">
        {MobileNavLinks().map(({ text, path, isActive, Icon }) => (
          <li key={text}>
            <Link
              to={path}
              className={`flex flex-col items-center justify-center gap-1 flex-grow px-3 py-2 rounded-sm ${
                isActive ? "bg-[#EBF1FF]" : "bg-transparent"
              }`}
            >
              <Icon color={`${isActive ? "#335CFF" : "#717784"}`} />
              <span
                className={`hidden sm:flex ${
                  isActive ? "text-[#335CFF]" : "#717784"
                }`}
              >
                {text}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  </footer>
);

export default Footer;