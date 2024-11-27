import { IconClock, IconStatus, IconTag } from "@/lib/icons";
import { Note } from "@/lib/types";
import { useLocation, useParams } from "react-router-dom";
import { Button } from "../components/ui/button";
import deleteIcon from "/images/icon-delete.svg";
import archivedIcon from "/images/icon-archive.svg";
import chevronLeftIcon from "/images/icon-arrow-left.svg";
import { Link } from "react-router-dom";

const NoteDetails = ({ notes }: { notes: Note[] }) => {
  const { title } = useParams();
  const location = useLocation();

  const note = title ? notes.find(
      (note) => note.title.toLowerCase().split(" ").join("-") === title
    ) as Note : notes[0]

  const goBackToPreviousPage = location.pathname.includes("archived") ? "/archived" : "/"
    
  return (
    <>
      {/* ------------ Note Details Header --------------- */}
      <div className="flex lg:hidden items-center justify-between w-full py-2">
        <Link to={goBackToPreviousPage} className="flex items-center gap-1 pl-[14px] text-black">
          <img
            src={chevronLeftIcon}
            alt="Chevron Left Icon"
          />
          <span className="text-[#525866] font-normal tracking-[-0.2px] text-sm">Go Back</span>
        </Link>

        <div className="flex items-center">
          <Button
            size="icon"
            className="bg-transparent hover:bg-transparent shadow-none border-none mr-2"
          >
            <img src={deleteIcon} alt="A delete Icon" />
          </Button>

          <Button
            size="icon"
            className="bg-transparent hover:bg-transparent shadow-none border-none"
          >
            <img src={archivedIcon} alt="Archive Icon" />
          </Button>

          <Button className="bg-transparent mr-[-0.4rem] hover:bg-transparent shadow-none border-none text-black">
            Cancel
          </Button>

          <Button className="bg-transparent hover:bg-transparent shadow-none border-none text-blue-700">
            Save Note
          </Button>
        </div>
      </div>

{/* -------------- Note Body ------------------ */}
      <section
        className={`${
          location.pathname ==="/"  ? "hidden lg:block" : location.pathname === "/archived" ? "hidden lg:block" : "block"
        } pt-4 mx-[20px] lg:px-0 lg:mx-0 lg:pt-0 border-t-[1px] border-[#E0E4EA] lg:border-t-0`}
      >
        <h2 className="text-2xl font-bold text-[#0E121B] tracking-[-0.5px]">{note?.title}</h2>

        <article className="w-full gap-8 flex items-center pb-5 mb-2 border-b-[1px] border-[#E0E4EA]">
          <div className="pt-5 flex flex-col gap-2">
            <p className="flex items-center gap-2">
              <IconTag color="#0E121B" /> <span className="text-[#2B303B] font-normal text-sm tracking-[-0.2px]">Tags</span>
            </p>

            {location.pathname.includes("archived") && (
              <p className="flex items-center gap-2">
              <IconStatus color="#0E121B" /> <span className="text-[#2B303B] font-normal text-sm pt-1 tracking-[-0.2px]">Status</span>
            </p>
            )}

            <p className="flex items-center gap-2 pt-1">
              <IconClock /> <span className="text-[#2B303B] font-normal text-sm tracking-[-0.2px]">Last edited</span>
            </p>
          </div>

          <div className="pt-5 flex flex-col gap-2">
            <p className="text-[#2B303B] font-normal text-sm tracking-[-0.2px]">{note?.tags.join(", ")}</p>

            {location.pathname.includes("archived") && (
              <p className="text-[#2B303B] font-normal pt-1 text-sm tracking-[-0.2px]">Archived</p>
            )}

            <p className="text-[#2B303B] font-normal pt-1 text-sm tracking-[-0.2px]">{note?.lastEdited.split("T")[0]}</p>
          </div>
        </article>

        <article className="py-4 text-[#232530]">
          <h2>Key performance optimization techniques:</h2>

          <div className="py-4">
            <p>1. Code Spliting</p>
            <p>- Use React.lazy() for route-based spliting</p>
          </div>
        </article>
      </section>
    </>
  );
};

export default NoteDetails;
