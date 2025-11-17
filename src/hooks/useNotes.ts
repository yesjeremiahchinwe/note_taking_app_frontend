import {
  useDeleteNoteMutation,
  useMarkNoteAsArchivedMutation,
  useRestoreArchivedNoteMutation,
} from "@/store/notes/notesApiSlice";
import { toast } from "react-toastify";
import {
  useLocation,
  useNavigate
} from "react-router-dom";
import { Note } from "@/lib/types";
import { useState } from "react";

const useNotes = (foundNote: Note) => {
  const location = useLocation();
  const navigate = useNavigate();

  const [isOpen, setIsOpen] = useState({
    archiveNote: false,
    deleteNote: false,
  });

  const [deleteNote, { isLoading: isLoadingDeleteNote }] =
    useDeleteNoteMutation();
  const [markNoteAsArchived, { isLoading: isLoadingArchiveNote }] =
    useMarkNoteAsArchivedMutation();
  const [restoreArchivedNote, { isLoading: isLoadingRestoreNote }] =
    useRestoreArchivedNoteMutation();

  const onDeleteNote = async () => {
    try {
      await deleteNote({ id: foundNote?._id });
      setIsOpen((prev) => ({ ...prev, deleteNote: false }));
      toast("Note deleted successfully!");
      if (location.pathname.includes("/archived")) {
        navigate("/archived");
      } else {
        navigate("/");
      }
    } catch (err: any) {
      toast(`Error message: ${err?.message || err?.data?.message}`);
    }
  };

  const onArchiveNote = async () => {
    try {
      await markNoteAsArchived({ id: foundNote?._id });
      setIsOpen((prev) => ({ ...prev, archiveNote: false }));
      toast("Note archived successfully!");
      navigate("/");
    } catch (err: any) {
      toast(`Error message: ${err?.message || err?.data?.message}`);
    }
  };

  const onRestoreNote = async () => {
    try {
      await restoreArchivedNote({ id: foundNote?._id });
      setIsOpen((prev) => ({ ...prev, archiveNote: false }));
      toast("Note restored successfully!");
      navigate("/");
    } catch (err: any) {
      toast(`Error message: ${err?.message || err?.data?.message}`);
    }
  };

  return {
    onDeleteNote,
    onArchiveNote,
    onRestoreNote,
    isOpen,
    setIsOpen,
    isLoadingDeleteNote,
    isLoadingArchiveNote,
    isLoadingRestoreNote,
  };
};

export default useNotes;
