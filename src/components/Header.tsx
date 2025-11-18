import { IconSearch, IconSettings } from "@/lib/icons";
import { Input } from "./ui/input";
import {
  Link,
  useLocation,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import { useEffect, useRef } from "react";
import { shortenText } from "@/lib/utils";

interface Props {
  searchQuery: string;
  setSearchQuery: (searchQuery: string) => void;
}

const Header = ({ searchQuery, setSearchQuery }: Props) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const tagQueryParam = searchParams.get("tag");
  const inputRef = useRef<HTMLInputElement>(null);

  const headingText =
    location.pathname === "/"
      ? "All Notes"
      : location.pathname.includes("/archived")
      ? "Archived Notes"
      : location.pathname.includes("/settings")
      ? "Settings"
      : "All Notes";

  useEffect(() => {
    if (location.pathname === "/search") {
      inputRef.current?.focus();
    }
  }, [location.pathname]);

  return (
    <header>
      {/* ------------- Desktop View ----------------- */}
      <div className="hidden lg:flex w-full min-h-[81px] px-[2rem] border-b-[1px] border-darkerGray items-center justify-between flex-1">
        <h1 className="font-bold text-2xl text-primaryText leading-7 basis-[40%]">
          {tagQueryParam !== null ? (
            <span className="text-lighterGray">
              Notes Tagged:{" "}
              <span className="text-primaryText">{tagQueryParam}</span>
            </span>
          ) : location.pathname === "/search" ? (
            <span className="text-lighterGray">
              Showing results for:{" "}
              <span className="text-primaryText">
                {shortenText(searchQuery, 15)}
              </span>{" "}
            </span>
          ) : (
            headingText
          )}
        </h1>

        <div className="flex items-center gap-6 w-[40%] text-primaryText">
          <div className="w-full relative" onClick={() => navigate("/search")}>
            <IconSearch color="gray" className="absolute left-4 top-3" />
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
            <IconSettings color="currentColor" />
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
