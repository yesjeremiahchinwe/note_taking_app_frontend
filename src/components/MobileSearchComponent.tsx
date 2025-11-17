import { IconSearch } from "@/lib/icons";
import { Input } from "./ui/input";
import { useGetNotesQuery } from "@/store/notes/notesApiSlice";
import { Note } from "@/lib/types";
import { Link } from "react-router-dom";
import useDebouncedValue from "@/hooks/useDebouncedValue";
import { useSelector } from "react-redux";
import { selectCurrentId } from "@/store/auth/authSlice";
import { useMemo } from "react";

interface Props {
  searchQuery: string;
  setSearchQuery: (searchQuery: string) => void;
}

const MobileSearchComponent = ({ searchQuery, setSearchQuery }: Props) => {
  const userId = useSelector(selectCurrentId);

  const debouncedSearchTerm = useDebouncedValue(
    searchQuery as string,
    500
  )?.toLowerCase();

  const { data: notes } = useGetNotesQuery(userId);

  const findNotes: Note[] | undefined = useMemo(() => {
    return notes?.filter(
      (note: Note) =>
        note?.title?.toLowerCase().includes(debouncedSearchTerm) ||
        note?.tags?.toLowerCase().includes(debouncedSearchTerm) ||
        note?.content?.toLowerCase().includes(debouncedSearchTerm)
    ) as Note[] || notes;
  }, [notes, debouncedSearchTerm]);

  return (
    <section className="block lg:hidden px-[1.85rem] pt-20 lg:pt-3 mt-3 pb-[6rem] min-h-screen">
      <div className="w-full relative">
        <IconSearch
          color="currentColor"
          className="absolute left-4 top-[0.8rem]"
        />
        <Input
          type="text"
          className="py-6 pl-[3rem] text-base pr-5"
          placeholder="Search by title, content, or tags"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {debouncedSearchTerm && notes?.length && (
        <div className="py-6">
          {findNotes.length ? (
            <div>
              {findNotes.map((note, index: number) => {
                const formatNoteTitle = note.title
                  .toLowerCase()
                  .split(" ")
                  .join("-");

                return (
                  <article
                    key={note.title}
                    className={`bg-transparent mb-2 rounded-md p-3 ${
                      index === findNotes.length - 1
                        ? "border-b-0"
                        : "border-b-[1px] border-darkerGray"
                    }`}
                  >
                    <h2 className="text-xl font-semibold tracking-[-0.3px] text-primaryText">
                      <Link to={`/${formatNoteTitle}`}>{note.title}</Link>
                    </h2>

                    <div className="flex flex-wrap items-center gap-[8px] mt-3">
                      {note?.tags?.split(",").map((tag) => (
                        <p
                          key={tag}
                          className="py-[2px] px-[6px] text-sm rounded-md bg-tagsBg"
                        >
                          {tag}
                        </p>
                      ))}
                    </div>

                    <small className="text-lightText block mt-4 font-medium text-xs tracking-[-0.2px]">
                      {note?.updatedAt?.split("T")[0]}
                    </small>
                  </article>
                );
              })}
            </div>
          ) : (
            <div className="h-full mt-6 flex items-center justify-center">
              <p>Note not found</p>
            </div>
          )}
        </div>
      )}
    </section>
  );
};

export default MobileSearchComponent;
