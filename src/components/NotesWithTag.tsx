import { Link } from "react-router-dom";
import { IconTag } from "@/lib/icons";
import { useGetNotesQuery } from "@/store/notes/notesApiSlice";
import LoadiingState from "./HomeLoader";
import { flattenAndRemoveDuplicates } from "@/lib/utils";
import { useSelector } from "react-redux";
import { selectCurrentId } from "@/store/auth/authSlice";

const NotesWithTag = () => {
  const userId = useSelector(selectCurrentId)
  const {
      data: notes,
      isLoading,
      isError
  } = useGetNotesQuery(userId, {
      pollingInterval: 0,
      refetchOnFocus: true,
      refetchOnMountOrArgChange: true
  })

  // Fetch all tags (string), and convert each tag in that string into array element - resulting to array of arrays 
    const allTags: string[][] = notes?.map((note) => note.tags?.split(",")) as string[][]
  
    const listOfTags = flattenAndRemoveDuplicates(allTags)

  return (
    <section className="block lg:hidden px-[1.85rem] pt-3 pb-[6rem] min-h-screen">
      <h2 className="block lg:hidden pb-5 font-bold text-2xl tracking-[-0.5px] static top-0">
        Tags
      </h2>

      {isLoading && <LoadiingState message="Fetching note tags" />}

      {isError && <p className="text-lightRed">Oops! Failed to fetch tags!</p>}

      {!notes?.length && !isError && <p>No tags yet. Create a note and tags associated with your notes will appear here.</p>}

      <ul className="flex flex-col gap-6 my-5">
        {listOfTags?.map((tag: any, index: number) => (
          <li
          key={index}
          className={`${
            index === listOfTags.length - 1
              ? "border-t-0"
              : "border-b-[1px] border-grayBorder"
          } pb-4`}
        >
          <Link
            to={`/?tag=${tag}`}
            className="flex items-center text-primaryText gap-3 font-medium text-base tracking-[-0.2px]"
          >
            <IconTag color="currentColor" /> <span>{tag}</span>
          </Link>
        </li>
        ))}
      </ul>
    </section>
  );
};

export default NotesWithTag;
