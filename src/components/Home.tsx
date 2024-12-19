import { Outlet } from "react-router-dom";
import AllNotes from "./AllNotes";
import Header from "./Header";
import RightSidebar from "./RightSidebar";
import useSearch from "@/hooks/useSearch";

const Home = () => {
  const { searchTerm, setSearchTerm } = useSearch()

  return (
    <main className="flex flex-col w-full rounded-t-md lg:rounded-t-none h-screen">
      <Header searchQuery={searchTerm} setSearchQuery={setSearchTerm} />

      <article className="flex flex-1 rounded-t-[1.25rem] lg:rounded-t-none flex-col lg:flex-row items-start justify-between lg:pr-[2rem] lg:pl-6 w-full h-screen">
       <AllNotes searchQuery={searchTerm} />

        <section className="basis-full h-screen w-full pb-5 lg:basis-[50%] lg:p-5">
          <Outlet />
        </section>

        <RightSidebar />
      </article>
    </main>
  );
};

export default Home;
