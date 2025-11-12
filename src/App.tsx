import { Route, Routes } from "react-router-dom";
import { lazy, Suspense } from "react";

import Layout from "@/components/Layout";
import Home from "@/components/Home";
import LoadingState from "@/components/HomeLoader";
import RequireAuth from "@/components/RequireLogin";
import {
  useGetArchivedNotesQuery,
  useGetNotesQuery,
} from "@/store/notes/notesApiSlice";
import LoginPage from "@/pages/LoginPage";
import SignUpPage from "@/pages/SignUpPage";
import ForgotPasswordPage from "@/pages/ForgotPasswordPage";
import ResetPasswordPage from "@/pages/ResetPasswordPage";
import SettingsPage from "@/pages/SettingsPage";
import SearchPage from "@/pages/SearchPage";
import TagsPage from "./pages/TagsPage";
import NotFoundPage from "@/pages/NotFoundPage";
import { useSelector } from "react-redux";
import { selectCurrentId } from "./store/auth/authSlice";
import NoteDetailsPage from "./pages/NoteDetailsPage";

const ColorThemeSettings = lazy(() => import("@/pages/ColorThemeSettingsPage"));
const FontThemeSettings = lazy(() => import("@/pages/FontThemeSettingsPage"));
const ArchivedNotesPage = lazy(() => import("@/pages/ArchivedNotesPage"));
const ChangePasswordSettings = lazy(
  () => import("@/pages/ChangePasswordSettingsPage")
);

function App() {
  const userId = useSelector(selectCurrentId);

  const { data: notes, isLoading: isLoadingGetNotes } =
    useGetNotesQuery(userId);

  const { data: archivedNotes, isLoading: isLoadingArchiveNote } =
    useGetArchivedNotesQuery(userId);

  return (
    <Suspense fallback={<LoadingState message="Please wait" />}>
      <Routes>
        {/* ------------ Authentication routes ---------------- */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/create" element={<SignUpPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/:userId/reset-password" element={<ResetPasswordPage />} />

        {/* -------------- Home and Main application routes ---------------- */}
        <Route element={<RequireAuth />}>
          <Route path="/" element={<Layout />}>
            <Route element={<Home />}>
              <Route
                index
                element={
                  <NoteDetailsPage
                    notes={notes}
                    isLoading={isLoadingGetNotes}
                  />
                }
              />
              <Route
                path=":title"
                element={
                  <NoteDetailsPage
                    notes={notes}
                    isLoading={isLoadingGetNotes}
                  />
                }
              />
              <Route
                path="new"
                element={
                  <NoteDetailsPage
                    notes={notes}
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
                    notes={archivedNotes}
                    isLoading={isLoadingArchiveNote}
                  />
                }
              />
              <Route
                path=":title"
                element={
                  <NoteDetailsPage
                    notes={archivedNotes}
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
                    notes={notes}
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
                    notes={notes}
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

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Suspense>
  );
}

export default App;
