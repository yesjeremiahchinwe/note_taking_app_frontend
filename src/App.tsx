import { Route, Routes } from "react-router-dom";
import Layout from "@/components/Layout";
import Home from "@/components/Home";
import Login from "@/pages/Login";
import NoteDetails from "@/components/NoteDetails";

function App() {
  return (
    <Routes>
      <Route path="/logn" element={<Login />} />
      
      <Route element={<Layout />}>
        <Route element={<Home />}>
          <Route index element={<NoteDetails />} />
          <Route path="/:title" element={<NoteDetails />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
