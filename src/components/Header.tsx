import { IconSearch, IconSettings } from "@/lib/icons";
import { Input } from "./ui/input";
import { Link, useLocation, useSearchParams, useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { Theme } from "@/providers/theme-provider";

interface Props {
  searchQuery: string,
  setSearchQuery: (searchQuery: string) => void
}

const Header = ({ searchQuery, setSearchQuery }: Props) => {
  const location = useLocation();
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const tagQueryParam = searchParams.get("tag")
  const inputRef = useRef<HTMLInputElement>(null)
  const [theme] = useState<Theme>(
      () => (localStorage.getItem('notes-theme') as Theme) || 'system'
    )

  const headingText =
    location.pathname === "/"
      ? "All Notes"
      : location.pathname.includes("/archived")
      ? "Archived Notes"
      : location.pathname === "/settings"
      ? "Settings"
      : 'All Notes'

  useEffect(() => {
  if (location.pathname === "/search") {
        inputRef.current?.focus()
  }
  }, [location.pathname])

  return (
    <header>
      {/* ------------- Desktop View ----------------- */}
      <div className="hidden lg:flex w-full min-h-[91px] px-[2rem] border-b-[1px] border-[#E0E4EA] items-center justify-between flex-1">
        <h1 className="font-bold text-2xl text-primaryText leading-7 basis-[40%]">
          {tagQueryParam !== null ? <span className="text-lighterGray">Notes Tagged: <span className="text-primaryText">{tagQueryParam}</span></span> : headingText}
        </h1>

        <div className="flex items-center gap-6 w-[40%]">
          <div className="w-full relative" onClick={() => navigate("/search")}>
            <IconSearch color={(theme === "system" || theme === "dark") ? "#FFF" : "#000"} className="absolute left-4 top-4" />
            <Input
            ref={inputRef}
              type="text"
              className="py-6 pl-[3rem] text-base pr-5"
              placeholder="Search by title, content, or tags"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <Link to="/settings">
            <IconSettings color={(theme === "system" || theme === "dark") ? "#FFF" : "#000"} />
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
