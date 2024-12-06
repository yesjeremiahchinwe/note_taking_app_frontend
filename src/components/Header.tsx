import { IconSearch, IconSettings } from "@/lib/icons";
import { Input } from "./ui/input";
import { Link, useLocation, useSearchParams } from "react-router-dom";

const Header = () => {
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams()
  const tagQueryParam = searchParams.get("tag")

  const headingText =
    location.pathname === "/"
      ? "All Notes"
      : location.pathname.includes("/archived")
      ? "Archived Notes"
      : location.pathname === "/settings"
      ? "Settings"
      : 'All Notes';

  return (
    <header>
      {/* ------------- Desktop View ----------------- */}
      <div className="hidden lg:flex w-full min-h-[91px] px-[2rem] border-b-[1px] border-[#E0E4EA] bg-white items-center justify-between flex-1">
        <h1 className="font-bold text-2xl leading-7 text-[#0E121B] basis-[40%]">
          {tagQueryParam !== null ? <span className="text-[#87898a]">Notes Tagged: <span className="text-[#0E121B]">{tagQueryParam}</span></span> : headingText}
        </h1>

        <div className="flex items-center gap-6 w-[40%]">
          <div className="w-full relative">
            <IconSearch color="#000" className="absolute left-4 top-4" />
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

          <Link to="/settings">
            <IconSettings color="#000" />
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
