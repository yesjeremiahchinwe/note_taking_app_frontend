import { Input } from "@/components/ui/input";
import { Button } from "../components/ui/button";
import { IconClock, IconStatus, IconTag } from "@/lib/icons";
import { useNavigate } from "react-router-dom";
import { Note } from "@/lib/types";
import useTitle from "@/hooks/useTitle";
import { FormEvent, useEffect, useState } from "react";
import useAuth from "@/hooks/useAuth";
import {
  useAddNewNoteMutation,
  useUpdateNoteMutation,
} from "@/store/notes/notesApiSlice";
import AlertModal from "./modals/alert-modal";

interface NoteFormProps {
  isNewNote?: boolean;
  note: Note;
}

const NoteForm = ({ isNewNote, note }: NoteFormProps) => {
  const [addNewNote, { isLoading, isSuccess }] = useAddNewNoteMutation();
  const [updateNote, { isLoading: isLoadingUpdate }] = useUpdateNoteMutation();
  const navigate = useNavigate();
  const { userId } = useAuth()

  if (!note) {
    return (
      <div className="flex items-center justify-center h-screen w-full">
        <p className="max-sm:w-[85%] max-lg:w-[70%] w-[60%] mx-auto">You currently do not have any note. Click the create New Note button to get started.</p>
      </div>
    )
  }

  const [isOpen, setIsOpen] = useState(false);
  const [noteTitle, setNoteTitle] = useState(note?.title || "");
  const [noteTags, setNoteTags] = useState(note?.tags?.join(", ") || "");
  const [noteContent, setNoteContent] = useState(note?.content || "");
  const [errMsg, setErrMsg] = useState("");

  useEffect(() => {
    if (isNewNote) {
      setNoteTitle("");
      setNoteTags("");
      setNoteContent("");
    }
  }, [location.pathname]);

  useEffect(() => {
    if (note && !isNewNote) {
      setNoteTitle(note?.title || "");
      setNoteTags(note?.tags?.join(", ") || "");
      setNoteContent(note?.content || "");
    }
  }, [note, location.pathname]);

  useTitle(isNewNote ? "Create Note" : note?.title ?? "Note Details");

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
          if (isSuccess) {
            setNoteTitle("");
            setNoteTags("");
            setNoteContent("");
            navigate("/");
          }
        } else {
          await updateNote({ ...values, id: note._id });
          navigate("/");
        }
      } else {
        setIsOpen(true);
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

  return (
    <>
      <form className="w-full lg:px-2" onSubmit={onSubmit}>
        {errMsg && <small className="text-red-500">{errMsg}</small>}
        <div>
          <label
            htmlFor="title"
            className="text-[#0E121B] font-medium text-sm tracking-[-0.2px] sr-only"
          >
            Title
          </label>
          <Input
            type="text"
            className={`h-[50px] text-[1.75rem] md:text-[1.7rem] font-bold placeholder:text-[#0E121B] text-[#0E121B] tracking-[-0.5px] ml-[-0.65rem] border-none shadow-none`}
            value={noteTitle}
            placeholder="Enter note title..."
            onChange={(e) => setNoteTitle(e.target.value)}
          />
        </div>

        <article className="w-full flex items-center gap-[3rem] pb-5 mb-2 border-b-[1px] border-[#E0E4EA] px-1 pt-3">
          <div className="flex flex-col gap-[1rem]">
            <div className="flex items-center gap-2">
              <IconTag color="#0E121B" />{" "}
              <span className="text-[#2B303B] font-normal text-sm tracking-[-0.2px]">
                Tags
              </span>
            </div>

            {location.pathname.includes("archived") && (
              <div className="flex items-center gap-2">
                <IconStatus color="#0E121B" />{" "}
                <span className="text-[#2B303B] font-normal text-sm pt-1 tracking-[-0.2px]">
                  Status
                </span>
              </div>
            )}

            <div className="flex items-center gap-2">
              <IconClock />{" "}
              <span className="text-[#2B303B] mt-[5px] font-normal text-sm tracking-[-0.2px]">
                Last edited
              </span>
            </div>
          </div>

          <div className="flex flex-col gap-[1.15rem] flex-1">
            <label
              htmlFor="tags"
              className="text-[#0E121B] font-medium text-sm tracking-[-0.2px] sr-only"
            >
              Tags
            </label>
            <Input
              type="text"
              className={`h-8 w-full block md:text-[1.75rem] px-2 -mt-[6px] -ml-2 font-normal text-[#0E121B] tracking-[-0.5px] placeholder:text-[#2B303B] md:text-base border-none shadow-none`}
              value={noteTags}
              placeholder="Add tags separated by commas (e.g. Work, Planning)"
              onChange={(e) => setNoteTags(e.target.value)}
            />

            {location.pathname.includes("archived") && (
              <p className="text-[#2B303B] -mt-[2px] font-normal text-sm tracking-[-0.2px]">
                Archived
              </p>
            )}

            <p className="text-[#2B303B] font-normal text-sm tracking-[-0.2px]">
              {isNewNote ? "Not yet saved" : note?.lastEdited.split("T")[0]}
            </p>
          </div>
        </article>

        <div className="py-4">
          <label
            htmlFor="title"
            className="text-[#0E121B] font-medium text-sm tracking-[-0.2px] sr-only"
          >
            Note Content
          </label>
          <Input
            type="text"
            className={`h-[50px] md:text-[1.75rem] font-bold text-[#0E121B] tracking-[-0.5px]`}
            value={noteContent}
            onChange={(e) => setNoteContent(e.target.value)}
          />
        </div>

        <div className="flex items-center gap-3 border-t-[1px] border-[#E0E4EA] py-4">
          <Button
            disabled={
              !noteTitle ||
              !noteTags ||
              !noteContent ||
              isLoading ||
              isLoadingUpdate
            }
            type="submit"
            className="bg-[#335CFF] hover:bg-[#3357e9] shadow-none border-none"
          >
            {isLoading || isLoadingUpdate ? "Saving..." : "Save Note"}
          </Button>
        </div>
      </form>

      <AlertModal
        title="Unauthorized"
        description="You must be logged in to save your note"
        isOpen={isOpen}
        onClose={() => {
          setIsOpen(false);
        }}
      />
    </>
  );
};

export default NoteForm;
