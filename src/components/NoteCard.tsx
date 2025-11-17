import { Note } from "@/lib/types";
import React from "react";
import { Link, useParams } from "react-router-dom";

interface NoteProps {
  note: Note;
  index: number;
  isLastNote: boolean;
  noteQueryParam: string | null;
  tagQueryParam: string | null;
}
const NoteCard = React.memo(
  ({ note, index, isLastNote, noteQueryParam, tagQueryParam }: NoteProps) => {

    const formatedNoteTitle = note.title.toLowerCase().split(" ").join("-");
    
    const { title } = useParams();

    return (
      <article
        key={note.title}
        className={`bg-transparent mb-2 rounded-md p-3 ${
          isLastNote ? "border-b-0" : "border-b-[1px] border-darkerGray"
        } ${
          location.pathname === formatedNoteTitle
            ? "lg:bg-lightGray lg:border-b-0"
            : formatedNoteTitle === noteQueryParam && index > 0
            ? "lg:bg-lightGray lg:border-b-0"
            : note.title.toLowerCase().split(" ").join("-") ===
              (title as string)
            ? "lg:bg-lightGray lg:border-b-0"
            : location.pathname === "/" && index === 0 && !tagQueryParam
            ? "lg:bg-lightGray lg:border-b-0"
            : location.pathname === "/" &&
              index === 0 &&
              noteQueryParam === note.title.toLowerCase().split(" ").join("-")
            ? "lg:bg-lightGray lg:border-b-0"
            : location.pathname === "/tags" && index === 0
            ? "lg:bg-lightGray lg:border-b-0"
            : "bg-transparent lg:border-b-[1px] border-darkerGray"
        }`}
      >
        <h2 className="text-xl font-semibold tracking-[-0.3px] text-primaryText">
          {tagQueryParam ? (
            <Link to={`/?tag=${tagQueryParam}&note=${formatedNoteTitle}`}>
              {note.title}
            </Link>
          ) : (
            <Link to={`/${formatedNoteTitle}`}>{note.title}</Link>
          )}
        </h2>

        <div className="flex flex-wrap items-center gap-[8px] mt-3">
          {note?.tags?.split(",").map((tag) => (
            <p
              key={tag}
              className="py-[2px] px-[6px] text-sm rounded-md bg-tagsBg"
            >
              {tag}
            </p>
          ))}
        </div>

        <small className="text-lightText block mt-4 font-medium text-xs tracking-[-0.2px]">
          {note?.updatedAt?.split("T")[0]}
        </small>
      </article>
    );
  }
);

export default NoteCard;
