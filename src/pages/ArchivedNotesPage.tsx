import ArchivedNotes from "@/components/ArchivedNotes"
import Header from "@/components/Header"
import RightSidebar from "@/components/RightSidebar"
import useTitle from "@/hooks/useTitle";
import { useState } from "react";
import { Outlet } from "react-router-dom"

const ArchivedNotesPage = () => {
  useTitle("Archive Notes")
  
  const [searchQuery, setSearchQuery] = useState("")

  return (
    <section className="flex flex-col w-full bg-background rounded-t-md lg:rounded-t-none h-screen">
    <Header searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

    <article className="flex rounded-t-[1.25rem] lg:rounded-t-none bg-background flex-col lg:flex-row items-start justify-between lg:pr-[2rem] lg:pl-3 w-full max-h-screen overflow-hidden">
     <ArchivedNotes />

      <div className="basis-full max-h-screen w-full pb-5 lg:basis-[60%] lg:p-3 lg:pt-3.5">
        <Outlet />
      </div>

      <RightSidebar />
    </article>
  </section>
  )
}

export default ArchivedNotesPage