import { Route, Routes } from "react-router-dom";
import { lazy, Suspense } from "react";

import Layout from "@/components/Layout";
import Home from "@/components/Home";
import SearchPage from "@/pages/SearchPage";
import LoadingState from "@/components/HomeLoader";
import RequireAuth from "@/components/RequireLogin";
import Prefetch from "@/components/Prefetch";
import PersistLogin from "@/components/PersistentLogin";
import {
  useGetArchivedNotesQuery,
  useGetNotesQuery,
} from "@/store/notes/notesApiSlice";
import { Note } from "./lib/types";

const SettingsPage = lazy(() => import("@/pages/SettingsPage"));
const LoginPage = lazy(() => import("@/pages/LoginPage"));
const SignUpPage = lazy(() => import("@/pages/SignUpPage"));
const ForgotPasswordPage = lazy(() => import("@/pages/ForgotPasswordPage"));
const ResetPasswordPage = lazy(() => import("@/pages/ResetPasswordPage"));

const NoteDetailsPage = lazy(() => import("@/pages/NoteDetailsPage"));
const TagsPage = lazy(() => import("@/pages/TagsPage"));
const ArchivedNotesPage = lazy(() => import("@/pages/ArchivedNotesPage"));
const ColorThemeSettings = lazy(() => import("@/pages/ColorThemeSettingsPage"));
const FontThemeSettings = lazy(() => import("@/pages/FontThemeSettingsPage"));
const ChangePasswordSettings = lazy(
  () => import("@/pages/ChangePasswordSettingsPage")
);

function App() {
  const { data: notes, isLoading: isLoadingGetNotes } = useGetNotesQuery(
    "notesList",
    {
      pollingInterval: 15000,
      refetchOnFocus: true,
      refetchOnMountOrArgChange: true,
    }
  );

  const { data: archivedNotes, isLoading: isLoadingArchiveNote } =
    useGetArchivedNotesQuery("archivedNotesList", {
      pollingInterval: 15000,
      refetchOnFocus: true,
      refetchOnMountOrArgChange: true,
    });

  return (
    <Suspense fallback={<LoadingState message="Please wait" />}>
      <Routes>
        {/* ------------ Authentication routes ---------------- */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/create" element={<SignUpPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />

        <Route path="/:userId/reset-password" element={<ResetPasswordPage />} />

        {/* -------------- Home and Main application routes ---------------- */}
        <Route element={<PersistLogin />}>
          <Route element={<RequireAuth />}>
            <Route path="/" element={<Layout />}>
              <Route element={<Prefetch />}>
                <Route element={<Home />}>
                  <Route
                    index
                    element={
                      <NoteDetailsPage
                        notes={notes as Note[]}
                        isLoading={isLoadingGetNotes}
                      />
                    }
                  />
                  <Route
                    path=":title"
                    element={
                      <NoteDetailsPage
                        notes={notes as Note[]}
                        isLoading={isLoadingGetNotes}
                      />
                    }
                  />
                  <Route
                    path="new"
                    element={
                      <NoteDetailsPage
                        notes={notes as Note[]}
                        isLoading={isLoadingGetNotes}
                      />
                    }
                  />
                </Route>

                <Route path="archived" element={<ArchivedNotesPage />}>
                  <Route
                    index
                    element={
                      <NoteDetailsPage
                        notes={archivedNotes as Note[]}
                        isLoading={isLoadingArchiveNote}
                      />
                    }
                  />
                  <Route
                    path=":title"
                    element={
                      <NoteDetailsPage
                        notes={archivedNotes as Note[]}
                        isLoading={isLoadingArchiveNote}
                      />
                    }
                  />
                </Route>

                <Route path="tags" element={<TagsPage />}>
                  <Route
                    index
                    element={
                      <NoteDetailsPage
                        notes={notes as Note[]}
                        isLoading={isLoadingGetNotes}
                      />
                    }
                  />
                </Route>

                <Route path="search" element={<SearchPage />}>
                  <Route
                    index
                    element={
                      <NoteDetailsPage
                        notes={notes as Note[]}
                        isLoading={isLoadingGetNotes}
                      />
                    }
                  />
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
              </Route>
            </Route>
          </Route>
        </Route>

        <Route path="*" element={<h1>Not Found!</h1>} />
      </Routes>
    </Suspense>
  );
}

export default App;
