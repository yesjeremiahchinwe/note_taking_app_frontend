import { Button } from "../components/ui/button";
import { Note } from "@/lib/types";
import { useLocation, useSearchParams } from "react-router-dom";
import deleteIcon from "/images/icon-delete.svg";
import archivedIcon from "/images/icon-archive.svg";
import { Link } from "react-router-dom";
import { useState } from "react";
import DeleteModal from "@/components/modals/DeleteNoteModal";
import ArchiveNoteModal from "@/components/modals/ArchiveNoteModal";
import NoteForm from "@/components/NoteForm";
import { ChevronLeftIcon } from "lucide-react";

const NoteDetails = ({ notes }: { notes: Note[] }) => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState({
    archiveNote: false,
    deleteNote: false,
  });

  const [searchParams, setSearchParams] = useSearchParams();
  const noteQueryParam = searchParams.get("note");
  const tagQueryParam = searchParams.get("tag");

  const goBackToPreviousPage = location.pathname.includes("archived")
    ? "/archived"
    : tagQueryParam !== null ? `/tags` : "/";


  return (
    <>
      {/* ------------ Note Details Header --------------- */}
      <div className="flex lg:hidden items-center justify-between w-full py-3">
        <Link
          to={goBackToPreviousPage}
          className="flex items-center gap-1 pl-[14px] text-black"
        >
          <ChevronLeftIcon color="#525866" />
          <span className="text-[#525866] font-normal tracking-[-0.2px] text-sm">
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

          <Button className="bg-transparent mr-[-0.4rem] hover:bg-transparent shadow-none border-none text-black">
            Cancel
          </Button>

          <Button className="bg-transparent hover:bg-transparent shadow-none border-none text-[#335CFF]">
            Save Note
          </Button>
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
        } pt-4 mx-[20px] lg:px-0 lg:mx-0 lg:pt-0 border-t-[1px] border-[#E0E4EA] lg:border-t-0`}
      >
        <NoteForm isNewNote={location.pathname === "/new"} notes={notes} />
      </section>

      <DeleteModal
        isOpen={isOpen.deleteNote}
        onClose={() => setIsOpen((prev) => ({ ...prev, deleteNote: false }))}
        onConfirm={() => setIsOpen((prev) => ({ ...prev, deleteNote: false }))}
        loading={false}
      />

      <ArchiveNoteModal
        isOpen={isOpen.archiveNote}
        onClose={() => setIsOpen((prev) => ({ ...prev, archiveNote: false }))}
        onConfirm={() => setIsOpen((prev) => ({ ...prev, archiveNote: false }))}
        loading={false}
      />
    </>
  );
};

export default NoteDetails;
