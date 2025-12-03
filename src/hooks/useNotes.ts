import {
  useDeleteNoteMutation,
  useMarkNoteAsArchivedMutation,
  useRestoreArchivedNoteMutation,
} from "@/store/notes/notesApiSlice";
import { toast } from "react-toastify";
import { useLocation, useNavigate } from "react-router-dom";
import { Note } from "@/lib/types";
import { useEffect, useState } from "react";

const useNotes = (foundNote: Note | undefined) => {
  const location = useLocation();
  const navigate = useNavigate();

  const [isOpen, setIsOpen] = useState({
    archiveNote: false,
    deleteNote: false,
  });

  const [
    deleteNote,
    {
      isLoading: isLoadingDeleteNote,
      isSuccess: isSuccessDeleteNote,
      isError: isErrorDeleteNote,
      error: errorDeleteNote,
    },
  ] = useDeleteNoteMutation();

  const [
    markNoteAsArchived,
    {
      isLoading: isLoadingArchiveNote,
      isSuccess: isSuccessArchiveNote,
      isError: isErrorArchiveNote,
      error: errorArchiveNote,
    },
  ] = useMarkNoteAsArchivedMutation();

  const [
    restoreArchivedNote,
    {
      isLoading: isLoadingRestoreNote,
      isSuccess: isSuccessRestoreNote,
      isError: isErrorRestoreNote,
      error: errorRestoreNote,
    },
  ] = useRestoreArchivedNoteMutation();

  const onDeleteNote = async () => {
    try {
      await deleteNote({ id: foundNote?._id });
    } catch (err: any) {
      toast.error(`Error message: ${err?.message || err?.data?.message}`);
    }
  };

  const onArchiveNote = async () => {
    try {
      await markNoteAsArchived({ id: foundNote?._id });
    } catch (err: any) {
      toast.error(`Error message: ${err?.message || err?.data?.message}`);
    }
  };

  const onRestoreNote = async () => {
    try {
      await restoreArchivedNote({ id: foundNote?._id });
    } catch (err: any) {
      toast.error(`Error message: ${err?.message || err?.data?.message}`);
    }
  };

  useEffect(() => {
    if (isSuccessArchiveNote) {
      setIsOpen((prev) => ({ ...prev, archiveNote: false }));
      toast.success("Note archived successfully!");
      navigate("/");
    }

    if (isErrorArchiveNote) {
      //@ts-ignore
      if (
        //@ts-ignore
        errorArchiveNote?.status === "FETCH_ERROR"
      ) {
        toast.error("You are offline — cannot perform this action");
        //@ts-ignore
      } else {
        toast.error("Failed to perform this action");
      }
    }
  }, [
    isLoadingArchiveNote,
    isSuccessArchiveNote,
    isErrorArchiveNote,
    errorArchiveNote,
  ]);

  useEffect(() => {
    if (isSuccessDeleteNote) {
      setIsOpen((prev) => ({ ...prev, deleteNote: false }));
      toast.success("Note deleted successfully!");
      if (location.pathname.includes("/archived")) {
        navigate("/archived");
      } else {
        navigate("/");
      }
    }

    if (isErrorDeleteNote) {
      //@ts-ignore
      if (errorDeleteNote?.status === "FETCH_ERROR") {
        toast.error("You are offline — cannot perform this action");
      } else {
        toast.error("Failed to perform this action");
      }
    }
  }, [
    isLoadingDeleteNote,
    isSuccessDeleteNote,
    isErrorDeleteNote,
    errorDeleteNote,
  ]);

  useEffect(() => {
    if (isSuccessRestoreNote) {
      toast.success("Note restored successfully!");
      navigate("/");
    }

    if (isErrorRestoreNote) {
      //@ts-ignore
      if (errorRestoreNote?.status === "FETCH_ERROR") {
        toast.error("You are offline — cannot perform this action");
      } else {
        toast.error("Failed to perform this action");
      }
    }
  }, [
    isLoadingRestoreNote,
    isSuccessRestoreNote,
    isErrorRestoreNote,
    errorRestoreNote
  ]);

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
