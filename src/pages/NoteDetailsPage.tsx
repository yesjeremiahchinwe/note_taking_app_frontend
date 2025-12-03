import { Button } from "../components/ui/button";
import { Note } from "@/lib/types";
import { useNavigate } from "react-router-dom";
import React, { FormEvent, useEffect, useState } from "react";
import DeleteModal from "@/components/modals/DeleteNoteModal";
import ArchiveNoteModal from "@/components/modals/ArchiveNoteModal";
import NoteForm from "@/components/forms/NoteForm";
import {
  ArchiveRestore,
  ChevronLeftIcon,
  RefreshCcwIcon,
  Trash2Icon,
} from "lucide-react";
import {
  useAddNewNoteMutation,
  useUpdateNoteMutation,
} from "@/store/notes/notesApiSlice";
import { toast } from "react-toastify";
import LoadiingState from "@/components/HomeLoader";
import { useSelector } from "react-redux";
import { selectCurrentId } from "@/store/auth/authSlice";
import useNotes from "@/hooks/useNotes";
import useUnsavedChanges from "@/hooks/useUnSavedChanges";
import UnsavedChangesModal from "@/components/modals/UnsavedChangesModal";
import useFoundNote from "@/hooks/useFoundNote";

interface NotesProp {
  notes?: Note[];
  isLoading?: boolean;
}

const NoteDetailsPage = React.memo(({ notes, isLoading }: NotesProp) => {
  const navigate = useNavigate();
  const userId = useSelector(selectCurrentId);

  const { foundNote, tagQueryParam, noteQueryParam, isArchivedPage, pathname } =
    useFoundNote(notes);

  const [noteTitle, setNoteTitle] = useState(foundNote?.title || "");
  const [noteTags, setNoteTags] = useState(foundNote?.tags || "");
  const [noteContent, setNoteContent] = useState(foundNote?.content || "");

  const {
    isNewChangesAvaliable,
    showModal,
    setShowModal,
    resetBaseline,
    discardChanges,
    safeNavigate,
    proceed,
  } = useUnsavedChanges({
    title: noteTitle,
    tags: noteTags,
    content: noteContent,
  });

  useEffect(() => {
    if (foundNote) {
      const base = {
        title: foundNote.title || "",
        tags: foundNote.tags || "",
        content: foundNote.content || "",
      };

      setNoteTitle(base.title);
      setNoteTags(base.tags);
      setNoteContent(base.content);

      resetBaseline(base);
    }

    if (pathname === "/new") {
      const empty = { title: "", tags: "", content: "" };

      setNoteTitle("");
      setNoteTags("");
      setNoteContent("");

      resetBaseline(empty);
    }
  }, [foundNote, pathname]);

  const {
    onArchiveNote,
    onDeleteNote,
    onRestoreNote,
    isLoadingArchiveNote,
    isLoadingDeleteNote,
    isLoadingRestoreNote,
    isOpen,
    setIsOpen,
  } = useNotes(foundNote);

  const [
    addNewNote,
    {
      isLoading: isLoadingAddNote,
      isSuccess: isSuccessAddNote,
      isError: isErrorAddNote,
      error: errorAddNote,
    },
  ] = useAddNewNoteMutation();

  const [
    updateNote,
    {
      isLoading: isLoadingUpdate,
      isSuccess: isSuccessUpdateNote,
      isError: isErrorUpdateNote,
      error: errorUpdateNote,
    },
  ] = useUpdateNoteMutation();

  useEffect(() => {
    if (isSuccessAddNote) {
      toast.success("Note created successfully!");
      setNoteTitle("");
      setNoteTags("");
      setNoteContent("");
      navigate("/");
    }
    if (isErrorAddNote) {
      //@ts-ignore
      if (errorAddNote?.status === "FETCH_ERROR") {
        toast.error("You are offline — cannot save note");
      } else {
        //@ts-ignore
        toast.error(errorAddNote?.data?.message || "Failed to save note");
      }
    }
  }, [isLoadingAddNote, isSuccessAddNote, isErrorAddNote, errorAddNote]);

  useEffect(() => {
    if (isSuccessUpdateNote) {
      toast.success("Note updated successfully!");
      navigate("/");
    }
    if (isErrorUpdateNote) {
      //@ts-ignore
      if (errorUpdateNote?.status === "FETCH_ERROR") {
        toast.error("You are offline — cannot save note");
      } else {
        toast.error("Failed to save note");
      }
    }
  }, [
    isLoadingUpdate,
    isSuccessUpdateNote,
    isErrorUpdateNote,
    errorUpdateNote,
  ]);

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const values = {
        title: noteTitle?.trim(),
        tags: noteTags?.trim(),
        content: noteContent?.trim(),
        userId,
      };

      if (!foundNote || pathname === "/new") {
        await addNewNote({ ...values });
      } else {
        await updateNote({ ...values, id: foundNote?._id });
      }
    } catch (err: any) {
      toast.error(err?.error?.data?.message || "Something went wrong");
    }
  };

  if (isLoading) {
    return (
      <LoadiingState
        message={noteTitle ? "Fetching note data" : "Please wait"}
      />
    );
  }

  return (
    <div className="overflow-y-auto max-h-[90vh] custom_scroll_bar">
      {/* ------------ Note Details Header --------------- */}
      <div
        className={`${
          foundNote &&
          pathname === "/" &&
          tagQueryParam === null &&
          noteQueryParam === null
            ? "hidden lg:flex"
            : !foundNote && pathname === "/"
            ? "flex"
            : tagQueryParam && noteQueryParam
            ? "flex lg:hidden"
            : tagQueryParam || pathname.includes("/tags")
            ? "hidden lg:flex"
            : pathname === "/archived"
            ? "hidden lg:flex"
            : "flex"
        } lg:hidden items-center justify-between fixed top-0 bg-background z-20 w-full pt-4 pb-3 mt-[60px]`}
      >
        <Button
          disabled={isLoadingAddNote || isLoadingUpdate}
          onClick={() => safeNavigate(-1)}
          className="bg-transparent dark:bg-transparent hover:bg-transparent shadow-none border-none text-skyBlue disabled:cursor-not-allowed dark:text-lighterGray"
        >
          <ChevronLeftIcon color="currentColor" />
          <span className="text-lighterGray font-normal tracking-[-0.2px] text-xs">
            Go Back
          </span>
        </Button>

        <div className="flex items-center">
          {pathname !== "/new" && foundNote && (
            <Button
              size="icon"
              className="bg-transparent dark:bg-transparent px-0 hover:bg-transparent text-primaryText dark:text-lighterGray shadow-none border-none"
              onClick={() =>
                setIsOpen((prev) => ({ ...prev, deleteNote: !prev.deleteNote }))
              }
            >
              <Trash2Icon size={24} color="currentColor" />
            </Button>
          )}

          {isArchivedPage ? (
            <Button
              size="icon"
              onClick={() => onRestoreNote()}
              disabled={isLoadingRestoreNote}
              className="bg-transparent px-0 dark:bg-transparent hover:bg-transparent text-lighterGray"
            >
              <RefreshCcwIcon size={24} color="currentColor" />
            </Button>
          ) : (
            <>
              {pathname !== "/new" && foundNote && (
                <Button
                  size="icon"
                  className="bg-transparent mr-1 px-0 dark:bg-transparent hover:bg-transparent text-primaryText dark:text-lighterGray shadow-none border-none"
                  onClick={() =>
                    setIsOpen((prev) => ({
                      ...prev,
                      archiveNote: !prev.archiveNote,
                    }))
                  }
                >
                  <ArchiveRestore size={20} color="currentColor" />
                </Button>
              )}
            </>
          )}

          <Button
            disabled={!isNewChangesAvaliable}
            onClick={() => {
              const original = discardChanges();
              setNoteTitle(original.title);
              setNoteTags(original.tags);
              setNoteContent(original.content);
            }}
            className="bg-transparent px-0 dark:bg-transparent hover:bg-transparent shadow-none border-none text-skyBlue disabled:pointer-events-auto disabled:cursor-not-allowed dark:text-lighterGray"
          >
            Cancel
          </Button>

          <form onSubmit={onSubmit}>
            <Button
              disabled={
                !noteTitle ||
                !noteTags ||
                isLoadingAddNote ||
                isArchivedPage ||
                isLoadingUpdate
              }
              type="submit"
              className="bg-transparent dark:bg-transparent hover:bg-transparent shadow-none border-none text-skyBlue disabled:pointer-events-auto disabled:cursor-not-allowed dark:text-lighterGray"
            >
              {isLoadingAddNote || isLoadingUpdate ? "Saving..." : "Save Note"}
            </Button>
          </form>
        </div>
      </div>

      {/* -------------- Note Body ------------------ */}
      <section
        className={`mt-32 lg:mt-0 ${
          foundNote && pathname === "/" && noteQueryParam === null
            ? "hidden lg:block"
            : pathname === "/archived"
            ? "hidden lg:block"
            : !foundNote
            ? "block"
            : "block"
        } pt-2 mx-[18px] lg:px-0 lg:mx-0 lg:pt-0 border-t-[1px] border-darkerGray lg:border-t-0`}
      >
        <NoteForm
          isNewNote={pathname === "/new" || !foundNote}
          note={foundNote}
          noteTitle={noteTitle}
          setNoteTitle={setNoteTitle}
          noteTags={noteTags}
          setNoteTags={setNoteTags}
          noteContent={noteContent}
          setNoteContent={setNoteContent}
          onSubmit={onSubmit}
          isLoadingAddNote={isLoadingAddNote}
          isLoadingUpdate={isLoadingUpdate}
          onCancelChanges={() => {
            const original = discardChanges();
            setNoteTitle(original.title);
            setNoteTags(original.tags);
            setNoteContent(original.content);
          }}
          isNewChangesAvaliable={isNewChangesAvaliable}
        />
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

      <UnsavedChangesModal
        isOpen={showModal}
        isSaving={isLoadingAddNote || isLoadingUpdate}
        onClose={() => setShowModal(false)}
        onDiscard={() => {
          const original = discardChanges();
          setNoteTitle(original.title);
          setNoteTags(original.tags);
          setNoteContent(original.content);
          proceed();
          setShowModal(false);
        }}
        onProceed={() => {
          onSubmit({ preventDefault: () => {} } as any);
          proceed();
          setShowModal(false);
        }}
      />
    </div>
  );
});

export default NoteDetailsPage;
