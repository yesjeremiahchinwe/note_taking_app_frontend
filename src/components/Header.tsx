import { IconSearch } from "@/lib/icons";
import { Input } from "./ui/input";
import { useLocation, useSearchParams } from "react-router-dom";

const Header = () => {
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams()

  // Get 'archived' query parameter
  const archivedQueryParam = searchParams.get("archived")

  const headingText = location.pathname === "/" && archivedQueryParam !== "1" ? "All Notes" : archivedQueryParam === "1" ? "Archived Notes" : "All Notes"

  return (
    <header>
      {/* ------------- Desktop View ----------------- */}
      <div className="hidden lg:flex w-full min-h-[91px] px-[2rem] border-b-[1px] border-[#E0E4EA] bg-white items-center justify-between flex-1">
      <h1 className="font-bold text-2xl leading-7 text-[#0E121B] basis-[40%]">
        {headingText}
      </h1>

      <div className="max-w-[30%] w-full relative">
        <IconSearch className="absolute left-4 top-4" />
        <Input
          // value={filterValue as string}
          // onChange={(e) => {
          //   setFilterValue(e.target.value);
          //   queryParams.set("myParam", filterValue);
          //   navigate({ search: filterValue.toString() })
          // }}
          type="search"
          className="py-6 pl-[3rem] text-base pr-5"
          placeholder="Search by title, content, or tags"
        />
      </div>
      </div>
      
    </header>
  );
};

export default Header;
