import { notes } from "@/lib/constants"
import { Note } from "@/lib/types"
// import { useEffect } from "react"
import { useLocation, useParams } from "react-router-dom"

const NoteDetails = () => {
    const { title } = useParams()
    const location = useLocation()

    const note: Note = location.pathname === "/" ? notes[0] : notes.find(note => note.title.toLowerCase().split(" ").join("-") === title) as Note;

  return (
    <section>
        <h1>{note.title}</h1>
    </section>
  )
}

export default NoteDetails