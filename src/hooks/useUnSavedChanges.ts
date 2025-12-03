import { useEffect, useMemo, useState } from "react"
import { useNavigate } from "react-router-dom"

export interface NoteState {
  title: string
  tags: string
  content: string
}

export default function useUnsavedChanges(currentNote: NoteState) {
  const navigate = useNavigate()

  const [initialState, setInitialState] = useState<NoteState>(currentNote)
  const [showModal, setShowModal] = useState(false)
  const [nextPath, setNextPath] = useState<any>(null)

  // Detect unsaved changes
  const isNewChangesAvaliable = useMemo(() => {
    return (
      currentNote?.title !== initialState?.title ||
      currentNote?.tags !== initialState?.tags ||
      currentNote?.content !== initialState?.content
    )
  }, [currentNote, initialState])

  // Update baseline when new note is loaded
  const resetBaseline = (newState: NoteState) => {
    setInitialState(newState)
  }

  // Cancel changes
  const discardChanges = () => {
    return initialState
  }

  // Safe navigation
  const safeNavigate = (path: string | number) => {
    if (!isNewChangesAvaliable) {
      navigate(path as any)
      return
    }

    setNextPath(path)
    setShowModal(true)
  }

  // Handle browser close / refresh
  useEffect(() => {
    const handler = (e: BeforeUnloadEvent) => {
      if (!isNewChangesAvaliable) return
      e.preventDefault()
      e.returnValue = ""
    }

    window.addEventListener("beforeunload", handler)
    return () => window.removeEventListener("beforeunload", handler)
  }, [isNewChangesAvaliable])

  return {
    isNewChangesAvaliable,
    showModal,
    nextPath,
    setShowModal,
    resetBaseline,
    discardChanges,
    safeNavigate,
    proceed: () => {
      if (nextPath) navigate(nextPath)
    },
  }
}
