import { Link } from "react-router-dom";
import { IconTag } from "@/lib/icons";
import { Theme } from "@/providers/theme-provider";
import { useState } from "react";
import { useGetNotesQuery } from "@/store/notes/notesApiSlice";
import LoadiingState from "./HomeLoader";

const NotesWithTag = () => {
  const [theme] = useState<Theme>(
            () => (localStorage.getItem('notes-theme') as Theme) || 'system'
          )

  const {
      data: notes,
      isLoading,
      isError
  } = useGetNotesQuery('notesList', {
      pollingInterval: 15000,
      refetchOnFocus: true,
      refetchOnMountOrArgChange: true
  })

  const allTags: string[] = notes?.map((note) => note.tags) as string[]
  const tags: string[][] = allTags?.map((tag) => tag.split(","))

  return (
    <section className="block lg:hidden px-[1.85rem] pt-3 pb-[6rem] min-h-screen">
      <h2 className="block lg:hidden px-1 pb-5 font-bold text-2xl tracking-[-0.5px] static top-0">
        Tags
      </h2>

      {isLoading && <LoadiingState message="Fetching note tags" />}

      {isError && <p className="text-lightRed">Oops! Failed to fetch tags!</p>}

      <ul className="flex flex-col gap-6 my-5">
        {tags?.map((tag, index) => (
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
