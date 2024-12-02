import { tags } from "@/lib/constants";
import { Link } from "react-router-dom";
import { IconTag } from "@/lib/icons";

const NotesWithTag = () => {

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
                : "border-b-[1px] border-[#E0E4EA]"
            } pb-4`}
          >
            <Link
              to={`/?tag=${tag}`}
              className="flex items-center gap-3 text-[#2B303B] font-medium text-base tracking-[-0.2px]"
            >
              <IconTag color="#0E121B" /> <span>{tag}</span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default NotesWithTag;
