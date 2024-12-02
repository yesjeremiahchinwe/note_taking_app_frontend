import iconArchive from "/images/icon-archive.svg"
import iconDelete from "/images/icon-delete.svg"
import iconRestore from "/images/icon-restore.svg"
import { Button } from "./ui/button"
import { useLocation, useParams, useSearchParams } from "react-router-dom"
import { useState } from "react"
import DeleteModal from "./modals/DeleteNoteModal"
import ArchiveNoteModal from "./modals/ArchiveNoteModal"
import { useDeleteNoteMutation, useGetNotesQuery, useMarkNoteAsArchivedMutation } from "@/store/notes/notesApiSlice"

const RightSidebar = () => {
    const location = useLocation()
    const { title } = useParams()
    const [isOpen, setIsOpen] = useState({
        archiveNote: false,
        deleteNote: false
    })
    const [searchParams, setSearchParams] = useSearchParams()
    const noteQueryParam = searchParams.get("note")

    const noteTitle = (noteQueryParam ?? title) as string

    const [markNoteAsArchived, { isLoading: isLoadingArchiveNote, isSuccess: isSuccessArchiveNote}] = useMarkNoteAsArchivedMutation()
    const [deleteNote, { isLoading: isLoadingDeleteNote, isSuccess: isSuccessDeleteNote}] = useDeleteNoteMutation()

    const { note } = useGetNotesQuery("notesList", {
        selectFromResult: ({ data }) => ({
            note: data?.entities[noteTitle]
        })
    })

    const onArchivNoteClicked = async () => {
        try {
            await markNoteAsArchived({ id: note.id, isArchived: true })
        } catch (err: any) {
            console.log(err?.message)
        }
    }

    const onDeleteNoteClicked = async () => {
        try {
            await deleteNote({ id: note.id })
        } catch (err: any) {
            console.log(err?.message)
        }
    }

    return (
        <>
        <section className="hidden lg:block basis-[25%] py-5 pl-4 h-screen border-l-[1px] border-[#E0E4EA]">
            {location.pathname.includes("archived") ? (
                 <Button className="py-6 bg-transparent border-[1px] rounded-md hover:scale-[1.02] duration-500 hover:bg-transparent border-[#CACFD8] mb-3 w-full" size="lg"><img src={iconRestore} alt="Archive svg icon" /> <span className="ml-1 text-[#0E121B] shadow-none tracking-[-0.2px]">Restore Note</span></Button>
            ) : (
                <Button className="py-6 bg-transparent border-[1px] rounded-md hover:scale-[1.02] duration-500 hover:bg-transparent border-[#CACFD8] mb-3 w-full" size="lg" onClick={() => setIsOpen((prev) => ({...prev, archiveNote: !prev.archiveNote}))}><img src={iconArchive} alt="Archive svg icon" /> <span className="ml-1 text-[#0E121B] shadow-none tracking-[-0.2px]">Archive Note</span></Button>
            )}
    
            <Button className="py-6 bg-transparent border-[1px] rounded-md hover:scale-[1.02] duration-500 hover:bg-transparent border-[#CACFD8] w-full" size="lg" onClick={() => setIsOpen((prev) => ({...prev, deleteNote: !prev.deleteNote}))}><img src={iconDelete} alt="Delete svg icon" /> <span className="ml-1 text-[#0E121B] shadow-none tracking-[-0.2px]">Delete Note</span></Button>
        </section>

        <DeleteModal isOpen={isOpen.deleteNote} onClose={() => setIsOpen((prev) => ({...prev, deleteNote: false}))} onConfirm={() => {
            setIsOpen((prev) => ({...prev, deleteNote: false})),
            onDeleteNoteClicked()
        }
        } loading={isLoadingDeleteNote} />

        <ArchiveNoteModal isOpen={isOpen.archiveNote} onClose={() => setIsOpen((prev) => ({...prev, archiveNote: false}))} onConfirm={() => {
                setIsOpen((prev) => ({...prev, archiveNote: false})),
                onArchivNoteClicked()
            }
            } loading={isLoadingArchiveNote} />
        </>
    )
}

export default RightSidebar