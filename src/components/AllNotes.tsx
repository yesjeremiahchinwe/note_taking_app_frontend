import {
  Link,
  useLocation,
  useNavigate,
  useSearchParams,
  useParams,
} from "react-router-dom";
import { Note } from "@/lib/types";
import CustomButton from "@/components/CustomButton";
import { useGetNotesQuery } from "@/store/notes/notesApiSlice";
import { PlusIcon } from "lucide-react";
import useDebouncedValue from "@/hooks/useDebouncedValue";
import LoadiingState from "./HomeLoader";
import { useSelector } from "react-redux";
import { selectCurrentId } from "@/store/auth/authSlice";

const AllNotes = ({ searchQuery }: { searchQuery?: string }) => {
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { title } = useParams();
  const debouncedSearchTerm = useDebouncedValue(
    searchQuery as string,
    500
  )?.toLowerCase();

  const tagQueryParam = searchParams.get("tag");
  const noteQueryParam = searchParams.get("note");
  const userId = useSelector(selectCurrentId)

  const { data: notes, isLoading } = useGetNotesQuery(userId, {
    pollingInterval: 3000,
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
    refetchOnReconnect: true,
  });

  const allNotes: Note[] | undefined =
    notes?.length && tagQueryParam
      ? notes?.filter((note: Note) =>
          note?.tags?.includes(tagQueryParam as string)
        )
      : location.pathname === "/tags"
      ? notes
      : debouncedSearchTerm && notes?.length
      ? notes?.filter(
          (note: Note) =>
            note?.title?.toLowerCase().includes(debouncedSearchTerm) ||
            note?.tags?.toLowerCase().includes(debouncedSearchTerm) ||
            note?.content?.toLowerCase().includes(debouncedSearchTerm)
        )
      : notes;

  return (
    <>
      <section
        className={`${
          notes?.length && location.pathname === "/" && noteQueryParam === null
            ? "block"
            : "hidden lg:block"
        } basis-full lg:basis-[25%] lg:pr-4 pt-4 pb-[4rem] px-4 lg:px-0 min-h-screen lg:border-r-[1px] border-darkerGray w-full`}
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
            <span className="text-lighterGray">
              Notes Tagged:{" "}
              <span className="text-primaryText">{tagQueryParam}</span>
            </span>
          ) : (
            "All Notes"
          )}
        </h2>

        {tagQueryParam !== null && (
          <p className="text-sm text-lightText mb-4">
            All notes with with the "{tagQueryParam}" tag are shown here.
          </p>
        )}

        {((!notes?.length && !isLoading) || !allNotes?.length) && (
          <div className="bg-lightGray p-2 mt-8 mb-4 rounded-md">
            <p className="flex items-center justify-center text-sm text-lightText">
              You don&apos;t have a note yet. Start a new note to capture your
              thoughts and ideas.
            </p>
          </div>
        )}

        {isLoading && (
          <LoadiingState message="Loading notes" className="h-full" />
        )}

        {notes && notes?.length > 0 && (
          <div className="overflow-y-auto max-h-[90vh] custom_scroll_bar">
            {allNotes?.map((note: Note, index: number) => {
              const formatNoteTitle = note.title
                .toLowerCase()
                .split(" ")
                .join("-");

              return (
                <article
                  key={note.title}
                  className={`bg-transparent mb-2 rounded-md p-3 ${
                    index === allNotes?.length - 1
                      ? "border-b-0"
                      : "border-b-[1px] border-darkerGray"
                  } ${
                    location.pathname === formatNoteTitle
                      ? "lg:bg-lightGray lg:border-b-0"
                      : formatNoteTitle === noteQueryParam && index > 0
                      ? "lg:bg-lightGray lg:border-b-0"
                      : note.title.toLowerCase().split(" ").join("-") ===
                        (title as string)
                      ? "lg:bg-lightGray lg:border-b-0"
                      : location.pathname === "/" && index === 0
                      ? "lg:bg-lightGray lg:border-b-0"
                      : location.pathname === "/tags" && index === 0
                      ? "lg:bg-lightGray lg:border-b-0"
                      : "bg-transparent lg:border-b-[1px] border-darkerGray"
                  }`}
                >
                  <h2 className="text-xl font-semibold tracking-[-0.3px] text-primaryText">
                    {tagQueryParam ? (
                      <Link
                        to={`/?tag=${tagQueryParam}&note=${formatNoteTitle}`}
                      >
                        {note.title}
                      </Link>
                    ) : (
                      <Link to={`/${formatNoteTitle}`}>{note.title}</Link>
                    )}
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
