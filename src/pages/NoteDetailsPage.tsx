import { Button } from "../components/ui/button";
import { Note } from "@/lib/types";
import {
  useLocation,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
import deleteIcon from "/images/icon-delete.svg";
import archivedIcon from "/images/icon-archive.svg";
import { Link } from "react-router-dom";
import { FormEvent, useState } from "react";
import DeleteModal from "@/components/modals/DeleteNoteModal";
import ArchiveNoteModal from "@/components/modals/ArchiveNoteModal";
import NoteForm from "@/components/NoteForm";
import { ChevronLeftIcon } from "lucide-react";
import {
  useDeleteNoteMutation,
  useMarkNoteAsArchivedMutation,
  useAddNewNoteMutation,
  useUpdateNoteMutation,
} from "@/store/notes/notesApiSlice";
import useAuth from "@/hooks/useAuth";
import { toast } from "@/hooks/use-toast";
import { Theme } from "@/providers/theme-provider";
import LoadiingState from "@/components/HomeLoader";

interface NotesProp {
  notes?: Note[];
  isLoading?: boolean;
}

const NoteDetails = ({ notes, isLoading }: NotesProp) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const noteQueryParam = searchParams.get("note");
  const tagQueryParam = searchParams.get("tag");
  const { title } = useParams();

  if (!notes?.length) return null;

  const note: Note = title
    ? (notes?.find(
        (note: Note) => note.title.toLowerCase().split(" ").join("-") === title
      ) as Note)
    : noteQueryParam
    ? (notes?.find(
        (note: Note) =>
          note.title.toLowerCase().split(" ").join("-") === noteQueryParam
      ) as Note)
    : tagQueryParam
    ? notes?.filter((note: Note) =>
        note.tags.includes(tagQueryParam as string)
      )[0]
    : tagQueryParam && location.pathname.includes("archived")
    ? notes?.filter((note: Note) =>
        note.tags.includes(tagQueryParam as string)
      )[0]
    : notes[0];

  const [isOpen, setIsOpen] = useState({
    archiveNote: false,
    deleteNote: false,
  });
  const [isOpenAlert, setIsOpenAlert] = useState(false)

  const [errMsg, setErrMsg] = useState("");
  const [noteTitle, setNoteTitle] = useState(note?.title || "");
  const [noteTags, setNoteTags] = useState(note?.tags || "");
  const [noteContent, setNoteContent] = useState(note?.content || "");
  const [theme] = useState<Theme>(
    () => (localStorage.getItem("notes-theme") as Theme) || "system"
  );

  const [deleteNote, { isLoading: isLoadingDeleteNote }] =
    useDeleteNoteMutation();
  const [markNoteAsArchived, { isLoading: isLoadingMarkedNote }] =
    useMarkNoteAsArchivedMutation();
  const [addNewNote, { isLoading: isLoadingAddNote, isSuccess }] =
    useAddNewNoteMutation();
  const [updateNote, { isLoading: isLoadingUpdate }] = useUpdateNoteMutation();
  const { userId } = useAuth();

  const goBackToPreviousPage = location.pathname.includes("archived")
    ? "/archived"
    : tagQueryParam !== null
    ? `/tags`
    : "/";

  const onDeleteNote = async () => {
    try {
      await deleteNote({ id: note._id });
      setIsOpen((prev) => ({ ...prev, deleteNote: false }));
      toast({
        title: "Note deleted successfully!",
      });
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
      toast({
        title: "Note archived successfully!",
      });
      navigate("/");
    } catch (err: any) {
      toast({
        title: "Oops! Couldn't archive note",
        description: `Error message: ${err?.message || err?.data?.message}`,
      });
    }
  };

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const values = {
        title: noteTitle,
        tags: noteTags,
        content: noteContent,
      };

      if (userId) {
        if (location.pathname === "/new") {
          await addNewNote({ ...values });
          toast({
            title: "Note created successfully!",
          });
          navigate("/");

          if (isSuccess) {
            setNoteTitle("");
            setNoteTags("");
            setNoteContent("");
          }
        } else {
          await updateNote({ ...values, id: note._id });
          toast({
            title: "Note updated successfully!",
          });
          navigate("/");
        }
      } else {
        setIsOpenAlert(true);
      }
    } catch (err: any) {
      if (!err.status) {
        setErrMsg("No Server Response");
      } else if (err.status === 400) {
        setErrMsg("Invalid Credentials");
      } else if (err.status === 401) {
        setErrMsg("Unauthorized");
      } else if (err.status === 409) {
        setErrMsg("Conflict");
      } else {
        setErrMsg(err.data?.message);
      }
    }
  };

  if (isLoading) {
    return <LoadiingState message={noteTitle ? "Fetching note data" : "Please wait"} />
  }

  return (
    <>
      {/* ------------ Note Details Header --------------- */}
      <div className="flex lg:hidden items-center justify-between w-full py-3">
        <Link
          to={goBackToPreviousPage}
          className="flex items-center gap-1 pl-[14px] text-primaryText"
        >
          <ChevronLeftIcon
            color={
              theme === "system" || theme === "dark" ? "#525866" : "#CACFD8"
            }
          />
          <span className="text-lighterGray font-normal tracking-[-0.2px] text-sm">
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

          <form onSubmit={onSubmit}>
            <Button
              type="submit"
              className="bg-transparent hover:bg-transparent shadow-none border-none text-skyBlue"
            >
              Save Note
            </Button>
          </form>
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
        } pt-4 mx-[20px] lg:px-0 lg:mx-0 lg:pt-0 border-t-[1px] border-darkerGray lg:border-t-0`}
      >
        <NoteForm isNewNote={location.pathname === "/new"} note={note} noteTitle={noteTitle} setNoteTitle={setNoteTitle} noteTags={noteTags} setNoteTags={setNoteTags} noteContent={noteContent} setNoteContent={setNoteContent} onSubmit={onSubmit} errMsg={errMsg} isLoadingAddNote={isLoadingAddNote} isLoadingUpdate={isLoadingUpdate} isOpenAlert={isOpenAlert} setIsOpenAlert={setIsOpenAlert} />
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
