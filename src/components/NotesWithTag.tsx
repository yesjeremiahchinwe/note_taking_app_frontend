import { notes } from "@/lib/constants";
import { Button } from "./ui/button";
import { Link, useLocation, useParams } from "react-router-dom";
import { Note } from "@/lib/types";

const NotesWithTag = () => {
  const location = useLocation();
  const { tag: selectedTag } = useParams()

  const fetchNotes: Note[] = notes.filter(note => note.tags.filter((tag) => tag.toLowerCase().includes(selectedTag as string)))

  console.log(fetchNotes)

  return (
    <section className={`${location.pathname === "/archived" ? "block" : "hidden lg:block"} custom_scroll_bar basis-full lg:basis-[25%] lg:pr-4 pt-4 pb-[4rem] px-4 lg:px-0 lg:max-h-screen overflow-auto lg:border-r-[1px] border-[#E0E4EA] w-full`}>
      <div className="max-w-[96%] mx-auto">
        <Button
          className="hidden lg:flex py-6 rounded-lg bg-[#335CFF] hover:bg-[#335CFF] hover:scale-[1.02] duration-500 w-full mb-5"
          size="lg"
        >
          &#x2b; <span>Create New Note</span>
        </Button>
      </div>

      <h2 className="block lg:hidden px-1 pb-5 font-bold text-2xl tracking-[-0.5px] text-[#525866]">Notes Tagged: <span className="text-[#0E121B]">{selectedTag?.slice(0, 1).toUpperCase()}{selectedTag?.slice(1,)}</span></h2>

      <p className="text-sm text-[#2B303B] mb-4">All notes with with the {`"${selectedTag?.slice(0, 1).toUpperCase()}${selectedTag?.slice(1,)}" tag are shown here`}.</p>

      {fetchNotes.map((note: Note, index: number) => {
        const formatNoteTitle = note.title.toLowerCase().split(" ").join("-");

        return (
          <article
            key={note.title}
            className={`${
              location.pathname.includes(formatNoteTitle)
                ? "lg:bg-[#F3F5F8] border-t-0"
                : location.pathname === "/archived" && index === 0
                ? "lg:bg-[#F3F5F8] border-t-0"
                : "bg-transparent border-t-[1px] border-[#E0E4EA]"
            } mb-2 rounded-md p-3`}
          >
            <h2 className="text-xl font-semibold tracking-[-0.3px] text-[#0E121B]">
              <Link to={`/archived/${formatNoteTitle}`}>
                {note.title}
              </Link>
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
      })}
    </section>
  );
};

export default NotesWithTag;
