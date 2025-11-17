import { Button } from "../components/ui/button";
import { Note } from "@/lib/types";
import {
  useLocation,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
import { Link } from "react-router-dom";
import React, { FormEvent, useMemo, useState } from "react";
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

interface NotesProp {
  notes?: Note[];
  isLoading?: boolean;
}

const NoteDetailsPage = React.memo(({ notes, isLoading }: NotesProp) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const noteQueryParam = searchParams.get("note");
  const tagQueryParam = searchParams.get("tag");
  const userId = useSelector(selectCurrentId);
  const { title } = useParams();

  const foundNote: Note = useMemo(() => {
    return (
      title
        ? notes?.find(
            (note: Note) =>
              note.title.toLowerCase().split(" ").join("-") === title
          )
        : noteQueryParam
        ? notes?.find(
            (note: Note) =>
              note.title.toLowerCase().split(" ").join("-") === noteQueryParam
          )
        : tagQueryParam
        ? notes?.filter((note: Note) =>
            note.tags.includes(tagQueryParam as string)
          )[0]
        : tagQueryParam && location.pathname.includes("archived")
        ? notes?.filter((note: Note) =>
            note.tags.includes(tagQueryParam as string)
          )[0]
        : notes?.length && notes[0]
    ) as Note;
  }, [notes, title, noteQueryParam, tagQueryParam, location.pathname]);

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

  const [isOpenAlert, setIsOpenAlert] = useState(false);
  const [noteTitle, setNoteTitle] = useState(foundNote?.title || "");
  const [noteTags, setNoteTags] = useState(foundNote?.tags || "");
  const [noteContent, setNoteContent] = useState(foundNote?.content || "");

  const [addNewNote, { isLoading: isLoadingAddNote }] = useAddNewNoteMutation();

  const [updateNote, { isLoading: isLoadingUpdate }] = useUpdateNoteMutation();

  const goBackToPreviousPage = location.pathname.includes("archived")
    ? "/archived"
    : tagQueryParam !== null
    ? `/tags`
    : "/";

  const isArchivedPage = location.pathname.includes("/archived");

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const values = {
        title: noteTitle?.trim(),
        tags: noteTags?.trim(),
        content: noteContent?.trim(),
        userId,
      };

      if (!foundNote || location.pathname.includes("/new")) {
        const response = await addNewNote({ ...values });

        setNoteTitle("");
        setNoteTags("");
        setNoteContent("");
        toast(response?.data?.message || "Note created successfully!");
        navigate("/");
      } else {
        const response = await updateNote({ ...values, id: foundNote?._id });
        toast(response?.data?.message || "Note updated successfully!");
        navigate("/");
      }
    } catch (err: any) {
      toast(err?.error?.data?.message || "Something went wrong");
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
    <>
      {/* ------------ Note Details Header --------------- */}
      <div
        className={`${
          foundNote &&
          location.pathname === "/" &&
          tagQueryParam === null &&
          noteQueryParam === null
            ? "hidden lg:flex"
            : !foundNote && location.pathname === "/"
            ? "flex"
            : tagQueryParam && noteQueryParam
            ? "flex lg:hidden"
            : location.pathname === "/archived"
            ? "hidden lg:flex"
            : "flex"
        } lg:hidden items-center justify-between fixed top-0 bg-background w-full pt-4 mt-[60px]`}
      >
        <Link
          to={goBackToPreviousPage}
          className="flex items-center gap-1 pl-[14px] text-primaryText"
        >
          <ChevronLeftIcon color="currentColor" />
          <span className="text-lighterGray font-normal tracking-[-0.2px] text-sm">
            Go Back
          </span>
        </Link>

        <div className="flex items-center">
          <Button
            size="icon"
            className="bg-transparent dark:bg-transparent hover:bg-transparent text-primaryText dark:text-lighterGray shadow-none border-none mr-2"
            onClick={() =>
              setIsOpen((prev) => ({ ...prev, deleteNote: !prev.deleteNote }))
            }
          >
            <Trash2Icon size={24} color="currentColor" />
          </Button>

          {isArchivedPage ? (
            <Button
              size="icon"
              onClick={() => onRestoreNote()}
              disabled={isLoadingRestoreNote}
              className="bg-transparent dark:bg-transparent hover:bg-transparent"
            >
              <RefreshCcwIcon size={24} color="currentColor" />
            </Button>
          ) : (
            <Button
              size="icon"
              className="bg-transparent dark:bg-transparent hover:bg-transparent text-primaryText dark:text-lighterGray shadow-none border-none"
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
              className="bg-transparent dark:bg-transparent hover:bg-transparent shadow-none border-none text-skyBlue disabled:cursor-not-allowed dark:text-lighterGray"
            >
              {isLoadingAddNote || isLoadingUpdate ? "Saving..." : "Save Note"}
            </Button>
          </form>
        </div>
      </div>

      {/* -------------- Note Body ------------------ */}
      <section
        className={`mt-32 lg:mt-0 ${
          foundNote && location.pathname === "/" && noteQueryParam === null
            ? "hidden lg:block"
            : location.pathname === "/archived"
            ? "hidden lg:block"
            : !foundNote
            ? "block"
            : "block"
        } pt-2 mx-[18px] lg:px-0 lg:mx-0 lg:pt-0 border-t-[1px] border-darkerGray lg:border-t-0`}
      >
        <NoteForm
          isNewNote={location.pathname.includes("/new") || !foundNote}
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
          isOpenAlert={isOpenAlert}
          setIsOpenAlert={setIsOpenAlert}
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
    </>
  );
});

export default NoteDetailsPage;
