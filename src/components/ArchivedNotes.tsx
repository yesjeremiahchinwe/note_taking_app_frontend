import { Button } from "./ui/button";
import { Link, useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { Note } from "@/lib/types";
import { useGetArchivedNotesQuery } from "@/store/notes/notesApiSlice";
import { PlusIcon } from "lucide-react";

const ArchivedNotes = () => {
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate()

  const tagQueryParam = searchParams.get("tag");
  const noteQueryParam = searchParams.get("note");

  const {
    data: notes,
} = useGetArchivedNotesQuery('archivedNotesList', {
    pollingInterval: 15000,
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true
})

  const fetchNotes: Note[] = notes.filter((note: Note) => note.isArchived);

  const allNotes: Note[] = tagQueryParam && location.pathname.includes("archived")
    ? fetchNotes.filter(note => note.tags.includes(tagQueryParam as string)) 
    : fetchNotes

  return (
    <>
    <section
      className={`${
        location.pathname === "/archived" ? "block" : "hidden lg:block"
      } custom_scroll_bar basis-full lg:basis-[25%] lg:pr-4 pt-4 pb-[4rem] px-4 lg:px-0 lg:max-h-screen overflow-auto lg:border-r-[1px] border-[#E0E4EA] w-full`}
    >
      <div className="max-w-[96%] mx-auto">
        <Button
          className="hidden lg:flex py-6 rounded-lg bg-[#335CFF] hover:bg-[#335CFF] hover:scale-[1.02] duration-500 w-full mb-5"
          size="lg"
        >
          &#x2b; <span>Create New Note</span>
        </Button>
      </div>

      <h2 className="block lg:hidden px-1 pb-5 font-bold text-2xl tracking-[-0.5px]">
        {tagQueryParam !== null ? (
          <span className="text-[#87898a]">
            Notes Tagged:{" "}
            <span className="text-[#0E121B]">{tagQueryParam}</span>
          </span>
        ) : (
          "Archived Notes"
        )}
        s
      </h2>

      {tagQueryParam ? (
        <p className="text-sm text-[#2B303B] mb-4">
          All archived notes with with the "{tagQueryParam}" tag are shown here.
        </p>
      ) : (
        <p className="text-sm text-[#2B303B] mb-4">
          All your archived notes are stored here. You can restore or delete
          them anytime.
        </p>
      )}

      {allNotes.length !== 0 ? allNotes.map((note: Note, index: number) => {
        const formatNoteTitle = note.title.toLowerCase().split(" ").join("-");

        return (
          <article
            key={note.title}
            className={`bg-transparent border-t-0 ${
              location.pathname.includes(formatNoteTitle)
                ? "lg:bg-[#F3F5F8] border-t-0"
                : location.pathname === "/archived" && index === 0
                ? "lg:bg-[#F3F5F8] border-t-0"
                : formatNoteTitle === noteQueryParam as string
                ? "lg:bg-[#F3F5F8] border-t-0"
                : note.tags.includes(tagQueryParam as string) && noteQueryParam === null && index === 0
                ? "lg:bg-[#F3F5F8] border-t-0"
                : "bg-transparent border-t-[1px] border-[#E0E4EA]"
            } mb-2 rounded-md p-3`}
          >
            <h2 className="text-xl font-semibold tracking-[-0.3px] text-[#0E121B]">
              {location.pathname.includes("/archived") && note.tags.includes(tagQueryParam as string) ? (
                <Link to={`/archived/?tag=${tagQueryParam}&note=${formatNoteTitle}`}>
                {note.title}
              </Link>
              ) : (
                <Link to={`/archived/${formatNoteTitle}`}>
                {note.title}
              </Link>
              )}
            </h2>

            <div className="flex flex-wrap items-center gap-[8px] mt-3">
              {note.tags.map((tag: string, index: number) => (
                <p
                  key={index}
                  className="py-[2px] px-[6px] text-sm rounded-md bg-[#E0E4EA]"
                >
                  {tag}
                </p>
              ))}
            </div>

            <small className="text-[#2B303B] block mt-4 font-medium text-xs tracking-[-0.2px]">
              {note.lastEdited.split("T")[0]}
            </small>
          </article>
        );
      }) : (
        <p className="flex items-center justify-center mt-6 pt-6 text-sm text-[#2B303B]">No Note found</p>
      )}
    </section>

    {location.pathname === "/" || location.pathname === "/archived" && (
    <div role="button" onClick={() => navigate("/new")} className="fixed bottom-[15%] rounded-full w-[60px] h-[60px] flex lg:hidden items-center justify-center right-[5%] z-10 bg-[#335CFF]">
        <PlusIcon color="#FFFFFF" size={30} />
      </div>
      )}
    </>
  );
};

export default ArchivedNotes;
