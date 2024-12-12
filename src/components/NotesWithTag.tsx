import { tags } from "@/lib/constants";
import { Link } from "react-router-dom";
import { IconTag } from "@/lib/icons";
import { Theme } from "@/providers/theme-provider";
import { useState } from "react";

const NotesWithTag = () => {
  const [theme] = useState<Theme>(
            () => (localStorage.getItem('notes-theme') as Theme) || 'system'
          )

  return (
    <section className="block lg:hidden px-[1.85rem] pt-3 pb-[6rem] min-h-screen">
      <h2 className="block lg:hidden px-1 pb-5 font-bold text-2xl tracking-[-0.5px]">
        Tags
      </h2>

      <ul className="flex flex-col gap-6 my-5">
        {tags.map((tag, index) => (
          <li
            key={index}
            className={`${
              index === tags.length - 1
                ? "border-t-0"
                : "border-b-[1px] border-grayBorder"
            } pb-4`}
          >
            <Link
              to={`/?tag=${tag}`}
              className="flex items-center text-primaryText gap-3 font-medium text-base tracking-[-0.2px]"
            >
              <IconTag color={(theme === "system" || theme === "dark") ? "#FFF" : "#0E121B"} /> <span>{tag}</span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default NotesWithTag;
