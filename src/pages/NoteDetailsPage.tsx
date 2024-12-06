import { Button } from "../components/ui/button";
import { Note } from "@/lib/types";
import { Navigate, useLocation, useNavigate, useParams, useSearchParams } from "react-router-dom";
import deleteIcon from "/images/icon-delete.svg";
import archivedIcon from "/images/icon-archive.svg";
import { Link } from "react-router-dom";
import { useState } from "react";
import DeleteModal from "@/components/modals/DeleteNoteModal";
import ArchiveNoteModal from "@/components/modals/ArchiveNoteModal";
import NoteForm from "@/components/NoteForm";
import { ChevronLeftIcon } from "lucide-react";
import { useDeleteNoteMutation, useGetNotesQuery, useMarkNoteAsArchivedMutation } from "@/store/notes/notesApiSlice";
import { Description } from "@radix-ui/react-toast";
import { toast } from "@/hooks/use-toast";
import HomeLoader from "@/components/HomeLoader";

const NoteDetails = () => {
  const location = useLocation();
  const navigate = useNavigate()
  const [isOpen, setIsOpen] = useState({
    archiveNote: false,
    deleteNote: false,
  });

  const [searchParams, setSearchParams] = useSearchParams();
  const noteQueryParam = searchParams.get("note");
  const tagQueryParam = searchParams.get("tag");
  const { title } = useParams();

  const { data: notes, isLoading: isLoadingGetNotes } = useGetNotesQuery("notesList", {
    pollingInterval: 15000,
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
  });

  const [deleteNote, { isLoading: isLoadingDeleteNote }] = useDeleteNoteMutation()
  const [markNoteAsArchived, { isLoading: isLoadingMarkedNote }] = useMarkNoteAsArchivedMutation()

  // const { data: archivedNotes } = useGetArchivedNotesQuery(
  //   "archivedNotesList",
  //   {
  //     pollingInterval: 15000,
  //     refetchOnFocus: true,
  //     refetchOnMountOrArgChange: true,
  //   }
  // );

  console.log(notes);
  // console.log(archivedNotes);
 

  const note = title
    ? (notes.find(
        (note: Note) => note.title.toLowerCase().split(" ").join("-") === title
      ) as Note)
    : noteQueryParam
    ? (notes.find(
        (note: Note) =>
          note.title.toLowerCase().split(" ").join("-") === noteQueryParam
      ) as Note)
    : tagQueryParam
    ? notes.filter((note: Note) => note.tags.includes(tagQueryParam as string))[0]
    : tagQueryParam && location.pathname.includes("archived")
    ? notes.filter((note: Note) => note.tags.includes(tagQueryParam as string))[0]
    : notes[0];

  const goBackToPreviousPage = location.pathname.includes("archived")
    ? "/archived"
    : tagQueryParam !== null ? `/tags` : "/";

  const onDeleteNote = async () => {
    try {
      await deleteNote({ id: note._id })
      setIsOpen((prev) => ({ ...prev, deleteNote: false }))
      navigate("/")
    } catch (err: any) {
      toast({
        title: "Oops! Couldn't delete note",
        description: `Error message: ${err?.message || err?.data?.message}`
      })
    }
  }

  const onArchiveNote = async () => {
    try {
      await markNoteAsArchived({ id: note._id })
      setIsOpen((prev) => ({ ...prev, archiveNote: false }))
      navigate("/")
    } catch (err: any) {
      toast({
        title: "Oops! Couldn't archive note",
        description: `Error message: ${err?.message || err?.data?.message}`
      })
    }
  }

  if (isLoadingGetNotes) {
    return <HomeLoader />
  }

  return (
    <>
      {/* ------------ Note Details Header --------------- */}
      <div className="flex lg:hidden items-center justify-between w-full py-3">
        <Link
          to={goBackToPreviousPage}
          className="flex items-center gap-1 pl-[14px] text-black"
        >
          <ChevronLeftIcon color="#525866" />
          <span className="text-[#525866] font-normal tracking-[-0.2px] text-sm">
            Go Back
          </span>
        </Link>

        <div className="flex items-center">
          <Button
            size="icon"
            className="bg-transparent hover:bg-transparent shadow-none border-none mr-2"
            onClick={() =>
              setIsOpen((prev) => ({ ...prev, deleteNote: !prev.deleteNote }))
            }
          >
            <img src={deleteIcon} alt="A delete Icon" />
          </Button>

          <Button
            size="icon"
            className="bg-transparent hover:bg-transparent shadow-none border-none"
            onClick={() =>
              setIsOpen((prev) => ({ ...prev, archiveNote: !prev.archiveNote }))
            }
          >
            <img src={archivedIcon} alt="Archive Icon" />
          </Button>

          <Button className="bg-transparent hover:bg-transparent shadow-none border-none text-[#335CFF]">
            Save Note
          </Button>
        </div>
      </div>

      {/* -------------- Note Body ------------------ */}
      <section
        className={`${
          location.pathname === "/" && noteQueryParam === null
            ? "hidden lg:block"
            : location.pathname === "/archived"
            ? "hidden lg:block"
            : "block"
        } pt-4 mx-[20px] lg:px-0 lg:mx-0 lg:pt-0 border-t-[1px] border-[#E0E4EA] lg:border-t-0`}
      >
        <NoteForm isNewNote={location.pathname === "/new"} note={note} />
      </section>

      <DeleteModal
        isOpen={isOpen.deleteNote}
        onClose={() => setIsOpen((prev) => ({ ...prev, deleteNote: false }))}
        onConfirm={() => onDeleteNote()}
        loading={isLoadingDeleteNote}
      />

      <ArchiveNoteModal
        isOpen={isOpen.archiveNote}
        onClose={() => setIsOpen((prev) => ({ ...prev, archiveNote: false }))}
        onConfirm={() => onArchiveNote()}
        loading={isLoadingMarkedNote}
      />
    </>
  );
};

export default NoteDetails;
