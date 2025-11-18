import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { Note } from "@/lib/types";
import CustomButton from "@/components/CustomButton";
import { useGetNotesQuery } from "@/store/notes/notesApiSlice";
import { PlusIcon } from "lucide-react";
import useDebouncedValue from "@/hooks/useDebouncedValue";
import LoadiingState from "./HomeLoader";
import { useSelector } from "react-redux";
import { selectCurrentId } from "@/store/auth/authSlice";
import { useMemo } from "react";
import NoteCard from "./NoteCard";

const AllNotes = ({ searchQuery }: { searchQuery: string }) => {
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const debouncedSearchTerm = useDebouncedValue(
    searchQuery as string,
    500
  )?.toLowerCase();

  const tagQueryParam = searchParams.get("tag");
  const noteQueryParam = searchParams.get("note");
  const userId = useSelector(selectCurrentId);

  const { data: notes, isLoading } = useGetNotesQuery(userId);

  const allNotes = useMemo(() => {
    if (!notes?.length) return [];

    if (tagQueryParam)
      return notes.filter((note) => note?.tags?.includes(tagQueryParam));

    if (location.pathname === "/tags") return notes;

    if (debouncedSearchTerm) {
      return notes.filter(
        (note) =>
          note.title?.trim().toLowerCase().includes(debouncedSearchTerm) ||
          note.tags?.trim().toLowerCase().includes(debouncedSearchTerm) ||
          note.content?.trim().toLowerCase().includes(debouncedSearchTerm)
      );
    }

    return notes;
    
  }, [notes, tagQueryParam, location.pathname, debouncedSearchTerm]);

  return (
    <>
      <section
        className={`${
          notes?.length && location.pathname === "/" && noteQueryParam === null
            ? "block"
            : "hidden lg:block"
        } basis-full lg:basis-[21%] lg:pr-3 pt-8 lg:pt-0 pb-[4rem] px-4 lg:px-0 min-h-screen lg:border-r-[1px] relative border-darkerGray w-full lg:max-h-[60vh] overflow-y-auto custom_scroll_bar`}
      >
        <div className="max-w-[100%] lg:pt-4 w-full sticky top-0 bg-background mx-auto">
          <CustomButton
            className="hidden lg:flex mb-5"
            onClick={() => navigate("/new")}
            buttonText="Create New Note"
            icon="/images/icon-plus.svg"
          ></CustomButton>
        </div>

        <h2 className="block lg:hidden px-1 pb-5 font-bold text-xl sm:text-2xl tracking-[-0.5px]">
          {tagQueryParam !== null ? (
            <span className="text-lighterGray block mt-12 lg:mt-0">
              Notes Tagged:{" "}
              <span className="text-primaryText">{tagQueryParam}</span>
            </span>
          ) : (
            "All Notes"
          )}
        </h2>

        {tagQueryParam !== null && (
          <p className="text-sm text-lightText mb-4">
            All notes with with the <strong>"{tagQueryParam}"</strong> tag are
            shown here.
          </p>
        )}

        {((!notes?.length && !isLoading) || !allNotes?.length) &&
          location.pathname !== "/search" && (
            <div className="bg-lightGray p-2 mt-8 mb-4 rounded-md">
              <p className="flex items-center justify-center text-sm text-lightText">
                You don&apos;t have a note yet. Start a new note to capture your
                thoughts and ideas.
              </p>
            </div>
          )}

        {((!notes?.length && !isLoading) || !allNotes?.length) && (
          <div className="bg-lightGray p-2 mt-8 mb-4 rounded-md">
            <p className="flex items-center justify-center text-sm text-lightText flex-wrap">
              You don&apos;t have a note with <span className="flex-nowrap">"<strong>{searchQuery}</strong>"</span>
            </p>
          </div>
        )}

        {isLoading && (
          <LoadiingState message="Loading notes" className="h-fit" />
        )}

        {notes && notes?.length > 0 && (
          <div className="overflow-y-auto max-h-[90vh] pb-14 custom_scroll_bar">
            {allNotes?.map((note: Note, index: number) => (
              <NoteCard
                key={note._id}
                note={note}
                index={index}
                isLastNote={index === allNotes?.length - 1}
                noteQueryParam={noteQueryParam}
                tagQueryParam={tagQueryParam}
              />
            ))}
          </div>
        )}
      </section>

      <div
        role="button"
        onClick={() => navigate("/new")}
        className="fixed bottom-[15%] rounded-full w-[60px] h-[60px] max-lg:flex hidden items-center justify-center right-[5%] z-10 bg-skyBlue"
      >
        <PlusIcon color="#FFFFFF" size={30} />
      </div>
    </>
  );
};

export default AllNotes;