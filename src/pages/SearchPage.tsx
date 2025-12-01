import { useState } from "react";
import Header from "@/components/Header";
import RightSidebar from "@/components/RightSidebar";
import { Outlet } from "react-router-dom";
import useTitle from "@/hooks/useTitle";
import AllNotes from "@/components/AllNotes";
import SearchComponent from "@/components/MobileSearchComponent";

const SearchPage = () => {
  useTitle("Search for Note");
  
  const [searchQuery, setSearchQuery] = useState(
    () => (sessionStorage.getItem("searchTerm") as string) || ""
  );

  return (
    <>
      <SearchComponent
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />

      <section className="hidden lg:flex flex-col w-full h-screen bg-background rounded-t-md lg:rounded-t-none">
        <Header searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

        <article className="flex rounded-t-[1.25rem] lg:rounded-t-none bg-background flex-col lg:flex-row items-start justify-between lg:pr-[2rem] lg:pl-3 w-full max-h-screen overflow-hidden">
          <AllNotes searchQuery={searchQuery} />

          <div className="basis-full max-h-screen w-full pb-5 lg:basis-[60%] lg:p-3 lg:pt-3.5">
            <Outlet />
          </div>

          <RightSidebar />
        </article>
      </section>
    </>
  );
};

export default SearchPage;
