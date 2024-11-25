import ArchivedNotes from "@/components/ArchivedNotes"
import Header from "@/components/Header"
import RightSidebar from "@/components/RightSidebar"
import { Outlet } from "react-router-dom"

const ArchivedNotesPage = () => {
  return (
    <section className="flex flex-col w-full bg-[#F3F5F8] rounded-t-md lg:rounded-t-none">
    <Header />

    <article className="flex rounded-t-[1.25rem] lg:rounded-t-none bg-white flex-col lg:flex-row min-h-screen items-start justify-between lg:pr-[2rem] lg:pl-6 w-full">
     <ArchivedNotes />

      <div className="basis-full w-full pb-5 lg:basis-[50%] lg:p-5">
        <Outlet />
      </div>

      <RightSidebar />
    </article>
  </section>
  )
}

export default ArchivedNotesPage