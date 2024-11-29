import { Route, Routes } from "react-router-dom";
import { lazy, Suspense } from "react";

import Layout from "@/components/Layout";
import Home from "@/components/Home";
import { notes } from "./lib/constants";

const SettingsPage = lazy(() => import("@/pages/SettingsPage"));
const LoginPage = lazy(() => import("@/pages/LoginPage"));
const SignUpPage = lazy(() => import("@/pages/SignUpPage"));
const ForgotPasswordPage = lazy(() => import("@/pages/ForgotPasswordPage"));
const ResetPasswordPage = lazy(() => import("@/pages/ResetPasswordPage"));

const NoteDetailsPage = lazy(() => import("@/pages/NoteDetailsPage"));
const SearchPage = lazy(() => import("@/pages/SearchPage"));
const TagsPage = lazy(() => import("@/pages/TagsPage"));
const ArchivedNotesPage = lazy(() => import("@/pages/ArchivedNotesPage"));
const ColorThemeSettings = lazy(() => import("@/pages/ColorThemeSettingsPage"))
const FontThemeSettings = lazy(() => import("@/pages/FontThemeSettingsPage"))
const ChangePasswordSettings = lazy(() => import("@/pages/ChangePasswordSettingsPage"))

function App() {
  const archivedNotes = notes.filter((note) => note.isArchived);

  return (
    <Suspense fallback={<p>Loadng...</p>}>
      <Routes>
        {/* ------------ Authentication routes ---------------- */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/create" element={<SignUpPage />} />
      <Route path="/forgot-password" element={<ForgotPasswordPage />} />
      <Route path="/:userId/reset-password" element={<ResetPasswordPage />} />
      
      {/* -------------- Home and Main application routes ---------------- */}
        <Route path="/" element={<Layout />}>
          <Route element={<Home />}>
            <Route index element={<NoteDetailsPage notes={notes} />} />
            <Route path=":title" element={<NoteDetailsPage notes={notes} />} />
          </Route>

          <Route path="archived" element={<ArchivedNotesPage />}>
            <Route index element={<NoteDetailsPage notes={archivedNotes} />} />
            <Route
              path=":title"
              element={<NoteDetailsPage notes={archivedNotes} />}
            />
          </Route>

          <Route path="tags" element={<TagsPage />}>
            <Route index element={<NoteDetailsPage notes={notes} />} />
            {/* <Route path=":tag" element={<NoteDetailsPage notes={notes} />} /> */}
          </Route>

          <Route path="settings" element={<SettingsPage />}>
            <Route index element={<ColorThemeSettings />} />
            <Route
              path="color-theme"
              element={<ColorThemeSettings />}
            />
            <Route
              path="font-theme"
              element={<FontThemeSettings />}
            />
            <Route
              path="change-password"
              element={<ChangePasswordSettings />}
            />
          </Route>
          
          <Route path="search" element={<SearchPage />} />
        </Route>
      </Routes>
    </Suspense>
  );
}

export default App;
