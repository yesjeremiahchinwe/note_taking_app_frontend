import { Route, Routes } from "react-router-dom";
import { lazy, Suspense } from "react";

import Layout from "@/components/Layout";
import Home from "@/components/Home";
import { Toaster } from "@/components/ui/toaster"
import HomeLoader from "./components/HomeLoader";
import RequireAuth from "./components/RequireLogin";
import Prefetch from "./components/Prefetch";
import { useGetArchivedNotesQuery, useGetNotesQuery } from "./store/notes/notesApiSlice";

const SettingsPage = lazy(() => import("@/pages/SettingsPage"));
const LoginPage = lazy(() => import("@/pages/LoginPage"));
const SignUpPage = lazy(() => import("@/pages/SignUpPage"));
const ForgotPasswordPage = lazy(() => import("@/pages/ForgotPasswordPage"));
const ResetPasswordPage = lazy(() => import("@/pages/ResetPasswordPage"));

const NoteDetailsPage = lazy(() => import("@/pages/NoteDetailsPage"));
const SearchPage = lazy(() => import("@/pages/SearchPage"));
const TagsPage = lazy(() => import("@/pages/TagsPage"));
const ArchivedNotesPage = lazy(() => import("@/pages/ArchivedNotesPage"));
const ColorThemeSettings = lazy(() => import("@/pages/ColorThemeSettingsPage"));
const FontThemeSettings = lazy(() => import("@/pages/FontThemeSettingsPage"));
const ChangePasswordSettings = lazy(
  () => import("@/pages/ChangePasswordSettingsPage")
);

function App() {
  const {
    data: notes,
} = useGetNotesQuery('notesList', {
    pollingInterval: 15000,
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true
})

  const {
    data: archivedNotes,
} = useGetArchivedNotesQuery('archivedNotesList', {
    pollingInterval: 15000,
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true
})

console.log(notes)
console.log(archivedNotes)

  return (
    <>
    <Suspense fallback={<HomeLoader />}>
      <Routes>
        {/* ------------ Authentication routes ---------------- */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/create" element={<SignUpPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />

        <Route element={<RequireAuth />}>
          <Route
            path="/:userId/reset-password"
            element={<ResetPasswordPage />}
          />
        </Route>

        {/* -------------- Home and Main application routes ---------------- */}
        {/* <Route element={<PersistLogin />}> */}
        <Route path="/" element={<Layout />}>
          <Route element={<Prefetch />}>
            <Route element={<Home />}>
              <Route index element={<NoteDetailsPage notes={notes} />} />
              <Route
                path=":title"
                element={<NoteDetailsPage notes={notes} />}
              />
              <Route
                path="new"
                element={<NoteDetailsPage notes={notes} />}
              />
            </Route>

            <Route path="archived" element={<ArchivedNotesPage />}>
              <Route
                index
                element={<NoteDetailsPage notes={archivedNotes} />}
              />
              <Route
                path=":title"
                element={<NoteDetailsPage notes={archivedNotes} />}
              />
            </Route>

            <Route path="tags" element={<TagsPage />}>
              <Route index element={<NoteDetailsPage notes={notes} />} />
            </Route>
          </Route>

            <Route path="settings" element={<SettingsPage />}>
              <Route index element={<ColorThemeSettings />} />
              <Route path="color-theme" element={<ColorThemeSettings />} />
              <Route path="font-theme" element={<FontThemeSettings />} />
              <Route
                path="change-password"
                element={<ChangePasswordSettings />}
              />
            </Route>

            <Route path="search" element={<SearchPage />} />
          </Route>
        {/* </Route> */}
      </Routes>
    </Suspense>
    <Toaster />
    </>
  );
}

export default App;
