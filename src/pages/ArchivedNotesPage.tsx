import ArchivedNotes from "@/components/ArchivedNotes"
import Header from "@/components/Header"
import RightSidebar from "@/components/RightSidebar"
import useSearch from "@/hooks/useSearch";
import useTitle from "@/hooks/useTitle";
import { Outlet } from "react-router-dom"

const ArchivedNotesPage = () => {
  useTitle("Archive Notes")
  const { searchTerm, setSearchTerm } = useSearch()

  return (
    <section className="flex flex-col w-full bg-background rounded-t-md lg:rounded-t-none max-h-screen">
    <Header searchQuery={searchTerm} setSearchQuery={setSearchTerm} />

    <article className="flex rounded-t-[1.25rem] lg:rounded-t-none bg-background flex-col lg:flex-row items-start justify-between lg:pr-[2rem] lg:pl-6 w-full">
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