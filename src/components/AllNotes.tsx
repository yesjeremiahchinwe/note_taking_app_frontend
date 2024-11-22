import { notes } from "@/lib/constants"
import { Button } from "./ui/button"
import { Link } from "react-router-dom"

const AllNotes = () => {

    return (
        <section className="hidden lg:block basis-[25%] pr-4 py-5 h-screen border-r-[1px] border-[#E0E4EA]">
        <Button className="py-6 rounded-lg bg-[#335CFF] hover:bg-[#335CFF] hover:scale-105 duration-500 w-full mb-5" size="lg">&#x2b; <span>Create New Note</span></Button>

        {notes.map(note => (
            <article key={note.title} className="bg-[#F3F5F8] mb-2 rounded-md p-3">
                    <h2 className="text-xl font-semibold tracking-[-0.3px] text-[#0E121B]">
                        <Link to={`/${note.title.toLowerCase().split(" ").join("-")}`}>{note.title}</Link>
                    </h2>

                    <div className="flex items-center gap-[8px] mt-3">
                        {note.tags.map((tag: string[], index: number) => (
                            <p key={index} className="py-[2px] px-[zz6px] text-sm rounded-md bg-[#E0E4EA]">{tag}</p>
                        ))}
                    </div>

                    <small className="text-[#2B303B] mt-4 font-medium text-xs tracking-[-0.2px]">{note.lastEdited.split("T")[0]}</small>
            </article>
        ))}
      </section>
    )
}

export default AllNotes