import { Button } from "./ui/button";
import { Note } from "@/lib/types";
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
  useGetArchivedNotesQuery,
  useGetNotesQuery,
  useMarkNoteAsArchivedMutation,
  useRestoreArchivedNoteMutation,
} from "@/store/notes/notesApiSlice";
import { toast } from "@/hooks/use-toast";
import { ArchiveRestore, RefreshCcwIcon, TrashIcon } from "lucide-react";
import { useSelector } from "react-redux";
import { selectCurrentId } from "@/store/auth/authSlice";

const RightSidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { title } = useParams();
  const [isOpen, setIsOpen] = useState({
    archiveNote: false,
    deleteNote: false,
  });

  const userId = useSelector(selectCurrentId);
  const [searchParams] = useSearchParams();
  const noteQueryParam = searchParams.get("note");

  const { data: notes } = useGetNotesQuery(userId, {
    pollingInterval: 15000,
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
  });

  const { data: archivedNotes } = useGetArchivedNotesQuery(userId, {
    pollingInterval: 3000,
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
    refetchOnReconnect: true,
  });

  const noteTitle = (noteQueryParam ?? title) as string;

  const note: Note | undefined =
    notes?.length && location.pathname === "/"
      ? notes[0]
      : archivedNotes?.length && location.pathname == "/archived"
      ? archivedNotes[0]
      : archivedNotes?.length && location.pathname.includes("/archived")
      ? archivedNotes?.find(
          (note: Note) =>
            note?.title.toLowerCase().split(" ").join("-") === noteTitle
        )
      : (notes?.find(
          (note: Note) =>
            note?.title.toLowerCase().split(" ").join("-") === noteTitle
        ) as Note);

  const [markNoteAsArchived, { isLoading: isLoadingArchiveNote }] =
    useMarkNoteAsArchivedMutation();
  const [deleteNote, { isLoading: isLoadingDeleteNote }] =
    useDeleteNoteMutation();
  const [restoreArchivedNote, { isLoading: isLoadingRestoreNote }] =
    useRestoreArchivedNoteMutation();

  const onDeleteNote = async () => {
    try {
      await deleteNote({ id: note?._id });
      setIsOpen((prev) => ({ ...prev, deleteNote: false }));
      toast({
        title: "Note deleted successfully!",
      });

      if (location.pathname.includes("/archived")) {
        navigate("/archived");
      } else {
        navigate("/");
      }
    } catch (err: any) {
      toast({
        title: "Oops! Couldn't delete note",
        description: `Error message: ${err?.message || err?.data?.message}`,
      });
    }
  };

  const onRestoreNote = async () => {
    try {
      await restoreArchivedNote({ id: note?._id });
      setIsOpen((prev) => ({ ...prev, archiveNote: false }));
      toast({
        title: "Note restored successfully!",
        description: "Your note is now under your 'All Notes' tab",
      });
      navigate("/");
    } catch (err: any) {
      toast({
        title: "Oops! Couldn't restore note",
        description: `Error message: ${err?.message || err?.data?.message}`,
      });
    }
  };

  const onArchiveNote = async () => {
    try {
      await markNoteAsArchived({ id: note?._id });
      setIsOpen((prev) => ({ ...prev, archiveNote: false }));
      toast({
        title: "Note archived successfully!",
        description: `You can view note '${note?.title}' under your Archived Notes tab`,
      });

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
      <section
        className={`hidden lg:block basis-[25%] py-5 pl-4 h-screen border-l-[1px] ${
          notes?.length ? "border-darkerGray" : "border-transparent"
        }`}
      >
        {note && notes && notes?.length > 0 && (
          <div>
            {location.pathname.includes("archived") ? (
              <Button
                className="py-6 bg-transparent border-[1px] rounded-md hover:scale-[1.02] duration-500 hover:bg-transparent text-primaryText border-grayBorder mb-3 w-full"
                size="lg"
                onClick={() => onRestoreNote()}
                disabled={isLoadingRestoreNote || !note}
              >
                <RefreshCcwIcon
                  size={24}
                  color="currentColor"
                />
                <span className="ml-1 text-primaryText shadow-none tracking-[-0.2px]">
                  {isLoadingRestoreNote ? "Restoring..." : "Restore Note"}
                </span>
              </Button>
            ) : (
              <Button
                disabled={!note}
                className="py-6 bg-transparent border-[1px] rounded-md hover:scale-[1.02] duration-500 hover:bg-transparent border-grayBorder mb-3 w-full text-primaryText"
                size="lg"
                onClick={() =>
                  setIsOpen((prev) => ({
                    ...prev,
                    archiveNote: !prev.archiveNote,
                  }))
                }
              >
                <ArchiveRestore color="currentColor" />
                <span className="ml-1 shadow-none tracking-[-0.2px]">
                  Archive Note
                </span>
              </Button>
            )}

            <Button
              disabled={!note}
              className="py-6 bg-transparent border-[1px] rounded-md hover:scale-[1.02] duration-500 hover:bg-transparent border-grayBorder w-full text-primaryText"
              size="lg"
              onClick={() =>
                setIsOpen((prev) => ({ ...prev, deleteNote: !prev.deleteNote }))
              }
            >
              <TrashIcon color="currentColor" />
              <span className="ml-1 shadow-none tracking-[-0.2px]">
                Delete Note
              </span>
            </Button>
          </div>
        )}
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
