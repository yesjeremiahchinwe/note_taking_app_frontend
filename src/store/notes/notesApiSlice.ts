import { createEntityAdapter } from "@reduxjs/toolkit";
import { apiSlice } from "../api/apiSlice";
import { Note } from "@/lib/types";

createEntityAdapter({
  sortComparer: (a, b) => (a.id === b.id ? 0 : a.id ? 1 : -1),
});

export const notesApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getNotes: builder.query<Note[], string>({
      query: (userId) => ({
        url: `/notes/${userId}`,
        validateStatus: (response: any, result: any) => {
          return response.status === 200 && !result.isError;
        },
      }),

      transformResponse: (responseData: Note[]) => {
        return responseData?.sort((a, b) =>
          a.updatedAt < b.updatedAt ? 1 : -1
        );
      },

      providesTags: (result: any) => {
        if (result?.ids) {
          return [
            { type: "Note", id: "LIST" },
            ...result.ids.map((id: any) => ({ type: "Note", id })),
          ];
        } else {
          return [{ type: "Note", id: "LIST" }];
        }
      },
    }),

    callAI: builder.mutation({
      query: (credentails: any) => ({
        url: `/api/generate`,
        body: { ...credentails },
        method: "POST",
        validateStatus: (response, result) =>
          response.status >= 200 && response.status < 300 && !result?.isError,
      }),

      invalidatesTags: [{ type: "Note", id: "LIST" }],
    }),

    getArchivedNotes: builder.query<Note[], string>({
      query: (userId) => ({
        url: `/notes/archived/${userId}`,
        validateStatus: (response: any, result: any) => {
          return response.status === 200 && !result.isError;
        },
      }),

      transformResponse: (responseData: Note[]) => {
        return responseData?.sort((a, b) =>
          a.updatedAt < b.updatedAt ? 1 : -1
        );
      },

      providesTags: (result: any) => {
        if (result?.ids) {
          return [
            { type: "Note", id: "ARCHIVEDLIST" },
            ...result.ids.map((id: any) => ({ type: "Note", id })),
          ];
        } else {
          return [{ type: "Note", id: "ARCHIVEDLIST" }];
        }
      },
    }),

    addNewNote: builder.mutation({
      query: (initialNote: any) => ({
        url: "/notes",
        method: "POST",
        body: {
          ...initialNote,
        },
        validateStatus: (response, result) =>
          response.status >= 200 && response.status < 300 && !result?.isError,
      }),
      invalidatesTags: [{ type: "Note", id: "LIST" }],
    }),

    updateNote: builder.mutation({
      query: (initialNote: any) => ({
        url: "/notes",
        method: "PUT",
        body: {
          ...initialNote,
        },
        validateStatus: (response, result) =>
          response.status >= 200 && response.status < 300 && !result?.isError,
      }),
      invalidatesTags: (arg: any) => [{ type: "Note", id: arg.id }],
    }),

    markNoteAsArchived: builder.mutation({
      query: (initialNote: any) => ({
        url: "/notes",
        method: "PATCH",
        body: {
          ...initialNote,
        },
        validateStatus: (response, result) =>
          response.status >= 200 && response.status < 300 && !result?.isError,
      }),

      invalidatesTags: (arg: any) => [{ type: "Note", id: arg.id }],
    }),

    restoreArchivedNote: builder.mutation({
      query: (initialNote: any) => ({
        url: "/notes/restore",
        method: "PATCH",
        body: {
          ...initialNote,
        },
        validateStatus: (response, result) =>
          response.status >= 200 && response.status < 300 && !result?.isError,
      }),
      invalidatesTags: (arg: any) => [{ type: "Note", id: arg.id }],
    }),

    deleteNote: builder.mutation({
      query: (initialData: any) => ({
        url: `/notes`,
        method: "DELETE",
        body: {
          ...initialData,
        },
        validateStatus: (response, result) =>
          response.status >= 200 && response.status < 300 && !result?.isError,
      }),
      invalidatesTags: (arg: any) => [{ type: "Note", id: arg.id }],
    }),
  }),
});

export const {
  useGetNotesQuery,
  useGetArchivedNotesQuery,
  useAddNewNoteMutation,
  useUpdateNoteMutation,
  useCallAIMutation,
  useMarkNoteAsArchivedMutation,
  useRestoreArchivedNoteMutation,
  useDeleteNoteMutation,
} = notesApiSlice;

// returns the query result object
export const selectNotesResult =
  notesApiSlice.endpoints.getNotes.select("notesList");

// creates memoized selector
// const selectNotesData = createSelector(
//     selectNotesResult,
//     notesResult => notesResult.data  // normalized state object with ids & entities
// )

//getSelectors creates these selectors and we rename them with aliases using destructuring
// export const {
//     selectAll: selectAllNotes,
//     selectById: selectNoteById,
//     selectIds: selectNoteIds
// Pass in a selector that returns the notes slice of state
// } = notesAdapter.getSelectors((state: any) => selectNotesData(state) ?? initialState)
