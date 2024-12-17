import { MobileNavLinks } from "@/lib/constants";
import { Theme } from "@/providers/theme-provider";
import { useState } from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  const [theme] = useState<Theme>(
          () => (localStorage.getItem('notes-theme') as Theme) || 'system'
        )

  return (
  <footer className="block border-t-[1px] border-grayBorder dark:border-background bg-darkerGray fixed bottom-0 z-10 h-[70px] sm:h-[90px] lg:hidden w-full max-sm:px-3 px-[2rem]">
    <nav className="pt-3 sm:pt-4">
      <ul className="flex items-center gap-1 justify-between w-full flex-grow">
        {MobileNavLinks().map(({ text, path, isActive, Icon }) => (
          <li key={text}>
            <Link
              to={path}
              className={`flex flex-col items-center justify-center gap-1 flex-grow px-3 py-2 rounded-sm ${
                isActive ? "bg-lightGray dark:bg-lighterGray" : "bg-transparent"
              }`}
            >
              <Icon color={`${isActive ? "#335CFF" : (theme === "system" || theme === "dark") ? "#717784" : "#0E121B"}`} />
              <span
                className={`hidden sm:flex ${
                  isActive ? "text-[#335CFF]" : "text-[#0E121B] dark:text-[#717784]"
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
)
}

export default Footer;