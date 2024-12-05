import {
  Link,
  useLocation,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import { Note } from "@/lib/types";
import CustomButton from "@/components/CustomButton";
import { useGetNotesQuery } from "@/store/notes/notesApiSlice";
import { useToast } from "@/hooks/use-toast";
import { PlusIcon } from "lucide-react";

const AllNotes = () => {
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const tagQueryParam = searchParams.get("tag");
  const noteQueryParam = searchParams.get("note");

  const {
    data: notes,
} = useGetNotesQuery('notesList', {
    pollingInterval: 15000,
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true
})

  const allNotes: Note[] = tagQueryParam
    ? notes.filter((note: Note) => note.tags.includes(tagQueryParam as string))
    : location.pathname === "/tags"
    ? notes
    : notes;

  return (
    <>
      <section
        className={`${
          location.pathname === "/" && noteQueryParam === null
            ? "block"
            : "hidden lg:block"
        } custom_scroll_bar basis-full lg:basis-[25%] lg:pr-4 pt-4 pb-[4rem] px-4 lg:px-0 lg:max-h-screen overflow-auto lg:border-r-[1px] border-[#E0E4EA] w-full`}
      >
        <div className="max-w-[96%] mx-auto">
          <CustomButton
            className="hidden lg:flex mb-5"
            onClick={() => navigate("/new")}
            buttonText="Create New Note"
            icon="/images/icon-plus.svg"
          ></CustomButton>
        </div>

        <h2 className="block lg:hidden px-1 pb-5 font-bold text-2xl tracking-[-0.5px]">
          {tagQueryParam !== null ? (
            <span className="text-[#87898a]">
              Notes Tagged:{" "}
              <span className="text-[#0E121B]">{tagQueryParam}</span>
            </span>
          ) : (
            "All Notes"
          )}
        </h2>

        {tagQueryParam !== null && (
          <p className="text-sm text-[#2B303B] mb-4">
            All notes with with the "{tagQueryParam}" tag are shown here.
          </p>
        )}

        {allNotes?.length !== 0 ? (
          allNotes.map((note: Note, index: number) => {
            const formatNoteTitle = note.title
              .toLowerCase()
              .split(" ")
              .join("-");

            return (
              <article
                key={note.title}
                className={`bg-transparent mb-2 rounded-md p-3 ${
                  index === allNotes.length - 1
                    ? "border-b-0"
                    : "border-b-[1px] border-[#E0E4EA]"
                } ${
                  location.pathname.includes(formatNoteTitle)
                    ? "lg:bg-[#F3F5F8] lg:border-b-0"
                    : noteQueryParam === formatNoteTitle
                    ? "lg:bg-[#F3F5F8] lg:border-b-0"
                    : location.pathname.includes("/") &&
                      index === allNotes.length - 1
                    ? "lg:border-b-0"
                    : location.pathname === "/" &&
                      index === 0 &&
                      noteQueryParam === null
                    ? "lg:bg-[#F3F5F8] lg:border-b-0"
                    : location.pathname === "/tags" && index === 0
                    ? "lg:bg-[#F3F5F8] lg:border-b-0"
                    : "bg-transparent lg:border-b-[1px] border-[#E0E4EA]"
                }`}
              >
                <h2 className="text-xl font-semibold tracking-[-0.3px] text-[#0E121B]">
                  {tagQueryParam ? (
                    <Link to={`/?tag=${tagQueryParam}&note=${formatNoteTitle}`}>
                      {note.title}
                    </Link>
                  ) : (
                    <Link to={`/${formatNoteTitle}`}>{note.title}</Link>
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
          })
        ) : (
          <p className="flex items-center justify-center mt-6 pt-6 text-sm text-[#2B303B]">
            No Note found
          </p>
        )}
      </section>

      <div
        role="button"
        onClick={() => navigate("/new")}
        className="fixed bottom-[15%] rounded-full w-[60px] h-[60px] flex items-center justify-center right-[5%] z-10 bg-[#335CFF]"
      >
        <PlusIcon color="#FFFFFF" size={30} />
      </div>
    </>
  );
};

export default AllNotes;
