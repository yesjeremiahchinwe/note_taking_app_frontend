import { Outlet } from "react-router-dom";
import { useState } from "react"
import AllNotes from "./AllNotes";
import Header from "./Header";
import RightSidebar from "./RightSidebar";

const Home = () => {
  const [searchQuery, setSearchQuery] = useState("")

  return (
    <main className="flex flex-col w-full rounded-t-md lg:rounded-t-none h-screen">
      <Header searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

      <article className="flex flex-1 rounded-t-[1.25rem] lg:rounded-t-none flex-col lg:flex-row items-start justify-between lg:pr-[2rem] lg:pl-6 w-full h-screen">
       <AllNotes searchQuery={searchQuery} />

        <section className="basis-full h-screen w-full pb-5 lg:basis-[50%] lg:p-5">
          <Outlet />
        </section>

        <RightSidebar />
      </article>
    </main>
  );
};

export default Home;
