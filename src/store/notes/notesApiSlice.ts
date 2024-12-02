import { createSelector, createEntityAdapter } from "@reduxjs/toolkit";
import { apiSlice } from "../api/apiSlice";
import { Note } from "@/lib/types";

const notesAdapter = createEntityAdapter({
    sortComparer: (a, b) => (a.id === b.id) ? 0 :
    a.id ? 1 : -1
})

const initialState = notesAdapter.getInitialState()

export const notesApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getNotes: builder.query({
            query: () => ({
                url: '/notes',
                validateStatus: (response, result) => {
                    return response.status === 200 && !result.isError
                }
            }),

            transformResponse: (responseData: any) => {
                const loadedNotes = responseData.map((note: Note) => {
                    note.id = note._id
                    return note
                })

                return notesAdapter.setAll(initialState, loadedNotes)
            },

            providesTags: (result: any) => {
                if (result?.ids) {
                    return [
                        { type: "Note", id: "LIST" },
                        ...result.ids.map((id: any) => ({ type: "Note", id }))
                    ]

                } else {
                    return [{ type: "Note", id: "LIST" }]
                }
            }
        }),

        getArchivedNotes: builder.query({
            query: () => ({
                url: '/notes/archived',
                validateStatus: (response, result) => {
                    return response.status === 200 && !result.isError
                }
            }),

            transformResponse: (responseData: any) => {
                const loadedNotes = responseData.map((note: Note) => {
                    note.id = note._id
                    return note
                })

                return notesAdapter.setAll(initialState, loadedNotes)
            },

            providesTags: (result: any) => {
                if (result?.ids) {
                    return [
                        { type: "Note", id: "ARCHIVEDLIST" },
                        ...result.ids.map((id: any) => ({ type: "Note", id }))
                    ]

                } else {
                    return [{ type: "Note", id: "ARCHIVEDLIST" }]
                }
            }
        }),


        addNewNote: builder.mutation({
            query: initialNote => ({
                url: '/notes',
                method: 'POST',
                body: {
                    ...initialNote,
                }
            }),
            invalidatesTags: [
                { type: 'Note', id: "LIST" }
            ]
        }),


        updateNote: builder.mutation({
            query: initialNote => ({
                url: '/notes',
                method: 'PATCH',
                body: {
                    ...initialNote,
                }
            }),
            invalidatesTags: (result, error, arg) => [
                { type: 'Note', id: arg.id }
            ]
        }),

        markNoteAsArchived: builder.mutation({
            query: initialNote => ({
                url: '/notes',
                method: 'PATCH',
                body: {
                    ...initialNote,
                }
            }),
            invalidatesTags: (result, error, arg) => [
                { type: 'Note', id: arg.id }
            ]
        }),

        deleteNote: builder.mutation({
            query: ({ id }) => ({
                url: `/notes`,
                method: 'DELETE',
                body: { id }
            }),
            invalidatesTags: (result, error, arg) => [
                { type: 'Note', id: arg.id }
            ]
        }),
    }),
})

export const { 
    useGetNotesQuery,
    useGetArchivedNotesQuery,
    useAddNewNoteMutation,
    useUpdateNoteMutation,
    useMarkNoteAsArchivedMutation,
    useDeleteNoteMutation,
 } = notesApiSlice

// returns the query result object
export const selectNotesResult = notesApiSlice.endpoints.getNotes.select({})


// creates memoized selector
const selectNotesData = createSelector(
    selectNotesResult,
    notesResult => notesResult.data  // normalized state object with ids & entities
)


//getSelectors creates these selectors and we rename them with aliases using destructuring
export const {
    selectAll: selectAllNotes,
    selectById: selectNoteById,
    selectIds: selectNoteIds
     // Pass in a selector that returns the notes slice of state
} = notesAdapter.getSelectors((state: any) => selectNotesData(state) ?? initialState)