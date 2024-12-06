import iconArchive from "/images/icon-archive.svg";
import iconDelete from "/images/icon-delete.svg";
import iconRestore from "/images/icon-restore.svg";
import { Button } from "./ui/button";
import {
  useLocation,
  useParams,
  useSearchParams,
  useNavigate,
} from "react-router-dom";
import { useState } from "react";
import DeleteModal from "./modals/DeleteNoteModal";
import ArchiveNoteModal from "./modals/ArchiveNoteModal";
import {
  useDeleteNoteMutation,
  useGetNotesQuery,
  useMarkNoteAsArchivedMutation,
} from "@/store/notes/notesApiSlice";
import { toast } from "@/hooks/use-toast";

const RightSidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { title } = useParams();
  const [isOpen, setIsOpen] = useState({
    archiveNote: false,
    deleteNote: false,
  });
  const [searchParams, setSearchParams] = useSearchParams();
  const noteQueryParam = searchParams.get("note");

  const noteTitle = (noteQueryParam ?? title) as string;

  const [markNoteAsArchived, { isLoading: isLoadingArchiveNote }] =
    useMarkNoteAsArchivedMutation();
  const [deleteNote, { isLoading: isLoadingDeleteNote }] =
    useDeleteNoteMutation();

  const { note } = useGetNotesQuery("notesList", {
    selectFromResult: ({ data }) => ({
      note: data?.entities[noteTitle],
    }),
  });

  const onDeleteNote = async () => {
    try {
      await deleteNote({ id: note._id });
      setIsOpen((prev) => ({ ...prev, deleteNote: false }));
      navigate("/");
    } catch (err: any) {
      toast({
        title: "Oops! Couldn't delete note",
        description: `Error message: ${err?.message || err?.data?.message}`,
      });
    }
  };

  const onArchiveNote = async () => {
    try {
      await markNoteAsArchived({ id: note._id });
      setIsOpen((prev) => ({ ...prev, archiveNote: false }));
      navigate("/");
    } catch (err: any) {
      toast({
        title: "Oops! Couldn't archive note",
        description: `Error message: ${err?.message || err?.data?.message}`,
      });
    }
  };

  return (
    <>
      <section className="hidden lg:block basis-[25%] py-5 pl-4 h-screen border-l-[1px] border-[#E0E4EA]">
        {location.pathname.includes("archived") ? (
          <Button
            className="py-6 bg-transparent border-[1px] rounded-md hover:scale-[1.02] duration-500 hover:bg-transparent border-[#CACFD8] mb-3 w-full"
            size="lg"
          >
            <img src={iconRestore} alt="Archive svg icon" />{" "}
            <span className="ml-1 text-[#0E121B] shadow-none tracking-[-0.2px]">
              Restore Note
            </span>
          </Button>
        ) : (
          <Button
            className="py-6 bg-transparent border-[1px] rounded-md hover:scale-[1.02] duration-500 hover:bg-transparent border-[#CACFD8] mb-3 w-full"
            size="lg"
            onClick={() =>
              setIsOpen((prev) => ({ ...prev, archiveNote: !prev.archiveNote }))
            }
          >
            <img src={iconArchive} alt="Archive svg icon" />{" "}
            <span className="ml-1 text-[#0E121B] shadow-none tracking-[-0.2px]">
              Archive Note
            </span>
          </Button>
        )}

        <Button
          className="py-6 bg-transparent border-[1px] rounded-md hover:scale-[1.02] duration-500 hover:bg-transparent border-[#CACFD8] w-full"
          size="lg"
          onClick={() =>
            setIsOpen((prev) => ({ ...prev, deleteNote: !prev.deleteNote }))
          }
        >
          <img src={iconDelete} alt="Delete svg icon" />{" "}
          <span className="ml-1 text-[#0E121B] shadow-none tracking-[-0.2px]">
            Delete Note
          </span>
        </Button>
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
        loading={isLoadingArchiveNote}
      />
    </>
  );
};

export default RightSidebar;
