import { store } from '../store/store'
import { notesApiSlice } from '../store/notes/notesApiSlice'
import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';

const Prefetch = () => {

    useEffect(() => {
        store.dispatch(notesApiSlice.util.prefetch('getNotes', 'notesList', { force: true }))
        store.dispatch(notesApiSlice.util.prefetch('getArchivedNotes', 'archivedNotesList', { force: true }))
    }, [])

    return <Outlet />
}
export default Prefetch