import { Button } from "./ui/button";
import {
  Link,
  useLocation,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import { Note } from "@/lib/types";
import { useGetArchivedNotesQuery } from "@/store/notes/notesApiSlice";
import { PlusIcon } from "lucide-react";
import LoadiingState from "./HomeLoader";
import { useSelector } from "react-redux";
import { selectCurrentId } from "@/store/auth/authSlice";

const ArchivedNotes = () => {
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const tagQueryParam = searchParams.get("tag");
  const noteQueryParam = searchParams.get("note");
  const userId = useSelector(selectCurrentId)

  const { data: notes, isLoading } = useGetArchivedNotesQuery(userId,
    {
      pollingInterval: 3000,
      refetchOnFocus: true,
      refetchOnMountOrArgChange: true,
      refetchOnReconnect: true
    }
  );

  const allNotes: Note[] | undefined =
    tagQueryParam && location.pathname.includes("archived")
      ? notes?.filter((note: Note) =>
          note.tags.includes(tagQueryParam as string)
        )
      : notes;

  return (
    <>
      <section
        className={`${
          location.pathname === "/archived" ? "block" : "hidden lg:block"
        } basis-full lg:basis-[25%] lg:pr-4 pt-4 pb-[4rem] px-4 lg:px-0 h-screen overflow-auto lg:border-r-[1px] border-darkerGray w-full custom_scroll_bar`}
      >
        <div className="max-w-[96%] mx-auto">
          <Button
            className="hidden lg:flex py-6 rounded-lg bg-skyBlue hover:bg-skyBlue text-white  hover:scale-[1.02] duration-500 w-full mb-5 "
            size="lg"
            onClick={() => navigate("/new")}
          >
            &#x2b; <span>Create New Note</span>
          </Button>
        </div>

        <h2 className="block lg:hidden px-1 pb-5 font-bold text-2xl tracking-[-0.5px]">
          {tagQueryParam !== null ? (
            <span className="text-lighterGray">
              Notes Tagged:{" "}
              <span className="text-primaryText">{tagQueryParam}</span>
            </span>
          ) : (
            "Archived Notes"
          )}
          s
        </h2>

        {tagQueryParam ? (
          <p className="text-sm text-lightText mb-4">
            All archived notes with with the "{tagQueryParam}" tag are shown
            here.
          </p>
        ) : (
          <p className="text-sm text-lightText mb-4">
            All your archived notes are stored here. You can restore or delete
            them anytime.
          </p>
        )}

        {!notes?.length && !isLoading && (
          <div className="bg-lightGray p-2 mt-8 rounded-md">
            <p className="flex items-center justify-center text-sm text-lightText">
              You haven&apos;t archived a note yet. Start a new note to capture
              your thoughts and ideas.
            </p>
          </div>
        )}

        {isLoading && (
          <LoadiingState
            message="Fetching archived notes"
            className="h-[200px]"
          />
        )}

        {allNotes?.length !== 0 &&
          allNotes?.map((note: Note, index: number) => {
            const formatNoteTitle = note.title
              .toLowerCase()
              .split(" ")
              .join("-");

            return (
              <article
                key={note.title}
                className={`bg-transparent border-t-0 ${
                  location.pathname.includes(formatNoteTitle)
                    ? "lg:bg-lightGray border-t-0"
                    : location.pathname === "/archived" && index === 0
                    ? "lg:bg-lightGray border-t-0"
                    : formatNoteTitle === (noteQueryParam as string)
                    ? "lg:bg-lightGray border-t-0"
                    : note.tags.includes(tagQueryParam as string) &&
                      noteQueryParam === null &&
                      index === 0
                    ? "lg:bg-lightGray border-t-0"
                    : "bg-transparent border-t-[1px] border-darkerGray"
                } mb-2 rounded-md p-3`}
              >
                <h2 className="text-xl font-semibold tracking-[-0.3px] text-primaryText">
                  {location.pathname.includes("/archived") &&
                  note.tags.includes(tagQueryParam as string) ? (
                    <Link
                      to={`/archived/?tag=${tagQueryParam}&note=${formatNoteTitle}`}
                    >
                      {note.title}
                    </Link>
                  ) : (
                    <Link to={`/archived/${formatNoteTitle}`}>
                      {note.title}
                    </Link>
                  )}
                </h2>

                <div className="flex flex-wrap items-center gap-[8px] mt-3">
                  {note?.tags?.split(",").map((tag: string, index: number) => (
                    <p
                      key={index}
                      className="py-[2px] px-[6px] text-sm rounded-md bg-tagsBg border-lightText"
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
      </section>

      {location.pathname === "/" ||
        (location.pathname === "/archived" && (
          <div
            role="button"
            onClick={() => navigate("/new")}
            className="fixed bottom-[15%] rounded-full w-[60px] h-[60px] flex lg:hidden items-center justify-center right-[5%] z-10 bg-skyBlue text-white dark:text-white"
          >
            <PlusIcon color="#FFFFFF" size={30} />
          </div>
        ))}
    </>
  );
};

export default ArchivedNotes;
