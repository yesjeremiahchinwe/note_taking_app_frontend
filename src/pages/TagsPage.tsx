import Header from "@/components/Header"
import NotesWithTag from "@/components/NotesWithTag"
import RightSidebar from "@/components/RightSidebar"
import { Outlet } from "react-router-dom"
import useTitle from "@/hooks/useTitle";
import AllNotes from "@/components/AllNotes";
import { useState } from "react";

const TagsPage = () => {
  useTitle("Tags")
  const [searchQuery, setSearchQuery] = useState("")

  return (
    <>
    <NotesWithTag />

    <section className="hidden lg:flex flex-col w-full bg-background rounded-t-md lg:rounded-t-none">
    <Header searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

    <article className="flex rounded-t-[1.25rem] lg:rounded-t-none bg-background flex-col lg:flex-row min-h-screen items-start justify-between lg:pr-[2rem] lg:pl-6 w-full">
     <AllNotes />

      <div className="basis-full w-full pb-5 lg:basis-[50%] lg:p-5">
        <Outlet />
      </div>

      <RightSidebar />
    </article>
  </section>
  </>
  )
}

export default TagsPage