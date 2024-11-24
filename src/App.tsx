import { Route, Routes } from "react-router-dom";
import { lazy } from "react";

import Layout from "@/components/Layout";
import Home from "@/components/Home";

const Settings = lazy(() => import("@/pages/Settings"))
const Login = lazy(() => import("@/pages/Login"))
const NoteDetails = lazy(() => import("@/pages/NoteDetails"))
const Search = lazy(() => import("@/pages/Search"))
const Tags = lazy(() => import("@/pages/Tags"))
const ArchivedNotes = lazy(() => import("@/pages/ArchivedNotes"))

function App() {
  return (
    <Routes>
      <Route path="/logn" element={<Login />} />
      
      <Route path="/" element={<Layout />}>
        <Route element={<Home />}>
          <Route index element={<NoteDetails />} />
          <Route path="/:title" element={<NoteDetails />} />
        </Route>

        <Route path="/settings" element={<Settings />} />
        <Route path="/search" element={<Search />} />
        <Route path="/tags" element={<Tags />} />
        <Route path="/settings" element={<Settings />} />
      </Route>
    </Routes>
  );
}

export default App;
