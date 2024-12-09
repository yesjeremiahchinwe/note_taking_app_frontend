import { Input } from "@/components/ui/input";
import { Button } from "../components/ui/button";
import { IconClock, IconStatus, IconTag } from "@/lib/icons";
import { Note } from "@/lib/types";
import useTitle from "@/hooks/useTitle";
import { FormEvent, useEffect, useRef, useState } from "react";
import Editor from "react-simple-wysiwyg";
import AlertModal from "./modals/alert-modal";
import { Theme } from "@/providers/theme-provider";

interface NoteFormProps {
  isNewNote?: boolean;
  note: Note;
  noteTitle: string;
  setNoteTitle: (noteTitle: string) => void;
  noteTags: string;
  setNoteTags: (noteTags: string) => void;
  noteContent: string;
  setNoteContent: (noteContent: string) => void;
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
  errMsg: string;
  isLoadingAddNote: boolean,
  isLoadingUpdate: boolean,
  isOpenAlert: boolean,
  setIsOpenAlert: (isOpenAlert: boolean) => void
}

const NoteForm = ({
  isNewNote,
  note,
  noteTitle,
  setNoteTitle,
  noteTags,
  setNoteTags,
  noteContent,
  setNoteContent,
  onSubmit,
  errMsg,
  isLoadingAddNote,
  isLoadingUpdate,
  isOpenAlert,
  setIsOpenAlert
}: NoteFormProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [theme] = useState<Theme>(
    () => (localStorage.getItem("notes-theme") as Theme) || "system"
  );

  useEffect(() => {
    if (isNewNote) {
      setNoteTitle("");
      setNoteTags("");
      setNoteContent("");
    }
  }, [location.pathname]);

  useEffect(() => {
    if (isNewNote) {
      inputRef?.current?.focus();
    }
  }, [isNewNote]);

  useEffect(() => {
    if (note && !isNewNote) {
      setNoteTitle(note?.title || "");
      setNoteTags(note?.tags || "");
      setNoteContent(note?.content || "");
    }
  }, [note, location.pathname]);

  useTitle(isNewNote ? "Create Note" : note?.title ?? "Note Details");

  if (!note) return null;

  return (
    <>
      <form className="w-full flex flex-col lg:px-2" onSubmit={onSubmit}>
        {errMsg && <small className="text-lightRed">{errMsg}</small>}
        <div>
          <label
            htmlFor="title"
            className="text-primaryText font-medium text-sm tracking-[-0.2px] sr-only"
          >
            Title
          </label>
          <Input
            type="text"
            ref={isNewNote ? inputRef : null}
            className={`h-[50px] text-[1.75rem] md:text-[1.7rem] font-bold placeholder:text-primaryText tracking-[-0.5px] ml-[-0.65rem] border-none shadow-none`}
            value={noteTitle}
            placeholder="Enter note title..."
            onChange={(e) => setNoteTitle(e.target.value)}
            disabled={location.pathname.includes("archived")}
          />
        </div>

        <article className="w-full flex items-center gap-[3rem] pb-5 mb-2 border-b-[1px] border-darkerGray px-1 pt-3">
          <div className="flex flex-col gap-[1rem]">
            <div className="flex items-center gap-2">
              <IconTag
                color={
                  theme === "system" || theme === "dark" ? "#FFF" : "#2B303B"
                }
              />{" "}
              <span className="text-lightText font-normal text-sm tracking-[-0.2px]">
                Tags
              </span>
            </div>

            {location.pathname.includes("archived") && (
              <div className="flex items-center gap-2">
                <IconStatus
                  color={
                    theme === "system" || theme === "dark" ? "#FFF" : "#2B303B"
                  }
                />{" "}
                <span className="text-lightText font-normal text-sm pt-1 tracking-[-0.2px]">
                  Status
                </span>
              </div>
            )}

            <div className="flex items-center gap-2">
              <IconClock
                color={
                  theme === "system" || theme === "dark" ? "#FFF" : "#2B303B"
                }
              />{" "}
              <span className="text-lightText mt-[5px] font-normal text-sm tracking-[-0.2px]">
                Last edited
              </span>
            </div>
          </div>

          <div className="flex flex-col gap-[1.15rem] flex-1">
            <label
              htmlFor="tags"
              className="text-primaryText font-medium text-sm tracking-[-0.2px] sr-only"
            >
              Tags
            </label>
            <Input
              type="text"
              className={`h-8 w-full block md:text-[1.75rem] px-2 -mt-[6px] -ml-2 font-normal tracking-[-0.5px] placeholder:text-lightText md:text-base border-none shadow-none`}
              value={noteTags}
              placeholder="Add tags separated by commas (e.g. Work, Planning)"
              onChange={(e) => setNoteTags(e.target.value)}
              disabled={location.pathname.includes("archived")}
            />

            {location.pathname.includes("archived") && (
              <p className="text-lightText -mt-[2px] font-normal text-sm tracking-[-0.2px]">
                Archived
              </p>
            )}

            <p className="text-lightText font-normal text-sm tracking-[-0.2px] pt-1">
              {isNewNote ? "Not yet saved" : note?.updatedAt?.split("T")[0]}
            </p>
          </div>
        </article>

        <div className="flex flex-col justify-between h-full flex-grow">
          <div className="py-4 flex-1">
            <label
              htmlFor="title"
              className="text-primaryText font-medium text-sm tracking-[-0.2px] sr-only"
            >
              Note Content
            </label>

            <Editor
              className="h-full text-primaryText tracking-[-0.5px] border-none"
              value={noteContent}
              onChange={(e) => setNoteContent(e.target.value)}
              disabled={location.pathname.includes("archived")}
            />
          </div>

          {!location.pathname.includes("archived") && (
            <div className="flex items-center gap-3 border-t-[1px] border-darkerGray py-4">
              <Button
                disabled={
                  !noteTitle ||
                  !noteTags ||
                  !noteContent ||
                  isLoadingAddNote ||
                  isLoadingUpdate
                }
                type="submit"
                className="bg-skyBlue text-white hover:bg-[#3357e9] shadow-none border-none"
              >
                {isLoadingAddNote || isLoadingUpdate ? "Saving..." : "Save Note"}
              </Button>
            </div>
          )}
        </div>
      </form>

      <AlertModal
        title="Unauthorized"
        description="You must be logged in to save your note"
        isOpen={isOpenAlert}
        onClose={() => {
          setIsOpenAlert(false);
        }}
      />
    </>
  );
};

export default NoteForm;
