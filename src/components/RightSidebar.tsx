import { Button } from "./ui/button";
import { Note } from "@/lib/types";
import { useLocation, useParams, useSearchParams } from "react-router-dom";
import { useMemo } from "react";
import DeleteModal from "./modals/DeleteNoteModal";
import ArchiveNoteModal from "./modals/ArchiveNoteModal";
import {
  useGetArchivedNotesQuery,
  useGetNotesQuery,
} from "@/store/notes/notesApiSlice";
import { ArchiveRestore, RefreshCcwIcon, TrashIcon } from "lucide-react";
import { useSelector } from "react-redux";
import { selectCurrentId } from "@/store/auth/authSlice";
import useNotes from "@/hooks/useNotes";

const RightSidebar = () => {
  const location = useLocation();
  const { title } = useParams();

  const userId = useSelector(selectCurrentId);
  const [searchParams] = useSearchParams();
  const noteQueryParam = searchParams.get("note");

  const { data: notes } = useGetNotesQuery(userId);

  const { data: archivedNotes } = useGetArchivedNotesQuery(userId);

  const noteTitle = (noteQueryParam ?? title) as string;

  const foundNote: Note | undefined = useMemo(() => {
    return notes?.length && location.pathname === "/"
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
  }, [notes, archivedNotes, location.pathname]);

  const {
    onDeleteNote,
    onArchiveNote,
    onRestoreNote,
    isLoadingArchiveNote,
    isLoadingDeleteNote,
    isLoadingRestoreNote,
    isOpen,
    setIsOpen
  } = useNotes(foundNote as Note);

  return (
    <>
      <section
        className={`hidden lg:block basis-[25%] py-5 pl-4 h-screen border-l-[1px] ${
          notes?.length ? "border-darkerGray" : "border-transparent"
        }`}
      >
        {foundNote && notes && notes?.length > 0 && (
          <div>
            {location.pathname.includes("archived") ? (
              <Button
                className="py-6 bg-transparent border-[1px] rounded-md hover:scale-[1.02] duration-500 hover:bg-transparent text-primaryText border-grayBorder mb-3 w-full"
                size="lg"
                onClick={() => onRestoreNote()}
                disabled={isLoadingRestoreNote || !foundNote}
              >
                <RefreshCcwIcon size={24} color="currentColor" />
                <span className="ml-1 text-primaryText shadow-none tracking-[-0.2px]">
                  {isLoadingRestoreNote ? "Restoring..." : "Restore Note"}
                </span>
              </Button>
            ) : (
              <Button
                disabled={!foundNote}
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
              disabled={!foundNote}
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