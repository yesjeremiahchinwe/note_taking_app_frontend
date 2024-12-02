import { Input } from "@/components/ui/input";
import { Button } from "../components/ui/button";
import { IconClock, IconStatus, IconTag } from "@/lib/icons";
import { z } from "zod";
import { useParams, useSearchParams } from "react-router-dom";
import { Note } from "@/lib/types";
import useTitle from "@/hooks/useTitle";
import { useEffect, useState } from "react";

interface NoteFormProps {
  isNewNote?: boolean;
  notes: Note[];
}

const formSchema = z.object({
  title: z
    .string()
    .trim()
    .min(2, { message: "Note title must be at least 2 characters long" }),
  tags: z
    .string()
    .trim()
    .min(2, { message: "A tag must be at least 2 characters long" }),
  content: z
    .string()
    .trim()
    .min(2, { message: "Content must be at least 2 characters long" }),
});

const NoteForm = ({ isNewNote, notes }: NoteFormProps) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { title } = useParams();
  const noteQueryParam = searchParams.get("note");
  const tagQueryParam = searchParams.get("tag");

  const note = title
    ? (notes.find(
        (note) => note.title.toLowerCase().split(" ").join("-") === title
      ) as Note)
    : noteQueryParam
    ? (notes.find(
        (note) =>
          note.title.toLowerCase().split(" ").join("-") === noteQueryParam
      ) as Note)
    : tagQueryParam
    ? notes.filter((note) => note.tags.includes(tagQueryParam as string))[0]
    : tagQueryParam && location.pathname.includes("archived")
    ? notes.filter((note) => note.tags.includes(tagQueryParam as string))[0]
    : notes[0];

  const [noteTitle, setNoteTitle] = useState(note?.title || "");
  const [noteTags, setNoteTags] = useState(note?.tags?.join(", ") || "");
  const [noteContent, setNoteContent] = useState(note?.content || "");

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

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  // fieldState.error ? "border-[#FB3748]" : "border-[#CACFD8]"

  return (
    <form className="w-full lg:px-2">
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
        <Button className="bg-[#335CFF] hover:bg-[#3357e9] shadow-none border-none">
          Save Note
        </Button>
        <Button className="bg-[#F3F5F8] hover:bg-[#e0e1e4] text-[#2B303B] shadow-none border-none">
          Cancel
        </Button>
      </div>
    </form>
  );
};

export default NoteForm;
