import { Route, Routes } from "react-router-dom";
import { lazy, Suspense } from "react";

import Layout from "@/components/Layout";
import Home from "@/components/Home";
import { notes } from "./lib/constants";

const SettingsPage = lazy(() => import("@/pages/SettingsPage"))
const LoginPage = lazy(() => import("@/pages/LoginPage"))
const NoteDetailsPage = lazy(() => import("@/pages/NoteDetailsPage"))
const SearchPage = lazy(() => import("@/pages/SearchPage"))
const TagsPage = lazy(() => import("@/pages/TagsPage"))
const ArchivedNotesPage = lazy(() => import("@/pages/ArchivedNotesPage"))

function App() {
  const archivedNotes = notes.filter((note) => note.isArchived)
  // const 

  return (
    <Suspense fallback={<p>Loadng...</p>}>
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      
      <Route path="/" element={<Layout />}>
        <Route element={<Home />}>
          <Route index element={<NoteDetailsPage notes={notes} />} />
          <Route path=":title" element={<NoteDetailsPage notes={notes} />} />
        </Route>

        <Route path="archived" element={<ArchivedNotesPage />}>
          <Route index element={<NoteDetailsPage notes={archivedNotes} />} />
          <Route path="/archived/:title" element={<NoteDetailsPage notes={archivedNotes} />} />
        </Route>

        <Route path="tags" element={<TagsPage />}>
          <Route index element={<NoteDetailsPage notes={notes} />} />
          <Route path="/tags/:tag" element={<NoteDetailsPage notes={notes} />} />
        </Route>

        {/* <Route path="archived" element={<ArchivedNotesPage />} /> */}
        <Route path="settings" element={<SettingsPage />} />
        <Route path="search" element={<SearchPage />} />
        
      </Route>
    </Routes>
    </Suspense>
  );
}

export default App;
