import { notes } from "@/lib/constants"
import { Button } from "./ui/button"

const AllNotes = () => {
    // const query = "react"

    // const filteredNotes1 = query && notes.filter(note => note.title.toLowerCase().includes(query.toLowerCase()))
    // const filteredNotes2 = query && notes.filter(note => note.content.toLowerCase().includes(query.toLowerCase()))
    // const filteredNotes3 = query && notes.filter(note => note.tags.filter(tag => tag.toLowerCase().includes(query.toLowerCase())))

    // let allFilters = [...filteredNotes1, ...filteredNotes2, ...filteredNotes3]

    // if (!allFilters.length) {
    //     allFilters = notes
    // }

    return (
        <section className="basis-[25%] pr-4 py-5 h-screen border-r-[1px] border-[#E0E4EA]">
        <Button className="py-6 rounded-lg bg-[#335CFF] hover:bg-[#335CFF] hover:scale-105 duration-500 w-full mb-5" size="lg">&#x2b; <span>Create New Note</span></Button>

        {notes.map(note => (
            <article key={note.title} className="bg-[#F3F5F8] mb-2 rounded-md p-3">
                    <h2 className="text-xl font-semibold tracking-[-0.3px] text-[#0E121B]">{note.title}</h2>

                    <div className="flex items-center gap-[8px] mt-3">
                        {note.tags.map(tag => (
                            <p key={tag} className="py-[2px] px-[6px] text-sm rounded-md bg-[#E0E4EA]">{tag}</p>
                        ))}
                    </div>

                    <small className="text-[#2B303B] mt-4 font-medium text-xs tracking-[-0.2px]">{note.lastEdited.split("T")[0]}</small>
            </article>
        ))}
      </section>
    )
}

export default AllNotes