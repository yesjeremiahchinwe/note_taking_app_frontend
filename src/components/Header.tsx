import { IconSearch } from "@/lib/icons";
import { Input } from "./ui/input";
import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const [filterValue, setFilterValue] = useState(
    queryParams.get("myParam") || ""
  );

  return (
    <header className="flex w-full min-h-[91px] px-[2rem] border-b-[1px] border-[#E0E4EA] items-center justify-between flex-1">
      <h1 className="font-bold text-2xl leading-7 text-[#0E121B] basis-[40%]">
        All Notes
      </h1>

      <div className="max-w-[40%] w-full relative">
        <IconSearch className="absolute left-4 top-4" />
        <Input
          value={filterValue as string}
          onChange={(e) => {
            setFilterValue(e.target.value);
            queryParams.set("myParam", filterValue);
            navigate({ search: filterValue.toString() })
          }}
          type="search"
          className="py-6 pl-[3rem] text-base pr-5"
          placeholder="Search by title, content, or tags"
        />
      </div>
    </header>
  );
};

export default Header;
