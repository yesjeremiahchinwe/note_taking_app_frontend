import { Input } from "@/components/ui/input";
import { Button } from "../components/ui/button";
import { IconClock, IconStatus, IconTag } from "@/lib/icons";
import { Note } from "@/lib/types";
import useTitle from "@/hooks/useTitle";
import React, { FormEvent, useEffect, useRef, useState } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { Font } from "@/providers/font-provider";
import AlertModal from "./modals/alert-modal";

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
  isLoadingAddNote: boolean;
  isLoadingUpdate: boolean;
  isOpenAlert: boolean;
  setIsOpenAlert: (isOpenAlert: boolean) => void;
}

const NoteForm = React.memo(
  ({
    isNewNote,
    note,
    noteTitle,
    setNoteTitle,
    noteTags,
    setNoteTags,
    noteContent,
    setNoteContent,
    onSubmit,
    isLoadingAddNote,
    isLoadingUpdate,
    isOpenAlert,
    setIsOpenAlert,
  }: NoteFormProps) => {
    const inputRef = useRef<HTMLInputElement>(null);
    const [font] = useState<Font>(
      () => (localStorage.getItem("notes-font") as Font) || "sans-serif"
    );

    useEffect(() => {
      if (isNewNote) {
        setNoteTitle("");
        setNoteTags("");
        setNoteContent("");
      }
    }, [location.pathname]);

    useEffect(() => {
      if (isNewNote || !note) {
        inputRef?.current?.focus();
      }
    }, [isNewNote, note]);

    useEffect(() => {
      if (note && !isNewNote) {
        setNoteTitle(note?.title || "");
        setNoteTags(note?.tags || "");
        setNoteContent(note?.content || "");
      }
    }, [note, location.pathname]);

    useTitle(isNewNote ? "Create Note" : note?.title ?? "Note Details");

    return (
      <>
        <form className="w-full flex flex-col lg:px-2" onSubmit={onSubmit}>
          <div>
            <label
              htmlFor="title"
              className="text-primaryText font-medium text-sm tracking-[-0.2px] sr-only"
            >
              Title
            </label>
            <Input
              type="text"
              ref={isNewNote && !note ? inputRef : null}
              className={`h-[50px] flex flex-wrap text-xl md:text-[1.7rem] font-bold placeholder:text-primaryText tracking-[-0.5px] ml-[-0.65rem] border-none shadow-none`}
              value={noteTitle}
              placeholder="Enter note title..."
              onChange={(e) => setNoteTitle(e.target.value)}
              disabled={location.pathname.includes("archived")}
            />
          </div>

          <article className="w-full flex items-center gap-[3rem] mb-2 px-1 pt-3">
            <div className="flex flex-col gap-[1rem]">
              <div className="flex items-center gap-2 h-8">
                <IconTag color="currentColor" />{" "}
                <span className="text-lightText font-normal text-sm tracking-[-0.2px]">
                  Tags
                </span>
              </div>

              {location.pathname.includes("archived") && (
                <div className="flex items-center gap-2 h-8">
                  <IconStatus color="currentColor" />{" "}
                  <span className="text-lightText font-normal text-sm pt-1 tracking-[-0.2px]">
                    Status
                  </span>
                </div>
              )}

              <div className="flex items-center gap-2 h-8">
                <IconClock color="currentColor" />{" "}
                <span className="text-lightText font-normal text-sm tracking-[-0.2px]">
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
                className={`h-8 w-full flex flex-wrap md:text-[1.75rem] px-2 -ml-2 font-normal tracking-[-0.5px] placeholder:text-lightText placeholder:text-sm md:text-base border-none shadow-none`}
                value={noteTags}
                placeholder="Add tags separated by commas (e.g. Work,Planning)"
                onChange={(e) => setNoteTags(e.target.value)}
                disabled={location.pathname.includes("archived")}
              />

              {location.pathname.includes("archived") && (
                <p className="text-lightText font-normal text-sm tracking-[-0.2px] h-8 pt-2">
                  Archived
                </p>
              )}

              <p className="text-lightText font-normal text-sm tracking-[-0.2px] pt-1 h-8">
                {isNewNote ? "Not yet saved" : note?.updatedAt?.split("T")[0]}
              </p>
            </div>
          </article>

          <div className="flex flex-col justify-between h-full flex-grow pb-[3rem] mb-[3rem] lg:max-h-[60vh] overflow-y-auto custom_scroll_bar">
            <div className="py-4 flex-1">
              <label
                htmlFor="title"
                className="text-primaryText font-medium text-sm tracking-[-0.2px] sr-only"
              >
                Note Content
              </label>

              <Editor
                apiKey={
                  import.meta.env.VITE_REACT_APP_TINYMCE_TEXT_EDITOR_API_KEY
                }
                onInit={(_evt, editor) => {
                  setNoteContent(editor.getContent());
                }}
                value={noteContent}
                onEditorChange={(newValue) => {
                  setNoteContent(newValue);
                }}
                init={{
                  height: 280,
                  menubar: false,
                  plugins: [
                    "advlist",
                    "autolink",
                    "lists",
                    "link",
                    "image",
                    "charmap",
                    "preview",
                    "anchor",
                    "searchreplace",
                    "visualblocks",
                    "code",
                    "fullscreen",
                    "insertdatetime",
                    "media",
                    "table",
                    "code",
                    "help",
                    "wordcount",
                  ],
                  toolbar:
                    "undo redo | blocks | " +
                    "bold italic forecolor | alignleft aligncenter " +
                    "alignright alignjustify | bullist numlist outdent indent | " +
                    "removeformat | help",
                  content_style: `body { font-family:${font}; font-size:14px; }`,
                }}
              />
            </div>

            {!location.pathname.includes("archived") && (
              <div className="hidden lg:flex items-center gap-3 py-4">
                <Button
                  disabled={
                    !noteTitle ||
                    !noteTags ||
                    isLoadingAddNote ||
                    isLoadingUpdate
                  }
                  type="submit"
                  className="bg-skyBlue text-white hover:bg-[#3357e9] shadow-none border-none"
                >
                  {isLoadingAddNote || isLoadingUpdate
                    ? "Saving..."
                    : "Save Note"}
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
  }, (prevProps, nextProps) => (
    prevProps.note.title === nextProps.note.title &&
    prevProps.noteTitle === nextProps.noteTitle &&
    prevProps.noteTags === nextProps.noteTags &&
    prevProps.noteContent === nextProps.noteContent &&
    prevProps.isLoadingAddNote === nextProps.isLoadingAddNote &&
    prevProps.isLoadingUpdate === nextProps.isLoadingUpdate &&
    prevProps.isOpenAlert === nextProps.isOpenAlert
  )
);

export default NoteForm;
