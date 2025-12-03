import { useLocation, useParams, useSearchParams } from "react-router-dom"
import { useMemo } from "react"
import { Note } from "@/lib/types"

export default function useFoundNote(notes?: Note[]) {
  const location = useLocation()
  const [searchParams] = useSearchParams()
  const { title } = useParams()

  const noteQueryParam = searchParams.get("note")
  const tagQueryParam = searchParams.get("tag")

  const foundNote: Note | undefined = useMemo(() => {
    if (!notes || notes.length === 0) return undefined

    const normalize = (value?: string) =>
      value?.toLowerCase().split(" ").join("-")

    // 1. Get by URL param (/notes/:title)
    if (title) {
      return notes.find(
        (note) => normalize(note.title) === normalize(title)
      )
    }

    // 2. Get by query param (?note=...)
    if (noteQueryParam) {
      return notes.find(
        (note) => normalize(note.title) === normalize(noteQueryParam)
      )
    }

    // 3. Get by tag (?tag=...)
    if (tagQueryParam) {
      return notes.find((note) =>
        note.tags?.includes(tagQueryParam)
      )
    }

    // 4. Fallback to first note
    return notes[0]

  }, [notes, title, noteQueryParam, tagQueryParam, location.pathname])

  return {
    foundNote,
    noteQueryParam,
    tagQueryParam,
    isArchivedPage: location.pathname.includes("/archived"),
    pathname: location.pathname
  }
}
