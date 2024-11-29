import { notes } from "@/lib/constants";
import { Button } from "./ui/button";
import { Link, useLocation, useSearchParams } from "react-router-dom";
import { Note } from "@/lib/types";

const AllNotes = () => {
  const location = useLocation()
  const [searchParams, setSearchParams] = useSearchParams()

  const tagQueryParam = searchParams.get("tag")
  const noteQueryParam = searchParams.get("note")
  // const noteQueryParam = searchParams.get("note")
  
  // const noteParam = searchParams.get("note")

  // const allNotes: Note[] = tag ? notes.filter(note => note.tags.includes(tag as string)) : notes

  // const findNote: Note = tag ? allNotes.find(note => note.title.toLowerCase().split(" ").join("-").includes(noteParam as string)) as Note : allNotes[0]

  // const note = findNote?.title.toLowerCase().split(" ").join("-") ?? ""

  const allNotes: Note[] = tagQueryParam 
    ? notes.filter(note => note.tags.includes(tagQueryParam as string)) 
    : notes

  return (
    <section className={`${location.pathname === "/"  ? "block" : "hidden lg:block"} custom_scroll_bar basis-full lg:basis-[25%] lg:pr-4 pt-4 pb-[4rem] px-4 lg:px-0 lg:max-h-screen overflow-auto lg:border-r-[1px] border-[#E0E4EA] w-full`}>
      <div className="max-w-[96%] mx-auto">
        <Button
          className="hidden lg:flex py-6 rounded-lg bg-[#335CFF] hover:bg-[#3357e9] w-full mb-5"
          size="lg"
        >
          &#x2b; <span>Create New Note</span>
        </Button>
      </div>

      <h2 className="block lg:hidden px-1 pb-5 font-bold text-2xl tracking-[-0.5px]">All Notes</h2>

      {allNotes.map((note: Note, index: number) => {
        const formatNoteTitle = note.title.toLowerCase().split(" ").join("-");

        return (
          <article
            key={note.title}
            className={`bg-transparent ${
              location.pathname.includes(formatNoteTitle)
                ? "lg:bg-[#F3F5F8] border-t-0"
                : noteQueryParam === formatNoteTitle
                ? "lg:bg-[#F3F5F8] border-t-0"
                : location.pathname === "/" && index === 0 && noteQueryParam === null
                ? "lg:bg-[#F3F5F8] border-t-0"
                : "bg-transparent lg:border-t-[1px] border-[#E0E4EA]"
            } mb-2 rounded-md p-3`}
          >
            <h2 className="text-xl font-semibold tracking-[-0.3px] text-[#0E121B]">
              {tagQueryParam ? (
                <Link to={`/?tag=${tagQueryParam}&note=${formatNoteTitle}`}>
                {note.title}
              </Link>
              ) : (
                <Link to={`/${formatNoteTitle}`}>
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
      })}
    </section>
  );
};

export default AllNotes;
